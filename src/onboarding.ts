import { ChannelType } from 'discord.js';
import type { Guild, User } from 'discord.js';
import { saveMonitoredChannels } from './db/guildconfig.js';

export async function promptForChannels(guild: Guild, targetUser: User): Promise<void> {
  const dmChannel = await targetUser.createDM();

  await dmChannel.send(
    `Hi! I've been added to **${guild.name}**. Which channels should I monitor to build memory from?\n\n` +
      `Reply with a comma-separated list of channel names (the # is optional), e.g. \`general, misc-text\`.\n` +
      `You have 5 minutes to reply.`,
  );

  const collected = await dmChannel
    .awaitMessages({
      filter: (msg) => msg.author.id === targetUser.id,
      max: 1,
      time: 5 * 60 * 1000,
      errors: ['time'],
    })
    .catch(() => null);

  if (!collected || collected.size === 0) {
    await dmChannel.send("No reply received in time. Run `/configure-channels` in the server whenever you're ready.");
    return;
  }

  const reply = collected.first()!;
  const requestedNames = reply.content
    .split(',')
    .map((entry) => entry.trim().replace(/^#/, '').toLowerCase())
    .filter((name) => name.length > 0);

  const matchedChannels = guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildText && requestedNames.includes(channel.name.toLowerCase()),
  );

  if (matchedChannels.size === 0) {
    await dmChannel.send('No matching channels found in that reply. Run `/configure-channels` in the server to try again.');
    return;
  }

  const validChannelIds = [...matchedChannels.keys()];
  await saveMonitoredChannels(guild.id, validChannelIds);

  const names = matchedChannels.map((channel) => `#${channel.name}`).join(', ');
  await dmChannel.send(`Got it — monitoring: ${names}`);
}