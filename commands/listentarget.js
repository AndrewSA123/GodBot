module.exports = {
    name: 'listentarget',
    description: 'Changes the Target of the Listen Command',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            settings.Global.ListenTarget = args[1];
            fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
            message.channel.send(`Target Acquired: ${args[1]}`);
        }else{
            message.channel.send("Missing Argument");
        }

    }
}