module.exports = {
    name: 'printmembers',
    description: 'Prints all Members based on status',
    execute(message, args, client, fs){

        if(args[1].toLowerCase() === "online"){
            message.guild.members.cache.filter(m => m.presence.status == 'online').forEach(m => message.channel.send(m.user.username));
        }else if(args[1].toLowerCase() === 'channels'){
            message.guild.channels.cache.forEach(m => message.channel.send(`ID: ${m.id}, Name: ${m.name}`));
        }
        else{
            message.guild.members.cache.filter(m => m.presence.status == 'offline').forEach(m => message.channel.send(m.user.username));
        }
    }
}