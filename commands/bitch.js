module.exports = {
    name: 'bitch',
    description: 'Test Description',
    execute(message, args){
        const fs = require('fs');

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            if(args[1].toLowerCase() == 'on'){
                settings.Global.Bitch = true;
                message.channel.send("Bitch Mode Activated");
            }else if(args[1].toLowerCase() == 'off'){
                settings.Global.Bitch = false;
                message.channel.send("Bitch Mode Off");
            }else{
                message.channel.send("Invalid Parameter on|off");
            }
        }else{
            message.channel.send("Missing Parameter on|off");
        }

        fs.writeFile('Settings.json', JSON.stringify(settings), function(err, result){});
    }
}