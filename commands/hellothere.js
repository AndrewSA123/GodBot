module.exports = {
    name: 'hellothere',
    description: 'Jumps into the same room as the sender and sends kind words',
    async execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        const ytdl = require('discord-ytdl-core');

        if(message.member.voice.channel){

            let stream = await ytdl("https://www.youtube.com/watch?v=eaEMSKzqGAg", {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
            });

            message.member.voice.channel.join().then(connection => {
                    let dispatcher = connection.play(stream, {
                        type: "opus"
                    })
                    .on("finish", () => {
                        message.guild.me.voice.channel.leave();
                    })
                }
            );
        }else{
            message.reply("You need to be in a channel");
        }
    }
}