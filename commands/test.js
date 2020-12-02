module.exports = {
    name: 'test',
    description: 'Test Description',
    execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        message.reply('Test Command');
    }
}