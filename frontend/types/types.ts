export type Ticket = {
  id: string;
  msg_id: string;
  status: string;
  resolved_by: string | null;
  ts_last_status_change: string | null;
  timestamp: string;
  context_messages: string[];
}

export type Message = {
  id: string;
  channel_id: string;
  parent_channel_id: null | string;
  community_server_id: string;
  timestamp: string;
  has_attachment: boolean;
  reference_msg_id: string;
  timestamp_insert: string;
  discussion_id: string;
  author_id: string;
  content: string;
  msg_url: string;
  author: Author;
}

export type Author = {
  id: string;
  name: string;
  nickname: string;
  color: string;
  discriminator: string;
  avatar_url: string;
  is_bot: boolean;
  timestamp_insert: string;
}