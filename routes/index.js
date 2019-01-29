'use strict';

// Express te router özelliğini kullanıma açtık
var express = require('express');
var router = express.Router();


const stageCalc = function (sex, age, weight, creatinin) {
    if (sex === "1") {
        return (((140 - age) * weight) / (72 * creatinin)).toFixed(0)
    } else if (sex === "2") {
        return ((((140 - age) * weight) / (72 * creatinin)) * 0.85).toFixed(0)
    } else {
        return "Please select gender"
    }
    
}

// GET /
router.get('/', function(req, res, next) {
    return res.render("main");
});


// POST /
router.post('/', (req, res, next) => {
    let result = stageCalc(req.body.sex, req.body.age, req.body.weight, req.body.screatinin);
    console.log(result);
    res.redirect("/")
});

module.exports = router;