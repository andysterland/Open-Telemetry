var csvify = require("./csvify.js");
var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
    startDate: Date,
    duration: Number,
    clientId: String,
    appId: String,
    appVersion: String
});

exports.repository = mongoose.model("Session",  sessionSchema);

exports.csvHeader = "_id, startDate, duration, clientId, appId, appVersion"+"\n";

exports.convertSessionToCsv = function (session){
    var csv = "";
    
    csv += csvify.escape(session._id) + ",";
    csv += csvify.escape(session.startDate) + ",";
    csv += csvify.escape(session.duration) + ",";
    csv += csvify.escape(session.clientId) + ",";
    csv += csvify.escape(session.appId) + ",";
    csv += csvify.escape(session.appVersion);
    csv += "\n";
    
    return csv;
}