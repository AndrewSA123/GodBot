module.exports = {
    name: 'printmembers',
    description: 'Prints all Members based on status',
    execute(message, args){

        if(args[1].toLowerCase() === "online"){
            message.guild.members.cache.filter(m => m.presence.status == 'online').forEach(m => message.channel.send(m.user.username));
        }else{
            message.guild.members.cache.filter(m => m.presence.status == 'offline').forEach(m => message.channel.send(m.user.username));
        }
    }
}