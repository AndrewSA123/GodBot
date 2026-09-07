create table if not exists guilds (
  guild_id text primary key,
  created_at timestamptz not null default now()
);

create table if not exists guild_channels (
  guild_id text not null references guilds(guild_id) on delete cascade,
  channel_id text not null,
  primary key (guild_id, channel_id)
);

alter table guilds enable row level security;
alter table guild_channels enable row level security;