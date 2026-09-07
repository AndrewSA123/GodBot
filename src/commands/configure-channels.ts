import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { promptForChannels } from '../onboarding.js';

export const data = new SlashCommandBuilder()
  .setName('configure-channels')
  .setDescription('Choose which channels the bot should monitor for memory')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guild) {
    await interaction.reply({ content: 'This command must be run in a server.', ephemeral: true });
    return;
  }

  await interaction.reply({ content: "Check your DMs — I've sent you instructions.", ephemeral: true });
  await promptForChannels(interaction.guild, interaction.user);
}