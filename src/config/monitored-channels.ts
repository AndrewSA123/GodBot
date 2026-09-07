import { supabase } from './supabase.js';

const monitoredChannelsByGuild = new Map<string, Set<string>>();

export async function loadMonitoredChannels(): Promise<void> {
  const { data, error } = await supabase.from('guild_channels').select('guild_id, channel_id');
  if (error) throw error;

  monitoredChannelsByGuild.clear();
  for (const row of data ?? []) {
    const set = monitoredChannelsByGuild.get(row.guild_id) ?? new Set<string>();
    set.add(row.channel_id);
    monitoredChannelsByGuild.set(row.guild_id, set);
  }
}

export function setMonitoredChannels(guildId: string, channelIds: string[]): void {
  monitoredChannelsByGuild.set(guildId, new Set(channelIds));
}

export function isMonitoredChannel(guildId: string, channelId: string): boolean {
  return monitoredChannelsByGuild.get(guildId)?.has(channelId) ?? false;
}