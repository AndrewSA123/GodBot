const Discord = require('discord.js');
const fs = require('fs');
const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents });
//const client = new Discord.Client(); //without intents

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

async function SendReminder(){
    var reminders = [];

    fs.readdirSync('./DndReminders', function (err, files) {
        if(err){
            console.error("No reminders to read", err);
        }

        files.forEach(function (file, index){
            //Adds files to json array
            reminders.push(JSON.parse(fs.readFileSync('./DndReminder/' + file)));
        })
    });

    reminders.forEach(reminder => {
        console.log(reminder.id);
    });
}

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

client.on('messageCreate', message => {

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
        if(message.channel.name == settings.Global.DefaultChannel){
            if(message.author.id != settings.Global.God && !message.author.bot){
                message.channel.send("You're not worthy!");
                return;
            }
        }
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.channel.name != settings.Global.DefaultChannel) return;

    const args = message.content.slice(prefix.length).split(" ");

    const command = args[0].toLowerCase();

    try {
        client.commands.get(command).execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId);
    } catch (error) {
        var names = JSON.parse(fs.readFileSync('Names.Json', 'utf8'));
        var PersonOBJ = names.Names.find(o => o.Key === message.author.id);
        
        if(typeof PersonOBJ !== 'undefined'){
            var name = PersonOBJ.Name;
            var resp = PersonOBJ.Insults[Math.floor(Math.random() * PersonOBJ.Insults.length)];
            message.reply(resp.Value.replace('{name}', name));
        }else{
            message.reply("Invalid Command!");
        }
    }

});

//API Layer
const http = require('http');
const hostname = settings.Http.HostName;
const port = settings.Http.Port;
const express = require('express');
const app = express();
const server = http.createServer(app);
var cors = require('cors')
app.use(express.json());

//Do on startup
server.listen(port, hostname, () => {
    console.log("API Connected");
});

app.get('/', (req, res) => {
    res.status(200).send({"Message":"/ route for godbot."});
})

const SettingsRouter = require('./Routes/Settings');
app.use('/settings', SettingsRouter);

const LeagueRouter = require('./Routes/League');
app.use('/league', LeagueRouter);

const DiscordRouter = require('./Routes/Discord');
app.use('/Discord', DiscordRouter);

app.use(cors());

    //End of the File
try{
    let Token = fs.readFileSync('token.txt', 'utf8', function (err, result) { });
    client.login(Token);
}catch(err){
    console.log("Token Error!");
}

module.exports = client;