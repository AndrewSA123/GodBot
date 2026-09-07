import { supabase } from '../config/supabase.js';

export async function saveMonitoredChannels(guildId: string, channelIds: string[]): Promise<void> {
  const { error: guildError } = await supabase
    .from('guilds')
    .upsert({ guild_id: guildId }, { onConflict: 'guild_id' });

  if (guildError) throw guildError;

  const { error: deleteError } = await supabase
    .from('guild_channels')
    .delete()
    .eq('guild_id', guildId);

  if (deleteError) throw deleteError;

  if (channelIds.length === 0) return;

  const rows = channelIds.map((channelId) => ({ guild_id: guildId, channel_id: channelId }));
  const { error: insertError } = await supabase.from('guild_channels').insert(rows);

  if (insertError) throw insertError;
}