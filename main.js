const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = new fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

var settings;

//Check if settings exists if not create new file
if (!fs.existsSync('Settings.json')) {
    var settingString = {
        Global: {
            Prefix: '!',
            Bitch: false,
            DefaultChannel: 'godbot-testing',
            DefaultVoice: "472875727654748194",
            Listen: false,
            ListenTarget: '342941329577213952',
            God: "159783547165605888",
            Limit: false
        },
        Http:{
            Port: 3344,
            HostName: "127.0.0.1"
        }
    };

    var data = JSON.stringify(settingString);

    fs.writeFileSync("Settings.json", data, function (err, result) { });
}

settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

//adds commands to a list from the commands folder
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//Discord bot event listeners
client.once('ready', () => {
    console.log("GodBot Online");
    if(settings.Global.Listen){
        const channel = client.channels.cache.get(settings.Global.DefaultVoice);
        channel.join();
    }
});

client.on('guildMemberSpeaking', (member, speaking) => {
    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    if (settings.Global.Listen) {
        if (member.user.id == settings.Global.ListenTarget) {
            if (speaking) {
                member.voice.setMute(true);
                setTimeout(() => { member.voice.setMute(false); }, 5000);
            }
        }
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    //oldMessage.author.send("Don't think I didn't see you edit that message :)");
    //oldMessage.channel.send(`${oldMessage.author} edited a message\n` + 'Old Message: ' + oldMessage.content + '\n\n' + 'New Message: ' + newMessage.content);
});

client.on('message', message => {

    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    const prefix = settings.Global.Prefix;

    if (settings.Global.Bitch && !message.author.bot) {
        if (message.author.id != settings.Global.God) {
            message.delete();
            message.channel.send('https://i.kym-cdn.com/entries/icons/facebook/000/018/459/53697461.jpg');
            return;
        }
    }
    if(settings.Global.Limit){
        if(message.author.id != settings.Global.God && !message.author.bot){
            message.channel.send("You're not worthy!");
            return;
        }
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.channel.name != settings.Global.DefaultChannel) return;

    const args = message.content.slice(prefix.length).split(" ");

    const command = args[0].toLowerCase();

    try {
        client.commands.get(command).execute(message, args, client, fs);
    } catch (error) {
        console.error(error);
        message.reply("Invalid Command!");
    }


});

//API Layer
const http = require('http');
const hostname = settings.Http.HostName;
const port = settings.Http.Port;
const express = require('express');
const app = express();
const server = http.createServer(app);
app.use(express.json());

//Do on startup
server.listen(port, hostname, () => {
    console.log("API Connected");
});

//Endpoints
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
    res.json(client.guilds.cache);
});

app.post('/GetAllMembers', (req, res) => {
    const guild = client.guilds.cache.get(req.body.GuildID);
    res.json(guild.members.cache);
});

app.post('/GetMemberByID', (req, res) => {
    const guild = client.guilds.cache.get(req.body.GuildID);
    const member = guild.members.cache.get(req.body.MemberID);

    res.json(member);
});

app.post('/ChangeSettings', (req, res) => {
    fs.writeFileSync('Settings.json', JSON.stringify(req.body), function (err, result) { });

    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    res.json(settings);
});


    //End of the File
try{
    let Token = fs.readFileSync('token.txt', 'utf8', function (err, result) { });
    client.login(Token);
}catch(err){
    console.log("Token Error!");
}
