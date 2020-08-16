const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const prefix = '!';

const commandFiles = new fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

var settings;

if(!fs.existsSync('Settings.json')){
    var settingString = {
        Global: {
            Bitch: false,
            DefaultChannel: 'godbot-testing'
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

client.on('message', message => {

    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

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

    client.commands.get(command).execute(message, args);

});

//End of the File
client.login("NzQ0NTY5ODI5MTQ2NzU1MDg0.XzlIsA.FR4PanccPjurFKiKE-3Gw9X7lvU");