const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = new fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

var settings;

if(!fs.existsSync('Settings.json')){
    var settingString = {
        Global: {
            Prefix: '!',
            Bitch: false,
            DefaultChannel: 'godbot-testing',
            DefaultVoice: "472875727654748194",
            Listen: false,
            ListenTarget: 'CompactDan'
        }
    };

    var data = JSON.stringify(settingString);

    fs.writeFileSync("Settings.json", data, function(err, result){});
}

settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("GodBot Online");
});

client.on('guildMemberSpeaking', (member, speaking) => {
    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    if(settings.Global.Listen){
        if(speaking){
            if(member.user.username == settings.Global.ListenTarget){
                member.voice.setMute(true);
            }
        }else{
            if(member.user.username == settings.Global.ListenTarget){
                member.voice.setMute(false);
            }
        }
    }
});

client.on('message', message => {

    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    const prefix = settings.Global.Prefix;

    if(settings.Global.Bitch && !message.author.bot){
        if(message.author.username != 'Andrew (BigCritz)'){
            message.delete();
            message.channel.send('https://i.kym-cdn.com/entries/icons/facebook/000/018/459/53697461.jpg');
            return;
        }
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.channel.name != settings.Global.DefaultChannel) return;

    const args = message.content.slice(prefix.length).split(" ");

    const command = args[0].toLowerCase();

    try{
        client.commands.get(command).execute(message, args, client, fs);
    }catch(error){
        console.error(error);
        message.reply("Invalid Command!");
    }
    

});

let Token = fs.readFileSync('token.txt', 'utf8', function(err, result){});

//End of the File
client.login(Token);