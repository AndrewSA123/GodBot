const express = require('express');
const app = express.Router();
const fs = require('fs');

app.post('/SendMessage', (req, res) => {
    const client = req.app.get('client');
    const guild = client.guilds.cache.get(req.body.GuildID);
    const channel = guild.channels.cache.get(req.body.Channel);
    channel.send(req.body.Message);

    var response = {
        Status: 200,
        Message: "Message Sent"
    };

    res.json(response);
});

app.post('/SendMessageWithMention', (req, res) => {
    const client = req.app.get('client');
    const guild = client.guilds.cache.get(req.body.GuildID);
    const channel = guild.channels.cache.get(req.body.Channel);
    channel.send("<@" + req.body.Mention + ">" + " " + req.body.Message);

    var response = {
        Status: 200,
        Message: "Message Sent"
    };

    res.json(response);
});

app.post('/GetMessagesForChannel', async (req, res) => {
    const client = req.app.get('client');
    const guild = client.guilds.cache.get(req.body.GuildID);
    const channel = guild.channels.cache.get(req.body.Channel);

    const messages = await channel.messages.fetch({ limit: req.body.Limit });

    res.json(messages);
});

app.post('/GetTextChannels', (req, res) => {
    const client = req.app.get('client');
    res.json(client.guilds.cache.get(req.body.GuildID).channels.cache.filter(m => m.type == "text"));
});

app.post('/GetVoiceChannels', (req, res) => {
    const client = req.app.get('client');
    res.json(client.guilds.cache.get(req.body.GuildID).channels.cache.filter(m => m.type == "voice"));
});

app.get('/GetAllGuilds', (req, res) => {
    const client = req.app.get('client');
    client.guilds.fetch({cache: true, force: true});
    res.json(client.guilds.cache);
});

app.post('/GetAllMembers', (req, res) => {
    const client = req.app.get('client');
    const guild = client.guilds.cache.get(req.body.GuildID);
    res.json(guild.members.cache.filter(m => !m.user.bot && m.presence?.status === 'online'));
});

app.post('/GetMemberByID', async (req, res) => {
    const client = req.app.get('client');
    user = await client.users.fetch(req.body.MemberID, {cache: true, force: true});

    res.json(user);
});

module.exports = app;