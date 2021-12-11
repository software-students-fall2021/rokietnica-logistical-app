const mongoose = require("mongoose");

const favStationSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId},
    stationIds: [{
        type: String,
        unique: true}]
});

module.exports = mongoose.model('FavStation', favStationSchema);
