"use strict";
/*
This writes and reads to the json object we're using as a "fake" database.
This is going to use node fs.
Read        returns all of the alert objects in the db as an array of objects.
Write       overwrites by default. Do we want that? No. Need to append, but doesn't work
exists      takes in baby object (pod, issue) and checks against already existing alert objects in the DB.
delete      deletes alert object.
update      given an ID and a status, update the alert object.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.dbController = void 0;
var fs = require('fs');
var path = require('path');
exports.dbController = {
    //get all of the alerts.
    getAllAlerts: function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')
                    //turn into array of alert objects and add to response.locals
                ];
                case 1:
                    db = _a.sent();
                    //turn into array of alert objects and add to response.locals
                    response.locals.db = JSON.parse(db);
                    return [2 /*return*/, next()];
            }
        });
    }); },
    //Deprecated! Keeping here just in case, but needs to be deleted eventually. 
    //Need to update an alert status.
    //ID and new status should come in as parameters.
    //Will need to read it, json parse it to an array of objects, change it...
    //Then restringify and write it. 
    updateStatusById: function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, newStatus, dbAsText, dbAsArray, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(request.params.id);
                    newStatus = request.params.status;
                    return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')];
                case 1:
                    dbAsText = _a.sent();
                    dbAsArray = JSON.parse(dbAsText);
                    //find appropriate alert object  [{}, {}, {}]
                    //And change it's status. 
                    for (index = 0; index < dbAsArray.length; index++) {
                        if (dbAsArray[index].id === id) {
                            dbAsArray[index].status = newStatus;
                            response.locals.updated = dbAsArray[index];
                        }
                    }
                    //write it all back to the DB.
                    return [4 /*yield*/, fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(dbAsArray))];
                case 2:
                    //write it all back to the DB.
                    _a.sent();
                    return [2 /*return*/, next()];
            }
        });
    }); },
    //Need to update an alert object for anything.
    //object should come in on request body.
    //Will need to read it, change it...
    //Then restringify and write it. 
    updateByAlertObject: function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, updatedAlertObject, dbAsText, dbAsArray, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //get everything I need.
                    console.log(request.body);
                    id = parseInt(request.body.id);
                    updatedAlertObject = request.body;
                    return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')];
                case 1:
                    dbAsText = _a.sent();
                    dbAsArray = JSON.parse(dbAsText);
                    console.log(dbAsArray);
                    //find appropriate alert object  [{}, {}, {}]
                    //And change it's status. 
                    for (index = 0; index < dbAsArray.length; index++) {
                        if (dbAsArray[index].id === id) { //
                            dbAsArray[index] = updatedAlertObject;
                            response.locals.updated = updatedAlertObject;
                        }
                    }
                    console.log(response.locals.updated);
                    //write it all back to the DB.
                    return [4 /*yield*/, fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(dbAsArray))];
                case 2:
                    //write it all back to the DB.
                    _a.sent();
                    return [2 /*return*/, next()];
            }
        });
    }); },
    //Need to update an alert status.
    //ID and new status should come in as parameters.
    //Will need to read it, json parse it to an array of objects, change it...
    //Then restringify and write it. 
    addNewYamlById: function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, newYaml, dbAsText, dbAsArray, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(request.params.id);
                    newYaml = request.params.newYaml;
                    return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')];
                case 1:
                    dbAsText = _a.sent();
                    dbAsArray = JSON.parse(dbAsText);
                    //find appropriate alert object  [{}, {}, {}]
                    //And add new YAML. 
                    for (index = 0; index < dbAsArray.length; index++) {
                        if (dbAsArray[index].id === id) {
                            dbAsArray[index].newYaml = newYaml;
                            response.locals.updated = dbAsArray[index];
                        }
                    }
                    //write it all back to the DB.
                    return [4 /*yield*/, fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(dbAsArray))];
                case 2:
                    //write it all back to the DB.
                    _a.sent();
                    return [2 /*return*/, next()];
            }
        });
    }); },
    deleteById: function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, dbAsText, dbAsArray, newDbAsArray, counter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(request.params.id);
                    return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../../server/db.json'), 'utf8')];
                case 1:
                    dbAsText = _a.sent();
                    dbAsArray = JSON.parse(dbAsText);
                    newDbAsArray = [];
                    counter = 0;
                    while (newDbAsArray[0] === undefined) {
                        if (dbAsArray[counter].id === id) {
                            response.locals.deleted = dbAsArray[counter];
                            //use slice to remove the one we don't want. 
                            //Alerts before our deleted alert
                            newDbAsArray.push.apply(newDbAsArray, dbAsArray.slice(0, counter));
                            //Alerts after our deleted alert
                            newDbAsArray.push.apply(newDbAsArray, dbAsArray.slice(counter + 1));
                        }
                        counter++;
                    }
                    //write it all back to the DB.
                    return [4 /*yield*/, fs.writeFileSync(path.join(__dirname, '../../../server/db.json'), JSON.stringify(newDbAsArray))];
                case 2:
                    //write it all back to the DB.
                    _a.sent();
                    return [2 /*return*/, next()];
            }
        });
    }); },
    //Need to put in a new alert. 
    //NOT coming from FE, coming from heartbeat when it creates an alert for the FE. 
    //So argument is just an object. 
    //Can't just append. 
    //Will need to read it, json parse it to an array of objects, and push new object.
    //Then restringify and write it. 
    writeNewAlertToDb: function (newAlert) { return __awaiter(void 0, void 0, void 0, function () {
        var dbAsText, dbAsArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../server/db.json'), 'utf8')];
                case 1:
                    dbAsText = _a.sent();
                    dbAsArray = JSON.parse(dbAsText);
                    //push new alert onto array of alert objects.
                    dbAsArray.push(newAlert);
                    //write it all back to the DB.
                    return [4 /*yield*/, fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(dbAsArray))];
                case 2:
                    //write it all back to the DB.
                    _a.sent();
                    return [2 /*return*/, 'Done'];
            }
        });
    }); },
    //
    checkIfAlertAlreadyExists: function (babyAlert) { return __awaiter(void 0, void 0, void 0, function () {
        var dbAsText, dbAsArray, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //{{pod: name, issue: oomkillIssue}}
                    console.log("we're inside checkIfAlertAlreadyExists");
                    return [4 /*yield*/, fs.readFileSync(path.join(__dirname, '../../server/db.json'), 'utf8')];
                case 1:
                    dbAsText = _a.sent();
                    dbAsArray = JSON.parse(dbAsText);
                    //check if it's there.
                    for (index = 0; index < dbAsArray.length; index++) {
                        if (dbAsArray[index].pod === babyAlert.pod && dbAsArray[index].issue === babyAlert.issue) {
                            console.log('checkIfAlertAlreadyExists returning true');
                            return [2 /*return*/, true];
                        }
                    }
                    console.log('checkIfAlertAlreadyExists returning false');
                    return [2 /*return*/, false];
            }
        });
    }); }
};
