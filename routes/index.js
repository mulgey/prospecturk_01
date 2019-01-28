// Express te router özelliğini kullanıma açtık
var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
    return res.render("main");
});

// POST /
router.post('/', (req, res, next) => {
    console.log(req.body.weight);
    res.redirect("/")
});

module.exports = router;