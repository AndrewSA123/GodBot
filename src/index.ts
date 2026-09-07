import 'dotenv/config';
import { Client, Events, GatewayIntentBits, Partials, REST, Routes } from 'discord.js';
import * as configureChannels from './commands/configureChannels.ts';
import { promptForChannels } from './onboarding.ts';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token) {
  throw new Error('DISCORD_TOKEN is not set in .env');
}
if (!clientId) {
  throw new Error('DISCORD_CLIENT_ID is not set in .env');
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
  partials: [Partials.Channel],
});

const commands = [configureChannels];

async function registerCommandsForGuild(guildId: string): Promise<void> {
  const rest = new REST().setToken(token as string);
  await rest.put(Routes.applicationGuildCommands(clientId as string, guildId), {
    body: commands.map((command) => command.data.toJSON()),
  });
}

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  for (const guild of readyClient.guilds.cache.values()) {
    await registerCommandsForGuild(guild.id);
  }
});

client.on(Events.GuildCreate, async (guild) => {
  await registerCommandsForGuild(guild.id);
  const owner = await guild.fetchOwner();
  await promptForChannels(guild, owner.user);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === configureChannels.data.name) {
    await configureChannels.execute(interaction);
  }
});

client.login(token);