const express = require('express');
const router = express.Router();
const fs = require('fs');

var settings;

router.post('/ChangeSettings', (req, res) => {
    fs.writeFileSync('Settings.json', JSON.stringify(req.body), function (err, result) { });

    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    res.json(settings);
});

router.get('/GetSettings', (req, res) => {
    settings = JSON.parse(fs.readFileSync('Settings.json', 'utf8'));

    res.json(settings);
});

module.exports = router;