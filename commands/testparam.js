module.exports = {
    name: 'testparam',
    description: 'Test With Parameters',
    execute(message, args, client, fs){
        if(args.length <= 1){
            message.channel.send("No Paramters Found");
        }else{
            var returnString = "Param List:"
            for(const param of args){
                if(param == this.name) continue;
                returnString += ` ${param},`;
            }
            message.channel.send(returnString);
        }
        
    }
}