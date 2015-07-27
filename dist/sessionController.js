var sessionModel = require("./sessionModel.js");

exports.createSession = function(req, res) {
    console.log(Object.keys(req));
    console.log(Object.keys(req.params));
    console.log("body: "+ JSON.stringify(req.body));
    console.log(JSON.stringify(req.params));
    var sessionEntry = {
        startDate: req.body.startDate,
        duration: req.body.duration,
        clientId: req.body.clientId,
        appId: req.body.appId,
        appVersion: req.body.appVersion
    };
    
    console.log("Creating a new session");
    console.log(JSON.stringify(sessionEntry));
    
    sessionModel.repository.create(sessionEntry, function (error) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
}

exports.retrieveAllSessions = function (req, res) {    
    console.log("Retriving all sessions");
    
    sessionModel.repository.find({}, function (error, sessions) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        }
        else {
            res.send(JSON.stringify(sessions));
        }
    });
}

exports.downloadAllSessionsAsCSV = function (req, res) {    
    console.log("Sending CSV file of all sessions");
    
    res.setHeader("Content-disposition", "attachment; filename=session.csv");
    res.contentType("csv");
    res.write(sessionModel.csvHeader);
    
    sessionModel.repository.find({}, function (error, sessions) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        }
        else {
            sessions.forEach(function(session, index){
                console.log(JSON.stringify(session));
                if(typeof session !== "undefined"){
                    res.write(sessionModel.convertSessionToCsv(session));
                }
            });
            
            res.send();
        }
    });
}