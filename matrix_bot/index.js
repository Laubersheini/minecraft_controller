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
var matrix_bot_sdk_1 = require("matrix-bot-sdk");
var wol = require("wake_on_lan");
var axios = require("axios");
var macAddress = "4C:CC:6A:64:F4:5C";
var IP = "192.168.178.64:8080";
// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).
var homeserverUrl = "https://matrix.laubersheimer.eu";
// Use the access token you got from login or registration above.
var accessToken = "syt_bWluZWNyYWZ0Ym90_LmvVgnTIemuLmbhJJdYN_2o76c1";
// In order to make sure the bot doesn't lose its state between restarts, we'll give it a place to cache
// any information it needs to. You can implement your own storage provider if you like, but a JSON file
// will work fine for this example.
var storage = new matrix_bot_sdk_1.SimpleFsStorageProvider("hello-bot.json");
// Finally, let's create the client and set it to autojoin rooms. Autojoining is typical of bots to ensure
// they can be easily added to any room.
var client = new matrix_bot_sdk_1.MatrixClient(homeserverUrl, accessToken, storage);
matrix_bot_sdk_1.AutojoinRoomsMixin.setupOnClient(client);
// Before we start the bot, register our command handler
client.on("room.message", handleCommand);
// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then(function () { return console.log("Bot started!"); });
// This is the command handler we registered a few lines up
function handleCommand(roomId, event) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, body, e_1, e_2, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Don't handle unhelpful events (ones that aren't text messages, are redacted, or sent by us)
                    if (((_a = event['content']) === null || _a === void 0 ? void 0 : _a['msgtype']) !== 'm.text')
                        return [2 /*return*/];
                    _b = event['sender'];
                    return [4 /*yield*/, client.getUserId()];
                case 1:
                    if (_b === (_c.sent()))
                        return [2 /*return*/];
                    body = event['content']['body'];
                    if (!(body === null || body === void 0 ? void 0 : body.startsWith("!minecraft")))
                        return [2 /*return*/];
                    if (!(body === null || body === void 0 ? void 0 : body.startsWith("!minecraft start"))) return [3 /*break*/, 7];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 3, , 5]);
                    wol.wake(macAddress);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _c.sent();
                    return [4 /*yield*/, client.sendText(roomId, "error starting server")];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, client.sendText(roomId, "Starting server!")];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    if (!(body === null || body === void 0 ? void 0 : body.startsWith("!minecraft restart"))) return [3 /*break*/, 11];
                    wol.wake(macAddress);
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 9, , 11]);
                    axios.get("http://" + IP + "/restart_server");
                    return [3 /*break*/, 11];
                case 9:
                    e_2 = _c.sent();
                    return [4 /*yield*/, client.sendText(roomId, "error restarting server")];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 11];
                case 11:
                    if (!(body === null || body === void 0 ? void 0 : body.startsWith("!minecraft stop"))) return [3 /*break*/, 17];
                    return [4 /*yield*/, client.sendText(roomId, "Shutting down server.")];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    _c.trys.push([13, 14, , 16]);
                    axios.get("http://" + IP + "/stop_server");
                    return [3 /*break*/, 16];
                case 14:
                    e_3 = _c.sent();
                    return [4 /*yield*/, client.sendText(roomId, "Error stopping server. Is the server running?")];
                case 15:
                    _c.sent();
                    return [3 /*break*/, 16];
                case 16:
                    setTimeout(function () {
                        try {
                            axios.get("http://" + IP + "/shutdown_server");
                        }
                        finally {
                        }
                    }, 120000);
                    _c.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
