const mongoose = require("mongoose");
const Schema = new mongoose.Schema;

const favStationSchema = Schema({
    username: {type: Schema.Types.ObjectId},
    stationIds: [String]
});

module.exports = mongoose.model('FavStation', favStationSchema);
