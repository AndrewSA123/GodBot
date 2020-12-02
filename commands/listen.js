module.exports = {
    name: 'listen',
    description: 'Prints all Members based on status',
    async execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId) {
        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        const channel = client.channels.cache.get(settings.Global.DefaultVoice);
        if (!settings.Global.Listen) {
            channel.join();
            message.channel.send("Listening");
            settings.Global.Listen = true;
        } else {
            channel.leave();
            message.channel.send("Giving Back Privacy");
            settings.Global.Listen = false;
        }
        
        fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
    }
}