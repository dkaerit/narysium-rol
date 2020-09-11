const { Router } = require('express'), router = Router();
const { admin } = require('../config/database');



router.get('/', (req, res) => {
    res.render('index');
})


module.exports = router;