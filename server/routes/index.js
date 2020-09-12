const { Router } = require('express'), router = Router();
const { admin } = require('../config/database');
const fetch = require("node-fetch");
var OAuth = require('oauth').OAuth;

const twit = require('twitter'), twitter = new twit({
    consumer_key: '0vbx3b74deOeSUA3LbJHP7gWe',
    consumer_secret: 'naW5AOwpzIq86fY1HUTAx1xPIrD7yoi9tV1MM3TVkTtVt0LQOn',
    access_token_key: '1304108918856192002-MhO0jBLIrVLSXfQZ1HzUdsBGXR6ZnL',
    access_token_secret: 'DU3SzuqVgJExme2HfmtyGW2kGe0oZkKYGs0u0prDBwKvq'
});
var key = '0vbx3b74deOeSUA3LbJHP7gWe';
var secret = 'naW5AOwpzIq86fY1HUTAx1xPIrD7yoi9tV1MM3TVkTtVt0LQOn';

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/normas', (req, res) => {
    res.render('normas.html');
});

router.get('/userlist', (req, res) => {
    res.render('userlist.html');
});

router.get('/userlist', (req, res) => {
    twitter.get('friends/list', (tw_err, tweets) => {
        if(tw_err) throw tw_err;
        tweets["users"].map((it,ix) => {
            let time_range = Date.now() - Date.parse(it["status"]["created_at"]); // tiempo transcurrido desde su último twit
            let activity_limit = 1210000000;
            console.log(it["id"], it["screen_name"], dhm(time_range), (time_range <= activity_limit)?"activo":"inactivo");
        });
        res.render('index', {followers: ""});
    });
})

// funciones auxiliares
function dhm(ms){
    days = Math.floor(ms / (24*60*60*1000));
    daysms=ms % (24*60*60*1000);
    hours = Math.floor((daysms)/(60*60*1000));
    hoursms=ms % (60*60*1000);
    minutes = Math.floor((hoursms)/(60*1000));
    minutesms=ms % (60*1000);
    sec = Math.floor((minutesms)/(1000));
    return days+"d - "+hours+"h "+minutes+"m "+sec+"s";
}


// funciones auxiliares twitter
var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    key,
    secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );


module.exports = router;