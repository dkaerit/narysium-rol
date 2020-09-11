const admin = require('firebase-admin'), db = admin.initializeApp({
    credential: admin.credential.cert(require("./narysium-rol-firebase-adminsdk-bx211-035a131cdd.json")),
    databaseURL: "https://narysium-rol.firebaseio.com"
});

module.exports = admin;