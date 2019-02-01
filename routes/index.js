'use strict';

// Express te router özelliğini kullanıma açtık
const express = require('express');
const router = express.Router();

// MongoDB çabaları
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("prospectRenal");
  dbo.collection("drugs").find({}, { projection: { _id: 0} }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0].kidneyFailure);
    db.close();
  });
});

const clCalc = function (sex, age, weight, creatinin) {
    if (sex === "1") {
        return (((140 - age) * weight) / (72 * creatinin)).toFixed(0)
    } else if (sex === "2") {
        return ((((140 - age) * weight) / (72 * creatinin)) * 0.85).toFixed(0)
    } else {
        return "Please select gender"
    }
    
}

const stageCalc = function (creatininLevel) {
    if (creatininLevel < 15) {
        return "kidneyFailure"
    } else if (creatininLevel >= 15 && creatininLevel < 30) {
        return "severeReduction"
    } else if (creatininLevel >= 30 && creatininLevel < 45) {
        return "moderateSevereReduction"
    } else if (creatininLevel >= 45 && creatininLevel < 60) {
        return "mildModerateReduction"
    } else if (creatininLevel >= 60 && creatininLevel < 90) {
        return "mildReduction"
    } else if (creatininLevel >= 90) {
        return "normalAndHigh"
    }
}

// GET /
router.get('/', function(req, res, next) {
    return res.render("main");
});


// POST /
router.post('/', (req, res, next) => {
    let result = clCalc(req.body.sex, req.body.age, req.body.weight, req.body.screatinin);
    console.log(result);
    let CKDStage = stageCalc(result);
    console.log(CKDStage);
    res.redirect("/")
});

module.exports = router;