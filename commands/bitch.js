module.exports = {
    name: 'bitch',
    description: 'Test Description',
    execute(message, args, client, fs){
        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(settings.Global.Bitch){
            settings.Global.Bitch = false;
            message.channel.send("Bitch Mode Deactivated")
        }else{
            settings.Global.Bitch = true;
            message.channel.send("Bitch Mode Activated");
        }

        fs.writeFile('Settings.json', JSON.stringify(settings), function(err, result){});
    }
}