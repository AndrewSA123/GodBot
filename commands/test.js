module.exports = {
    name: 'test',
    description: 'Test Description',
    execute(message, args, client, fs){
        message.reply('Test Command');
    }
}