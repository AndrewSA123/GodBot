module.exports = {
    name: 'hellothere',
    description: 'Jumps into the same room as the sender and sends kind words',
    async execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        const ytdl = require('discord-ytdl-core');
        const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource, generateDependencyReport, AudioPlayerStatus, StreamType  } = require('@discordjs/voice');

        if(message.member.voice.channel){

            var stream = await ytdl("https://www.youtube.com/watch?v=eaEMSKzqGAg", {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
            });

            let resource = createAudioResource(stream, {inlineVolume: true, inputType: StreamType.Opus});
            const player = createAudioPlayer();

            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.voice.channel.guild.id,
                adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
            });

            player.play(resource, { seek: 0, volume: 1.0 });
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            }); 


        }else{
            message.reply("You need to be in a channel");
        }
    }
}