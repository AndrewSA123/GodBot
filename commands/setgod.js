module.exports = {
    name: 'setgod',
    description: 'Changes the Target of the Listen Command',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            if(message.author.id == settings.Global.God || message.author.id == "159783547165605888"){
                settings.Global.God = args[1];
                fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
                message.channel.send(`Your New God: ${args[1]}`);
            }
        }else{
            message.channel.send("Missing Argument");
        }

    }
}