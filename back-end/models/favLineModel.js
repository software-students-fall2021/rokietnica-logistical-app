const mongoose = require("mongoose");

const favLineSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId},
    lines: [{
        type: String,
        unique: true}]
});

module.exports = mongoose.model('FavLine', favLineSchema);
