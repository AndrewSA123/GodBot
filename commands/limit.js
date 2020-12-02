module.exports = {
    name: 'limit',
    description: 'Limits the bot to only be used by GOD',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(settings.Global.Limit){
            if(message.author.id == settings.Global.God || message.author.id == "159783547165605888"){
                settings.Global.Limit = false;
                fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
                message.channel.send(`The Peons May Speak!`);
            }
        }else{
            if(message.author.id == settings.Global.God || message.author.id == "159783547165605888"){
                settings.Global.Limit = true;
                fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
                message.channel.send(`Only God May Speak!`);
            }
        }

    }
}