const express = require('express');
const app = express.Router();
const fs = require('fs');

const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
let Token = fs.readFileSync('token.txt', 'utf8', function (err, result) { });
client.login(Token);

app.post('/SendMessage', (req, res) => {
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
    const guild = client.guilds.cache.get(req.body.GuildID);
    const channel = guild.channels.cache.get(req.body.Channel);

    const messages = await channel.messages.fetch({ limit: req.body.Limit });

    res.json(messages);
});

app.post('/GetTextChannels', (req, res) => {
    res.json(client.guilds.cache.get(req.body.GuildID).channels.cache.filter(m => m.type == "text"));
});

app.post('/GetVoiceChannels', (req, res) => {
    res.json(client.guilds.cache.get(req.body.GuildID).channels.cache.filter(m => m.type == "voice"));
});

app.get('/GetAllGuilds', (req, res) => {
    console.log(client.guilds.fetch({cache: true, force: true}));
    res.json(client.guilds.cache);
});

app.post('/GetAllMembers', (req, res) => {
    const guild = client.guilds.cache.get(req.body.GuildID);
    res.json(guild.members.cache.filter(m => !m.user.bot && m.presence?.status === 'online'));
});

app.post('/GetMemberByID', async (req, res) => {
    user = await client.users.fetch(req.body.MemberID, {cache: true, force: true});

    res.json(user);
});

module.exports = app;