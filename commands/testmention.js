module.exports = {
    name: 'testmention',
    description: 'Mentions the person who typed the command',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        message.channel.send("<@" + message.author.id + "> Hello");
    }
}