module.exports = {
    name: 'listenchannel',
    description: 'Changes the channel that the listen command will join',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            settings.Global.DefaultVoice = args[1];
            fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
            message.channel.send(`Listen Channel changed to: ${args[1]}`);
        }else{
            message.channel.send("Missing Argument");
        }

    }
}