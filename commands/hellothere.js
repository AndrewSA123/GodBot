module.exports = {
    name: 'hellothere',
    description: 'Jumps into the same room as the sender and sends kind words',
    async execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        const ytdl = require('ytdl-core');

        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
            connection.play(ytdl('https://www.youtube.com/watch?v=eaEMSKzqGAg', { filter: 'audioonly' }));
            setTimeout(() => {connection.disconnect();}, 5000);
        }
    }
}