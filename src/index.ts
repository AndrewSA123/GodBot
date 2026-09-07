import 'dotenv/config';
import { Client, Events, GatewayIntentBits, Partials, REST, Routes } from 'discord.js';
import * as configureChannels from './commands/configure-channels.js';
import { isMonitoredChannel, loadMonitoredChannels } from './config/monitored-channels.js';
import { logMessage } from './db/messages.js';
import { promptForChannels } from './onboarding.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token) {
  throw new Error('DISCORD_TOKEN is not set in .env');
}
if (!clientId) {
  throw new Error('DISCORD_CLIENT_ID is not set in .env');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
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
  await loadMonitoredChannels();
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

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.guildId) return;
  if (!isMonitoredChannel(message.guildId, message.channelId)) return;

  await logMessage({
    guildId: message.guildId,
    channelId: message.channelId,
    authorId: message.author.id,
    content: message.content,
  }).catch((error) => console.error('Failed to log message:', error));
});

client.login(token);