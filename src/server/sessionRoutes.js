var sessionController = require("./sessionController.js");

exports.list = function (req, res) {
    console.log("Routing to: retrieveAllSessions");
    var format = req.query.format.toLowerCase();
    if(format == "csv"){
        sessionController.downloadAllSessionsAsCSV(req, res);
    } else {
        sessionController.retrieveAllSessions(req, res);
    }
}

exports.create =  function (req, res) {
    console.log("Routing to: createSession");
    sessionController.createSession(req, res);
}