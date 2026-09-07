import { supabase } from '../config/supabase.js';

export interface LoggedMessage {
  guildId: string;
  channelId: string;
  authorId: string;
  content: string;
}

export async function logMessage(message: LoggedMessage): Promise<void> {
  const { error } = await supabase.from('messages').insert({
    guild_id: message.guildId,
    channel_id: message.channelId,
    author_id: message.authorId,
    content: message.content,
  });

  if (error) throw error;
}