module.exports = {
    name: 'changeprefix',
    description: 'Test Description',
    execute(message, args, client, fs){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            if(args[1].length > 1){
                message.reply("Can only be 1 character")
            }else{
                settings.Global.Prefix = args[1];
                message.reply(`Prefix Changed To ${settings.Global.Prefix}`);
                fs.writeFile('Settings.json', JSON.stringify(settings), function(err, result){});
            }
            
        }else{
            message.channel.send("Missing Parameter on|off");
        }
    }
}