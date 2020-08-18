module.exports = {
    name: 'listentarget',
    description: 'Test Description',
    execute(message, args, client, fs){

        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){
            settings.Global.ListenTarget = args[1];
            fs.writeFile('Settings.json', JSON.stringify(settings), function (err, result) { });
        }

    }
}