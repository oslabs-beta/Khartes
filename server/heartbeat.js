"use strict";
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
var getPods_1 = require("./Controllers/getPods");
var getPrometheusData_1 = require("./Controllers/getPrometheusData");
var createAlert_1 = require("./Controllers/createAlert");
var checkForOomkill_1 = require("./Controllers/checkForOomkill");
var dbController_1 = require("./Controllers/dbController");
//Standardize our alerts
//list of issues
var oomkillIssue = "Potential OomKill detected";
var diskFullIssue = "Potential Disk Full issue detected";
var nodeBurstIssue = "Potential Node Burst issue detected";
/*
Pull data every X(15) seconds, calls the correct controllers.
    
    
check the data
    if problem detected, create baby alert and check it against already created alerts in the db.
        dbController.exists
    create Alert object if problem detected.
           
*/
var startHeartbeat = function () { return __awaiter(void 0, void 0, void 0, function () {
    var podsList, i, memUsageQuery, memUsage, memLimit, oomkill, existsResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("we're in the heartbeat function: babump babump");
                return [4 /*yield*/, (0, getPods_1["default"])()];
            case 1:
                podsList = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < podsList.length)) return [3 /*break*/, 8];
                memUsageQuery = 'container_memory_usage_bytes';
                return [4 /*yield*/, (0, getPrometheusData_1["default"])(podsList[i].pod, 'container_memory_usage_bytes')];
            case 3:
                memUsage = _a.sent();
                return [4 /*yield*/, (0, getPrometheusData_1["default"])(podsList[i].pod, 'container_spec_memory_limit_bytes')];
            case 4:
                memLimit = _a.sent();
                oomkill = (0, checkForOomkill_1["default"])(memUsage, memLimit);
                return [4 /*yield*/, dbController_1.dbController.checkIfAlertAlreadyExists({ pod: podsList[i].pod, issue: oomkillIssue })];
            case 5:
                existsResult = _a.sent();
                if (!(oomkill && !existsResult)) return [3 /*break*/, 7];
                //create an alert
                console.log("about to go into create alert?");
                return [4 /*yield*/, (0, createAlert_1.createAlert)(podsList[i].node, podsList[i].pod, oomkillIssue, memUsage, memLimit, memUsageQuery)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/];
        }
    });
}); };
startHeartbeat(); //single call for when app starts
setInterval(startHeartbeat, 15000);
