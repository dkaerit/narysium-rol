const { Router } = require('express'), router = Router();
const admin = require('../config/database');
const fetch = require("node-fetch");
const OAuth = require('oauth').OAuth;

/* BEGIN DECLARACIONES */
const db = admin.database();
const twit = require('twitter'), twitter = new twit({
    consumer_key: '0vbx3b74deOeSUA3LbJHP7gWe',
    consumer_secret: 'naW5AOwpzIq86fY1HUTAx1xPIrD7yoi9tV1MM3TVkTtVt0LQOn',
    access_token_key: '1304108918856192002-MhO0jBLIrVLSXfQZ1HzUdsBGXR6ZnL',
    access_token_secret: 'DU3SzuqVgJExme2HfmtyGW2kGe0oZkKYGs0u0prDBwKvq'
});
var key = '0vbx3b74deOeSUA3LbJHP7gWe';
var secret = 'naW5AOwpzIq86fY1HUTAx1xPIrD7yoi9tV1MM3TVkTtVt0LQOn';
/* END DECLARACIONES */


router.get('/map', (req, res) => {
    res.render('map.html');
});

router.get('/guides', (req, res) => {
    res.render('guides.html');
});

router.get('/home', (req, res) => {
    res.render('index.html');
});

router.get('/', (req, res) => {
    res.render('begin.html');
});

router.get('/journal', (req, res) => {
    res.render('journal.html');
});

router.get('/normas', (req, res) => {
    res.render('normas.html');
});

router.get('/userlist', (req, res) => {
    
    
    

    // hola
    twitter.get('friends/list', (tw_err, tweets) => {
        //db.ref('members').once('value', snap => {
            var coll = {};
            //
            if(tweets["users"]) tweets["users"].map((it,ix) => {
                let time_range = 1210000000;
                if(it["status"]) time_range = Date.now() - Date.parse(it["status"]["created_at"]); // tiempo transcurrido desde su último twit
                let activity_limit = 1210000000;
                let is_active = (time_range <= activity_limit)?"activo":"inactivo";
        
                coll[it["screen_name"]] = {
                    "id": it["id"],
                    "name": it["screen_name"],
                    "dhm": dhm(time_range),
                    "status": is_active
                }; //
        
                db.ref('faceclaims').once('value', snap => {
                    var fcs = snap.val();

                    if(!fcs[it["screen_name"]]) {
                        console.log(fcs[it["screen_name"]]);
                        console.log("estoy dentro", it["screen_name"]);
                        db.ref('faceclaims').update({[it["screen_name"]]: ""});
                        db.ref('datos').update({[it["screen_name"]]: {
                            "hab": "",
                            "rango": ""
                        }});
                    }
                    
                    
                })
            });
            else alert("error! users está vacío");

            if(tweets["users"]) db.ref('members').update(coll);
        //});
    
        
    });


    db.ref('members').once('value', snap => {
        var members = snap.val();
        db.ref('faceclaims').once('value', snap => {
            var fcs = snap.val();
            db.ref('datos').once('value', snap => {
            var datos = snap.val();
            res.render('userlist.html', {"members": members, "fcs": fcs, "datos": datos});
            });
            
        });
    });
    
});

// funciones auxiliares
function dhm(ms){
    days = Math.floor(ms / (24*60*60*1000));
    daysms=ms % (24*60*60*1000);
    hours = Math.floor((daysms)/(60*60*1000));
    hoursms=ms % (60*60*1000);
    minutes = Math.floor((hoursms)/(60*1000));
    minutesms=ms % (60*1000);
    sec = Math.floor((minutesms)/(1000));
    //return days+" d, "+hours+":"+minutes+":"+sec;
    return days;
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