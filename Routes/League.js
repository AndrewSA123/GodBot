const express = require('express');
const app = express.Router();
const fs = require('fs');

const { RiotAPI, RiotAPITypes, PlatformId } = require('@fightmegg/riot-api');
let RiotKey = fs.readFileSync('RiotKey.txt', 'utf8', function (err, result) { });
const rAPI = new RiotAPI(RiotKey);

app.post('/CreateNewLeagueDetails', ( async (req, res) => {
    const client = req.app.get('client');
    fs.access('LeagueData', function(err){
        if(err && err.code === 'ENOENT'){
            fs.mkdirSync('LeagueData');
        }
    })

    var member = await client.users.fetch(req.body.DiscordID, true, true);

    var LeagueData = await rAPI.summoner.getBySummonerName({
        region: PlatformId.EUW1,
        summonerName: req.body.SummonerName
    });

    var data = {
        DiscordInfo: member,
        LeagueInfo: LeagueData 
    };

    fs.writeFileSync('LeagueData/' + req.body.DiscordID + '.json', JSON.stringify(data), function (err, result) { });

    res.json(data);
}));

app.get('/GetLeagueData', (req, res) => {
    const client = req.app.get('client');
    var returnData = JSON.parse(fs.readFileSync('LeagueData/' + req.body.MemberID + '.json', 'utf8'));

    res.json(returnData);
});

app.get('/GetAllLeagueData', (req, res) => {
    const client = req.app.get('client');
    var returnData = [];

    fs.readdirSync('./LeagueData/').forEach(file => {
        returnData.push(JSON.parse(fs.readFileSync('./LeagueData/' + file)));
    })

    res.json(returnData);
});

module.exports = app;