'use strict';

// Giriş bölümü
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Şemamız
const DosesSchema = new Schema({
    activeSubstance: {
        name: String,
        kidneyFailure: String, // < 15
        severeReduction: String, // 15-29
        moderateSevereReduction: String, // 30-44
        mildModerateReduction: String, // 45-59
        mildReduction: String, // 60-89
        normalAndHigh: String // >=90
    }
});

// Exporting
const Doses = mongoose.model("Doses", DosesSchema);
module.exports.Doses = Doses;