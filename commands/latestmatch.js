module.exports = {
    name: 'latestmatch',
    description: 'Gets Most Recent Match For Summoner',
    async execute(message, args, client, fs, rAPI, RiotAPITypes, PlatformId){
        let settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

        if(args.length > 1){

            const summoner = await rAPI.summoner.getBySummonerName({
                region: PlatformId.EUW1,
                summonerName: args[1],
              });

              const MatchList = await rAPI.match.getMatchlistByAccount({
                  region: PlatformId.EUW1,
                  accountId: summoner.accountId
              });

              message.channel.send(MatchList.matches[0]);
        }
        else{
            message.channel.send("Summoner Name Not Found");
        }

    }
}