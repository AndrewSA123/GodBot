module.exports = {
    name: 'listen',
    description: 'Prints all Members based on status',
    async execute(message, args, client, fs){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        const channel = client.channels.cache.get(settings.Global.DefaultVoice);

        if(message.member.voice.channel){
            
            if(args.length > 1){
                if(args[1] === 'on'){
                    channel.join();
                    message.channel.send("Listening");
                }else{
                    channel.leave();
                    message.channel.send("Giving Back Privacy");
                }
            }
            
        }
    }
}