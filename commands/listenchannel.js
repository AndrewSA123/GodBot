module.exports = {
    name: 'listenchannel',
    description: 'Test Description',
    execute(message, args, client, fs){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            settings.Global.DefaultVoice = args[1];
            fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
            message.channel.send(`Listen Channel changed to: ${args[1]}`);
        }

    }
}