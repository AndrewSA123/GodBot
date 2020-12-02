module.exports = {
    name: 'info',
    description: 'Jumps into the same room as the sender and sends kind words',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        const EmbedMessage = JSON.parse(fs.readFileSync('Info.json', 'utf8'));
        message.channel.send(EmbedMessage);
    }
}