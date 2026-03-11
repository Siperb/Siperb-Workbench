(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["phone.SipProviderCore.Mobile"] = factory();
	else
		root["phone.SipProviderCore.Mobile"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Browser-Phone-SipProvider.ts":
/*!******************************************!*\
  !*** ./src/Browser-Phone-SipProvider.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BrowserPhoneSipProvider = void 0;
if (!window.phone) {
    window.phone = {};
}
if (!((_a = window.phone) === null || _a === void 0 ? void 0 : _a.Settings)) {
    window.phone.Settings = {};
}
if (!window.phone.Settings.Providers) {
    window.phone.Settings.Providers = [];
}
var __TAG__ = "BrowserPhoneSipProvider: ";
var __DEBUG__ = false;
var SipProviderTypes_1 = __webpack_require__(/*! ./SipProviderTypes */ "./src/SipProviderTypes.ts");
var SessionManager_1 = __webpack_require__(/*! ./SessionManager */ "./src/SessionManager.ts");
// ============================================================================
// Section: BrowserPhoneSipProvider class
// ============================================================================
/**
 * BrowserPhoneSipProvider class that provides SIP telephony functionality
 * Handles audio calls, session management, and SIP protocol operations
 */
var BrowserPhoneSipProvider = /** @class */ (function () {
    function BrowserPhoneSipProvider() {
        BrowserPhoneSipProvider.SessionManager = new SessionManager_1.SessionManager();
    }
    BrowserPhoneSipProvider.SanitizeForStorage = function (data) {
        if (data == null) {
            return data;
        }
        var seen = new WeakSet();
        var replacer = function (_key, value) {
            if (typeof value === 'function') {
                return undefined;
            }
            if (value && typeof value === 'object') {
                try {
                    if (typeof RTCPeerConnection !== 'undefined' && value instanceof RTCPeerConnection) {
                        return undefined;
                    }
                    if (typeof MediaStream !== 'undefined' && value instanceof MediaStream) {
                        return undefined;
                    }
                    if (typeof MediaStreamTrack !== 'undefined' && value instanceof MediaStreamTrack) {
                        return undefined;
                    }
                }
                catch (e) {
                }
                if (seen.has(value)) {
                    return undefined;
                }
                seen.add(value);
            }
            return value;
        };
        try {
            return JSON.parse(JSON.stringify(data, replacer));
        }
        catch (e) {
            return {};
        }
    };
    // -- Init and Provider Component --
    /**
     * Initialise the Browser Phone SipProvider
     * @param settings - The settings for the SipProvider (optional)
     * Put the SipProvider in the phone.Settings.Providers array
     * Calls the SipProvider.Init method
     * @returns Promise that resolves to the provider component
     */
    BrowserPhoneSipProvider.prototype.Init = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var providerComponent;
                        var _this = this;
                        return __generator(this, function (_a) {
                            BrowserPhoneSipProvider.SessionManager = new SessionManager_1.SessionManager();
                            BrowserPhoneSipProvider.Core = settings;
                            BrowserPhoneSipProvider.HealthCheckInterval = (settings === null || settings === void 0 ? void 0 : settings.HealthCheckInterval) || BrowserPhoneSipProvider.HealthCheckInterval;
                            BrowserPhoneSipProvider.HealthCheckIntervalTimer = null;
                            BrowserPhoneSipProvider.CallTimeoutIntervalTime = (settings === null || settings === void 0 ? void 0 : settings.NoAnswerTimeout) * 1000 || BrowserPhoneSipProvider.CallTimeoutIntervalTime;
                            BrowserPhoneSipProvider.NoAnswerTimeout = (settings === null || settings === void 0 ? void 0 : settings.NoAnswerTimeout) * 1000 || BrowserPhoneSipProvider.NoAnswerTimeout;
                            BrowserPhoneSipProvider.RingbackTimeout = (settings === null || settings === void 0 ? void 0 : settings.RingbackTimeout) * 1000 || BrowserPhoneSipProvider.RingbackTimeout;
                            providerComponent = {
                                TypeStr: "sip",
                                Name: "SIP",
                                Description: BrowserPhoneSipProvider.ProviderDescription,
                                Enabled: true,
                                SupportsVideo: false,
                                SupportsSubscribe: true,
                                SupportsAudio: true,
                                SupportsText: true,
                                SupportsFax: false,
                                SupportsHold: true,
                                SupportsMute: true,
                                SupportsRegistration: true,
                                /**
                                 * Uses Messaging via simple out of dialog messaging
                                 */
                                MessageProtocol: 'SIP-TEXT-1.0',
                                DtmfType: 'inband',
                                State: SipProviderTypes_1.CallState.Disconnected,
                                Status: SipProviderTypes_1.CallStatus.Disconnected,
                                Events: [],
                                // Functions
                                /**
                                 * Initialize the SIP provider with given settings
                                 * @param settings - Configuration settings for the SIP provider
                                 * @returns Promise that resolves when initialization is complete
                                 */
                                Init: function (settings) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, response;
                                                    return __generator(this, function (_a) {
                                                        try {
                                                            BrowserPhoneSipProvider.SessionManager = new SessionManager_1.SessionManager();
                                                            BrowserPhoneSipProvider.Settings = settings;
                                                            if (BrowserPhoneSipProvider.Core.Platform == "mobile") {
                                                                response = BrowserPhoneSipProvider.Core.Init(__assign({}, settings));
                                                                resolve(response);
                                                                return [2 /*return*/];
                                                            }
                                                            if (settings.DeviceId) {
                                                                BrowserPhoneSipProvider.DeviceId = settings.DeviceId;
                                                            }
                                                            response = BrowserPhoneSipProvider.Core.Init(__assign({}, settings));
                                                            if (settings.Platform == "web") {
                                                                window.phone.SupportsVideo = true;
                                                            }
                                                            resolve(response);
                                                        }
                                                        catch (error) {
                                                            console.error("Error InitSipProvider phone", error);
                                                            reject(error);
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Connect to the SIP server and start health checks
                                 * @returns Promise that resolves when connection is established
                                 */
                                Connect: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, error_1;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Connect()];
                                                            case 1:
                                                                response = _a.sent();
                                                                resolve(response);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_1 = _a.sent();
                                                                resolve({ Success: false, Reason: (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || "Connect failed" });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Connect using a remote SDP offer and return the SDP answer
                                 * @param sdp - Remote SDP offer
                                 * @returns Promise that resolves with connection response and SDP answer
                                 */
                                ConnectWithSDP: function (sdp) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, error_2;
                                                    var _a;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _b.trys.push([0, 2, , 3]);
                                                                if (typeof ((_a = BrowserPhoneSipProvider.Core) === null || _a === void 0 ? void 0 : _a.ConnectWithSDP) !== "function") {
                                                                    resolve({ Success: false, Reason: "ConnectWithSDP not supported by core" });
                                                                    return [2 /*return*/];
                                                                }
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.ConnectWithSDP(sdp)];
                                                            case 1:
                                                                response = _b.sent();
                                                                resolve(response);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_2 = _b.sent();
                                                                resolve({ Success: false, Reason: (error_2 === null || error_2 === void 0 ? void 0 : error_2.message) || "ConnectWithSDP failed" });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Initiate an outbound audio call to a contact
                                 * @param contact - The contact to call
                                 * @param session - The session object for this call
                                 * @returns Promise that resolves when call is initiated
                                 */
                                AudioCall: function (contact, session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var Session, e_1, response, error_3;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 6, , 7]);
                                                                if (BrowserPhoneSipProvider.SessionManager.get(session.Id) == undefined) {
                                                                    BrowserPhoneSipProvider.SessionManager.set(session);
                                                                }
                                                                Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                BrowserPhoneSipProvider.UpdateSession(Session.Id, {
                                                                    Data: {
                                                                        Direction: "outbound",
                                                                        StartTime: window.phone.TimeNow(),
                                                                        To: (contact === null || contact === void 0 ? void 0 : contact.Number) || session.DisplayName,
                                                                        From: "Us",
                                                                        DateAndTime: window.phone.TimeNow(),
                                                                        Provider: {
                                                                            Type: "sip",
                                                                            Description: "Provides standard SIP (no text) compliant messaging, with audio and video, but not text, according to the RFC1583",
                                                                            Invite: "",
                                                                            TargetUri: "",
                                                                            ReasonCode: 0,
                                                                            ReasonText: "",
                                                                            UserAgent: "",
                                                                        }
                                                                    }
                                                                });
                                                                if (!((typeof window.phone.Settings.AutoHoldOnInvite == 'boolean' && window.phone.Settings.AutoHoldOnInvite) || (typeof window.phone.Settings.AutoHoldOnInvite == 'undefined'))) return [3 /*break*/, 4];
                                                                _a.label = 1;
                                                            case 1:
                                                                _a.trys.push([1, 3, , 4]);
                                                                return [4 /*yield*/, window.phone.PlaceOtherCallsOnHold(session.Id)];
                                                            case 2:
                                                                _a.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                e_1 = _a.sent();
                                                                return [3 /*break*/, 4];
                                                            case 4:
                                                                session.Status = SipProviderTypes_1.CallStatus.StartingAudioCall;
                                                                window.phone.UpdateStage();
                                                                BrowserPhoneSipProvider.LogCallStarting(session, contact);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.AudioCall(contact, Session)];
                                                            case 5:
                                                                response = _a.sent();
                                                                BrowserPhoneSipProvider.AddCallActivity(session.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnInviteSent,
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: Session === null || Session === void 0 ? void 0 : Session.DisplayName,
                                                                        BuddyId: Session === null || Session === void 0 ? void 0 : Session.BuddyId,
                                                                        Direction: 'outbound',
                                                                    }
                                                                });
                                                                BrowserPhoneSipProvider.StartCallTimer(session.Id);
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnInviteSent,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Direction: 'outbound',
                                                                        Time: window.phone.TimeNow(),
                                                                        Caller: contact,
                                                                        DisplayName: Session === null || Session === void 0 ? void 0 : Session.DisplayName,
                                                                        BuddyId: Session === null || Session === void 0 ? void 0 : Session.BuddyId,
                                                                    }
                                                                });
                                                                resolve(response);
                                                                return [3 /*break*/, 7];
                                                            case 6:
                                                                error_3 = _a.sent();
                                                                // Remove session
                                                                BrowserPhoneSipProvider.RemoveSession(session.Id);
                                                                reject(error_3);
                                                                return [3 /*break*/, 7];
                                                            case 7: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                VideoCall: function (contact, session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var Session, videoProperties, result, error_4;
                                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                                                    return __generator(this, function (_q) {
                                                        switch (_q.label) {
                                                            case 0:
                                                                _q.trys.push([0, 4, , 5]);
                                                                if (!BrowserPhoneSipProvider.Core.VideoCall) return [3 /*break*/, 2];
                                                                if (BrowserPhoneSipProvider.SessionManager.get(session.Id) == undefined) {
                                                                    BrowserPhoneSipProvider.SessionManager.set(session);
                                                                }
                                                                Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                BrowserPhoneSipProvider.UpdateSession(Session.Id, {
                                                                    Provider: "sip",
                                                                    Data: {
                                                                        Direction: "outbound",
                                                                        StartTime: window.phone.TimeNow(),
                                                                        To: (contact === null || contact === void 0 ? void 0 : contact.Number) || session.DisplayName,
                                                                        From: "Us",
                                                                        DateAndTime: window.phone.TimeNow(),
                                                                        Provider: {
                                                                            Type: "sip",
                                                                            Description: "Provides standard SIP (no text) compliant messaging, with audio and video, but not text, according to the RFC1583",
                                                                            Invite: "",
                                                                            TargetUri: "",
                                                                            ReasonCode: 0,
                                                                            ReasonText: "",
                                                                            UserAgent: ((_a = BrowserPhoneSipProvider.Core) === null || _a === void 0 ? void 0 : _a.UserAgentStr) || "",
                                                                        }
                                                                    }
                                                                });
                                                                videoProperties = {
                                                                    VideoSrcId: (_d = (_b = session.VideoInputDevice) !== null && _b !== void 0 ? _b : (_c = window.phone.Settings) === null || _c === void 0 ? void 0 : _c.VideoSrcId) !== null && _d !== void 0 ? _d : "",
                                                                    CaptureVideoHeight: (_f = (_e = window.phone.Settings) === null || _e === void 0 ? void 0 : _e.CaptureVideoHeight) !== null && _f !== void 0 ? _f : "",
                                                                    CaptureVideoFps: (_h = (_g = window.phone.Settings) === null || _g === void 0 ? void 0 : _g.CaptureVideoFps) !== null && _h !== void 0 ? _h : "",
                                                                    MirrorVideo: (_k = (_j = window.phone.Settings) === null || _j === void 0 ? void 0 : _j.MirrorVideo) !== null && _k !== void 0 ? _k : "rotateY(180deg)",
                                                                    CaptureVideoAspectRatio: (_m = (_l = window.phone.Settings) === null || _l === void 0 ? void 0 : _l.CaptureVideoAspectRatio) !== null && _m !== void 0 ? _m : "",
                                                                    MaxVideoBandwidth: (_p = (_o = window.phone.Settings) === null || _o === void 0 ? void 0 : _o.MaxVideoBandwidth) !== null && _p !== void 0 ? _p : "2048",
                                                                };
                                                                BrowserPhoneSipProvider.AddCallActivity(session.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnVideoCallStarted,
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: session.DisplayName,
                                                                        BuddyId: session.BuddyId,
                                                                        Direction: "outbound",
                                                                        Caller: contact,
                                                                        WithVideo: true,
                                                                        VideoProperties: videoProperties,
                                                                    }
                                                                });
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnVideoCallStarted,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Direction: "outbound",
                                                                        Time: window.phone.TimeNow(),
                                                                        Caller: contact,
                                                                        WithVideo: true,
                                                                        VideoProperties: videoProperties,
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.VideoCall(contact, session)];
                                                            case 1:
                                                                result = _q.sent();
                                                                console.log(__TAG__ + "%c You started a video call with " + Session.DisplayName, "color: green; font-weight: bold;");
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                reject(new Error("VideoCall not supported"));
                                                                _q.label = 3;
                                                            case 3: return [3 /*break*/, 5];
                                                            case 4:
                                                                error_4 = _q.sent();
                                                                console.error(__TAG__ + "VideoCall: Error", error_4.message);
                                                                reject(error_4);
                                                                return [3 /*break*/, 5];
                                                            case 5: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                // ─── SIP Messaging ─────────────────────────────────────────────────
                                SendMessage: function (buddy, contact, messageItem) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, BrowserPhoneSipProvider.Core.SendMessage(buddy, contact, messageItem)];
                                        });
                                    });
                                },
                                /**
                                 * Send a DELIVERED receipt for a received message.
                                 * Call this once the message has been displayed in the UI.
                                 * @param buddy - The buddy who sent the original message.
                                 * @param contact - The contact (endpoint) to send the receipt to.
                                 * @param messageId - The messageId from the received OnMessageReceived event.
                                 */
                                MarkMessageDelivered: function (buddy, contact, messageId) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, BrowserPhoneSipProvider.Core.MarkMessageDelivered(buddy, contact, messageId)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                                /**
                                 * Send a READ receipt for a received message.
                                 * Call this once the user has actively read/viewed the message.
                                 * @param buddy - The buddy who sent the original message.
                                 * @param contact - The contact (endpoint) to send the receipt to.
                                 * @param messageId - The messageId from the received OnMessageReceived event.
                                 */
                                MarkMessageRead: function (buddy, contact, messageId) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, BrowserPhoneSipProvider.Core.MarkMessageRead(buddy, contact, messageId)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                                /**
                                 * Cancel a pending outbound message and mark it as failed.
                                 * Use when the consumer determines the message cannot be delivered.
                                 * Fires OnMessageFailed immediately and clears the internal send timeout.
                                 * No-op if the message is not pending (already confirmed or already failed).
                                 * @param buddy - The buddy the message was sent to.
                                 * @param contact - The contact (endpoint) the message was addressed to.
                                 * @param messageId - The messageId of the pending outbound message.
                                 */
                                MarkMessageFailed: function (buddy, contact, messageId) {
                                    BrowserPhoneSipProvider.Core.MarkMessageFailed(buddy, contact, messageId);
                                },
                                /**
                                 * Terminate an active call session
                                 * Handles cleanup for attended transfers and updates CDR
                                 * @param session - The session to hang up
                                 * @returns Promise that resolves when call is terminated
                                 */
                                Hangup: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var Session, isChildSession, e_2, response_1, e_3, key_1, parentSession, e_4, childCDR_1, parentSession, parentCDRS, parentCdrIds, e_5, e_6, pendingChild, attendedTransferChildId, ChildSession, response_2, e_7, key_2, childCDR_2, parentCDRS, parentCdrIds, cdrError_1, ParentSession, _i, _a, childId, childSession, childResponse, updatedData, key_3, currentCDRs, currentCdrIds, e_8, response, teardownError_1, sessionCopy, key, error_5, teardownError_2, cdrError_2;
                                                    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
                                                    return __generator(this, function (_12) {
                                                        switch (_12.label) {
                                                            case 0:
                                                                Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                try {
                                                                    window.phone.StopRingback(session.Id);
                                                                    window.phone.StopRingtone(session.Id);
                                                                }
                                                                catch (e) {
                                                                    console.warn(__TAG__ + "Hangup: Error stopping ringback and tone", e.message);
                                                                }
                                                                if ((_b = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _b === void 0 ? void 0 : _b.TeardownCompleted) {
                                                                    // Best-effort cleanup: TeardownCompleted may be set before local media is stopped.
                                                                    BrowserPhoneSipProvider.StopSessionLocalMedia(session.Id);
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                Session.Data.CallEnded = window.phone.TimeNow();
                                                                Session.Data.TerminatedBy = 'us';
                                                                Session.Data.ReasonCode = 16;
                                                                Session.Data.ReasonText = 'Normal Call Clearing';
                                                                Session.Data.EndTime = window.phone.TimeNow();
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    Data: {
                                                                        CallEnded: window.phone.TimeNow(),
                                                                        TerminatedBy: 'us',
                                                                        ReasonCode: 16,
                                                                        ReasonText: 'Normal Call Clearing',
                                                                        EndTime: window.phone.TimeNow(),
                                                                    }
                                                                });
                                                                isChildSession = (Session === null || Session === void 0 ? void 0 : Session.ParentSessionId) != null || (Session === null || Session === void 0 ? void 0 : Session.ParentSessionId) != undefined;
                                                                if (!isChildSession) return [3 /*break*/, 21];
                                                                if (!(Session.ConferenceCall || Session.AttemptingConferenceCall)) return [3 /*break*/, 6];
                                                                _12.label = 1;
                                                            case 1:
                                                                _12.trys.push([1, 3, , 4]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(Session)];
                                                            case 2:
                                                                _12.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                e_2 = _12.sent();
                                                                console.error(__TAG__ + "Hangup: Error hanging up conference call", e_2.message);
                                                                return [3 /*break*/, 4];
                                                            case 4: 
                                                            // Treat user hangup as participant leaving and stop further teardown paths.
                                                            return [4 /*yield*/, BrowserPhoneSipProvider.HandleParticipantLeftConferenceCall(Session)];
                                                            case 5:
                                                                // Treat user hangup as participant leaving and stop further teardown paths.
                                                                _12.sent();
                                                                resolve();
                                                                return [2 /*return*/];
                                                            case 6:
                                                                if (!(Session.AttendedTransferCall || ((_c = Session.Data) === null || _c === void 0 ? void 0 : _c.AttendedTransferCall) || ((_d = Session.Data) === null || _d === void 0 ? void 0 : _d.ChildAttendedTransferCall) == true || (Session === null || Session === void 0 ? void 0 : Session.ChildAttendedTransferCall) == true)) return [3 /*break*/, 21];
                                                                _12.label = 7;
                                                            case 7:
                                                                _12.trys.push([7, 19, , 20]);
                                                                response_1 = null;
                                                                _12.label = 8;
                                                            case 8:
                                                                _12.trys.push([8, 10, , 11]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(Session)];
                                                            case 9:
                                                                response_1 = _12.sent();
                                                                return [3 /*break*/, 11];
                                                            case 10:
                                                                e_3 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: Error hanging up attended transfer child session", (e_3 === null || e_3 === void 0 ? void 0 : e_3.message) || e_3);
                                                                return [3 /*break*/, 11];
                                                            case 11:
                                                                if (response_1 === null || response_1 === void 0 ? void 0 : response_1.CallData) {
                                                                    Session.Data.TeardownCompleted = true;
                                                                    for (key_1 in response_1 === null || response_1 === void 0 ? void 0 : response_1.CallData) {
                                                                        Session.Data[key_1] = response_1 === null || response_1 === void 0 ? void 0 : response_1.CallData[key_1];
                                                                    }
                                                                }
                                                                if (!Session.ParentSessionId) return [3 /*break*/, 15];
                                                                parentSession = BrowserPhoneSipProvider.SessionManager.get(Session.ParentSessionId);
                                                                BrowserPhoneSipProvider.UpdateSession(Session.ParentSessionId, {
                                                                    AttendedTransferCall: null,
                                                                    Data: {
                                                                        AttendedTransferCall: null,
                                                                        MakeAttendedCallActionComplete: false
                                                                    }
                                                                });
                                                                try {
                                                                    (_e = BrowserPhoneSipProvider.SipProvider) === null || _e === void 0 ? void 0 : _e.UpdateSession(Session.ParentSessionId, {
                                                                        AttendedTransferCall: null,
                                                                        Data: {
                                                                            AttendedTransferCall: null,
                                                                            MakeAttendedCallActionComplete: false
                                                                        }
                                                                    });
                                                                }
                                                                catch (e) {
                                                                }
                                                                if (!parentSession) return [3 /*break*/, 15];
                                                                if (!(((_f = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _f === void 0 ? void 0 : _f.OnHold) || (parentSession === null || parentSession === void 0 ? void 0 : parentSession.isOnHold))) return [3 /*break*/, 15];
                                                                _12.label = 12;
                                                            case 12:
                                                                _12.trys.push([12, 14, , 15]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Unhold(parentSession)];
                                                            case 13:
                                                                _12.sent();
                                                                return [3 /*break*/, 15];
                                                            case 14:
                                                                e_4 = _12.sent();
                                                                return [3 /*break*/, 15];
                                                            case 15:
                                                                _12.trys.push([15, 17, , 18]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(Session.Id)];
                                                            case 16:
                                                                childCDR_1 = _12.sent();
                                                                if (childCDR_1 && Session.ParentSessionId) {
                                                                    parentSession = BrowserPhoneSipProvider.SessionManager.get(Session.ParentSessionId);
                                                                    parentCDRS = (parentSession === null || parentSession === void 0 ? void 0 : parentSession.CDRs) || [];
                                                                    parentCdrIds = ((_g = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _g === void 0 ? void 0 : _g.CDRs) || [];
                                                                    if (childCDR_1 === null || childCDR_1 === void 0 ? void 0 : childCDR_1.Id) {
                                                                        if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR_1.Id; })) {
                                                                            parentCDRS.push({ CDRId: childCDR_1.Id });
                                                                        }
                                                                        if (!parentCdrIds.includes(childCDR_1.Id)) {
                                                                            parentCdrIds.push(childCDR_1.Id);
                                                                        }
                                                                    }
                                                                    BrowserPhoneSipProvider.UpdateSession(Session.ParentSessionId, {
                                                                        CDRs: parentCDRS,
                                                                        Data: {
                                                                            CDRs: parentCdrIds
                                                                        }
                                                                    });
                                                                }
                                                                return [3 /*break*/, 18];
                                                            case 17:
                                                                e_5 = _12.sent();
                                                                return [3 /*break*/, 18];
                                                            case 18:
                                                                setTimeout(function () {
                                                                    try {
                                                                        BrowserPhoneSipProvider.RemoveSession(Session.Id);
                                                                    }
                                                                    catch (e) {
                                                                    }
                                                                }, 1000);
                                                                return [3 /*break*/, 20];
                                                            case 19:
                                                                e_6 = _12.sent();
                                                                return [3 /*break*/, 20];
                                                            case 20:
                                                                resolve();
                                                                return [2 /*return*/];
                                                            case 21:
                                                                pendingChild = BrowserPhoneSipProvider.SessionManager.getAll().find(function (candidate) {
                                                                    var _a;
                                                                    return (candidate === null || candidate === void 0 ? void 0 : candidate.ParentSessionId) === Session.Id && ((candidate === null || candidate === void 0 ? void 0 : candidate.ChildAttendedTransferCall) == true || ((_a = candidate === null || candidate === void 0 ? void 0 : candidate.Data) === null || _a === void 0 ? void 0 : _a.ChildAttendedTransferCall) == true);
                                                                });
                                                                attendedTransferChildId = (Session === null || Session === void 0 ? void 0 : Session.AttendedTransferCall) || ((_h = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _h === void 0 ? void 0 : _h.AttendedTransferCall) || (pendingChild === null || pendingChild === void 0 ? void 0 : pendingChild.Id);
                                                                if (!(attendedTransferChildId != null)) return [3 /*break*/, 30];
                                                                ChildSession = BrowserPhoneSipProvider.SessionManager.get(attendedTransferChildId);
                                                                if (!ChildSession) return [3 /*break*/, 30];
                                                                response_2 = null;
                                                                _12.label = 22;
                                                            case 22:
                                                                _12.trys.push([22, 24, , 25]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(ChildSession)];
                                                            case 23:
                                                                response_2 = _12.sent();
                                                                return [3 /*break*/, 25];
                                                            case 24:
                                                                e_7 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: Error hanging up attended transfer child session", (e_7 === null || e_7 === void 0 ? void 0 : e_7.message) || e_7);
                                                                return [3 /*break*/, 25];
                                                            case 25:
                                                                ChildSession.Data.TeardownCompleted = true;
                                                                if (response_2 === null || response_2 === void 0 ? void 0 : response_2.CallData) {
                                                                    for (key_2 in response_2.CallData) {
                                                                        ChildSession.Data[key_2] = response_2.CallData[key_2];
                                                                    }
                                                                }
                                                                _12.label = 26;
                                                            case 26:
                                                                _12.trys.push([26, 28, , 29]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(ChildSession.Id)];
                                                            case 27:
                                                                childCDR_2 = _12.sent();
                                                                if (childCDR_2 === null || childCDR_2 === void 0 ? void 0 : childCDR_2.Id) {
                                                                    parentCDRS = (Session === null || Session === void 0 ? void 0 : Session.CDRs) || [];
                                                                    parentCdrIds = ((_j = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _j === void 0 ? void 0 : _j.CDRs) || [];
                                                                    if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR_2.Id; })) {
                                                                        parentCDRS.push({ CDRId: childCDR_2.Id });
                                                                    }
                                                                    if (!parentCdrIds.includes(childCDR_2.Id)) {
                                                                        parentCdrIds.push(childCDR_2.Id);
                                                                    }
                                                                    BrowserPhoneSipProvider.UpdateSession(Session.Id, {
                                                                        CDRs: parentCDRS,
                                                                        Data: {
                                                                            CDRs: parentCdrIds
                                                                        }
                                                                    });
                                                                }
                                                                return [3 /*break*/, 29];
                                                            case 28:
                                                                cdrError_1 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: CDR failed for attended transfer child", (cdrError_1 === null || cdrError_1 === void 0 ? void 0 : cdrError_1.message) || cdrError_1);
                                                                return [3 /*break*/, 29];
                                                            case 29:
                                                                setTimeout(function () {
                                                                    try {
                                                                        BrowserPhoneSipProvider.RemoveSession(ChildSession.Id);
                                                                    }
                                                                    catch (e) {
                                                                    }
                                                                }, 1000);
                                                                _12.label = 30;
                                                            case 30:
                                                                // This is a Child Session
                                                                if ((Session === null || Session === void 0 ? void 0 : Session.ParentSessionId) != null) {
                                                                    ParentSession = BrowserPhoneSipProvider.SessionManager.get(Session === null || Session === void 0 ? void 0 : Session.ParentSessionId);
                                                                    BrowserPhoneSipProvider.UpdateSession(ParentSession.Id, {
                                                                        AttendedTransferCall: null,
                                                                        ParentSessionId: null,
                                                                        UpdatedByChild: true,
                                                                    });
                                                                    // This could be a conference call or an attended transfer
                                                                    // Session is a Child Session of a Conference Call — full cleanup is
                                                                    // handled in HandleParticipantLeftConferenceCall after the SIP BYE is sent.
                                                                    if (Session.ConferenceCall) {
                                                                        if (__DEBUG__)
                                                                            console.log(__TAG__ + "%c Hangup: Participant left Conference Call", "color: blue; font-weight: bold;", Session.ConferenceCall);
                                                                    }
                                                                }
                                                                if (!(Session === null || Session === void 0 ? void 0 : Session.ConferenceChildren)) return [3 /*break*/, 38];
                                                                if (__DEBUG__)
                                                                    console.log(__TAG__ + "Hangup: Conference Children", Session.ConferenceChildren);
                                                                _i = 0, _a = Session.ConferenceChildren;
                                                                _12.label = 31;
                                                            case 31:
                                                                if (!(_i < _a.length)) return [3 /*break*/, 38];
                                                                childId = _a[_i];
                                                                if (childId == session.Id) {
                                                                    return [3 /*break*/, 37];
                                                                }
                                                                _12.label = 32;
                                                            case 32:
                                                                _12.trys.push([32, 36, , 37]);
                                                                childSession = BrowserPhoneSipProvider.SessionManager.get(childId);
                                                                if (!childSession) return [3 /*break*/, 35];
                                                                if (__DEBUG__)
                                                                    console.log(__TAG__ + "Hangup: Hanging up child session", childSession.DisplayName);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(childSession)];
                                                            case 33:
                                                                childResponse = _12.sent();
                                                                if (childResponse.Success == true) {
                                                                    if (__DEBUG__)
                                                                        console.log(__TAG__ + "Hangup: Child session hung up successfully", childSession.DisplayName);
                                                                    updatedData = {};
                                                                    for (key_3 in childResponse.CallData) {
                                                                        updatedData[key_3] = childResponse.CallData[key_3];
                                                                    }
                                                                    updatedData.ProviderCompleted = true;
                                                                    BrowserPhoneSipProvider.UpdateSession(childSession.Id, {
                                                                        ProviderCompleted: true,
                                                                        Data: updatedData
                                                                    });
                                                                }
                                                                currentCDRs = Session.CDRs || [];
                                                                currentCdrIds = ((_k = Session.Data) === null || _k === void 0 ? void 0 : _k.CDRs) || [];
                                                                if (!currentCDRs.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childId; })) {
                                                                    currentCDRs.push({ CDRId: childId });
                                                                }
                                                                if (!currentCdrIds.includes(childId)) {
                                                                    currentCdrIds.push(childId);
                                                                }
                                                                BrowserPhoneSipProvider.UpdateSession(Session.Id, {
                                                                    CDRs: currentCDRs,
                                                                    Data: {
                                                                        CDRs: currentCdrIds
                                                                    }
                                                                });
                                                                if (__DEBUG__)
                                                                    console.log(__TAG__ + "Hangup: Updated Session with CDRs", Session === null || Session === void 0 ? void 0 : Session.CDRs);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childId)];
                                                            case 34:
                                                                _12.sent();
                                                                setTimeout(function () {
                                                                    try {
                                                                        BrowserPhoneSipProvider.RemoveSession(childId);
                                                                    }
                                                                    catch (e) {
                                                                    }
                                                                }, 0);
                                                                _12.label = 35;
                                                            case 35: return [3 /*break*/, 37];
                                                            case 36:
                                                                e_8 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: Error hanging up child session", childId, e_8.message);
                                                                return [3 /*break*/, 37];
                                                            case 37:
                                                                _i++;
                                                                return [3 /*break*/, 31];
                                                            case 38:
                                                                _12.trys.push([38, 52, , 62]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(BrowserPhoneSipProvider.SessionManager.get(session.Id))];
                                                            case 39:
                                                                response = _12.sent();
                                                                if (!(response.Success == true)) return [3 /*break*/, 48];
                                                                console.log(__TAG__ + "%c You have hung up the call with " + Session.DisplayName, "color: green; font-weight: bold;");
                                                                _12.label = 40;
                                                            case 40:
                                                                _12.trys.push([40, 43, , 44]);
                                                                if (!((_l = BrowserPhoneSipProvider.SipProvider) === null || _l === void 0 ? void 0 : _l.TeardownSession)) return [3 /*break*/, 42];
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.TeardownSession(session.Id)];
                                                            case 41:
                                                                _12.sent();
                                                                if (__DEBUG__) {
                                                                    console.log(__TAG__ + "Hangup: Teardown complete", session.Id);
                                                                }
                                                                _12.label = 42;
                                                            case 42: return [3 /*break*/, 44];
                                                            case 43:
                                                                teardownError_1 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: Teardown failed", (teardownError_1 === null || teardownError_1 === void 0 ? void 0 : teardownError_1.message) || teardownError_1);
                                                                return [3 /*break*/, 44];
                                                            case 44:
                                                                BrowserPhoneSipProvider.StopSessionLocalMedia(session.Id);
                                                                if (!(Session === null || Session === void 0 ? void 0 : Session.ConferenceCall)) return [3 /*break*/, 46];
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.HandleParticipantLeftConferenceCall(Session)];
                                                            case 45:
                                                                _12.sent();
                                                                resolve();
                                                                return [2 /*return*/];
                                                            case 46:
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    ProviderCompleted: true,
                                                                    ReasonCode: ((_m = response === null || response === void 0 ? void 0 : response.CallData) === null || _m === void 0 ? void 0 : _m.ReasonCode) || ((_p = (_o = response.CallData) === null || _o === void 0 ? void 0 : _o.Data) === null || _p === void 0 ? void 0 : _p.ReasonCode) || 0,
                                                                    ReasonText: ((_q = response === null || response === void 0 ? void 0 : response.CallData) === null || _q === void 0 ? void 0 : _q.ReasonText) || ((_s = (_r = response.CallData) === null || _r === void 0 ? void 0 : _r.Data) === null || _s === void 0 ? void 0 : _s.ReasonText) || 'Normal Call Clearing',
                                                                    TerminatedBy: ((_t = response === null || response === void 0 ? void 0 : response.CallData) === null || _t === void 0 ? void 0 : _t.TerminatedBy) || ((_v = (_u = response.CallData) === null || _u === void 0 ? void 0 : _u.Data) === null || _v === void 0 ? void 0 : _v.TerminatedBy) || 'us',
                                                                    EndTime: window.phone.TimeNow(),
                                                                    CallEnded: window.phone.TimeNow(),
                                                                    Data: {
                                                                        ReasonCode: ((_w = response === null || response === void 0 ? void 0 : response.CallData) === null || _w === void 0 ? void 0 : _w.ReasonCode) || ((_y = (_x = response.CallData) === null || _x === void 0 ? void 0 : _x.Data) === null || _y === void 0 ? void 0 : _y.ReasonCode) || 0,
                                                                        ReasonText: ((_z = response === null || response === void 0 ? void 0 : response.CallData) === null || _z === void 0 ? void 0 : _z.ReasonText) || ((_1 = (_0 = response.CallData) === null || _0 === void 0 ? void 0 : _0.Data) === null || _1 === void 0 ? void 0 : _1.ReasonText) || 'Normal Call Clearing',
                                                                        TerminatedBy: ((_2 = response === null || response === void 0 ? void 0 : response.CallData) === null || _2 === void 0 ? void 0 : _2.TerminatedBy) || ((_4 = (_3 = response.CallData) === null || _3 === void 0 ? void 0 : _3.Data) === null || _4 === void 0 ? void 0 : _4.TerminatedBy) || 'us',
                                                                        EndTime: window.phone.TimeNow(),
                                                                        CallEnded: window.phone.TimeNow(),
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                                            case 47:
                                                                _12.sent();
                                                                BrowserPhoneSipProvider.StopCallTimer(session.Id);
                                                                setTimeout(function () {
                                                                    try {
                                                                        BrowserPhoneSipProvider.RemoveSession(session.Id);
                                                                    }
                                                                    catch (e) {
                                                                    }
                                                                }, 0);
                                                                sessionCopy = JSON.parse(JSON.stringify(Session));
                                                                for (key in sessionCopy) {
                                                                    if (key == 'RTPSession' || key == 'RtpReceiverAudioMediaStream' || key == 'RtpReceiverVideoMediaStream' || key == 'LocalMediaStream' || key == 'PeerConnection') {
                                                                        delete sessionCopy[key];
                                                                    }
                                                                    if (typeof sessionCopy[key] == 'object') {
                                                                        sessionCopy[key] = JSON.parse(JSON.stringify(sessionCopy[key]));
                                                                    }
                                                                }
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnHangup,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Action: 'hangup',
                                                                        Time: window.phone.TimeNow(),
                                                                        TerminatedBy: 'us',
                                                                        StatusCode: ((_5 = response === null || response === void 0 ? void 0 : response.CallData) === null || _5 === void 0 ? void 0 : _5.ReasonCode) || ((_7 = (_6 = response === null || response === void 0 ? void 0 : response.CallData) === null || _6 === void 0 ? void 0 : _6.Data) === null || _7 === void 0 ? void 0 : _7.ReasonCode) || 0,
                                                                        ReasonPhrase: ((_8 = response === null || response === void 0 ? void 0 : response.CallData) === null || _8 === void 0 ? void 0 : _8.ReasonText) || ((_10 = (_9 = response === null || response === void 0 ? void 0 : response.CallData) === null || _9 === void 0 ? void 0 : _9.Data) === null || _10 === void 0 ? void 0 : _10.ReasonText) || 'Normal Call Clearing',
                                                                        // Session: sessionCopy,
                                                                    }
                                                                });
                                                                resolve();
                                                                return [3 /*break*/, 51];
                                                            case 48:
                                                                console.warn(__TAG__ + "Hangup: Error hanging up call", response.Error, response);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                                            case 49:
                                                                _12.sent();
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(session.Id)];
                                                            case 50:
                                                                _12.sent();
                                                                // reject({
                                                                // });
                                                                resolve();
                                                                _12.label = 51;
                                                            case 51: return [3 /*break*/, 62];
                                                            case 52:
                                                                error_5 = _12.sent();
                                                                _12.label = 53;
                                                            case 53:
                                                                _12.trys.push([53, 56, , 57]);
                                                                if (!((_11 = BrowserPhoneSipProvider.SipProvider) === null || _11 === void 0 ? void 0 : _11.TeardownSession)) return [3 /*break*/, 55];
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.TeardownSession(session.Id)];
                                                            case 54:
                                                                _12.sent();
                                                                _12.label = 55;
                                                            case 55: return [3 /*break*/, 57];
                                                            case 56:
                                                                teardownError_2 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: Teardown failed in exception catch", (teardownError_2 === null || teardownError_2 === void 0 ? void 0 : teardownError_2.message) || teardownError_2);
                                                                return [3 /*break*/, 57];
                                                            case 57:
                                                                _12.trys.push([57, 59, , 60]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                                            case 58:
                                                                _12.sent();
                                                                return [3 /*break*/, 60];
                                                            case 59:
                                                                cdrError_2 = _12.sent();
                                                                console.warn(__TAG__ + "Hangup: CDR failed in exception catch", (cdrError_2 === null || cdrError_2 === void 0 ? void 0 : cdrError_2.message) || cdrError_2);
                                                                return [3 /*break*/, 60];
                                                            case 60: return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(session.Id)];
                                                            case 61:
                                                                _12.sent();
                                                                resolve();
                                                                return [3 /*break*/, 62];
                                                            case 62: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Cancel an outgoing call before it's answered
                                 * @param session - The session to cancel
                                 * @returns Promise that resolves when call is cancelled
                                 */
                                Cancel: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var Session, ChildSessionResponse, response, currentSession, key, currentSession, key;
                                                    var _a, _b, _c, _d, _e, _f, _g, _h;
                                                    return __generator(this, function (_j) {
                                                        switch (_j.label) {
                                                            case 0:
                                                                // Stop ringback
                                                                try {
                                                                    window.phone.StopRingback();
                                                                }
                                                                catch (e) {
                                                                }
                                                                Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if ((_a = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _a === void 0 ? void 0 : _a.TeardownCompleted) {
                                                                    if (__DEBUG__)
                                                                        console.log(__TAG__ + "Cancel: Session is completed already");
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                if ((_b = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _b === void 0 ? void 0 : _b.ProviderCompleted) {
                                                                    if (__DEBUG__)
                                                                        console.log(__TAG__ + "Cancel: Session is completed already");
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                BrowserPhoneSipProvider.StopCallTimer(session.Id);
                                                                if (__DEBUG__)
                                                                    console.log(__TAG__ + "Cancel", Session);
                                                                Session.UserInitiated = true;
                                                                Session.Data.EndTime = window.phone.TimeNow();
                                                                Session.Data.UserInitiated = true;
                                                                BrowserPhoneSipProvider.UpdateSession(Session.Id, {
                                                                    Data: {
                                                                        EndTime: window.phone.TimeNow(),
                                                                        UserInitiated: true,
                                                                    },
                                                                });
                                                                if (!(Session === null || Session === void 0 ? void 0 : Session.ParentSessionId)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.CancelAttendedTransfer(Session)];
                                                            case 1:
                                                                ChildSessionResponse = _j.sent();
                                                                if ((ChildSessionResponse === null || ChildSessionResponse === void 0 ? void 0 : ChildSessionResponse.Success) == true) {
                                                                }
                                                                resolve();
                                                                return [2 /*return*/];
                                                            case 2: return [4 /*yield*/, BrowserPhoneSipProvider.Core.Cancel(Session)];
                                                            case 3:
                                                                response = _j.sent();
                                                                if (!((response === null || response === void 0 ? void 0 : response.Success) == true)) return [3 /*break*/, 6];
                                                                console.log(__TAG__ + "%c You have cancelled the call with " + Session.Data.ToNumber, "color: green; font-weight: bold;");
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(Session.Id);
                                                                currentSession.Data.TeardownCompleted = true;
                                                                currentSession.Data.EndTime = window.phone.TimeNow();
                                                                currentSession.Data.CallEnded = window.phone.TimeNow();
                                                                currentSession.Data.TerminatedBy = 'Us';
                                                                currentSession.Data.UserInitiated = true;
                                                                currentSession.Data.SipHandlerCompleted = true;
                                                                currentSession.Data.ProviderCompleted = true;
                                                                for (key in response === null || response === void 0 ? void 0 : response.CallData) {
                                                                    currentSession.Data[key] = response === null || response === void 0 ? void 0 : response.CallData[key];
                                                                }
                                                                BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                    Data: __assign({ EndTime: window.phone.TimeNow(), CallEnded: window.phone.TimeNow(), TerminatedBy: 'Us', ReasonCode: ((_c = response === null || response === void 0 ? void 0 : response.CallData) === null || _c === void 0 ? void 0 : _c.ReasonCode) || 487, ReasonText: ((_d = response === null || response === void 0 ? void 0 : response.CallData) === null || _d === void 0 ? void 0 : _d.ReasonText) || 'Request Terminated', UserInitiated: true, SipHandlerCompleted: true, ProviderCompleted: true, TeardownCompleted: true }, response === null || response === void 0 ? void 0 : response.CallData)
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(Session.Id)];
                                                            case 4:
                                                                _j.sent();
                                                                BrowserPhoneSipProvider.StopCallTimer(session.Id);
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnCancelled,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: Session.Id,
                                                                        Action: 'cancel',
                                                                        Time: window.phone.TimeNow(),
                                                                        TerminatedBy: 'Us',
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(session.Id)];
                                                            case 5:
                                                                _j.sent();
                                                                resolve(response);
                                                                return [2 /*return*/];
                                                            case 6:
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(Session.Id);
                                                                currentSession.Data.TeardownCompleted = true;
                                                                currentSession.Data.EndTime = window.phone.TimeNow();
                                                                currentSession.Data.CallEnded = window.phone.TimeNow();
                                                                currentSession.Data.TerminatedBy = 'Us';
                                                                currentSession.Data.UserInitiated = true;
                                                                currentSession.Data.SipHandlerCompleted = true;
                                                                currentSession.Data.ProviderCompleted = true;
                                                                for (key in response === null || response === void 0 ? void 0 : response.CallData) {
                                                                    currentSession.Data[key] = response === null || response === void 0 ? void 0 : response.CallData[key];
                                                                }
                                                                BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                    Data: {
                                                                        EndTime: window.phone.TimeNow(),
                                                                        CallEnded: window.phone.TimeNow(),
                                                                        TerminatedBy: 'Us',
                                                                        ReasonCode: ((_e = response === null || response === void 0 ? void 0 : response.CallData) === null || _e === void 0 ? void 0 : _e.ReasonCode) || 487,
                                                                        ReasonText: ((_f = response === null || response === void 0 ? void 0 : response.CallData) === null || _f === void 0 ? void 0 : _f.ReasonText) || 'Request Terminated',
                                                                        UserInitiated: true,
                                                                        SipHandlerCompleted: true,
                                                                        ProviderCompleted: true,
                                                                        TeardownCompleted: true,
                                                                    }
                                                                });
                                                                try {
                                                                    (_h = (_g = window.phone).AddSessionEvent) === null || _h === void 0 ? void 0 : _h.call(_g, session.Id, {
                                                                        Timestamp: window.phone.TimeNow(),
                                                                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnCancelled,
                                                                        Data: {
                                                                            SessionId: session.Id,
                                                                            Time: window.phone.TimeNow(),
                                                                            DisplayName: currentSession.DisplayName,
                                                                            BuddyId: currentSession.BuddyId,
                                                                            Direction: currentSession.Direction,
                                                                        }
                                                                    });
                                                                }
                                                                catch (e) { }
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(Session.Id)];
                                                            case 7:
                                                                _j.sent();
                                                                BrowserPhoneSipProvider.StopCallTimer(session.Id);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(session.Id)];
                                                            case 8:
                                                                _j.sent();
                                                                resolve(response);
                                                                _j.label = 9;
                                                            case 9: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Answer an incoming call
                                 * @param session - The session to answer
                                 * @param buddy - The buddy associated with the call
                                 * @returns Promise that resolves when call is answered
                                 */
                                Answer: function (session, buddy) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var Session, e_9, error_6, currentSession, response, error_7;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 5, , 6]);
                                                                Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if (!Session) {
                                                                    BrowserPhoneSipProvider.SessionManager.set(session);
                                                                }
                                                                if (!((typeof window.phone.Settings.AutoHoldOnAnswer == 'boolean' && window.phone.Settings.AutoHoldOnAnswer) || (typeof window.phone.Settings.AutoHoldOnAnswer == 'undefined'))) return [3 /*break*/, 4];
                                                                _a.label = 1;
                                                            case 1:
                                                                _a.trys.push([1, 3, , 4]);
                                                                return [4 /*yield*/, window.phone.PlaceOtherCallsOnHold(session.Id)];
                                                            case 2:
                                                                _a.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                e_9 = _a.sent();
                                                                return [3 /*break*/, 4];
                                                            case 4: return [3 /*break*/, 6];
                                                            case 5:
                                                                error_6 = _a.sent();
                                                                return [3 /*break*/, 6];
                                                            case 6:
                                                                _a.trys.push([6, 8, , 9]);
                                                                session.State = SipProviderTypes_1.CallState.Establishing;
                                                                session.Status = SipProviderTypes_1.CallStatus.Answering;
                                                                window.phone.UpdateStage();
                                                                if (BrowserPhoneSipProvider.SessionManager.get(session.Id) == null || BrowserPhoneSipProvider.SessionManager.get(session.Id) == undefined) {
                                                                    BrowserPhoneSipProvider.SessionManager.set(session);
                                                                }
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    State: SipProviderTypes_1.CallState.Establishing,
                                                                    Status: SipProviderTypes_1.CallStatus.Answering,
                                                                    Data: {
                                                                        State: SipProviderTypes_1.CallState.Establishing,
                                                                        Status: SipProviderTypes_1.CallStatus.Answering,
                                                                    }
                                                                });
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if (currentSession.AlreadyAnswered == true) {
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                    AlreadyAnswered: true,
                                                                    Data: {
                                                                        AlreadyAnswered: true,
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Answer(currentSession, buddy)];
                                                            case 7:
                                                                response = _a.sent();
                                                                if (response.Success == true) {
                                                                    BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                        Data: {
                                                                            CallStarted: window.phone.TimeNow(),
                                                                            AnsweredTime: window.phone.TimeNow(),
                                                                            AnswerTime: window.phone.TimeNow(),
                                                                        }
                                                                    });
                                                                    window.phone.UpdateStage();
                                                                    BrowserPhoneSipProvider.PostMessage({
                                                                        Event: SipProviderTypes_1.SipProviderPostMessage.OnAccept,
                                                                        Source: "SipProvider",
                                                                        Destination: "Phone",
                                                                        Data: {
                                                                            SessionId: session.Id,
                                                                            Time: window.phone.TimeNow(),
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    console.warn(__TAG__ + "Answer: Error answering call", response.Error);
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                resolve();
                                                                return [3 /*break*/, 9];
                                                            case 8:
                                                                error_7 = _a.sent();
                                                                reject(error_7);
                                                                return [3 /*break*/, 9];
                                                            case 9: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Decline an incoming call
                                 * @param session - The session to decline
                                 * @param buddy - The buddy associated with the call
                                 * @returns Promise that resolves when call is declined
                                 */
                                Decline: function (session, reasonCode, reasonText) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var currentSession, response, key, afterUpdateSession, currentSession, error_8, currentSession;
                                                    var _a;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _b.trys.push([0, 4, , 6]);
                                                                try {
                                                                    window.phone.StopRingback(session.Id);
                                                                    window.phone.StopRingtone(session.Id);
                                                                }
                                                                catch (e) {
                                                                }
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Decline(currentSession, reasonCode, reasonText)];
                                                            case 1:
                                                                response = _b.sent();
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if (response.CallData) {
                                                                    for (key in response.CallData) {
                                                                        if (key == "Events") {
                                                                            currentSession.Data.Events = response.CallData[key];
                                                                        }
                                                                        currentSession[key] = response.CallData[key];
                                                                    }
                                                                    BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                        Data: {
                                                                            ReasonCode: reasonCode || 0,
                                                                            ReasonText: reasonText || 'Call Declined',
                                                                        }
                                                                    });
                                                                    afterUpdateSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                }
                                                                if (!(response.Success == true)) return [3 /*break*/, 3];
                                                                console.log(__TAG__ + "%c You have declined the call with " + (((_a = currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || currentSession.DisplayName || "Unknown"), "color: green; font-weight: bold;");
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                currentSession.Data.EndTime = window.phone.TimeNow();
                                                                currentSession.Data.TerminatedBy = 'us';
                                                                currentSession.Data.ReasonCode = reasonCode || 0;
                                                                currentSession.Data.ReasonText = reasonText || 'Call Declined';
                                                                BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                    Data: {
                                                                        EndTime: window.phone.TimeNow(),
                                                                        TerminatedBy: 'Us',
                                                                        ReasonCode: reasonCode || 0,
                                                                        ReasonText: reasonText || 'Call Declined',
                                                                    }
                                                                });
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnDecline,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Action: 'decline',
                                                                        Time: window.phone.TimeNow(),
                                                                    }
                                                                });
                                                                window.phone.AddSessionEvent(session.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnDecline,
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: currentSession === null || currentSession === void 0 ? void 0 : currentSession.DisplayName,
                                                                        BuddyId: currentSession === null || currentSession === void 0 ? void 0 : currentSession.BuddyId,
                                                                        Direction: currentSession === null || currentSession === void 0 ? void 0 : currentSession.Direction,
                                                                        ReasonCode: reasonCode || 0,
                                                                        ReasonText: reasonText || 'Call Declined',
                                                                        TerminatedBy: 'Us',
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                                            case 2:
                                                                _b.sent();
                                                                BrowserPhoneSipProvider.RemoveSession(session.Id);
                                                                _b.label = 3;
                                                            case 3:
                                                                resolve(response);
                                                                return [3 /*break*/, 6];
                                                            case 4:
                                                                error_8 = _b.sent();
                                                                console.warn(__TAG__ + "Decline Error", error_8);
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                currentSession.Data.ReasonCode = reasonCode || 0;
                                                                currentSession.Data.ReasonText = reasonText || 'Call Declined';
                                                                BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                                                    Data: {
                                                                        ReasonCode: reasonCode || 0,
                                                                        ReasonText: reasonText || 'Call Declined',
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                                            case 5:
                                                                _b.sent();
                                                                // });
                                                                BrowserPhoneSipProvider.RemoveSession(session.Id);
                                                                return [3 /*break*/, 6];
                                                            case 6: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Put a call on hold
                                 * @param session - The session to put on hold
                                 * @returns Promise that resolves when call is on hold
                                 */
                                Hold: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, message, buddy, e_10, error_9;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 10, , 11]);
                                                                if (session.State !== SipProviderTypes_1.CallState.Established) {
                                                                    // console.warn(__TAG__ + "Hold: Session is not established");
                                                                    // sleep 1 second and check state again
                                                                    setTimeout(function () {
                                                                        if (session.State !== SipProviderTypes_1.CallState.Established) {
                                                                            resolve();
                                                                        }
                                                                    }, 1000);
                                                                }
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hold(session)];
                                                            case 1:
                                                                response = _a.sent();
                                                                console.log(__TAG__ + "%c You have placed the call on hold", "color: teal; font-weight: bold;");
                                                                if (!(response.Success == true)) return [3 /*break*/, 2];
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnHold,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: session.DisplayName,
                                                                        BuddyId: session.BuddyId,
                                                                        Direction: session.Direction,
                                                                        Lang: 'call_on_hold'
                                                                    }
                                                                });
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    isOnHold: true
                                                                });
                                                                session.Status = SipProviderTypes_1.CallStatus.OnHold;
                                                                if (session.Data.Holds == undefined || session.Data.Holds == null) {
                                                                    session.Data.Holds = [];
                                                                }
                                                                session.Data.Holds.push(SipProviderTypes_1.CallStatus.OnHold);
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    Data: {
                                                                        Holds: __spreadArray(__spreadArray([], (session.Data.Holds || []), true), [SipProviderTypes_1.CallStatus.OnHold], false),
                                                                        Status: SipProviderTypes_1.CallStatus.OnHold,
                                                                    }
                                                                });
                                                                window.phone.UpdateStage();
                                                                return [3 /*break*/, 9];
                                                            case 2:
                                                                console.warn(__TAG__ + "onHold Error", response.Error);
                                                                _a.label = 3;
                                                            case 3:
                                                                _a.trys.push([3, 8, , 9]);
                                                                message = {
                                                                    Date: window.phone.TimeNow(),
                                                                    Direction: 'outbound',
                                                                    Body: "Failed to put call on hold "
                                                                };
                                                                return [4 /*yield*/, window.phone.GetBuddyWithSession(session.Id)];
                                                            case 4:
                                                                buddy = _a.sent();
                                                                if (!buddy) return [3 /*break*/, 6];
                                                                return [4 /*yield*/, window.phone.AddMessage(buddy, message)];
                                                            case 5:
                                                                _a.sent();
                                                                return [3 /*break*/, 7];
                                                            case 6:
                                                                console.warn(__TAG__ + "OnHold Failed to get buddy");
                                                                _a.label = 7;
                                                            case 7: return [3 /*break*/, 9];
                                                            case 8:
                                                                e_10 = _a.sent();
                                                                console.warn(__TAG__ + "OnHold Failed to add message", e_10);
                                                                return [3 /*break*/, 9];
                                                            case 9:
                                                                resolve();
                                                                return [3 /*break*/, 11];
                                                            case 10:
                                                                error_9 = _a.sent();
                                                                reject(error_9);
                                                                return [3 /*break*/, 11];
                                                            case 11: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Remove a call from hold
                                 * @param session - The session to remove from hold
                                 * @returns Promise that resolves when call is removed from hold
                                 */
                                Unhold: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, e_11, Session, message, buddy, e_12, error_10;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 12, , 13]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Unhold(session)];
                                                            case 1:
                                                                response = _a.sent();
                                                                if (!(response.Success == true)) return [3 /*break*/, 6];
                                                                console.log(__TAG__ + "%c You have removed the call from hold", "color: teal; font-weight: bold;");
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    isOnHold: false,
                                                                    Status: SipProviderTypes_1.CallStatus.InProgress
                                                                });
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnUnhold,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: session.DisplayName,
                                                                        BuddyId: session.BuddyId,
                                                                        Direction: session.Direction,
                                                                    }
                                                                });
                                                                if (!((typeof window.phone.Settings.AutoHoldOnInvite == 'boolean' && window.phone.Settings.AutoHoldOnInvite) || (typeof window.phone.Settings.AutoHoldOnInvite == 'undefined'))) return [3 /*break*/, 5];
                                                                _a.label = 2;
                                                            case 2:
                                                                _a.trys.push([2, 4, , 5]);
                                                                return [4 /*yield*/, window.phone.PlaceOtherCallsOnHold(session.Id)];
                                                            case 3:
                                                                _a.sent();
                                                                return [3 /*break*/, 5];
                                                            case 4:
                                                                e_11 = _a.sent();
                                                                return [3 /*break*/, 5];
                                                            case 5:
                                                                Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                    isOnHold: false,
                                                                    Status: SipProviderTypes_1.CallStatus.InProgress
                                                                });
                                                                window.phone.UpdateStage();
                                                                return [3 /*break*/, 11];
                                                            case 6:
                                                                _a.trys.push([6, 10, , 11]);
                                                                message = {
                                                                    Date: window.phone.TimeNow(),
                                                                    Direction: 'outbound',
                                                                    Body: "Failed to remove call from hold "
                                                                };
                                                                return [4 /*yield*/, window.phone.GetBuddyWithSession(session.Id)];
                                                            case 7:
                                                                buddy = _a.sent();
                                                                if (!buddy) return [3 /*break*/, 9];
                                                                return [4 /*yield*/, window.phone.AddMessage(buddy, message)];
                                                            case 8:
                                                                _a.sent();
                                                                return [3 /*break*/, 9];
                                                            case 9: return [3 /*break*/, 11];
                                                            case 10:
                                                                e_12 = _a.sent();
                                                                return [3 /*break*/, 11];
                                                            case 11:
                                                                resolve();
                                                                return [3 /*break*/, 13];
                                                            case 12:
                                                                error_10 = _a.sent();
                                                                reject(error_10);
                                                                return [3 /*break*/, 13];
                                                            case 13: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Send DTMF tones during a call
                                 * @param dtmf - The DTMF digit(s) to send
                                 * @param session - The active session
                                 * @returns Promise that resolves when DTMF is sent
                                 */
                                SendDtmf: function (dtmf, session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, dtmfMethod, error_11;
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                _c.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.SendDtmf(dtmf, session)];
                                                            case 1:
                                                                response = _c.sent();
                                                                dtmfMethod = String(((_b = (_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.DtmfType) || 'inband').toLowerCase();
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnSendDtmf,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        DisplayName: session === null || session === void 0 ? void 0 : session.DisplayName,
                                                                        Dtmf: dtmf,
                                                                        Method: dtmfMethod,
                                                                        Success: response,
                                                                        Time: window.phone.TimeNow(),
                                                                    }
                                                                });
                                                                window.phone.AddSessionEvent(session.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnSendDtmf,
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        DisplayName: session === null || session === void 0 ? void 0 : session.DisplayName,
                                                                        Dtmf: dtmf,
                                                                        Method: dtmfMethod,
                                                                        Success: response,
                                                                    }
                                                                });
                                                                resolve();
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_11 = _c.sent();
                                                                reject(error_11);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Mute the microphone for a call
                                 * @param session - The session to mute
                                 * @param buddy - The buddy associated with the call
                                 * @returns Promise that resolves when call is muted
                                 */
                                Mute: function (session, buddy) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, currentMutes, error_12;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Mute(session, buddy)];
                                                            case 1:
                                                                response = _a.sent();
                                                                if (response.Success == true) {
                                                                    console.log(__TAG__ + "%c You have placed the call on mute", "color: teal; font-weight: bold;");
                                                                    window.phone.UpdateStage();
                                                                    currentMutes = session.Data.Mutes || [];
                                                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                        isOnMute: true,
                                                                        Status: SipProviderTypes_1.CallStatus.OnMute,
                                                                        Data: {
                                                                            Mutes: __spreadArray(__spreadArray([], currentMutes, true), [SipProviderTypes_1.SipProviderPostMessage.OnMute], false)
                                                                        }
                                                                    });
                                                                    BrowserPhoneSipProvider.PostMessage({
                                                                        Event: SipProviderTypes_1.SipProviderPostMessage.OnMute,
                                                                        Source: "SipProvider",
                                                                        Destination: "Phone",
                                                                        Data: {
                                                                            SessionId: session.Id,
                                                                            Time: window.phone.TimeNow(),
                                                                            DisplayName: session.DisplayName,
                                                                            BuddyId: session.BuddyId,
                                                                            Direction: session.Direction,
                                                                        }
                                                                    });
                                                                }
                                                                resolve();
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_12 = _a.sent();
                                                                reject(error_12);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Unmute the microphone for a call
                                 * @param session - The session to unmute
                                 * @param buddy - The buddy associated with the call
                                 * @returns Promise that resolves when call is unmuted
                                 */
                                UnMute: function (session, buddy) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, error_13;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Unmute(session, buddy)];
                                                            case 1:
                                                                response = _a.sent();
                                                                if (response.Success == true) {
                                                                    console.log(__TAG__ + "%c You have removed the call from mute", "color: teal; font-weight: bold;");
                                                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                        isOnMute: false,
                                                                        Status: SipProviderTypes_1.CallStatus.InProgress
                                                                    });
                                                                    window.phone.UpdateStage();
                                                                    BrowserPhoneSipProvider.PostMessage({
                                                                        Event: SipProviderTypes_1.SipProviderPostMessage.OnUnmute,
                                                                        Source: "SipProvider",
                                                                        Destination: "Phone",
                                                                        Data: {
                                                                            SessionId: session.Id,
                                                                            Time: window.phone.TimeNow(),
                                                                            DisplayName: session.DisplayName,
                                                                            BuddyId: session.BuddyId,
                                                                            Direction: session.Direction,
                                                                        }
                                                                    });
                                                                    if (session.Data.Mutes == undefined || session.Data.Mutes == null) {
                                                                        session.Data.Mutes = [];
                                                                    }
                                                                    session.Data.Mutes.push(SipProviderTypes_1.SipProviderPostMessage.OnUnmute);
                                                                }
                                                                resolve();
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_13 = _a.sent();
                                                                reject(error_13);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Initiate an attended transfer by creating a consultation call
                                 * @param currentBuddy - The current buddy on the call
                                 * @param session - The current session
                                 * @param buddy - The target buddy to transfer to
                                 * @param contact - The contact information for the transfer target
                                 * @param targetSession - Optional target session for the transfer
                                 * @returns Promise that resolves when transfer is initiated
                                 */
                                AttendedTransfer: function (currentBuddy, session, buddy, contact, targetSession) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var currentSession, response, ParentSession, updatedData, key, error_14;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                console.log(__TAG__ + "%c AttendedTransfer Started to " + (targetSession === null || targetSession === void 0 ? void 0 : targetSession.DisplayName), "color: teal; font-weight: bold;");
                                                                currentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if (BrowserPhoneSipProvider.SessionManager.get(targetSession.Id) == null || BrowserPhoneSipProvider.SessionManager.get(targetSession.Id) == undefined) {
                                                                    BrowserPhoneSipProvider.SessionManager.set(targetSession);
                                                                }
                                                                BrowserPhoneSipProvider.UpdateSession(targetSession.Id, {
                                                                    buddyId: buddy.Id,
                                                                    DisplayName: buddy.DisplayName,
                                                                    Data: {
                                                                        StartTime: window.phone.TimeNow(),
                                                                        Direction: 'outbound',
                                                                        Caller: currentBuddy
                                                                    }
                                                                });
                                                                if (BrowserPhoneSipProvider.SessionManager.get(targetSession.Id) == null || BrowserPhoneSipProvider.SessionManager.get(targetSession.Id) == undefined) {
                                                                    BrowserPhoneSipProvider.SessionManager.set(targetSession);
                                                                }
                                                                window.phone.AddSessionEvent(session.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnAttendedTransferStarted,
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: currentSession === null || currentSession === void 0 ? void 0 : currentSession.DisplayName,
                                                                        BuddyId: currentSession === null || currentSession === void 0 ? void 0 : currentSession.BuddyId,
                                                                        AttendeeSessionId: targetSession.Id,
                                                                        AttendeeDisplayName: buddy.DisplayName,
                                                                        AttendeeContact: contact,
                                                                    }
                                                                });
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.AttendedTransfer(currentBuddy, session, buddy, contact, BrowserPhoneSipProvider.SessionManager.get(targetSession.Id))];
                                                            case 1:
                                                                response = _a.sent();
                                                                ParentSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if (response === null || response === void 0 ? void 0 : response.CallData) {
                                                                    updatedData = {};
                                                                    for (key in response === null || response === void 0 ? void 0 : response.CallData) {
                                                                        updatedData[key] = response === null || response === void 0 ? void 0 : response.CallData[key];
                                                                    }
                                                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                        Data: updatedData
                                                                    });
                                                                }
                                                                resolve();
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_14 = _a.sent();
                                                                reject(error_14);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Complete an attended transfer by connecting the two parties
                                 * This is the final step of the attended transfer process
                                 * @param childSession - The consultation call session
                                 * @returns Promise that resolves to transfer completion status
                                 */
                                CompleteTransfer: function (childSession) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var displayName, response, childSessionId, parentSessionId, childCDR_3, error_15, parentSessionForCdrs, parentCDRS, parentCdrIds, error_16, _failReasonCode, _failReasonText, _failParentSessionId, _failParentSession, error_17, error_18;
                                                    var _a, _b, _c, _d, _e, _f;
                                                    return __generator(this, function (_g) {
                                                        switch (_g.label) {
                                                            case 0:
                                                                _g.trys.push([0, 16, , 17]);
                                                                displayName = (childSession === null || childSession === void 0 ? void 0 : childSession.DisplayName) || ((_a = childSession === null || childSession === void 0 ? void 0 : childSession.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
                                                                console.log(__TAG__ + "%c Complete Transfer: " + displayName, "color: green; font-weight: bold;");
                                                                if (__DEBUG__)
                                                                    console.log(__TAG__ + "CompleteTransfer: Completing transfer for Child Session", childSession.Id, childSession.DisplayName);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.CompleteTransfer(childSession)];
                                                            case 1:
                                                                response = _g.sent();
                                                                if (!(response.Success == true)) return [3 /*break*/, 10];
                                                                if (__DEBUG__)
                                                                    console.log(__TAG__ + "CompleteTransfer: Transfer completed successfully", response);
                                                                // Ensure session data exists for CDR building
                                                                try {
                                                                    if ((_b = response === null || response === void 0 ? void 0 : response.CallData) === null || _b === void 0 ? void 0 : _b.Id) {
                                                                        BrowserPhoneSipProvider.UpdateSession(response.CallData.Id, response.CallData);
                                                                    }
                                                                    if ((_c = response === null || response === void 0 ? void 0 : response.ChildData) === null || _c === void 0 ? void 0 : _c.Id) {
                                                                        BrowserPhoneSipProvider.UpdateSession(response.ChildData.Id, response.ChildData);
                                                                    }
                                                                }
                                                                catch (error) {
                                                                    console.warn(__TAG__ + "CompleteTransfer: failed to restore session data for CDRs", error);
                                                                }
                                                                childSessionId = ((_d = response === null || response === void 0 ? void 0 : response.ChildData) === null || _d === void 0 ? void 0 : _d.Id) || childSession.Id;
                                                                parentSessionId = childSession.ParentSessionId || ((_e = response === null || response === void 0 ? void 0 : response.CallData) === null || _e === void 0 ? void 0 : _e.Id);
                                                                childCDR_3 = null;
                                                                _g.label = 2;
                                                            case 2:
                                                                _g.trys.push([2, 4, , 5]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childSessionId)];
                                                            case 3:
                                                                childCDR_3 = _g.sent();
                                                                return [3 /*break*/, 5];
                                                            case 4:
                                                                error_15 = _g.sent();
                                                                console.error(__TAG__, "CompleteTransfer: child CDR error", error_15);
                                                                return [3 /*break*/, 5];
                                                            case 5:
                                                                _g.trys.push([5, 8, , 9]);
                                                                if (!parentSessionId) return [3 /*break*/, 7];
                                                                if (childCDR_3 === null || childCDR_3 === void 0 ? void 0 : childCDR_3.Id) {
                                                                    parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(parentSessionId);
                                                                    parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                                                                    parentCdrIds = ((_f = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _f === void 0 ? void 0 : _f.CDRs) || [];
                                                                    if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR_3.Id; })) {
                                                                        parentCDRS.push({ CDRId: childCDR_3.Id });
                                                                    }
                                                                    if (!parentCdrIds.includes(childCDR_3.Id)) {
                                                                        parentCdrIds.push(childCDR_3.Id);
                                                                    }
                                                                    BrowserPhoneSipProvider.UpdateSession(parentSessionId, {
                                                                        CDRs: parentCDRS,
                                                                        Data: {
                                                                            CDRs: parentCdrIds
                                                                        }
                                                                    });
                                                                }
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(parentSessionId)];
                                                            case 6:
                                                                _g.sent();
                                                                _g.label = 7;
                                                            case 7: return [3 /*break*/, 9];
                                                            case 8:
                                                                error_16 = _g.sent();
                                                                console.error(__TAG__, "CompleteTransfer: parent CDR error", error_16);
                                                                return [3 /*break*/, 9];
                                                            case 9: return [3 /*break*/, 15];
                                                            case 10:
                                                                console.warn(__TAG__ + "CompleteTransfer: Transfer failed", response);
                                                                _failReasonCode = response === null || response === void 0 ? void 0 : response.ReasonCode;
                                                                _failReasonText = (response === null || response === void 0 ? void 0 : response.ReasonText) || (response === null || response === void 0 ? void 0 : response.Reason) || "Transfer Rejected";
                                                                _failParentSessionId = childSession.ParentSessionId;
                                                                // Update child session with rejection info
                                                                BrowserPhoneSipProvider.UpdateSession(childSession.Id, {
                                                                    Data: {
                                                                        ReasonCode: _failReasonCode,
                                                                        ReasonText: _failReasonText,
                                                                        TerminatedBy: "TransferRejected",
                                                                        Disposition: SipProviderTypes_1.Dispositions.CallRejected,
                                                                        TransferFailed: true,
                                                                        EndTime: window.phone.TimeNow(),
                                                                    }
                                                                });
                                                                // Reset parent session transfer state
                                                                if (_failParentSessionId) {
                                                                    BrowserPhoneSipProvider.UpdateSession(_failParentSessionId, {
                                                                        AttendedTransferCall: null,
                                                                        Data: {
                                                                            AttendedTransferCall: null,
                                                                            MakeAttendedCallActionComplete: false,
                                                                        }
                                                                    });
                                                                }
                                                                // Add activity event to child session
                                                                BrowserPhoneSipProvider.AddCallActivity(childSession.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnAttendedTransferFailed,
                                                                    Data: {
                                                                        SessionId: childSession.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: childSession.DisplayName,
                                                                        AttendeeSessionId: childSession.Id,
                                                                        AttendeeDisplayName: childSession.DisplayName,
                                                                        RejectedByUs: false,
                                                                        ReasonCode: _failReasonCode,
                                                                        ReasonText: _failReasonText,
                                                                    }
                                                                });
                                                                // Add activity event to parent session
                                                                if (_failParentSessionId) {
                                                                    _failParentSession = BrowserPhoneSipProvider.SessionManager.get(_failParentSessionId);
                                                                    BrowserPhoneSipProvider.AddCallActivity(_failParentSessionId, {
                                                                        Timestamp: window.phone.TimeNow(),
                                                                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnAttendedTransferFailed,
                                                                        Data: {
                                                                            SessionId: _failParentSessionId,
                                                                            Time: window.phone.TimeNow(),
                                                                            DisplayName: _failParentSession === null || _failParentSession === void 0 ? void 0 : _failParentSession.DisplayName,
                                                                            AttendeeSessionId: childSession.Id,
                                                                            AttendeeDisplayName: childSession.DisplayName,
                                                                            RejectedByUs: false,
                                                                            ReasonCode: _failReasonCode,
                                                                            ReasonText: _failReasonText,
                                                                        }
                                                                    });
                                                                }
                                                                _g.label = 11;
                                                            case 11:
                                                                _g.trys.push([11, 13, , 14]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childSession.Id)];
                                                            case 12:
                                                                _g.sent();
                                                                return [3 /*break*/, 14];
                                                            case 13:
                                                                error_17 = _g.sent();
                                                                console.warn(__TAG__ + "CompleteTransfer: CDR failed on transfer rejection", error_17);
                                                                return [3 /*break*/, 14];
                                                            case 14:
                                                                // Remove only child session — parent call continues
                                                                setTimeout(function () {
                                                                    try {
                                                                        BrowserPhoneSipProvider.RemoveSession(childSession.Id);
                                                                    }
                                                                    catch (e) { }
                                                                }, 100);
                                                                _g.label = 15;
                                                            case 15:
                                                                // Success: remove both sessions (transfer completed, both legs ended)
                                                                if (response.Success == true) {
                                                                    setTimeout(function () {
                                                                        try {
                                                                            BrowserPhoneSipProvider.RemoveSession(childSession.Id);
                                                                            BrowserPhoneSipProvider.RemoveSession(childSession.ParentSessionId);
                                                                        }
                                                                        catch (e) { }
                                                                    }, 100);
                                                                }
                                                                resolve(response);
                                                                return [3 /*break*/, 17];
                                                            case 16:
                                                                error_18 = _g.sent();
                                                                reject(error_18);
                                                                return [3 /*break*/, 17];
                                                            case 17: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Cancel an attended transfer and terminate the consultation call
                                 * @param childSession - The consultation call session to cancel
                                 * @returns Promise that resolves when transfer is cancelled
                                 */
                                CancelAttendedTransfer: function (childSession) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                var parentSession, e_13, response, ChildSessionAfterCancel, updatedData, key, error_19;
                                                var _this = this;
                                                var _a, _b;
                                                return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            _c.trys.push([0, 7, , 8]);
                                                            if (!(childSession.ParentSessionId != null)) return [3 /*break*/, 5];
                                                            parentSession = BrowserPhoneSipProvider.SessionManager.get(childSession.ParentSessionId);
                                                            BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                                                                AttendedTransferCall: null,
                                                                Data: {
                                                                    AttendedTransferCall: null,
                                                                    MakeAttendedCallActionComplete: false
                                                                }
                                                            });
                                                            try {
                                                                (_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.UpdateSession(parentSession.Id, {
                                                                    AttendedTransferCall: null,
                                                                    Data: {
                                                                        AttendedTransferCall: null,
                                                                        MakeAttendedCallActionComplete: false
                                                                    }
                                                                });
                                                            }
                                                            catch (e) {
                                                            }
                                                            if (!(((_b = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _b === void 0 ? void 0 : _b.OnHold) || (parentSession === null || parentSession === void 0 ? void 0 : parentSession.isOnHold))) return [3 /*break*/, 4];
                                                            _c.label = 1;
                                                        case 1:
                                                            _c.trys.push([1, 3, , 4]);
                                                            return [4 /*yield*/, BrowserPhoneSipProvider.Unhold(parentSession)];
                                                        case 2:
                                                            _c.sent();
                                                            return [3 /*break*/, 4];
                                                        case 3:
                                                            e_13 = _c.sent();
                                                            return [3 /*break*/, 4];
                                                        case 4:
                                                            BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                                                                AttendedTransferCall: null,
                                                                ParentSessionId: null,
                                                                UpdatedByChild: true,
                                                            });
                                                            _c.label = 5;
                                                        case 5: return [4 /*yield*/, BrowserPhoneSipProvider.Core.Cancel(childSession)];
                                                        case 6:
                                                            response = _c.sent();
                                                            BrowserPhoneSipProvider.AddCallActivity(childSession.Id, {
                                                                Timestamp: window.phone.TimeNow(),
                                                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnCancelAttendedTransfer,
                                                                Data: {
                                                                    SessionId: childSession.Id,
                                                                    Time: window.phone.TimeNow(),
                                                                    DisplayName: childSession.DisplayName,
                                                                    AttendeeSessionId: childSession.Id,
                                                                    AttendeeDisplayName: childSession.DisplayName,
                                                                    RejectedByUs: true,
                                                                }
                                                            });
                                                            ChildSessionAfterCancel = BrowserPhoneSipProvider.SessionManager.get(childSession.Id);
                                                            updatedData = {};
                                                            for (key in response === null || response === void 0 ? void 0 : response.CallData) {
                                                                updatedData[key] = response === null || response === void 0 ? void 0 : response.CallData[key];
                                                            }
                                                            BrowserPhoneSipProvider.UpdateSession(childSession.Id, {
                                                                Data: updatedData
                                                            });
                                                            // });
                                                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                var childCDR_4, parentSessionForCdrs, parentCDRS, parentCdrIds, e_14;
                                                                var _a;
                                                                return __generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0:
                                                                            _b.trys.push([0, 2, , 3]);
                                                                            return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childSession.Id)];
                                                                        case 1:
                                                                            childCDR_4 = _b.sent();
                                                                            if ((childCDR_4 === null || childCDR_4 === void 0 ? void 0 : childCDR_4.Id) && childSession.ParentSessionId) {
                                                                                parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(childSession.ParentSessionId);
                                                                                if (parentSessionForCdrs) {
                                                                                    parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                                                                                    parentCdrIds = ((_a = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _a === void 0 ? void 0 : _a.CDRs) || [];
                                                                                    if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR_4.Id; })) {
                                                                                        parentCDRS.push({ CDRId: childCDR_4.Id });
                                                                                    }
                                                                                    if (!parentCdrIds.includes(childCDR_4.Id)) {
                                                                                        parentCdrIds.push(childCDR_4.Id);
                                                                                    }
                                                                                    BrowserPhoneSipProvider.UpdateSession(childSession.ParentSessionId, {
                                                                                        CDRs: parentCDRS,
                                                                                        Data: {
                                                                                            CDRs: parentCdrIds
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                            return [3 /*break*/, 3];
                                                                        case 2:
                                                                            e_14 = _b.sent();
                                                                            return [3 /*break*/, 3];
                                                                        case 3: return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); }, 100);
                                                            setTimeout(function () {
                                                                try {
                                                                    BrowserPhoneSipProvider.RemoveSession(childSession.Id);
                                                                }
                                                                catch (e) {
                                                                }
                                                            }, 1000);
                                                            resolve();
                                                            return [3 /*break*/, 8];
                                                        case 7:
                                                            error_19 = _c.sent();
                                                            resolve(error_19);
                                                            return [3 /*break*/, 8];
                                                        case 8: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    });
                                }); },
                                /**
                                 * Perform a blind transfer to another party
                                 * @param currentBuddy - The current buddy on the call
                                 * @param session - The current session
                                 * @param buddy - The target buddy to transfer to
                                 * @param contact - The contact information for the transfer target
                                 * @returns Promise that resolves when transfer is completed
                                 */
                                BlindTransfer: function (currentBuddy, session, buddy, contact) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, blindTransferSession, updatedData, key, targetLabel_1, originalLabel, blindTransferDisposition, transferFromName, transferToName, callData, e_15, targetLabel, error_20;
                                                    var _a, _b, _c, _d, _e, _f, _g, _h;
                                                    return __generator(this, function (_j) {
                                                        switch (_j.label) {
                                                            case 0:
                                                                _j.trys.push([0, 6, , 7]);
                                                                console.log(__TAG__ + "%c BlindTransfer Started for Session: " + session.DisplayName + " to " + contact.Number, "color: teal; font-weight: bold;");
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.BlindTransfer(currentBuddy, session, buddy, contact)];
                                                            case 1:
                                                                response = _j.sent();
                                                                if (!response) {
                                                                    console.warn(__TAG__ + "BlindTransfer failed", "No response");
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                if ((response === null || response === void 0 ? void 0 : response.Success) === false) {
                                                                    console.warn(__TAG__ + "BlindTransfer failed", (response === null || response === void 0 ? void 0 : response.Reason) || response);
                                                                    resolve();
                                                                    return [2 /*return*/];
                                                                }
                                                                blindTransferSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                                if (response === null || response === void 0 ? void 0 : response.CallData) {
                                                                    updatedData = { BlindTransfer: true };
                                                                    for (key in response === null || response === void 0 ? void 0 : response.CallData) {
                                                                        updatedData[key] = response === null || response === void 0 ? void 0 : response.CallData[key];
                                                                    }
                                                                    targetLabel_1 = (contact === null || contact === void 0 ? void 0 : contact.Number) || (contact === null || contact === void 0 ? void 0 : contact.DisplayName) || (contact === null || contact === void 0 ? void 0 : contact.Name) || "Unknown";
                                                                    originalLabel = ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || (session === null || session === void 0 ? void 0 : session.Number) || (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_b = session === null || session === void 0 ? void 0 : session.Data) === null || _b === void 0 ? void 0 : _b.ToName) || ((_c = session === null || session === void 0 ? void 0 : session.Data) === null || _c === void 0 ? void 0 : _c.FromName) || "Unknown";
                                                                    blindTransferDisposition = "You Blind Transferred " + originalLabel + " to " + targetLabel_1;
                                                                    transferFromName = (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_d = session === null || session === void 0 ? void 0 : session.Data) === null || _d === void 0 ? void 0 : _d.ToName) || ((_e = session === null || session === void 0 ? void 0 : session.Data) === null || _e === void 0 ? void 0 : _e.FromName) || undefined;
                                                                    transferToName = (contact === null || contact === void 0 ? void 0 : contact.DisplayName) || (contact === null || contact === void 0 ? void 0 : contact.Name) || (contact === null || contact === void 0 ? void 0 : contact.Number) || undefined;
                                                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                                        Data: __assign(__assign({}, updatedData), { ReasonCode: 202, Disposition: SipProviderTypes_1.Dispositions.BlindTransfer, ReasonText: blindTransferDisposition, TransferFromDisplayName: transferFromName, TransferToDisplayName: transferToName, TerminatedBy: "us", CallEnded: window.phone.TimeNow() })
                                                                    });
                                                                    // if (targetBuddy) {
                                                                    //   var targetSession = {
                                                                    //     Id: (window as any).phone.UUID(),
                                                                    //     DisplayName: targetBuddy.DisplayName,
                                                                    //     Number: targetBuddy.Number,
                                                                    //     Direction: direction,
                                                                    //     Type: type,
                                                                    //     Body: body,
                                                                    //     ProfileUserId: profileUserId,
                                                                    //     Data: {
                                                                    //       ReasonCode: reasonCode,
                                                                    //       Disposition: 'Blind Transfer Made to ' + targetBuddy.Number,
                                                                    //       TerminatedBy: terminatedBy,
                                                                    //       CallEnded: (window as any).phone.TimeNow(),
                                                                    //       ReasonText: reasonText,
                                                                    //       ProviderData: {
                                                                    //         Type: 'sip',
                                                                    //         Description: '',
                                                                    //         Invite: '',
                                                                    //         TargetUri: '',
                                                                    //         ReasonCode: reasonCode,
                                                                    //         ReasonText: reasonText,
                                                                    //       },
                                                                    //       ProfileUserId: profileUserId,
                                                                    //       FromName: fromName,
                                                                    //       FromNumber: fromNumber,
                                                                    //       ToName: targetBuddy.DisplayName,
                                                                    //       ToNumber: targetBuddy.Number,
                                                                    //       Events: [],
                                                                    //       Network: '',
                                                                    //       CallId: targetMessage.CallId,
                                                                    //       StartTime: targetMessage.StartTime,
                                                                    //       AnswerTime: targetMessage.AnswerTime,
                                                                    //       EndTime: targetMessage.EndTime,
                                                                    //       Direction: targetMessage.Direction,
                                                                    //       Type: targetMessage.Type,
                                                                    //       Body: targetMessage.Body,
                                                                    //     },
                                                                    //   };
                                                                    //   // Add Session
                                                                    //   BrowserPhoneSipProvider.SessionManager.set(targetSession);
                                                                    //   var newItem = await BrowserPhoneSipProvider.BuildAndAddCDRMessage(targetSession.Id);
                                                                    //   setTimeout(async () => {
                                                                    //     try {
                                                                    //       await BrowserPhoneSipProvider.RemoveSession(targetSession.Id);
                                                                    //     } catch (e) {
                                                                    //       console.warn(__TAG__ + "BlindTransfer RemoveSession failed", e);
                                                                    //     }
                                                                    //   }, 1000);
                                                                    // }
                                                                }
                                                                _j.label = 2;
                                                            case 2:
                                                                _j.trys.push([2, 4, , 5]);
                                                                callData = (response === null || response === void 0 ? void 0 : response.CallData) || (blindTransferSession === null || blindTransferSession === void 0 ? void 0 : blindTransferSession.Data) || { TargetContact: contact };
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.OnBlindTransferCompleted(session.Id, callData)];
                                                            case 3:
                                                                _j.sent();
                                                                return [3 /*break*/, 5];
                                                            case 4:
                                                                e_15 = _j.sent();
                                                                console.warn(__TAG__ + "BlindTransfer OnBlindTransferCompleted failed", e_15);
                                                                return [3 /*break*/, 5];
                                                            case 5:
                                                                targetLabel = (contact === null || contact === void 0 ? void 0 : contact.Number) || (contact === null || contact === void 0 ? void 0 : contact.DisplayName) || (contact === null || contact === void 0 ? void 0 : contact.Name) || "Unknown";
                                                                console.log(__TAG__ + "%c Blind Transfer Completed: " + targetLabel, "color: green; font-weight: bold;");
                                                                window.phone.Toast(session.Id, "Blind Transfer completed", null, 'green');
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnBlindTransferCompleted,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: session.Id,
                                                                        Timestamp: window.phone.TimeNow(),
                                                                        Response: response,
                                                                        BlindTransferTransferee: {
                                                                            SessionId: session.Id,
                                                                            DisplayName: (_f = blindTransferSession === null || blindTransferSession === void 0 ? void 0 : blindTransferSession.DisplayName) !== null && _f !== void 0 ? _f : session === null || session === void 0 ? void 0 : session.DisplayName,
                                                                            BuddyId: (_g = blindTransferSession === null || blindTransferSession === void 0 ? void 0 : blindTransferSession.BuddyId) !== null && _g !== void 0 ? _g : session === null || session === void 0 ? void 0 : session.BuddyId,
                                                                            Direction: (_h = blindTransferSession === null || blindTransferSession === void 0 ? void 0 : blindTransferSession.Direction) !== null && _h !== void 0 ? _h : session === null || session === void 0 ? void 0 : session.Direction,
                                                                        },
                                                                        BlindTransferTarget: {
                                                                            Number: contact === null || contact === void 0 ? void 0 : contact.Number,
                                                                            DisplayName: (contact === null || contact === void 0 ? void 0 : contact.DisplayName) || (contact === null || contact === void 0 ? void 0 : contact.Name),
                                                                        },
                                                                    }
                                                                });
                                                                resolve();
                                                                return [3 /*break*/, 7];
                                                            case 6:
                                                                error_20 = _j.sent();
                                                                reject(error_20);
                                                                return [3 /*break*/, 7];
                                                            case 7: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Hang up the consultation call in an attended transfer
                                 * @param childSession - The consultation call session to hang up
                                 * @returns Promise that resolves when consultation call is terminated
                                 */
                                HangupAttendedTransfer: function (childSession) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var parentSession, e_16, response, ChildSessionAfterHangup, updatedData, key, error_21;
                                                    var _this = this;
                                                    var _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                _c.trys.push([0, 7, , 8]);
                                                                if (!(childSession.ParentSessionId != null)) return [3 /*break*/, 5];
                                                                parentSession = BrowserPhoneSipProvider.SessionManager.get(childSession.ParentSessionId);
                                                                BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                                                                    AttendedTransferCall: null,
                                                                    Data: {
                                                                        AttendedTransferCall: null,
                                                                        MakeAttendedCallActionComplete: false
                                                                    }
                                                                });
                                                                try {
                                                                    (_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.UpdateSession(parentSession.Id, {
                                                                        AttendedTransferCall: null,
                                                                        Data: {
                                                                            AttendedTransferCall: null,
                                                                            MakeAttendedCallActionComplete: false
                                                                        }
                                                                    });
                                                                }
                                                                catch (e) {
                                                                }
                                                                if (!(((_b = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _b === void 0 ? void 0 : _b.OnHold) || (parentSession === null || parentSession === void 0 ? void 0 : parentSession.isOnHold))) return [3 /*break*/, 4];
                                                                _c.label = 1;
                                                            case 1:
                                                                _c.trys.push([1, 3, , 4]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Unhold(parentSession)];
                                                            case 2:
                                                                _c.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                e_16 = _c.sent();
                                                                return [3 /*break*/, 4];
                                                            case 4:
                                                                BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                                                                    AttendedTransferCall: null,
                                                                    ParentSessionId: null,
                                                                    UpdatedByChild: true,
                                                                });
                                                                _c.label = 5;
                                                            case 5: return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(childSession)];
                                                            case 6:
                                                                response = _c.sent();
                                                                BrowserPhoneSipProvider.AddCallActivity(childSession.Id, {
                                                                    Timestamp: window.phone.TimeNow(),
                                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnHangupAttendedTransfer,
                                                                    Data: {
                                                                        SessionId: childSession.Id,
                                                                        Time: window.phone.TimeNow(),
                                                                        DisplayName: childSession.DisplayName,
                                                                        BuddyId: childSession.BuddyId,
                                                                        Direction: childSession.Direction,
                                                                    }
                                                                });
                                                                ChildSessionAfterHangup = BrowserPhoneSipProvider.SessionManager.get(childSession.Id);
                                                                if (response === null || response === void 0 ? void 0 : response.CallData) {
                                                                    updatedData = {};
                                                                    for (key in response === null || response === void 0 ? void 0 : response.CallData) {
                                                                        updatedData[key] = response === null || response === void 0 ? void 0 : response.CallData[key];
                                                                    }
                                                                    BrowserPhoneSipProvider.UpdateSession(childSession.Id, {
                                                                        Data: updatedData
                                                                    });
                                                                }
                                                                // });
                                                                BrowserPhoneSipProvider.PostMessage({
                                                                    Event: SipProviderTypes_1.SipProviderPostMessage.OnHangupAttendedTransfer,
                                                                    Source: "SipProvider",
                                                                    Destination: "Phone",
                                                                    Data: {
                                                                        SessionId: childSession.Id,
                                                                    }
                                                                });
                                                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    var childCDR_5, parentSessionForCdrs, parentCDRS, parentCdrIds, e_17;
                                                                    var _a;
                                                                    return __generator(this, function (_b) {
                                                                        switch (_b.label) {
                                                                            case 0:
                                                                                _b.trys.push([0, 2, , 3]);
                                                                                return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childSession.Id)];
                                                                            case 1:
                                                                                childCDR_5 = _b.sent();
                                                                                if ((childCDR_5 === null || childCDR_5 === void 0 ? void 0 : childCDR_5.Id) && childSession.ParentSessionId) {
                                                                                    parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(childSession.ParentSessionId);
                                                                                    if (parentSessionForCdrs) {
                                                                                        parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                                                                                        parentCdrIds = ((_a = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _a === void 0 ? void 0 : _a.CDRs) || [];
                                                                                        if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR_5.Id; })) {
                                                                                            parentCDRS.push({ CDRId: childCDR_5.Id });
                                                                                        }
                                                                                        if (!parentCdrIds.includes(childCDR_5.Id)) {
                                                                                            parentCdrIds.push(childCDR_5.Id);
                                                                                        }
                                                                                        BrowserPhoneSipProvider.UpdateSession(childSession.ParentSessionId, {
                                                                                            CDRs: parentCDRS,
                                                                                            Data: {
                                                                                                CDRs: parentCdrIds
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                                return [3 /*break*/, 3];
                                                                            case 2:
                                                                                e_17 = _b.sent();
                                                                                return [3 /*break*/, 3];
                                                                            case 3: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); }, 100);
                                                                setTimeout(function () {
                                                                    try {
                                                                        BrowserPhoneSipProvider.RemoveSession(childSession.Id);
                                                                    }
                                                                    catch (e) {
                                                                    }
                                                                }, 1000);
                                                                resolve();
                                                                return [3 /*break*/, 8];
                                                            case 7:
                                                                error_21 = _c.sent();
                                                                reject(error_21);
                                                                return [3 /*break*/, 8];
                                                            case 8: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                Conference: function (currentBuddy, session, buddy, contact) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var targetLabel, result, error_22;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                targetLabel = (buddy === null || buddy === void 0 ? void 0 : buddy.DisplayName) || (contact === null || contact === void 0 ? void 0 : contact.Number) || (contact === null || contact === void 0 ? void 0 : contact.DisplayName) || (contact === null || contact === void 0 ? void 0 : contact.Name) || "Unknown";
                                                                console.log(__TAG__ + "%c Conference Started with " + targetLabel, "color: teal; font-weight: bold;");
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Conference(currentBuddy, session, buddy, contact)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_22 = _a.sent();
                                                                reject(error_22);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                JoinConference: function (childSession) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var targetLabel, result, error_23;
                                                    var _a;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _b.trys.push([0, 2, , 3]);
                                                                targetLabel = (childSession === null || childSession === void 0 ? void 0 : childSession.DisplayName) || ((_a = childSession === null || childSession === void 0 ? void 0 : childSession.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
                                                                console.log(__TAG__ + "%c Conference Joined: " + targetLabel, "color: green; font-weight: bold;");
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.JoinConference(childSession)];
                                                            case 1:
                                                                result = _b.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_23 = _b.sent();
                                                                reject(error_23);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                CancelConference: function (childSession) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var result, error_24;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.CancelConference(childSession)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_24 = _a.sent();
                                                                reject(error_24);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                HangupConference: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var targetLabel, result, error_25;
                                                    var _a;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _b.trys.push([0, 2, , 3]);
                                                                targetLabel = (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
                                                                console.log(__TAG__ + "%c Conference Ended: " + targetLabel, "color: green; font-weight: bold;");
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.HangupConference(session)];
                                                            case 1:
                                                                result = _b.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_25 = _b.sent();
                                                                reject(error_25);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Handle audio device changes during a call
                                 * @param device - The new device object
                                 * @param deviceId - The ID of the new device
                                 * @param session - The active session
                                 * @returns Promise that resolves when device change is handled
                                 */
                                OnDeviceChange: function (device, deviceId, session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var IsAudio, IsVideo, deviceName, foundAudioInput, foundAudioOutput, foundVideoInput;
                                                    return __generator(this, function (_a) {
                                                        try {
                                                            console.log(__TAG__ + "OnDeviceChange: Device", device, deviceId, session);
                                                            // console.log(__TAG__ + "OnDeviceChange: Device", device, deviceId, session);
                                                            BrowserPhoneSipProvider.Core.OnDeviceChange(device, deviceId, session);
                                                            IsAudio = device === "audioinput" || device === "audiooutput";
                                                            IsVideo = device === "videoinput";
                                                            deviceName = "";
                                                            try {
                                                                if (IsAudio) {
                                                                    if (device == "audioinput") {
                                                                        foundAudioInput = window.phone.MyAudioinputDevices.find(function (d) { return d.deviceId === deviceId || d.label === deviceId; });
                                                                        deviceName = (foundAudioInput && foundAudioInput.label) || "";
                                                                        // If no device was found
                                                                        if (!deviceName) {
                                                                            console.log(__TAG__ + "OnDeviceChange: Trying to get Device Name: No audio input device found for deviceId", deviceId);
                                                                        }
                                                                    }
                                                                    else if (device == "audiooutput") {
                                                                        foundAudioOutput = window.phone.MySpeakerDevices.find(function (d) { return d.deviceId === deviceId || d.label === deviceId; });
                                                                        deviceName = (foundAudioOutput && foundAudioOutput.label) || "";
                                                                        // If no device was found
                                                                        if (!deviceName) {
                                                                            console.log(__TAG__ + "OnDeviceChange: Trying to get Device Name: No audio output device found for deviceId", deviceId);
                                                                        }
                                                                    }
                                                                }
                                                                if (IsVideo) {
                                                                    foundVideoInput = window.phone.MyVideoinputDevices.find(function (d) { return d.deviceId === deviceId || d.label === deviceId; });
                                                                    deviceName = (foundVideoInput && foundVideoInput.label) || "";
                                                                    if (!deviceName) {
                                                                        console.log(__TAG__ + "OnDeviceChange: Trying to get Device Name: No video input device found for deviceId", deviceId);
                                                                    }
                                                                }
                                                            }
                                                            catch (e) { }
                                                            // Add Event
                                                            BrowserPhoneSipProvider.PostMessage({
                                                                Event: SipProviderTypes_1.SipProviderPostMessage.OnDeviceChange,
                                                                Source: "SipProvider",
                                                                Destination: "Phone",
                                                                Data: {
                                                                    SessionId: session.Id,
                                                                    Device: device,
                                                                    DeviceId: deviceId,
                                                                    DeviceName: deviceName,
                                                                    IsAudio: IsAudio,
                                                                    IsVideo: IsVideo,
                                                                    Time: window.phone.TimeNow(),
                                                                }
                                                            });
                                                            console.log(__TAG__ + "OnDeviceChange: Adding Session Event", session.Id, device, deviceId, deviceName, IsAudio, IsVideo);
                                                            window.phone.AddSessionEvent(session.Id, {
                                                                Timestamp: window.phone.TimeNow(),
                                                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnDeviceChange,
                                                                Data: {
                                                                    SessionId: session.Id,
                                                                    Device: device,
                                                                    DeviceId: deviceId,
                                                                    DeviceName: deviceName,
                                                                    IsAudio: IsAudio,
                                                                    IsVideo: IsVideo,
                                                                    DisplayName: session === null || session === void 0 ? void 0 : session.DisplayName,
                                                                }
                                                            });
                                                            resolve();
                                                        }
                                                        catch (error) {
                                                            reject(error);
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                StartRecording: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var result, error_26;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.StartRecording(session)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_26 = _a.sent();
                                                                reject(error_26);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                StopRecording: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var result, error_27;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.StopRecording(session)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_27 = _a.sent();
                                                                reject(error_27);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Refresh the SIP registration with the server
                                 * @returns Promise that resolves when registration is refreshed
                                 */
                                RefreshRegistration: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var response, error_28;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.RefreshRegistration()];
                                                            case 1:
                                                                response = _a.sent();
                                                                resolve(response);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_28 = _a.sent();
                                                                reject(error_28);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                /**
                                 * Re-register with the SIP server
                                 * @param call - Call parameter (unused)
                                 */
                                ReRegister: function (call) { },
                                /**
                                 * Disconnect from the SIP server
                                 * @param call - Call parameter (unused)
                                 */
                                Disconnect: function (call) {
                                    BrowserPhoneSipProvider.SipProvider.UnRegister();
                                },
                                CaptureCalls: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(typeof BrowserPhoneSipProvider.Core.CaptureCalls === 'function')) return [3 /*break*/, 2];
                                                    try {
                                                        if (BrowserPhoneSipProvider.SessionManager.getAll().length > 0) {
                                                            window.phone.PlayBeep();
                                                        }
                                                    }
                                                    catch (e) {
                                                    }
                                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.CaptureCalls()];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                                CallReconnect: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (BrowserPhoneSipProvider.BusyCallReconnect == true) {
                                                        return [2 /*return*/];
                                                    }
                                                    BrowserPhoneSipProvider.BusyCallReconnect = true;
                                                    if (!(typeof BrowserPhoneSipProvider.Core.CallReconnect == 'function')) return [3 /*break*/, 2];
                                                    try {
                                                        if (BrowserPhoneSipProvider.SessionManager.getAll().length > 0) {
                                                            window.phone.PlayBeep();
                                                        }
                                                    }
                                                    catch (e) {
                                                    }
                                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.CallReconnect()];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2:
                                                    BrowserPhoneSipProvider.BusyCallReconnect = false;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                                DisconnectTransport: function () {
                                    if (typeof BrowserPhoneSipProvider.Core.DisconnectTransport == 'function') {
                                        BrowserPhoneSipProvider.Core.DisconnectTransport();
                                    }
                                },
                                GetSession: function (sessionId) {
                                    return BrowserPhoneSipProvider.SipProvider.GetSession(sessionId);
                                },
                                ToggleVideo: function (session, enabled) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var result, error_29;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.ToggleVideo(session, enabled)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_29 = _a.sent();
                                                                resolve({ Success: false, Reason: "Error toggling video: " + (error_29.message || "Unknown error") });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                PresentVideo: function (session, stream) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var result, error_30;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.PresentVideo(session, stream)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_30 = _a.sent();
                                                                resolve({ Success: false, Reason: "Error presenting video: " + (error_30.message || "Unknown error") });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                StopPresentingVideo: function (session) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var result, error_31;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.StopPresentingVideo(session)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_31 = _a.sent();
                                                                resolve({ Success: false, Reason: "Error stopping video presentation: " + (error_31.message || "Unknown error") });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    });
                                },
                                ReconnectTransport: function () {
                                    if (typeof BrowserPhoneSipProvider.Core.ReconnectTransport == 'function') {
                                        BrowserPhoneSipProvider.Core.ReconnectTransport();
                                    }
                                },
                                Settings: __assign({ Logging: true }, settings),
                            };
                            window.phone.SipProvider = providerComponent;
                            resolve(providerComponent);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    // -- Public API wrappers (Web) --
    //#region Web Public API wrappers
    BrowserPhoneSipProvider.AudioCall = function (contact, session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, incomingCallbacks, configuredAudioSrcId, requestedAudioInputDevice, response;
                        var _a, _b, _c, _d, _e, _f;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    Session = null;
                                    incomingCallbacks = (session === null || session === void 0 ? void 0 : session.Callbacks) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.Callbacks);
                                    configuredAudioSrcId = (_c = (_b = window.phone) === null || _b === void 0 ? void 0 : _b.Settings) === null || _c === void 0 ? void 0 : _c.AudioSrcId;
                                    requestedAudioInputDevice = (_d = session.AudioInputDevice) !== null && _d !== void 0 ? _d : configuredAudioSrcId;
                                    if (requestedAudioInputDevice != null) {
                                        session.AudioInputDevice = requestedAudioInputDevice;
                                        if ((_e = window.phone) === null || _e === void 0 ? void 0 : _e.Settings) {
                                            window.phone.Settings.AudioSrcId = requestedAudioInputDevice;
                                        }
                                    }
                                    BrowserPhoneSipProvider.UpdateSession(session.Id, __assign(__assign({}, (incomingCallbacks && { Callbacks: incomingCallbacks })), { AudioInputDevice: session.AudioInputDevice, Data: __assign(__assign({}, (incomingCallbacks && { Callbacks: incomingCallbacks })), { StartTime: window.phone.TimeNow(), Timer: 0, AudioInputDevice: session.AudioInputDevice }), Status: SipProviderTypes_1.CallStatus.StartingAudioCall }));
                                    Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.AudioCall(Session, contact)];
                                case 1:
                                    response = _g.sent();
                                    BrowserPhoneSipProvider.StartCallTimer(session.Id);
                                    resolve({
                                        Success: (_f = response === null || response === void 0 ? void 0 : response.Success) !== null && _f !== void 0 ? _f : true,
                                        Reason: (response === null || response === void 0 ? void 0 : response.Reason) || "Invite Sent",
                                        CallData: (response === null || response === void 0 ? void 0 : response.CallData) || BrowserPhoneSipProvider.SessionManager.get(session.Id),
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.VideoCall = function (contact, session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, configuredAudioSrcId, requestedAudioInputDevice, videoProperties, response;
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                        return __generator(this, function (_r) {
                            switch (_r.label) {
                                case 0:
                                    Session = null;
                                    Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    configuredAudioSrcId = (_b = (_a = window.phone) === null || _a === void 0 ? void 0 : _a.Settings) === null || _b === void 0 ? void 0 : _b.AudioSrcId;
                                    requestedAudioInputDevice = (_c = session.AudioInputDevice) !== null && _c !== void 0 ? _c : configuredAudioSrcId;
                                    if (requestedAudioInputDevice != null) {
                                        session.AudioInputDevice = requestedAudioInputDevice;
                                        if ((_d = window.phone) === null || _d === void 0 ? void 0 : _d.Settings) {
                                            window.phone.Settings.AudioSrcId = requestedAudioInputDevice;
                                        }
                                    }
                                    if (session.VideoInputDevice == null || session.VideoInputDevice == undefined) {
                                        session.VideoInputDevice = window.phone.Settings.VideoSrcId;
                                    }
                                    videoProperties = {
                                        VideoSrcId: session.VideoInputDevice,
                                        CaptureVideoHeight: (_f = (_e = window.phone.Settings) === null || _e === void 0 ? void 0 : _e.CaptureVideoHeight) !== null && _f !== void 0 ? _f : "",
                                        CaptureVideoFps: (_h = (_g = window.phone.Settings) === null || _g === void 0 ? void 0 : _g.CaptureVideoFps) !== null && _h !== void 0 ? _h : "",
                                        MirrorVideo: (_k = (_j = window.phone.Settings) === null || _j === void 0 ? void 0 : _j.MirrorVideo) !== null && _k !== void 0 ? _k : "rotateY(180deg)",
                                        CaptureVideoAspectRatio: (_m = (_l = window.phone.Settings) === null || _l === void 0 ? void 0 : _l.CaptureVideoAspectRatio) !== null && _m !== void 0 ? _m : "",
                                        MaxVideoBandwidth: (_p = (_o = window.phone.Settings) === null || _o === void 0 ? void 0 : _o.MaxVideoBandwidth) !== null && _p !== void 0 ? _p : "2048",
                                    };
                                    // #endregion Get Video Properties
                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                        View: SipProviderTypes_1.CallView.Extended,
                                        WithVideo: true,
                                        Data: {
                                            StartTime: window.phone.TimeNow(),
                                            Timer: 0,
                                            VideoProperties: videoProperties,
                                            AudioInputDevice: session.AudioInputDevice,
                                        },
                                        Status: SipProviderTypes_1.CallStatus.StartingVideoCall
                                    });
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.VideoCall(contact, Session)];
                                case 1:
                                    response = _r.sent();
                                    BrowserPhoneSipProvider.StartCallTimer(session.Id);
                                    resolve({
                                        Success: (_q = response === null || response === void 0 ? void 0 : response.Success) !== null && _q !== void 0 ? _q : true,
                                        Reason: (response === null || response === void 0 ? void 0 : response.Reason) || "Invite Sent",
                                        CallData: (response === null || response === void 0 ? void 0 : response.CallData) || BrowserPhoneSipProvider.SessionManager.get(session.Id),
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // ─── SIP Messaging ─────────────────────────────────────────────────────────
    BrowserPhoneSipProvider.SendMessage = function (buddy, contact, messageItem) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, (_b = (_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.SendMessage(buddy, contact, messageItem)) !== null && _b !== void 0 ? _b : Promise.resolve({ Success: false, Reason: "SipProvider not ready" })];
            });
        });
    };
    /**
     * Send a DELIVERED receipt for a received message.
     * Call this once the message has been displayed in the UI.
     * @param buddy - The buddy who sent the original message.
     * @param contact - The contact (endpoint) to send the receipt to.
     * @param messageId - The messageId from the received OnMessageReceived event.
     */
    BrowserPhoneSipProvider.MarkMessageDelivered = function (buddy, contact, messageId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.MarkMessageDelivered(buddy, contact, messageId))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send a READ receipt for a received message.
     * Call this once the user has actively read/viewed the message.
     * @param buddy - The buddy who sent the original message.
     * @param contact - The contact (endpoint) to send the receipt to.
     * @param messageId - The messageId from the received OnMessageReceived event.
     */
    BrowserPhoneSipProvider.MarkMessageRead = function (buddy, contact, messageId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.MarkMessageRead(buddy, contact, messageId))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Cancel a pending outbound message and mark it as failed.
     * Use when the consumer determines the message cannot be delivered.
     * Fires OnMessageFailed immediately and clears the internal send timeout.
     * No-op if the message is not pending (already confirmed or already failed).
     * @param buddy - The buddy the message was sent to.
     * @param contact - The contact (endpoint) the message was addressed to.
     * @param messageId - The messageId of the pending outbound message.
     */
    BrowserPhoneSipProvider.MarkMessageFailed = function (buddy, contact, messageId) {
        var _a;
        (_a = BrowserPhoneSipProvider.SipProvider) === null || _a === void 0 ? void 0 : _a.MarkMessageFailed(buddy, contact, messageId);
    };
    BrowserPhoneSipProvider.Cancel = function (session, reasonCode, reasonText) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, response, updatedData, key;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    try {
                                        window.phone.StopRingback();
                                    }
                                    catch (e) {
                                    }
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "Cancel Session", BrowserPhoneSipProvider.SessionManager.get(session.Id));
                                    Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.Cancel(Session, reasonCode, reasonText)];
                                case 1:
                                    response = _a.sent();
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "Cancel Response from Core: ", response);
                                    if (response.CallData) {
                                        updatedData = {};
                                        for (key in response.CallData) {
                                            updatedData[key] = response.CallData[key];
                                        }
                                        BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                            Data: updatedData
                                        });
                                    }
                                    resolve({
                                        Success: response === null || response === void 0 ? void 0 : response.Success,
                                        Reason: response === null || response === void 0 ? void 0 : response.Reason,
                                        CallData: response === null || response === void 0 ? void 0 : response.CallData,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.Answer = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, response;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    try {
                                        window.phone.StopRingtone();
                                    }
                                    catch (e) {
                                    }
                                    Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    if (!Session) {
                                        BrowserPhoneSipProvider.SessionManager.set(session);
                                        // console.log(__TAG__ + "❌ Answer: Session not found in SessionManager");
                                        resolve({ Success: false, Reason: "Session re-registered", CallData: {} });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.AnswerAudioCall(Session)];
                                case 1:
                                    response = _a.sent();
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            resolve({
                                                Success: response === null || response === void 0 ? void 0 : response.Success,
                                                Reason: response === null || response === void 0 ? void 0 : response.Reason,
                                                CallData: response === null || response === void 0 ? void 0 : response.CallData,
                                            });
                                            return [2 /*return*/];
                                        });
                                    }); }, 0);
                                    BrowserPhoneSipProvider.CallAnswered(session.Id);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.Hangup = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, _a, childId, childSession, response, e_18, response, e_19;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    window.phone.StopRingback(session.Id);
                                    if (!session.ConferenceChildren) return [3 /*break*/, 6];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "Hangup: Conference Children", session.ConferenceChildren);
                                    _i = 0, _a = session.ConferenceChildren;
                                    _c.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                                    childId = _a[_i];
                                    childSession = BrowserPhoneSipProvider.SessionManager.get(childId);
                                    if (!childSession) return [3 /*break*/, 5];
                                    _c.label = 2;
                                case 2:
                                    _c.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Hangup(childSession)];
                                case 3:
                                    response = _c.sent();
                                    if (response.Success == true) {
                                        BrowserPhoneSipProvider.RemoveSession(childId);
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_18 = _c.sent();
                                    console.warn(__TAG__ + "Hangup: Error hanging up child session", childId, e_18.message);
                                    BrowserPhoneSipProvider.RemoveSession(childId);
                                    return [3 /*break*/, 5];
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 6:
                                    _c.trys.push([6, 8, , 9]);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Hangup(session)];
                                case 7:
                                    response = _c.sent();
                                    resolve(response);
                                    return [3 /*break*/, 9];
                                case 8:
                                    e_19 = _c.sent();
                                    resolve({
                                        Success: false,
                                        Reason: "Call ended",
                                        CallData: (_b = BrowserPhoneSipProvider.SessionManager.get(session.Id)) === null || _b === void 0 ? void 0 : _b.Data,
                                    });
                                    return [3 /*break*/, 9];
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.Decline = function (session, reasonCode, reasonText) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, response, e_20;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    try {
                                        window.phone.StopRingtone();
                                    }
                                    catch (e) {
                                    }
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.RejectCall(Session, reasonCode, reasonText)];
                                case 2:
                                    response = _b.sent();
                                    resolve(response);
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_20 = _b.sent();
                                    resolve({
                                        Success: false,
                                        Reason: "Call ended",
                                        CallData: (_a = BrowserPhoneSipProvider.SessionManager.get(session.Id)) === null || _a === void 0 ? void 0 : _a.Data,
                                    });
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    //#endregion Web Public API wrappers
    BrowserPhoneSipProvider.Hold = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var holdResponse, e_21;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 4, , 5]);
                                    if (!(session.isOnMute == true)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.Unmute(session)];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2: return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Hold(BrowserPhoneSipProvider.SessionManager.get(session.Id))];
                                case 3:
                                    holdResponse = _b.sent();
                                    if (holdResponse.Success == true) {
                                        BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                            isOnHold: true
                                        });
                                    }
                                    window.phone.UpdateStage();
                                    resolve(holdResponse);
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_21 = _b.sent();
                                    resolve({
                                        Success: false,
                                        Reason: "Failed to hold call",
                                        CallData: (_a = BrowserPhoneSipProvider.SessionManager.get(session.Id)) === null || _a === void 0 ? void 0 : _a.Data,
                                    });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.Unhold = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var unholdResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Unhold(session)];
                                case 1:
                                    unholdResponse = _a.sent();
                                    if (unholdResponse.Success == true) {
                                        BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                            isOnHold: false,
                                            isOnMute: false
                                        });
                                    }
                                    resolve(unholdResponse);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.Mute = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var muteResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!((session === null || session === void 0 ? void 0 : session.isOnHold) == true)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.Unhold(session)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Mute(session)];
                                case 3:
                                    muteResponse = _a.sent();
                                    if (muteResponse.Success == true) {
                                        BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                            isOnMute: true
                                        });
                                        if (__DEBUG__)
                                            console.log("Mute -> Mute done", BrowserPhoneSipProvider.SessionManager.get(session.Id));
                                    }
                                    resolve(muteResponse);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.Unmute = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var unmuteResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.UnMute(session)];
                                case 1:
                                    unmuteResponse = _a.sent();
                                    if (unmuteResponse.Success == true) {
                                        BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                            isOnMute: false
                                        });
                                        if (__DEBUG__)
                                            console.log("Unmute -> Unmute done", BrowserPhoneSipProvider.SessionManager.get(session.Id));
                                    }
                                    resolve(unmuteResponse);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.AttendedTransfer = function (session, contact, targetSession) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = resolve;
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.AttendedTransfer(session, contact, targetSession)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.CompleteTransfer = function (childSession) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = resolve;
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.CompleteTransfer(childSession)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.BlindTransfer = function (currentBuddy, session, buddy, contact) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = resolve;
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.BlindTransfer(currentBuddy, session, contact)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.CallAnsweredElsewhere = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var session;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    if (!session) return [3 /*break*/, 3];
                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                        Status: SipProviderTypes_1.CallStatus.AnsweredElsewhere
                                    });
                                    return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(session.Id)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    resolve({
                                        Success: true,
                                        Reason: "Call Answered Elsewhere",
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // Web
    BrowserPhoneSipProvider.HangupAttendedTransfer = function (childSession) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var state, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    state = childSession.State;
                                    if (!(state === SipProviderTypes_1.CallState.Established)) return [3 /*break*/, 2];
                                    _a = resolve;
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Hangup(childSession)];
                                case 1:
                                    _a.apply(void 0, [_c.sent()]);
                                    return [3 /*break*/, 4];
                                case 2:
                                    _b = resolve;
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.Cancel(childSession)];
                                case 3:
                                    _b.apply(void 0, [_c.sent()]);
                                    _c.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.RefreshRegistration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.RefreshRegistration()];
                                case 1:
                                    _a.sent();
                                    resolve({
                                        Success: true,
                                        Reason: "Registration refreshed",
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // -- Timeouts and Health --
    //#region Timeouts and Health
    /**
     * Handle ringback timeout for incoming calls
     * @param SessionID - The session ID that timed out
     */
    BrowserPhoneSipProvider.OnRingbackTimeout = function (SessionID) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var sessionDND;
            return __generator(this, function (_c) {
                try {
                    if (__DEBUG__)
                        console.log(__TAG__ + "OnRingbackTimeout Timeout", SessionID);
                    sessionDND = BrowserPhoneSipProvider.SipProvider.GetSession(SessionID);
                    try {
                        window.phone.StopRingback(SessionID);
                    }
                    catch (e) { }
                    if (__DEBUG__)
                        console.log(__TAG__ + "RTPSession State", sessionDND.RTPSession.state);
                    sessionDND.Data.DateAndTime = window.phone.TimeNow();
                    sessionDND.Data.EndTime = window.phone.TimeNow();
                    sessionDND.Data.CallEnded = window.phone.TimeNow();
                    BrowserPhoneSipProvider.UpdateSession(sessionDND.Id, {
                        Data: {
                            TerminatedBy: 'us',
                            StartTime: window.phone.TimeNow(),
                            Duration: 0,
                            ReasonCode: 0,
                            ReasonText: 'Call Declined by Ringback Timeout',
                            Direction: 'inbound'
                        }
                    });
                    // });
                    this.AddCallActivity(SessionID, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: 'CallDeclinedByRingbackTimeout',
                        Data: {
                            SessionId: SessionID,
                            Time: window.phone.TimeNow(),
                            DisplayName: (_a = BrowserPhoneSipProvider.SessionManager.get(SessionID)) === null || _a === void 0 ? void 0 : _a.DisplayName,
                            BuddyId: (_b = BrowserPhoneSipProvider.SessionManager.get(SessionID)) === null || _b === void 0 ? void 0 : _b.BuddyId,
                            Direction: 'inbound',
                        }
                    });
                    try {
                        // await (window as any).phone.SipProvider.Decline(sessionDND, 487, 'Ringback Timeout');
                        BrowserPhoneSipProvider.Core.Decline(sessionDND, 487, 'Ringback Timeout');
                    }
                    catch (e) {
                        console.warn(__TAG__ + "OnRingbackTimeout Decline failed", e);
                    }
                    try {
                        BrowserPhoneSipProvider.RemoveSession(SessionID);
                    }
                    catch (e) {
                        console.warn(__TAG__ + "OnRingbackTimeout Remove Session failed", e);
                    }
                }
                catch (e) {
                    console.warn(__TAG__ + "OnRingbackTimeout Timeout failed", e);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Start periodic health checks for the SIP connection
     */
    BrowserPhoneSipProvider.StartHealthCheck = function () {
        try {
            var healthCheckInterval = setInterval(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e_22;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!navigator.onLine) return [3 /*break*/, 1];
                                return [2 /*return*/];
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, BrowserPhoneSipProvider.HealthCheck()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_22 = _a.sent();
                                return [3 /*break*/, 4];
                            case 4: 
                            // sleep for 1 second
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, BrowserPhoneSipProvider.HealthCheckInterval); })];
                            case 5:
                                // sleep for 1 second
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }, BrowserPhoneSipProvider.HealthCheckInterval);
            BrowserPhoneSipProvider.HealthCheckIntervalTimer = healthCheckInterval;
        }
        catch (e) {
        }
    };
    /**
     * Perform a health check on the SIP connection
     * @returns Promise that resolves to true if healthy, false otherwise
     */
    BrowserPhoneSipProvider.HealthCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, e_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        state = window.phone.SipProvider.Status;
                        if (window.phone.SipProvider.Status && typeof window.phone.SipProvider.Status == "string") {
                            state = window.phone.SipProvider.Status;
                        }
                        else if (window.phone.SipProvider.Status && typeof window.phone.SipProvider.Status == "object") {
                            state = window.phone.SipProvider.Status.Status;
                        }
                        if (!(state != "Registered" && state != "Registering")) return [3 /*break*/, 2];
                        return [4 /*yield*/, BrowserPhoneSipProvider.Core.RefreshRegistration()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, true];
                    case 3:
                        e_23 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //#endregion Timeouts and Health
    // -- Logging and Provider State --
    //#region Logging and Provider State
    /**
     * Add an activity event to a call session
     * @param sessionId - The session ID to add activity to
     * @param activity - The activity object containing timestamp and data
     */
    /**
     * Add an activity event to a call session
     * @param sessionId - The session ID to add activity to
     * @param activity - The activity object containing timestamp and data
     * @param skipEventStorage - If true, skip adding to session.Data.Events (used when called from SipProvider which already added it)
     */
    BrowserPhoneSipProvider.AddCallActivity = function (sessionId, activity, skipEventStorage) {
        var _a, _b, _c, _d, _e, _f;
        var hostSession = (_b = (_a = window.phone).GetSession) === null || _b === void 0 ? void 0 : _b.call(_a, sessionId);
        var managedSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
        if (!managedSession && hostSession) {
            BrowserPhoneSipProvider.SessionManager.set(hostSession);
            managedSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
        }
        var session = hostSession || managedSession;
        if (session) {
            var isStringActivity = typeof activity === "string";
            var hasExternalData = !isStringActivity && typeof activity === "object";
            var dataProvidedAsThirdArg = isStringActivity && skipEventStorage != null && typeof skipEventStorage === "object";
            var resolvedActivity = isStringActivity ? activity : ((activity === null || activity === void 0 ? void 0 : activity.Activity) || (activity === null || activity === void 0 ? void 0 : activity.activity));
            var resolvedData = dataProvidedAsThirdArg ? skipEventStorage : (hasExternalData ? ((_c = activity === null || activity === void 0 ? void 0 : activity.Data) !== null && _c !== void 0 ? _c : activity === null || activity === void 0 ? void 0 : activity.data) : undefined);
            var resolvedTimestamp = hasExternalData ? activity === null || activity === void 0 ? void 0 : activity.Timestamp : undefined;
            var skipStorage = dataProvidedAsThirdArg ? false : skipEventStorage === true;
            var Event = {
                Timestamp: resolvedTimestamp || window.phone.TimeNow(),
                Activity: resolvedActivity,
                Data: resolvedData,
            };
            /**
             * {Timestamp: "2026-01-26T08:23:06.670Z", Activity: "OnCallAnswered", Data: {SessionId: "2d9b8cf9-2d36-4953-83b0-b8dcee67318b", Time: "2026-01-26T08:23:06.670Z"}}
             */
            // Note:
            // We call this event multiple times to ensure we answer the incoming call. So we need to prevent duplicates events in the session.
            if (Event.Activity === "OnCallAnswered" || Event.Activity === "OnInviteSent") {
                var existingEvents = [];
                if (Array.isArray(hostSession === null || hostSession === void 0 ? void 0 : hostSession.Events)) {
                    existingEvents.push.apply(existingEvents, hostSession.Events);
                }
                if (Array.isArray(managedSession === null || managedSession === void 0 ? void 0 : managedSession.Events)) {
                    existingEvents.push.apply(existingEvents, managedSession.Events);
                }
                var hasDuplicate = existingEvents.some(function (existingEvent) { return (existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.Activity) === Event.Activity; });
                if (hasDuplicate) {
                    return;
                }
            }
            if (!skipStorage && managedSession) {
                var updatedEvents = __spreadArray(__spreadArray([], (managedSession.Events || []), true), [Event], false);
                var updatedDataEvents = __spreadArray(__spreadArray([], (((_d = managedSession.Data) === null || _d === void 0 ? void 0 : _d.Events) || []), true), [Event], false);
                // Keep SessionManager authoritative for Session.Events
                BrowserPhoneSipProvider.UpdateSession(sessionId, {
                    Events: updatedEvents,
                    Data: {
                        Events: updatedDataEvents
                    }
                });
            }
            try {
                (_f = (_e = window.phone).AddSessionEvent) === null || _f === void 0 ? void 0 : _f.call(_e, sessionId, Event);
            }
            catch (e) { }
            // // Check if event already exists to prevent duplicates
            // if (!skipEventStorage) {
            //   if (!session.Data.Events) {
            //     session.Data.Events = [];
            //   }
            //   // Check for duplicate events (same Activity and Timestamp within 100ms)
            //   const isDuplicate = session.Data.Events.some((existingEvent: any) => {
            //     const timeDiff = Math.abs(new Date(existingEvent.Timestamp).getTime() - new Date(Event.Timestamp).getTime());
            //     return existingEvent.Activity === Event.Activity && timeDiff < 100;
            //   });
            //   if (!isDuplicate) {
            //     const currentEvents = session.Data.Events || [];
            //     BrowserPhoneSipProvider.UpdateSession(sessionId, {
            //       Data: {
            //         Events: [...currentEvents, Event]
            //       }
            //     });
            //   } else {
            //     console.warn(__TAG__ + "AddCallActivity: Duplicate event detected, skipping", Event.Activity);
            //     return;
            //   }
            // } else {
            //   // Notify host, but keep our authoritative session to avoid losing accumulated Events
            //   try {
            //     (window as any).phone.AddSessionEvent?.(sessionId, Event);
            //   } catch (e) { }
            // }
            // var Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
            // if (Session) {
            //   if(!Session.Data.Events) {
            //     Session.Data.Events = [];
            //   }
            //   Session.Data.Events.push(Event);
            //   BrowserPhoneSipProvider.UpdateSession(Session);
            // }
            // // Render real-time events
            // if (!session.Events) {
            //   session.Events = [];
            // }
            // if (!session.Data.Events) {
            //   session.Data.Events = [];
            // }
            // session.Events.push({
            //   Timestamp: activity?.Timestamp || (window as any).phone.TimeNow(),
            //   Activity: activity.Activity,
            //   Data: activity?.Data,
            // });
            // session.Data.Events.push({
            //   Timestamp: activity?.Timestamp || (window as any).phone.TimeNow(),
            //   Activity: activity.Activity,
            //   Data: activity?.Data,
            // });
        }
        else {
        }
    };
    BrowserPhoneSipProvider.LogEvent = function (event, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (window.phone.SessionEventTypes[event]) {
                    window.phone.SipProvider.Events.push({
                        Timestamp: window.phone.TimeNow(),
                        Event: window.phone.SessionEventTypes[event],
                        Data: JSON.stringify(message)
                    });
                    if (event == "ReceivedCallInvite") {
                        window.phone.Toast("received call", " <" + message + ">", null, 'green');
                    }
                }
                else {
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Log transport-level SIP messages to SipProvider.TransportLogs
     * @param direction - The direction of the message (inbound/outbound)
     * @param message - The SIP message to log
     */
    BrowserPhoneSipProvider.LogTransportEvent = function (direction, message) {
        // Store in global SIP logs for transport-level messages
        if (!window.phone.SipProvider.TransportLogs) {
            window.phone.SipProvider.TransportLogs = [];
        }
        window.phone.SipProvider.TransportLogs.push(message);
    };
    /**
     * Update the provider status in the phone system
     * @param status - The new status string
     */
    BrowserPhoneSipProvider.UpdateProviderStatus = function (status) {
        window.phone.UpdateProviderStatus("sip", status);
    };
    //#endregion Logging and Provider State
    // -- RTP Metrics --
    //#region RTP Metrics
    BrowserPhoneSipProvider.UpdateSenderAudioLevel = function (sessionId, level) {
        window.phone.UpdateSessionSenderAudioLevel(sessionId, level);
    };
    BrowserPhoneSipProvider.UpdateReceiverAudioLevel = function (sessionId, level) {
        window.phone.UpdateSessionReceiverAudioLevel(sessionId, level);
    };
    //#endregion RTP Metrics
    /**
     * Update the status of a specific call session
     * @param session - The session to update
     * @param status - The new status string
     */
    BrowserPhoneSipProvider.UpdateCallStatus = function (session, status) {
        window.phone.UpdateCallStatus(session.Id, status);
    };
    // High-level call logs (intentionally user-facing).
    BrowserPhoneSipProvider.LogCallStarting = function (session, contact) {
        var _a;
        var display = (contact === null || contact === void 0 ? void 0 : contact.Number) || (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
        console.log(__TAG__ + "%c Starting call: " + display, "color: teal; font-weight: bold;");
    };
    BrowserPhoneSipProvider.LogCallTrying = function (session) {
        var _a;
        var display = (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
        console.log(__TAG__ + "%c Trying... " + display, "color: teal; font-weight: bold;");
    };
    BrowserPhoneSipProvider.LogCallRinging = function (session) {
        var _a;
        var display = (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
        console.log(__TAG__ + "%c Ringing... " + display, "color: teal; font-weight: bold;");
    };
    BrowserPhoneSipProvider.LogCallAccepted = function (session) {
        var _a;
        var display = (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
        console.log(__TAG__ + "%c Call accepted: " + display, "color: green; font-weight: bold;");
    };
    /**
     * Handle when a call becomes connected/established
     * @param sessionId - The session ID that connected
     */
    BrowserPhoneSipProvider.OnCallConnected = function (sessionId) {
        var _a;
        try {
            window.phone.OnCallConnected(sessionId);
        }
        catch (error) {
        }
        var currentSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
        if ((_a = currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data) === null || _a === void 0 ? void 0 : _a.OnCallConnectedComplete) {
            return;
        }
        currentSession.State = SipProviderTypes_1.CallState.Established;
        currentSession.Status = SipProviderTypes_1.CallStatus.CallInProgress;
        BrowserPhoneSipProvider.UpdateCallStatus(currentSession, currentSession.Status);
        BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
            Data: {
                CallStarted: window.phone.TimeNow(),
                OnCallConnectedComplete: true
            }
        });
        BrowserPhoneSipProvider.LogCallAccepted(currentSession);
        BrowserPhoneSipProvider.StartCallTimer(currentSession.Id);
        BrowserPhoneSipProvider.PostMessage({
            Event: SipProviderTypes_1.SipProviderPostMessage.OnCallConnected,
            Source: "SipProvider",
            Destination: "Phone",
            Data: {
                SessionId: currentSession.Id,
                Time: window.phone.TimeNow(),
                DisplayName: currentSession.DisplayName,
                BuddyId: currentSession.BuddyId,
                Direction: currentSession.Direction,
            }
        });
        window.phone.UpdateStage();
    };
    /**
     * Get a session object by its ID
     * @param sessionId - The session ID to find
     * @returns The session object or null if not found
     */
    BrowserPhoneSipProvider.GetSessionWithID = function (sessionId) {
        var retSession = null;
        if (window.phone.MyBuddies) {
            window.phone.MyBuddies.forEach(function (buddy) {
                var _a;
                (_a = buddy === null || buddy === void 0 ? void 0 : buddy.Sessions) === null || _a === void 0 ? void 0 : _a.forEach(function (s) {
                    if (s.Id === sessionId) {
                        retSession = s;
                    }
                });
            });
        }
        return retSession;
    };
    /**
     * Update RTP sender statistics for a session
     * @param sessionId - The session ID to update
     * @param stats - The RTP sender statistics
     */
    BrowserPhoneSipProvider.UpdateSenderStats = function (sessionId, stats) {
        try {
            var sessionUpdated = window.phone.UpdateSessionSenderStats(sessionId, stats);
            if (sessionUpdated && sessionUpdated.Id) {
                // Silent update — stats already pushed via phone.UpdateSessionSenderStats above.
                BrowserPhoneSipProvider.SessionManager.UpdateSession(sessionUpdated.Id, sessionUpdated);
            }
        }
        catch (e) {
        }
        // var session = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
        // if (!session) {
        //   console.log(__TAG__ + "UpdateSenderStats Session not found", sessionId);
        //   return;
        // }
        // if (!session.RtpSenderStats) {
        //   session.RtpSenderStats = [];
        // }
        // session.RtpSenderStats.push(stats);
        // session.Data.RtpSenderStats = session.RtpSenderStats;
        // BrowserPhoneSipProvider.UpdateSession(session);
    };
    /**
     * Update remote inbound RTP stream statistics for a session
     * @param sessionId - The session ID to update
     * @param stats - The remote inbound RTP statistics
     */
    BrowserPhoneSipProvider.UpdateRemoteInboundRtpStreamStats = function (sessionId, stats) {
        try {
            var sessionUpdated = window.phone.UpdateSessionRemoteInboundRtpStreamStats(sessionId, stats);
            if (sessionUpdated && sessionUpdated.Id) {
                // Silent update — stats already pushed via phone.UpdateSessionRemoteInboundRtpStreamStats above.
                BrowserPhoneSipProvider.SessionManager.UpdateSession(sessionUpdated.Id, sessionUpdated);
            }
        }
        catch (e) {
        }
    };
    /**
     * Update RTP receiver statistics for a session
     * @param sessionId - The session ID to update
     * @param stats - The RTP receiver statistics
     */
    BrowserPhoneSipProvider.UpdateReceiverStats = function (sessionId, stats) {
        try {
            var sessionUpdated = window.phone.UpdateSessionReceiverStats(sessionId, stats);
            if (sessionUpdated && sessionUpdated.Id) {
                // Silent update — stats already pushed via phone.UpdateSessionReceiverStats above.
                BrowserPhoneSipProvider.SessionManager.UpdateSession(sessionUpdated.Id, sessionUpdated);
            }
        }
        catch (e) {
        }
    };
    // -- 🔥 Incoming Call Handling --
    //#region Incoming Call Handling
    /**
     * Handle incoming calls from the SIP provider
     * IMPORTANT: This function is called by SipProvider and is waiting for a sessionID to be returned
     * @param callerDetails - Object containing caller ID, DID, UUID, and other call details
     * @returns The session ID for the incoming call
     */
    BrowserPhoneSipProvider.OnIncomingCall = function (callerDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var CallerID, DID, XUuid, InviteCallId, SessionID, WithVideo, autoDelete, BUDDY, session, exists, e_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CallerID = callerDetails.CallerID || "Unknown Caller";
                        DID = callerDetails.DID || callerDetails.InviteCallId || "Unknown";
                        XUuid = callerDetails === null || callerDetails === void 0 ? void 0 : callerDetails.XUuid;
                        InviteCallId = callerDetails === null || callerDetails === void 0 ? void 0 : callerDetails.InviteCallId;
                        SessionID = XUuid;
                        WithVideo = callerDetails === null || callerDetails === void 0 ? void 0 : callerDetails.WithVideo;
                        console.log("SipProvider: " + "[OnIncomingCall] %c Incoming Call <" + callerDetails.DID + " " + callerDetails.CallerID + ">" + (WithVideo ? " with video" : ""), "color: green; font-weight: bold;");
                        if (!XUuid) {
                            console.warn(__TAG__ + "OnIncomingCall: XUuid not found in incoming call");
                            return [2 /*return*/];
                        }
                        try {
                            window.phone.StartRingtone(SessionID);
                        }
                        catch (error) {
                        }
                        autoDelete = true;
                        if (typeof window.phone.Settings.AutoDeleteDefault == "boolean" && window.phone.Settings.AutoDeleteDefault) {
                            autoDelete = window.phone.Settings.AutoDeleteDefault;
                        }
                        BUDDY = {
                            DisplayName: CallerID,
                            Sessions: [],
                            Avatar: window.phone.RandomAvatar(),
                            DateCreated: window.phone.TimeNow(),
                            Contacts: [{
                                    Number: DID,
                                    Provider: 'sip'
                                }],
                            Id: callerDetails.XUuid || window.phone.UID(),
                            LastActivity: window.phone.TimeNow(),
                            AutoDelete: autoDelete,
                            EnableDuringDnd: false
                        };
                        session = {
                            Id: SessionID,
                            Provider: 'sip',
                            View: SipProviderTypes_1.CallView.Extended,
                            Direction: 'inbound',
                            Status: SipProviderTypes_1.CallStatus.Incoming,
                            State: SipProviderTypes_1.CallState.Establishing,
                            IsOnHold: false,
                            isOnMute: false,
                            Timer: 0,
                            WithVideo: WithVideo || false
                        };
                        exists = window.phone.GetBuddyByContact(DID);
                        if (!exists) return [3 /*break*/, 1];
                        if (!exists.Sessions) {
                            exists.Sessions = [];
                        }
                        BUDDY = exists;
                        return [3 /*break*/, 6];
                    case 1:
                        window.phone.MyBuddies.push(BUDDY);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, window.phone.SaveBuddy(BUDDY.Id, BUDDY)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_24 = _a.sent();
                        console.log(__TAG__ + "OnIncomingCall SaveBuddy Error", e_24);
                        return [3 /*break*/, 5];
                    case 5:
                        window.phone.UpdateBuddyList();
                        window.phone.UpdateStage();
                        window.phone.UpdateUI();
                        _a.label = 6;
                    case 6:
                        if (!BUDDY.Sessions) {
                            BUDDY.Sessions = [];
                        }
                        session.BuddyId = BUDDY.Id;
                        BUDDY.Sessions.push(session);
                        session.Data = {
                            ToName: window.phone.Settings.ProfileUserName || "",
                            ToNumber: "Unknown check connections",
                            Direction: 'inbound',
                            StartTime: window.phone.TimeNow(),
                            From: CallerID,
                            To: DID,
                            FromName: CallerID,
                            FromNumber: DID,
                            WithVideo: WithVideo || false,
                            Events: [],
                        };
                        if (BrowserPhoneSipProvider.SessionManager.get(session.Id) == null || BrowserPhoneSipProvider.SessionManager.get(session.Id) == undefined) {
                            BrowserPhoneSipProvider.SessionManager.set(session);
                        }
                        else {
                            BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                Events: [],
                                BuddyId: BUDDY.Id,
                                ToName: window.phone.Settings.ProfileUserName || "",
                                ToNumber: "Unknown check connections",
                                Direction: 'inbound',
                                StartTime: window.phone.TimeNow(),
                                From: CallerID,
                                To: DID,
                                View: SipProviderTypes_1.CallView.Extended,
                                WithVideo: WithVideo || false,
                                Data: {
                                    ToName: window.phone.Settings.ProfileUserName || "",
                                    ToNumber: "Unknown check connections",
                                    Direction: 'inbound',
                                    StartTime: window.phone.TimeNow(),
                                    From: CallerID,
                                    To: DID,
                                    FromName: CallerID,
                                    FromNumber: DID,
                                    WithVideo: WithVideo || false,
                                    Events: [],
                                }
                            });
                        }
                        try {
                            window.phone.AddSessionEvent(session.Id, {
                                Timestamp: window.phone.TimeNow(),
                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnInviteReceived,
                                Data: {
                                    SessionId: session.Id,
                                    Time: window.phone.TimeNow(),
                                    BuddyId: BUDDY.Id,
                                    DisplayName: session.DisplayName,
                                    Direction: 'inbound',
                                    From: CallerID,
                                    To: DID,
                                    WithVideo: WithVideo || false,
                                }
                            });
                        }
                        catch (e) {
                            console.warn(__TAG__ + "OnIncomingCall AddSessionEvent Error", e.message);
                        }
                        if (WithVideo) {
                            BrowserPhoneSipProvider.AddCallActivity(session.Id, {
                                Timestamp: window.phone.TimeNow(),
                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnIncomingVideoCall,
                                Data: {
                                    SessionId: session.Id,
                                    Time: window.phone.TimeNow(),
                                    DisplayName: session.DisplayName,
                                    BuddyId: BUDDY.Id,
                                    CallerId: CallerID,
                                    DID: DID,
                                    Direction: "inbound",
                                    WithVideo: true,
                                }
                            });
                            BrowserPhoneSipProvider.PostMessage({
                                Event: SipProviderTypes_1.SipProviderPostMessage.OnIncomingVideoCall,
                                Source: "SipProvider",
                                Destination: "Phone",
                                Data: {
                                    SessionId: session.Id,
                                    Time: window.phone.TimeNow(),
                                    BuddyId: BUDDY.Id,
                                    CallerId: CallerID,
                                    DID: DID,
                                    Direction: "inbound",
                                    WithVideo: true,
                                }
                            });
                        }
                        window.phone.UpdateBuddyList();
                        window.phone.UpdateStage();
                        window.phone.UpdateUI();
                        return [2 /*return*/, {
                                CallId: SessionID,
                                BuddyId: BUDDY.Id,
                                SessionId: session,
                                BuddyDisplayName: BUDDY.DisplayName,
                                ToName: window.phone.Settings.ProfileUserName || "",
                                ToNumber: "Unknown check connections",
                            }];
                }
            });
        });
    };
    //#endregion Incoming Call Handling
    // -- Session Ending Handlers --
    //#region Session Ending Handlers
    /**
     * Handle when a session receives a BYE message (call ended by remote party)
     * @param sessionId - The session ID that received BYE
     * @param callData - Additional call data from the BYE message
     */
    BrowserPhoneSipProvider.OnSessionReceivedBye = function (sessionId, callData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, displayName, teardownError_3, isChildSession, ParentId, childCDR, parentSessionForCdrs, parentCDRS, parentCdrIds, parentSession, e_25, childSessionId_1, teardownError_4, e_26;
                        var _this = this;
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        return __generator(this, function (_o) {
                            switch (_o.label) {
                                case 0:
                                    _o.trys.push([0, 25, , 26]);
                                    Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                                    if (!Session) {
                                        console.warn(__TAG__ + "OnSessionReceivedBye: Session not found", sessionId);
                                        resolve();
                                        return [2 /*return*/];
                                    }
                                    displayName = (Session === null || Session === void 0 ? void 0 : Session.DisplayName) || ((_a = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
                                    console.log(__TAG__ + "%c Session Ended (BYE): " + displayName, "color: green; font-weight: bold;");
                                    if (!(((_b = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _b === void 0 ? void 0 : _b.ProviderCompleted) || ((_c = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _c === void 0 ? void 0 : _c.SipHandlerCompleted))) return [3 /*break*/, 6];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "OnSessionReceivedBye: Session is already completed", Session);
                                    _o.label = 1;
                                case 1:
                                    _o.trys.push([1, 4, , 5]);
                                    if (!((_d = BrowserPhoneSipProvider.SipProvider) === null || _d === void 0 ? void 0 : _d.TeardownSession)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.TeardownSession(sessionId)];
                                case 2:
                                    _o.sent();
                                    if (__DEBUG__) {
                                        console.log(__TAG__ + "OnSessionReceivedBye: Teardown complete (completed session)", sessionId);
                                    }
                                    _o.label = 3;
                                case 3: return [3 /*break*/, 5];
                                case 4:
                                    teardownError_3 = _o.sent();
                                    console.warn(__TAG__ + "OnSessionReceivedBye: Teardown failed (completed session)", (teardownError_3 === null || teardownError_3 === void 0 ? void 0 : teardownError_3.message) || teardownError_3);
                                    return [3 /*break*/, 5];
                                case 5:
                                    BrowserPhoneSipProvider.StopSessionLocalMedia(sessionId);
                                    resolve();
                                    return [2 /*return*/];
                                case 6:
                                    isChildSession = Session.ParentSessionId != null && (Session === null || Session === void 0 ? void 0 : Session.ParentSessionId) != undefined;
                                    ParentId = Session.ParentSessionId;
                                    if (!isChildSession) return [3 /*break*/, 17];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c OnSessionReceivedBye: Child Session of Conference Call", "color: blue; font-weight: bold;", Session);
                                    if (!(Session.ConferenceCall || Session.AttemptingConferenceCall)) return [3 /*break*/, 8];
                                    // console log with color
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c OnSessionReceivedBye: Child Session of Conference Call", "color: blue; font-weight: bold;", Session.ConferenceCall);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.HandleParticipantLeftConferenceCall(BrowserPhoneSipProvider.SessionManager.get(Session.Id))];
                                case 7:
                                    _o.sent();
                                    return [3 /*break*/, 16];
                                case 8:
                                    if (!(Session.AttendedTransferCall || ((_e = Session.Data) === null || _e === void 0 ? void 0 : _e.AttendedTransferCall) || ((_f = Session.Data) === null || _f === void 0 ? void 0 : _f.ChildAttendedTransferCall) == true || (Session === null || Session === void 0 ? void 0 : Session.ChildAttendedTransferCall) == true)) return [3 /*break*/, 15];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c OnSessionReceivedBye: Child Session ( " + Session.DisplayName + ") of Attended Transfer ( " + (((_g = BrowserPhoneSipProvider.SessionManager.get(Session.ParentSessionId)) === null || _g === void 0 ? void 0 : _g.DisplayName) || "Unknown") + ")", "color: blue; font-weight: bold;", Session.AttendedTransferCall || ((_h = Session.Data) === null || _h === void 0 ? void 0 : _h.AttendedTransferCall) || ((_j = Session.Data) === null || _j === void 0 ? void 0 : _j.ChildAttendedTransferCall) || (Session === null || Session === void 0 ? void 0 : Session.ChildAttendedTransferCall));
                                    return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(Session.Id)];
                                case 9:
                                    childCDR = _o.sent();
                                    parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(ParentId);
                                    parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                                    parentCdrIds = ((_k = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _k === void 0 ? void 0 : _k.CDRs) || [];
                                    if (childCDR === null || childCDR === void 0 ? void 0 : childCDR.Id) {
                                        if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR.Id; })) {
                                            parentCDRS.push({ CDRId: childCDR.Id });
                                        }
                                        if (!parentCdrIds.includes(childCDR.Id)) {
                                            parentCdrIds.push(childCDR.Id);
                                        }
                                    }
                                    // Reset CDRs and attended transfer state on parent in one call
                                    BrowserPhoneSipProvider.UpdateSession(ParentId, {
                                        CDRs: parentCDRS,
                                        AttendedTransferCall: null,
                                        Data: {
                                            CDRs: parentCdrIds,
                                            AttendedTransferCall: null,
                                            MakeAttendedCallActionComplete: false
                                        }
                                    });
                                    BrowserPhoneSipProvider.SipProvider.UpdateSession(ParentId, {
                                        CDRs: parentCDRS,
                                        Data: {
                                            CDRs: parentCdrIds
                                        }
                                    });
                                    try {
                                        BrowserPhoneSipProvider.SipProvider.UpdateSession(ParentId, {
                                            AttendedTransferCall: null,
                                            Data: {
                                                AttendedTransferCall: null,
                                                MakeAttendedCallActionComplete: false
                                            }
                                        });
                                    }
                                    catch (e) {
                                    }
                                    _o.label = 10;
                                case 10:
                                    _o.trys.push([10, 13, , 14]);
                                    parentSession = BrowserPhoneSipProvider.SessionManager.get(ParentId);
                                    if (!(((_l = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _l === void 0 ? void 0 : _l.OnHold) || (parentSession === null || parentSession === void 0 ? void 0 : parentSession.isOnHold))) return [3 /*break*/, 12];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.Unhold(parentSession)];
                                case 11:
                                    _o.sent();
                                    _o.label = 12;
                                case 12: return [3 /*break*/, 14];
                                case 13:
                                    e_25 = _o.sent();
                                    return [3 /*break*/, 14];
                                case 14:
                                    childSessionId_1 = Session.Id;
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var e_27;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 3, , 4]);
                                                    if (!childSessionId_1) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(childSessionId_1)];
                                                case 1:
                                                    _a.sent();
                                                    return [3 /*break*/, 2];
                                                case 2: return [3 /*break*/, 4];
                                                case 3:
                                                    e_27 = _a.sent();
                                                    console.warn(__TAG__ + "OnSessionReceivedBye RemoveSession for Child Session failed", e_27.message);
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 1500);
                                    return [3 /*break*/, 16];
                                case 15:
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c OnSessionReceivedBye: Child Session of Unknown", "color: blue; font-weight: bold;", Session.Id);
                                    _o.label = 16;
                                case 16: return [3 /*break*/, 24];
                                case 17:
                                    _o.trys.push([17, 20, , 21]);
                                    if (!((_m = BrowserPhoneSipProvider.SipProvider) === null || _m === void 0 ? void 0 : _m.TeardownSession)) return [3 /*break*/, 19];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.TeardownSession(sessionId)];
                                case 18:
                                    _o.sent();
                                    if (__DEBUG__) {
                                        console.log(__TAG__ + "OnSessionReceivedBye: Teardown complete", sessionId);
                                    }
                                    _o.label = 19;
                                case 19: return [3 /*break*/, 21];
                                case 20:
                                    teardownError_4 = _o.sent();
                                    console.warn(__TAG__ + "OnSessionReceivedBye: Teardown failed", (teardownError_4 === null || teardownError_4 === void 0 ? void 0 : teardownError_4.message) || teardownError_4);
                                    return [3 /*break*/, 21];
                                case 21:
                                    BrowserPhoneSipProvider.StopSessionLocalMedia(sessionId);
                                    BrowserPhoneSipProvider.UpdateSession(sessionId, {
                                        State: SipProviderTypes_1.CallState.Terminated,
                                    });
                                    return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(sessionId)];
                                case 22:
                                    _o.sent();
                                    return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(sessionId)];
                                case 23:
                                    _o.sent();
                                    _o.label = 24;
                                case 24:
                                    resolve();
                                    return [3 /*break*/, 26];
                                case 25:
                                    e_26 = _o.sent();
                                    reject(e_26);
                                    return [3 /*break*/, 26];
                                case 26: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Handle when a call invite is rejected by the remote party
     * @param sessionId - The session ID that was rejected
     * @param callData - Additional data about the rejection
     */
    BrowserPhoneSipProvider.CallInviteRejected = function (sessionId, callData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, _rejReasonCode, _rejTerminatedBy, _rejDisposition, displayLabel, Event, CallInviteRejectedSession, isChildSession, ParentSession, childCDR, parentSessionForCdrs, parentCDRS, parentCdrIds, parentSession, e_28, e_29;
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
                        return __generator(this, function (_0) {
                            switch (_0.label) {
                                case 0:
                                    // Stop ringback
                                    try {
                                        window.phone.StopRingback();
                                        window.phone.StopRingtone();
                                    }
                                    catch (e) {
                                    }
                                    Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                                    if (!Session) {
                                        console.warn(__TAG__ + "CallInviteRejected Session not found", sessionId);
                                        return [2 /*return*/];
                                    }
                                    if (((_a = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _a === void 0 ? void 0 : _a.ProviderCompleted) || (Session === null || Session === void 0 ? void 0 : Session.Data.UserInitiated)) {
                                        resolve();
                                        return [2 /*return*/];
                                    }
                                    _rejReasonCode = (callData === null || callData === void 0 ? void 0 : callData.ReasonCode) || ((_b = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _b === void 0 ? void 0 : _b.ReasonCode);
                                    _rejTerminatedBy = ((callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) || ((_c = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _c === void 0 ? void 0 : _c.TerminatedBy) || '').toLowerCase();
                                    if (_rejTerminatedBy === 'us') {
                                        // We declined the inbound call
                                        _rejDisposition = SipProviderTypes_1.Dispositions.CallRejected;
                                    }
                                    else if (_rejReasonCode === 486 || _rejReasonCode === 600) {
                                        // Remote was busy
                                        _rejDisposition = SipProviderTypes_1.Dispositions.BusyHere;
                                    }
                                    else if (typeof _rejReasonCode === 'number' && _rejReasonCode >= 500 && _rejReasonCode < 600) {
                                        // Server / infrastructure failure (5xx)
                                        _rejDisposition = SipProviderTypes_1.Dispositions.CallFailed;
                                    }
                                    else {
                                        // Remote rejected for any other reason (404, 480, 603, etc.)
                                        _rejDisposition = SipProviderTypes_1.Dispositions.CallRejected;
                                    }
                                    // Update the session with the rejection data and mark ProviderCompleted to prevent duplicate CDR creation
                                    BrowserPhoneSipProvider.UpdateSession(sessionId, {
                                        State: SipProviderTypes_1.CallState.Terminated,
                                        TerminatedBy: (callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) || ((_d = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _d === void 0 ? void 0 : _d.TerminatedBy),
                                        ReasonCode: (callData === null || callData === void 0 ? void 0 : callData.ReasonCode) || ((_e = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _e === void 0 ? void 0 : _e.ReasonCode),
                                        ReasonText: (callData === null || callData === void 0 ? void 0 : callData.ReasonText) || ((_f = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _f === void 0 ? void 0 : _f.ReasonText),
                                        CallEnded: (callData === null || callData === void 0 ? void 0 : callData.CallEnded) || ((_g = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _g === void 0 ? void 0 : _g.CallEnded),
                                        Data: {
                                            TerminatedBy: (callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) || ((_h = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _h === void 0 ? void 0 : _h.TerminatedBy),
                                            ReasonCode: (callData === null || callData === void 0 ? void 0 : callData.ReasonCode) || ((_j = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _j === void 0 ? void 0 : _j.ReasonCode),
                                            ReasonText: (callData === null || callData === void 0 ? void 0 : callData.ReasonText) || ((_k = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _k === void 0 ? void 0 : _k.ReasonText),
                                            CallEnded: (callData === null || callData === void 0 ? void 0 : callData.CallEnded) || ((_l = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _l === void 0 ? void 0 : _l.CallEnded),
                                            Disposition: _rejDisposition,
                                            ProviderCompleted: true
                                        }
                                    });
                                    displayLabel = (Session === null || Session === void 0 ? void 0 : Session.DisplayName) || ((_m = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _m === void 0 ? void 0 : _m.ToNumber) || ((_o = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _o === void 0 ? void 0 : _o.To) || sessionId;
                                    console.log(__TAG__ +
                                        "%c Call with " + displayLabel + " was rejected with reason " + (callData.ReasonText || callData.Data.ReasonText || callData.ReasonPhrase || callData.Data.ReasonPhrase), "color: green; font-weight: bold;");
                                    Event = SipProviderTypes_1.SipProviderPostMessage.OnInviteRejected;
                                    if (callData.TerminatedBy.toLowerCase() == "us") {
                                        Event = SipProviderTypes_1.SipProviderPostMessage.OnInviteRejectedByUs;
                                    }
                                    else if (typeof _rejReasonCode === 'number' && _rejReasonCode >= 500 && _rejReasonCode < 600) {
                                        Event = SipProviderTypes_1.SipProviderPostMessage.OnCallFailed;
                                    }
                                    else {
                                        Event = SipProviderTypes_1.SipProviderPostMessage.OnInviteRejectedByThem;
                                    }
                                    // Add event to the session that the call was rejected
                                    window.phone.AddSessionEvent(sessionId, {
                                        Timestamp: window.phone.TimeNow(),
                                        Activity: Event,
                                        Data: {
                                            SessionId: sessionId,
                                            Time: window.phone.TimeNow(),
                                            DisplayName: Session === null || Session === void 0 ? void 0 : Session.DisplayName,
                                            BuddyId: Session === null || Session === void 0 ? void 0 : Session.BuddyId,
                                            Direction: Session === null || Session === void 0 ? void 0 : Session.Direction,
                                            FromName: (callData === null || callData === void 0 ? void 0 : callData.FromName) || ((_p = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _p === void 0 ? void 0 : _p.FromName) || "",
                                            FromNumber: (callData === null || callData === void 0 ? void 0 : callData.FromNumber) || ((_q = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _q === void 0 ? void 0 : _q.FromNumber) || "",
                                            UserAgent: (callData === null || callData === void 0 ? void 0 : callData.UserAgent) || ((_r = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _r === void 0 ? void 0 : _r.UserAgent) || "",
                                            ReasonCode: (callData === null || callData === void 0 ? void 0 : callData.ReasonCode) || ((_s = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _s === void 0 ? void 0 : _s.ReasonCode),
                                            ReasonText: (callData === null || callData === void 0 ? void 0 : callData.ReasonText) || ((_t = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _t === void 0 ? void 0 : _t.ReasonText),
                                            TerminatedBy: (callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) || ((_u = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _u === void 0 ? void 0 : _u.TerminatedBy),
                                        }
                                    });
                                    CallInviteRejectedSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                                    isChildSession = (CallInviteRejectedSession === null || CallInviteRejectedSession === void 0 ? void 0 : CallInviteRejectedSession.ParentSessionId) != null && (CallInviteRejectedSession === null || CallInviteRejectedSession === void 0 ? void 0 : CallInviteRejectedSession.ParentSessionId) != undefined;
                                    if (!isChildSession) return [3 /*break*/, 11];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c CallInviteRejected: Handling child session of conference call or attended transfer", "color: blue; font-weight: bold;", CallInviteRejectedSession.DisplayName);
                                    if (!(CallInviteRejectedSession.ConferenceCall || CallInviteRejectedSession.AttemptingConferenceCall)) return [3 /*break*/, 2];
                                    // This is a child session of a conference call
                                    // Add event that the participant has left the conference
                                    window.phone.AddSessionEvent(CallInviteRejectedSession.Id, {
                                        Timestamp: window.phone.TimeNow(),
                                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnConferenceCallRejected,
                                        Data: {
                                            SessionId: CallInviteRejectedSession.Id,
                                            DisplayName: CallInviteRejectedSession.DisplayName,
                                            ConferenceOwnerSessionId: CallInviteRejectedSession.ParentSessionId,
                                            Time: window.phone.TimeNow(),
                                        }
                                    });
                                    BrowserPhoneSipProvider.UpdateSession(CallInviteRejectedSession.Id, {
                                        EarlyConferenceCallRejected: true
                                    });
                                    ParentSession = BrowserPhoneSipProvider.SessionManager.get(CallInviteRejectedSession.ParentSessionId);
                                    if (ParentSession) {
                                        // Add event that the participant has rejected the conference call
                                        window.phone.AddSessionEvent(ParentSession.Id, {
                                            Timestamp: window.phone.TimeNow(),
                                            Activity: SipProviderTypes_1.SipProviderPostMessage.OnConferenceCallRejected,
                                            Data: {
                                                SessionId: ParentSession.Id,
                                                DisplayName: ParentSession.DisplayName,
                                                ParticipantSessionId: CallInviteRejectedSession.Id,
                                                ParticipantDisplayName: CallInviteRejectedSession.DisplayName,
                                                Time: window.phone.TimeNow(),
                                            }
                                        });
                                    }
                                    return [4 /*yield*/, BrowserPhoneSipProvider.HandleParticipantLeftConferenceCall(BrowserPhoneSipProvider.SessionManager.get(CallInviteRejectedSession.Id))];
                                case 1:
                                    _0.sent();
                                    resolve();
                                    return [2 /*return*/];
                                case 2:
                                    if (!(CallInviteRejectedSession.AttendedTransferCall || ((_v = CallInviteRejectedSession.Data) === null || _v === void 0 ? void 0 : _v.AttendedTransferCall) || ((_w = CallInviteRejectedSession.Data) === null || _w === void 0 ? void 0 : _w.ChildAttendedTransferCall) || (CallInviteRejectedSession === null || CallInviteRejectedSession === void 0 ? void 0 : CallInviteRejectedSession.ChildAttendedTransferCall) == true)) return [3 /*break*/, 11];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c CallInviteRejected: Handling child session of attended transfer", "color: blue; font-weight: bold;", CallInviteRejectedSession.DisplayName);
                                    if (!CallInviteRejectedSession.ParentSessionId) return [3 /*break*/, 10];
                                    // Add Event
                                    window.phone.AddSessionEvent(CallInviteRejectedSession.ParentSessionId, {
                                        Timestamp: window.phone.TimeNow(),
                                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnCancelAttendedTransfer,
                                        Data: {
                                            SessionId: CallInviteRejectedSession.ParentSessionId,
                                            Time: window.phone.TimeNow(),
                                            DisplayName: (_x = BrowserPhoneSipProvider.SessionManager.get(CallInviteRejectedSession.ParentSessionId)) === null || _x === void 0 ? void 0 : _x.DisplayName,
                                            AttendeeSessionId: CallInviteRejectedSession.Id,
                                            AttendeeDisplayName: CallInviteRejectedSession.DisplayName,
                                            RejectedByUs: Event === SipProviderTypes_1.SipProviderPostMessage.OnInviteRejectedByUs,
                                        }
                                    });
                                    return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(CallInviteRejectedSession.Id)];
                                case 3:
                                    childCDR = _0.sent();
                                    if (childCDR) {
                                        parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(CallInviteRejectedSession.ParentSessionId);
                                        parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                                        parentCdrIds = ((_y = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _y === void 0 ? void 0 : _y.CDRs) || [];
                                        if (childCDR === null || childCDR === void 0 ? void 0 : childCDR.Id) {
                                            if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR.Id; })) {
                                                parentCDRS.push({ CDRId: childCDR.Id });
                                            }
                                            if (!parentCdrIds.includes(childCDR.Id)) {
                                                parentCdrIds.push(childCDR.Id);
                                            }
                                        }
                                        BrowserPhoneSipProvider.UpdateSession(CallInviteRejectedSession.ParentSessionId, {
                                            CDRs: parentCDRS,
                                            Data: {
                                                CDRs: parentCdrIds
                                            }
                                        });
                                    }
                                    // Remove the child session
                                    return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(CallInviteRejectedSession.Id)];
                                case 4:
                                    // Remove the child session
                                    _0.sent();
                                    // Reset the parent session AttendedTransferCall
                                    BrowserPhoneSipProvider.UpdateSession(CallInviteRejectedSession.ParentSessionId, {
                                        AttendedTransferCall: null,
                                        Data: {
                                            MakeAttendedCallActionComplete: false
                                        }
                                    });
                                    try {
                                        BrowserPhoneSipProvider.SipProvider.UpdateSession(CallInviteRejectedSession.ParentSessionId, {
                                            AttendedTransferCall: null,
                                            Data: {
                                                MakeAttendedCallActionComplete: false
                                            }
                                        });
                                    }
                                    catch (e) {
                                    }
                                    _0.label = 5;
                                case 5:
                                    _0.trys.push([5, 8, , 9]);
                                    parentSession = BrowserPhoneSipProvider.SessionManager.get(CallInviteRejectedSession.ParentSessionId);
                                    if (!(((_z = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _z === void 0 ? void 0 : _z.OnHold) || (parentSession === null || parentSession === void 0 ? void 0 : parentSession.isOnHold))) return [3 /*break*/, 7];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.Unhold(parentSession)];
                                case 6:
                                    _0.sent();
                                    _0.label = 7;
                                case 7: return [3 /*break*/, 9];
                                case 8:
                                    e_28 = _0.sent();
                                    return [3 /*break*/, 9];
                                case 9:
                                    resolve();
                                    return [2 /*return*/];
                                case 10: return [3 /*break*/, 11];
                                case 11:
                                    _0.trys.push([11, 13, , 14]);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(sessionId)];
                                case 12:
                                    _0.sent();
                                    return [3 /*break*/, 14];
                                case 13:
                                    e_29 = _0.sent();
                                    console.warn(__TAG__ + "CallInviteRejected BuildAndAddCDRMessage for Session failed", e_29);
                                    return [3 /*break*/, 14];
                                case 14: return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(sessionId)];
                                case 15:
                                    _0.sent();
                                    try {
                                        window.phone.UpdateStage();
                                    }
                                    catch (e) {
                                        console.warn(__TAG__ + "CallInviteRejected UpdateBuddyList, UpdateStage, UpdateUI failed", e);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    //#endregion Session Ending Handlers
    /**
     * Handle when a call is cancelled before being answered
     * @param sessionId - The session ID that was cancelled
     * @param callData - Additional data about the cancellation
     */
    BrowserPhoneSipProvider.CallCancelled = function (sessionId, callData) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var Session, e_30, currentSession, updatedData, key, Event, teardownError_5, e_31, e_32;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        Session = null;
                        try {
                            window.phone.StopRingtone();
                        }
                        catch (e) {
                            console.warn(__TAG__ + "CallCancelled Session not found", sessionId);
                        }
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 2, , 4]);
                        Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                        return [3 /*break*/, 4];
                    case 2:
                        e_30 = _g.sent();
                        console.warn(__TAG__ + "CallCancelled Session not found", sessionId);
                        return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(sessionId)];
                    case 3:
                        _g.sent();
                        return [2 /*return*/];
                    case 4:
                        if (((_a = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _a === void 0 ? void 0 : _a.ProviderCompleted) || ((_b = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _b === void 0 ? void 0 : _b.SipHandlerCompleted)) {
                            if (__DEBUG__)
                                console.log(__TAG__ + "CallCancelled Session is completed already");
                            // alert(__TAG__ + "BP CallCancelled Session is completed already" + JSON.stringify(Session.Data.ProviderCompleted));
                            return [2 /*return*/];
                        }
                        // alert(__TAG__ + "BP CallCanclled called" + JSON.stringify(Session));
                        if (callData) {
                            if (__DEBUG__)
                                console.log(__TAG__ + "CallCancelled", callData);
                            currentSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                            updatedData = { ProviderCompleted: true };
                            for (key in callData) {
                                updatedData[key] = callData[key];
                            }
                            // Set disposition if not already present: Missed = they hung up before we answered; Cancelled = we cancelled outbound
                            if (!updatedData.Disposition) {
                                updatedData.Disposition = ((callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) === "them")
                                    ? SipProviderTypes_1.Dispositions.Missed
                                    : SipProviderTypes_1.Dispositions.Cancelled;
                            }
                            BrowserPhoneSipProvider.UpdateSession(sessionId, {
                                State: SipProviderTypes_1.CallState.Terminated,
                                Data: updatedData
                            });
                        }
                        Event = SipProviderTypes_1.SipProviderPostMessage.OnInviteCancelled;
                        if ((callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) == "them") {
                            console.log("SipProvider: %c Call was cancelled by them <" + (callData === null || callData === void 0 ? void 0 : callData.From) + ">", "color: green; font-weight: bold;");
                            Event = SipProviderTypes_1.SipProviderPostMessage.OnInviteCancelledByThem;
                        }
                        else {
                            console.log("%c Call was cancelled", "color: red; font-weight: bold;");
                            Event = SipProviderTypes_1.SipProviderPostMessage.OnInviteCancelledByUs;
                        }
                        window.phone.AddSessionEvent(sessionId, {
                            Timestamp: window.phone.TimeNow(),
                            Activity: Event,
                            Data: {
                                SessionId: sessionId,
                                Time: window.phone.TimeNow(),
                                DisplayName: Session === null || Session === void 0 ? void 0 : Session.DisplayName,
                                BuddyId: Session === null || Session === void 0 ? void 0 : Session.BuddyId,
                                Direction: Session === null || Session === void 0 ? void 0 : Session.Direction,
                                ReasonCode: (callData === null || callData === void 0 ? void 0 : callData.ReasonCode) || ((_c = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _c === void 0 ? void 0 : _c.ReasonCode),
                                ReasonText: (callData === null || callData === void 0 ? void 0 : callData.ReasonText) || ((_d = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _d === void 0 ? void 0 : _d.ReasonText),
                                TerminatedBy: (callData === null || callData === void 0 ? void 0 : callData.TerminatedBy) || ((_e = callData === null || callData === void 0 ? void 0 : callData.Data) === null || _e === void 0 ? void 0 : _e.TerminatedBy),
                            }
                        });
                        if (__DEBUG__)
                            console.log(__TAG__ + "CallCancelled", BrowserPhoneSipProvider.SessionManager.get(sessionId));
                        if (!((Session === null || Session === void 0 ? void 0 : Session.ConferenceCall) || (Session === null || Session === void 0 ? void 0 : Session.AttemptingConferenceCall))) return [3 /*break*/, 6];
                        if (__DEBUG__) {
                            console.log(__TAG__ + "CallCancelled: Conference child cleanup", {
                                SessionId: sessionId,
                                ParentSessionId: Session === null || Session === void 0 ? void 0 : Session.ParentSessionId,
                                ConferenceCall: Session === null || Session === void 0 ? void 0 : Session.ConferenceCall,
                                AttemptingConferenceCall: Session === null || Session === void 0 ? void 0 : Session.AttemptingConferenceCall
                            });
                        }
                        return [4 /*yield*/, BrowserPhoneSipProvider.HandleParticipantLeftConferenceCall(Session)];
                    case 5:
                        _g.sent();
                        return [2 /*return*/];
                    case 6:
                        _g.trys.push([6, 9, , 10]);
                        if (!((_f = BrowserPhoneSipProvider.SipProvider) === null || _f === void 0 ? void 0 : _f.TeardownSession)) return [3 /*break*/, 8];
                        return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.TeardownSession(sessionId)];
                    case 7:
                        _g.sent();
                        if (__DEBUG__) {
                            console.log(__TAG__ + "CallCancelled: Teardown complete", sessionId);
                        }
                        _g.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        teardownError_5 = _g.sent();
                        console.warn(__TAG__ + "CallCancelled: Teardown failed", (teardownError_5 === null || teardownError_5 === void 0 ? void 0 : teardownError_5.message) || teardownError_5);
                        return [3 /*break*/, 10];
                    case 10:
                        _g.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(sessionId)];
                    case 11:
                        _g.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_31 = _g.sent();
                        console.warn(__TAG__ + "CallCancelled BuildAndAddCDRMessage Error", e_31);
                        return [3 /*break*/, 13];
                    case 13:
                        if (__DEBUG__)
                            console.log(__TAG__ + "CallCancelled Removing Session", sessionId);
                        _g.label = 14;
                    case 14:
                        _g.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(sessionId)];
                    case 15:
                        _g.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        e_32 = _g.sent();
                        console.warn(__TAG__ + "CallCancelled RemoveSession Error", e_32);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    // -- Transfer and Child Call Handlers --
    //#region Transfer and Child Call Handlers
    /**
     * Handle when a child call (consultation call) is rejected during attended transfer
     * @param session - The child session that was rejected
     * @param sip - SIP-related data
     */
    BrowserPhoneSipProvider.ChildCallRejected = function (session, sip) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var Session, parentSession;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Session = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                        if (!Session) {
                            console.warn(__TAG__ + "ChildCallRejected Session not found", session.Id);
                            return [2 /*return*/];
                        }
                        if ((_a = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _a === void 0 ? void 0 : _a.ProviderCompleted) {
                            if (__DEBUG__)
                                console.log(__TAG__ + "ChildCallRejected Session is completed already");
                            return [2 /*return*/];
                        }
                        BrowserPhoneSipProvider.UpdateSession(Session.Id, {
                            Data: {
                                ProviderCompleted: true
                            }
                        });
                        if (!Session.ParentSessionId) return [3 /*break*/, 2];
                        parentSession = BrowserPhoneSipProvider.SessionManager.get(Session.ParentSessionId);
                        if (!parentSession) return [3 /*break*/, 2];
                        parentSession.Data.ProviderCompleted = true;
                        BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                            Data: {
                                ReasonText: "Child Call Rejected",
                                ReasonCode: 202,
                                TerminatedBy: "them",
                                CallEnded: window.phone.TimeNow()
                            }
                        });
                        // Check parent state
                        return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(parentSession.Id)];
                    case 1:
                        // Check parent state
                        _b.sent();
                        setTimeout(function () {
                            BrowserPhoneSipProvider.RemoveSession(parentSession.Id);
                        }, 1000);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a consultation call for attended transfer
     * @param session - The current session
     * @param targetContact - The contact to call for consultation
     * @returns Promise that resolves when consultation call is created
     */
    BrowserPhoneSipProvider.MakeAttendedCall = function (session, targetContact) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, Session;
            var _this = this;
            return __generator(this, function (_a) {
                contact = targetContact;
                Session = session;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var currentSession, buddy;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (BrowserPhoneSipProvider.SessionManager.get(Session.Id) == null || BrowserPhoneSipProvider.SessionManager.get(Session.Id) == undefined) {
                                        BrowserPhoneSipProvider.SessionManager.set(Session);
                                    }
                                    currentSession = BrowserPhoneSipProvider.SessionManager.get(Session.Id);
                                    if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data)) {
                                        currentSession.Data = {};
                                    }
                                    if (currentSession && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.MakeAttendedCallActionComplete) || ((_a = currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data) === null || _a === void 0 ? void 0 : _a.MakeAttendedCallActionComplete)) {
                                        // alert("Session not found for session: " + session.Id);
                                        window.phone.Toast(session.Id, "Already making call", null, 'red');
                                        return [2 /*return*/];
                                    }
                                    BrowserPhoneSipProvider.UpdateSession(currentSession.Id, {
                                        Data: {
                                            MakeAttendedCallActionComplete: true
                                        }
                                    });
                                    buddy = window.phone.GetBuddyByContact(contact.Number);
                                    if (!buddy) {
                                        console.warn(__TAG__ + "Buddy not found for contact: " + contact);
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, window.phone.OnAudioCall(contact, buddy, BrowserPhoneSipProvider.SessionManager.get(session.Id))];
                                case 1:
                                    _b.sent();
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    //#endregion Transfer and Child Call Handlers
    /**
     * Handle completion of an attended transfer
     * @param sessionId - The session ID of the completed transfer
     * @param callData - Additional data about the transfer
     */
    BrowserPhoneSipProvider.OnAttendedTransferCompleted = function (sessionId, callData) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var Session, displayName, updatedData, updatedSession, key, key;
            return __generator(this, function (_b) {
                // Toast  
                window.phone.Toast(sessionId, "Attended Transfer Completed", null, 'green');
                Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                displayName = (Session === null || Session === void 0 ? void 0 : Session.DisplayName) || ((_a = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || "Unknown";
                console.log(__TAG__ + "%c Attended Transfer Completed: " + displayName, "color: green; font-weight: bold;");
                if (!(Session === null || Session === void 0 ? void 0 : Session.Data)) {
                    Session.Data = {};
                }
                updatedData = { ProviderCompleted: true };
                updatedSession = {};
                if (callData) {
                    for (key in callData) {
                        updatedData[key] = callData[key];
                        updatedSession[key] = callData[key];
                    }
                    for (key in callData === null || callData === void 0 ? void 0 : callData.Data) {
                        updatedData[key] = callData === null || callData === void 0 ? void 0 : callData.Data[key];
                        updatedSession[key] = callData === null || callData === void 0 ? void 0 : callData.Data[key];
                    }
                }
                BrowserPhoneSipProvider.UpdateSession(sessionId, __assign({ Data: updatedData }, updatedSession));
                // CDR is built by BSP.CompleteTransfer after Core.CompleteTransfer resolves with snapshots.
                // Building it here would create a duplicate parent CDR.
                window.phone.UpdateBuddyList();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle completion of a blind transfer
     * @param sessionId - The session ID of the completed transfer
     * @param callData - Additional data about the transfer including target contact
     */
    BrowserPhoneSipProvider.OnBlindTransferCompleted = function (sessionId, callData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function () {
            var session, CDRData, currentSession, updatedData, key, TransferredTo, targetContact, targetLabel, originalLabel, mainDisposition, normalizeContact_1, normalizedTarget_1, targetBuddy, safeCdrData, targetSessionId_1, now, originalNumber, targetDisposition, childEvents, targetSession, childBlindCdr_1, parentSessionForCdrs, parentCDRS, parentCdrIds, latestSession, e_33, key, error_32;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        if (__DEBUG__)
                            console.log(__TAG__ + "OnBlindTransferCompleted", sessionId, callData);
                        session = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
                        if (!session) {
                            console.warn(__TAG__ + "OnBlindTransferCompleted", "Session not found", sessionId);
                            return [2 /*return*/];
                        }
                        CDRData = (callData === null || callData === void 0 ? void 0 : callData.CDR) || callData;
                        currentSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                        if (!currentSession) {
                            console.warn(__TAG__ + "OnBlindTransferCompleted", "Current session not found", sessionId);
                            return [2 /*return*/];
                        }
                        if (!currentSession.Data) {
                            currentSession.Data = {};
                        }
                        if ((_a = currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data) === null || _a === void 0 ? void 0 : _a.BlindTransferCompleted) {
                            console.warn(__TAG__ + "OnBlindTransferCompleted", "Already completed", sessionId);
                            return [2 /*return*/];
                        }
                        updatedData = { BlindTransferCompleted: true, ProviderCompleted: true };
                        if (callData) {
                            for (key in callData) {
                                updatedData[key] = callData[key];
                            }
                        }
                        BrowserPhoneSipProvider.UpdateSession(sessionId, {
                            Data: updatedData
                        });
                        if (__DEBUG__)
                            console.log(__TAG__ + "OnBlindTransferCompleted", callData);
                        TransferredTo = callData === null || callData === void 0 ? void 0 : callData.TransferredTo;
                        targetContact = (_b = callData === null || callData === void 0 ? void 0 : callData.CDR) === null || _b === void 0 ? void 0 : _b.TargetContact;
                        if (!targetContact) {
                            targetContact = callData === null || callData === void 0 ? void 0 : callData.TargetContact;
                        }
                        if (!targetContact) {
                            targetContact = ((_c = currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data) === null || _c === void 0 ? void 0 : _c.TargetContact) || ((_d = session === null || session === void 0 ? void 0 : session.Data) === null || _d === void 0 ? void 0 : _d.TargetContact);
                        }
                        if (!targetContact) {
                            console.warn(__TAG__ + "OnBlindTransferCompleted", "Target contact not found");
                            return [2 /*return*/];
                        }
                        targetLabel = (targetContact === null || targetContact === void 0 ? void 0 : targetContact.Number) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.DisplayName) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.Name) || "Unknown";
                        originalLabel = ((_e = session === null || session === void 0 ? void 0 : session.Data) === null || _e === void 0 ? void 0 : _e.ToNumber) || (session === null || session === void 0 ? void 0 : session.Number) || session.DisplayName || ((_f = session === null || session === void 0 ? void 0 : session.Data) === null || _f === void 0 ? void 0 : _f.ToName) || ((_g = session === null || session === void 0 ? void 0 : session.Data) === null || _g === void 0 ? void 0 : _g.FromName) || "Unknown";
                        mainDisposition = "You Blind Transferred " + originalLabel + " to " + targetLabel;
                        // Ensure main session CDR uses the blind transfer disposition before any BYE/hangup.
                        BrowserPhoneSipProvider.UpdateSession(sessionId, {
                            Data: {
                                CallEnded: window.phone.TimeNow(),
                                TerminatedBy: 'us',
                                ReasonCode: 202,
                                Disposition: SipProviderTypes_1.Dispositions.BlindTransfer,
                                ReasonText: mainDisposition,
                                TransferFromDisplayName: (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_h = session === null || session === void 0 ? void 0 : session.Data) === null || _h === void 0 ? void 0 : _h.ToName) || ((_j = session === null || session === void 0 ? void 0 : session.Data) === null || _j === void 0 ? void 0 : _j.FromName) || undefined,
                                TransferToDisplayName: (targetContact === null || targetContact === void 0 ? void 0 : targetContact.DisplayName) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.Name) || undefined,
                            }
                        });
                        if (!(targetContact === null || targetContact === void 0 ? void 0 : targetContact.Number)) return [3 /*break*/, 3];
                        normalizeContact_1 = function (value) {
                            if (value == null)
                                return "";
                            var text = String(value).trim();
                            if (text.toLowerCase().startsWith("sip:")) {
                                text = text.slice(4);
                            }
                            var atIndex = text.indexOf("@");
                            if (atIndex > -1) {
                                text = text.slice(0, atIndex);
                            }
                            return text;
                        };
                        normalizedTarget_1 = normalizeContact_1(targetContact.Number);
                        if (__DEBUG__)
                            console.log(__TAG__ + "OnBlindTransferCompleted: Target contact", {
                                TargetContact: targetContact,
                                NormalizedTarget: normalizedTarget_1,
                                OriginalLabel: originalLabel,
                                TargetLabel: targetLabel
                            });
                        targetBuddy = window.phone.GetBuddyByContact(targetContact.Number);
                        if (!targetBuddy && targetContact.Id) {
                            targetBuddy = BrowserPhoneSipProvider.GetBuddyWithID(targetContact.Id);
                        }
                        if (!targetBuddy && targetContact.Id) {
                            targetBuddy = BrowserPhoneSipProvider.GetBuddyWithDisplayName(targetContact.Id);
                        }
                        if (!targetBuddy && targetContact.DisplayName) {
                            targetBuddy = BrowserPhoneSipProvider.GetBuddyWithDisplayName(targetContact.DisplayName);
                        }
                        if (!targetBuddy && targetContact.Number) {
                            targetBuddy = BrowserPhoneSipProvider.GetBuddyWithDisplayName(targetContact.Number);
                        }
                        if (!targetBuddy && ((_k = window.phone) === null || _k === void 0 ? void 0 : _k.MyBuddies)) {
                            targetBuddy = window.phone.MyBuddies.find(function (buddy) {
                                var _a;
                                var buddyNumber = normalizeContact_1((buddy === null || buddy === void 0 ? void 0 : buddy.Number) || ((_a = buddy === null || buddy === void 0 ? void 0 : buddy.Data) === null || _a === void 0 ? void 0 : _a.Number) || "");
                                var buddyDisplay = normalizeContact_1((buddy === null || buddy === void 0 ? void 0 : buddy.DisplayName) || (buddy === null || buddy === void 0 ? void 0 : buddy.Name) || "");
                                if (buddyNumber && buddyNumber === normalizedTarget_1) {
                                    return true;
                                }
                                if (buddyDisplay && buddyDisplay === normalizedTarget_1) {
                                    return true;
                                }
                                if (Array.isArray(buddy === null || buddy === void 0 ? void 0 : buddy.Contacts)) {
                                    return buddy.Contacts.some(function (contact) { return normalizeContact_1((contact === null || contact === void 0 ? void 0 : contact.Number) || "") === normalizedTarget_1; });
                                }
                                return false;
                            });
                        }
                        if (__DEBUG__)
                            console.log(__TAG__ + "OnBlindTransferCompleted: Target buddy lookup result", {
                                Found: !!targetBuddy,
                                BuddyId: targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.Id,
                                BuddyDisplayName: targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.DisplayName,
                                BuddyNumber: targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.Number,
                                BuddyContacts: targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.Contacts
                            });
                        if (!!targetBuddy) return [3 /*break*/, 1];
                        console.warn(__TAG__ + "OnBlindTransferCompleted", "Target buddy not found for contact: " + targetContact.Number);
                        return [3 /*break*/, 3];
                    case 1:
                        safeCdrData = BrowserPhoneSipProvider.SanitizeForStorage(CDRData || {});
                        delete safeCdrData.BlindTransferBuddy;
                        delete safeCdrData.Disposition;
                        delete safeCdrData.ReasonText;
                        delete safeCdrData.ReasonCode;
                        delete safeCdrData.TerminatedBy;
                        delete safeCdrData.CallEnded;
                        delete safeCdrData.EndTime;
                        delete safeCdrData.CDRs;
                        delete safeCdrData.Events;
                        // Timing fields from the parent session must not bleed into the synthetic child CDR.
                        // AnswerTime in particular causes BuildAndAddCDRMessage to calculate a non-zero Duration
                        // from the parent's answer time to now, producing an incorrect call length on the child.
                        delete safeCdrData.StartTime;
                        delete safeCdrData.DateAndTime;
                        delete safeCdrData.AnswerTime;
                        delete safeCdrData.Duration;
                        delete safeCdrData.TalkTime;
                        delete safeCdrData.RingTime;
                        targetSessionId_1 = (typeof ((_l = window.phone) === null || _l === void 0 ? void 0 : _l.UID) === "function")
                            ? window.phone.UID()
                            : ("blind-transfer-" + Math.random().toString(36).slice(2));
                        now = window.phone.TimeNow();
                        originalNumber = ((_m = session === null || session === void 0 ? void 0 : session.Data) === null || _m === void 0 ? void 0 : _m.ToNumber) || (session === null || session === void 0 ? void 0 : session.Number) || ((_o = session === null || session === void 0 ? void 0 : session.Data) === null || _o === void 0 ? void 0 : _o.To) || (session === null || session === void 0 ? void 0 : session.DisplayName) || "";
                        targetDisposition = "You made a blind transfer to " + originalLabel;
                        childEvents = [
                            {
                                Timestamp: now,
                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnBlindTransferCompleted,
                                Data: {
                                    SessionId: targetSessionId_1,
                                    ParentSessionId: sessionId,
                                    TargetContact: targetContact,
                                    BlindTransferTransferee: {
                                        SessionId: sessionId,
                                        DisplayName: session === null || session === void 0 ? void 0 : session.DisplayName,
                                        BuddyId: session === null || session === void 0 ? void 0 : session.BuddyId,
                                    },
                                    BlindTransferTarget: {
                                        Number: targetContact === null || targetContact === void 0 ? void 0 : targetContact.Number,
                                        DisplayName: (targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.DisplayName) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.DisplayName) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.Name),
                                    },
                                }
                            }
                        ];
                        targetSession = {
                            Id: targetSessionId_1,
                            BuddyId: targetBuddy.Id,
                            DisplayName: targetBuddy.DisplayName,
                            Number: targetContact.Number,
                            Direction: 'outbound',
                            Type: 'CDR',
                            Events: childEvents,
                            CDRs: [{ CDRId: sessionId }],
                            Data: __assign(__assign({ Direction: 'outbound', StartTime: now, DateAndTime: now, EndTime: now, CallEnded: now, ToName: targetBuddy.DisplayName, ToNumber: targetContact.Number, FromName: originalLabel, FromNumber: originalNumber, Events: childEvents }, safeCdrData), { TerminatedBy: 'us', ReasonCode: 202, ReasonText: targetDisposition, Disposition: SipProviderTypes_1.Dispositions.BlindTransferTo, TransferFromDisplayName: (session === null || session === void 0 ? void 0 : session.DisplayName) || originalLabel || undefined, TransferToDisplayName: (targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.DisplayName) || undefined, BlindTransferDestination: true, CDRs: [sessionId], TransferredTo: TransferredTo })
                        };
                        BrowserPhoneSipProvider.SessionManager.set(targetSession);
                        return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(targetSessionId_1)];
                    case 2:
                        childBlindCdr_1 = _t.sent();
                        if (childBlindCdr_1 === null || childBlindCdr_1 === void 0 ? void 0 : childBlindCdr_1.Id) {
                            parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(sessionId) || currentSession;
                            parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                            parentCdrIds = ((_p = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _p === void 0 ? void 0 : _p.CDRs) || [];
                            if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childBlindCdr_1.Id; })) {
                                parentCDRS.push({ CDRId: childBlindCdr_1.Id });
                            }
                            if (!parentCdrIds.includes(childBlindCdr_1.Id)) {
                                parentCdrIds.push(childBlindCdr_1.Id);
                            }
                            BrowserPhoneSipProvider.UpdateSession(sessionId, {
                                CDRs: parentCDRS,
                                Data: {
                                    CDRs: parentCdrIds
                                }
                            });
                        }
                        setTimeout(function () {
                            try {
                                BrowserPhoneSipProvider.RemoveSession(targetSessionId_1);
                            }
                            catch (e) {
                            }
                        }, 0);
                        _t.label = 3;
                    case 3:
                        _t.trys.push([3, 6, , 7]);
                        if (!((_q = BrowserPhoneSipProvider.Core) === null || _q === void 0 ? void 0 : _q.Hangup)) return [3 /*break*/, 5];
                        latestSession = BrowserPhoneSipProvider.SessionManager.get(sessionId) || currentSession;
                        return [4 /*yield*/, BrowserPhoneSipProvider.Core.Hangup(latestSession)];
                    case 4:
                        _t.sent();
                        _t.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_33 = _t.sent();
                        console.warn(__TAG__ + "OnBlindTransferCompleted: Core.Hangup failed", (e_33 === null || e_33 === void 0 ? void 0 : e_33.message) || e_33);
                        return [3 /*break*/, 7];
                    case 7:
                        // Ensure blind transfer disposition survives Hangup() updates
                        BrowserPhoneSipProvider.UpdateSession(sessionId, {
                            Data: {
                                CallEnded: window.phone.TimeNow(),
                                EndTime: window.phone.TimeNow(),
                                TerminatedBy: 'us',
                                ReasonCode: 202,
                                Disposition: SipProviderTypes_1.Dispositions.BlindTransfer,
                                ReasonText: mainDisposition,
                                TransferFromDisplayName: (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_r = session === null || session === void 0 ? void 0 : session.Data) === null || _r === void 0 ? void 0 : _r.ToName) || ((_s = session === null || session === void 0 ? void 0 : session.Data) === null || _s === void 0 ? void 0 : _s.FromName) || undefined,
                                TransferToDisplayName: (targetBuddy === null || targetBuddy === void 0 ? void 0 : targetBuddy.DisplayName) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.DisplayName) || (targetContact === null || targetContact === void 0 ? void 0 : targetContact.Name) || undefined,
                            }
                        });
                        currentSession.Data.ProviderCompleted = true;
                        if (callData) {
                            for (key in callData) {
                                currentSession.Data[key] = callData[key];
                            }
                        }
                        return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(sessionId)];
                    case 8:
                        _t.sent();
                        _t.label = 9;
                    case 9:
                        _t.trys.push([9, 11, , 12]);
                        BrowserPhoneSipProvider.StopCallTimer(sessionId);
                        return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(sessionId)];
                    case 10:
                        _t.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_32 = _t.sent();
                        console.warn(__TAG__ + "OnBlindTransferCompleted", error_32);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handle when a call is put on hold
     * @param sessionId - The session ID that is on hold
     * @returns Promise that resolves when hold state is updated
     */
    BrowserPhoneSipProvider.CallIsOnHold = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, session;
                        return __generator(this, function (_a) {
                            Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                            if (Session) {
                                Session.isOnHold = true;
                            }
                            session = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
                            session.isOnHold = true;
                            window.phone.UpdateStage();
                            window.phone.UpdateBuddyList();
                            window.phone.UpdateStage();
                            window.phone.UpdateUI();
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.CallIsOnUnHold = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, session;
                        return __generator(this, function (_a) {
                            Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                            if (Session) {
                                Session.isOnHold = false;
                            }
                            session = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
                            session.isOnHold = false;
                            window.phone.UpdateStage();
                            window.phone.UpdateBuddyList();
                            window.phone.UpdateStage();
                            window.phone.UpdateUI();
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.CallIsMuted = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, session;
                        return __generator(this, function (_a) {
                            Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                            if (Session) {
                                Session.isOnMute = true;
                            }
                            session = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
                            session.isOnMute = true;
                            window.phone.UpdateStage();
                            window.phone.UpdateBuddyList();
                            window.phone.UpdateUI();
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    BrowserPhoneSipProvider.CallIsUnMuted = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, session;
                        return __generator(this, function (_a) {
                            Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                            if (Session) {
                                Session.isOnMute = false;
                            }
                            session = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
                            session.isOnMute = false;
                            window.phone.UpdateBuddyList();
                            window.phone.UpdateStage();
                            window.phone.UpdateUI();
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    /**
     * Handle when a call is answered
     * @param sessionId - The session ID that was answered
     */
    BrowserPhoneSipProvider.CallAnswered = function (sessionId) {
        // console log with color green
        try {
            window.phone.StopRingback(sessionId);
            window.phone.StopRingtone(sessionId);
        }
        catch (e) {
            console.warn(__TAG__ + "Hangup: Error stopping ringback and tone", e.message);
        }
        var sessionID = sessionId;
        var session = BrowserPhoneSipProvider.GetSessionWithID(sessionID);
        var buddy = BrowserPhoneSipProvider.GetBuddyWithSession(sessionID);
        if (!session) {
            console.warn(__TAG__ + "CallAnswered: Session not found", sessionId);
            window.phone.Toast(sessionId, "Call Answered: Session not found", null, 'red');
            return;
        }
        if (session.AnswerTime)
            return; // Already answered — prevents duplicate OnCallAnswered events
        session.Status = SipProviderTypes_1.CallStatus.CallInProgress;
        session.State = SipProviderTypes_1.CallState.Established;
        BrowserPhoneSipProvider.StartCallTimer(sessionID);
        BrowserPhoneSipProvider.UpdateSession(sessionId, {
            State: SipProviderTypes_1.CallState.Established,
            Status: SipProviderTypes_1.CallStatus.CallInProgress,
            AnswerTime: window.phone.TimeNow(),
            Data: {
                AnswerTime: window.phone.TimeNow(),
            }
        });
        window.phone.UpdateStage();
        window.phone.UpdateBuddyList();
        console.log(__TAG__ + "%c You answered the call with " + (session === null || session === void 0 ? void 0 : session.DisplayName), "color: green; font-weight: bold;", sessionId);
    };
    /**
     * Get the buddy associated with a session
     * @param sessionId - The session ID to find buddy for
     * @returns The buddy object or null if not found
     */
    BrowserPhoneSipProvider.GetBuddyWithSession = function (sessionId) {
        if (sessionId == null) {
            console.warn(__TAG__ + "GetBuddyWithSession SessionId is null");
            return null;
        }
        var buddy = window.phone.GetBuddyWithSession(sessionId);
        return buddy;
    };
    /**
     * Cancel an attended transfer and clean up the child session
     * @param childSession - The child session to cancel
     * @returns Promise that resolves to the cancellation response
     */
    BrowserPhoneSipProvider.CancelAttendedTransfer = function (childSession) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var parentSession, e_34, response, error_33, cdrError_3, removeError_1;
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        _t.trys.push([0, 7, , 15]);
                        if (!(childSession.ParentSessionId != null)) return [3 /*break*/, 5];
                        parentSession = BrowserPhoneSipProvider.SessionManager.get(childSession.ParentSessionId);
                        BrowserPhoneSipProvider.UpdateSession(childSession.ParentSessionId, {
                            AttendedTransferCall: null,
                            Data: {
                                AttendedTransferCall: null,
                                MakeAttendedCallActionComplete: false
                            }
                        });
                        try {
                            BrowserPhoneSipProvider.SipProvider.UpdateSession(childSession.ParentSessionId, {
                                AttendedTransferCall: null,
                                Data: {
                                    AttendedTransferCall: null,
                                    MakeAttendedCallActionComplete: false
                                }
                            });
                        }
                        catch (e) {
                        }
                        if (!(((_a = parentSession === null || parentSession === void 0 ? void 0 : parentSession.Data) === null || _a === void 0 ? void 0 : _a.OnHold) || (parentSession === null || parentSession === void 0 ? void 0 : parentSession.isOnHold))) return [3 /*break*/, 4];
                        _t.label = 1;
                    case 1:
                        _t.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BrowserPhoneSipProvider.Unhold(parentSession)];
                    case 2:
                        _t.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_34 = _t.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                            AttendedTransferCall: null,
                            ParentSessionId: null,
                            UpdatedByChild: true,
                            Data: {
                                MakeAttendedCallActionComplete: false
                            }
                        });
                        _t.label = 5;
                    case 5: return [4 /*yield*/, BrowserPhoneSipProvider.Core.Cancel(childSession)];
                    case 6:
                        response = _t.sent();
                        BrowserPhoneSipProvider.AddCallActivity(childSession.Id, {
                            Timestamp: window.phone.TimeNow(),
                            Activity: SipProviderTypes_1.SipProviderPostMessage.OnCancelAttendedTransfer,
                            Data: {
                                SessionId: childSession.Id,
                                Time: window.phone.TimeNow(),
                                DisplayName: childSession.DisplayName,
                                AttendeeSessionId: childSession.Id,
                                AttendeeDisplayName: childSession.DisplayName,
                                RejectedByUs: true,
                            }
                        });
                        BrowserPhoneSipProvider.AddCallActivity(childSession.ParentSessionId, {
                            Timestamp: window.phone.TimeNow(),
                            Activity: SipProviderTypes_1.SipProviderPostMessage.OnCancelAttendedTransfer,
                            Data: {
                                SessionId: childSession.ParentSessionId,
                                Time: window.phone.TimeNow(),
                                DisplayName: parentSession === null || parentSession === void 0 ? void 0 : parentSession.DisplayName,
                                AttendeeSessionId: childSession.Id,
                                AttendeeDisplayName: childSession.DisplayName,
                                RejectedByUs: true,
                            }
                        });
                        // Update the child session with the response data
                        BrowserPhoneSipProvider.UpdateSession(childSession.Id, {
                            ReasonCode: (_c = (_b = response === null || response === void 0 ? void 0 : response.CallData) === null || _b === void 0 ? void 0 : _b.Data) === null || _c === void 0 ? void 0 : _c.ReasonCode,
                            ReasonText: (_e = (_d = response === null || response === void 0 ? void 0 : response.CallData) === null || _d === void 0 ? void 0 : _d.Data) === null || _e === void 0 ? void 0 : _e.ReasonText,
                            TerminatedBy: (_g = (_f = response === null || response === void 0 ? void 0 : response.CallData) === null || _f === void 0 ? void 0 : _f.Data) === null || _g === void 0 ? void 0 : _g.TerminatedBy,
                            CallEnded: (_j = (_h = response === null || response === void 0 ? void 0 : response.CallData) === null || _h === void 0 ? void 0 : _h.Data) === null || _j === void 0 ? void 0 : _j.CallEnded,
                            Data: {
                                ReasonCode: (_l = (_k = response === null || response === void 0 ? void 0 : response.CallData) === null || _k === void 0 ? void 0 : _k.Data) === null || _l === void 0 ? void 0 : _l.ReasonCode,
                                ReasonText: (_o = (_m = response === null || response === void 0 ? void 0 : response.CallData) === null || _m === void 0 ? void 0 : _m.Data) === null || _o === void 0 ? void 0 : _o.ReasonText,
                                TerminatedBy: (_q = (_p = response === null || response === void 0 ? void 0 : response.CallData) === null || _p === void 0 ? void 0 : _p.Data) === null || _q === void 0 ? void 0 : _q.TerminatedBy,
                                CallEnded: (_s = (_r = response === null || response === void 0 ? void 0 : response.CallData) === null || _r === void 0 ? void 0 : _r.Data) === null || _s === void 0 ? void 0 : _s.CallEnded,
                            }
                        });
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var childCDR, parentSessionForCdrs, parentCDRS, parentCdrIds, e_35;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childSession.Id)];
                                    case 1:
                                        childCDR = _b.sent();
                                        if (childCDR) {
                                            parentSessionForCdrs = BrowserPhoneSipProvider.SessionManager.get(childSession.ParentSessionId);
                                            parentCDRS = (parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.CDRs) || [];
                                            parentCdrIds = ((_a = parentSessionForCdrs === null || parentSessionForCdrs === void 0 ? void 0 : parentSessionForCdrs.Data) === null || _a === void 0 ? void 0 : _a.CDRs) || [];
                                            if (childCDR === null || childCDR === void 0 ? void 0 : childCDR.Id) {
                                                if (!parentCDRS.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === childCDR.Id; })) {
                                                    parentCDRS.push({ CDRId: childCDR.Id });
                                                }
                                                if (!parentCdrIds.includes(childCDR.Id)) {
                                                    parentCdrIds.push(childCDR.Id);
                                                }
                                            }
                                            BrowserPhoneSipProvider.UpdateSession(childSession.ParentSessionId, {
                                                CDRs: parentCDRS,
                                                Data: {
                                                    CDRs: parentCdrIds
                                                }
                                            });
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_35 = _b.sent();
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, 100);
                        setTimeout(function () {
                            try {
                                BrowserPhoneSipProvider.RemoveSession(childSession.Id);
                            }
                            catch (e) {
                            }
                        }, 1000);
                        resolve(response);
                        return [3 /*break*/, 15];
                    case 7:
                        error_33 = _t.sent();
                        // Core.Cancel threw — the CDR/RemoveSession setTimeouts were never registered.
                        // Ensure child session is always cleaned up.
                        console.warn(__TAG__ + "CancelAttendedTransfer: Core.Cancel threw, cleaning up child session", (error_33 === null || error_33 === void 0 ? void 0 : error_33.message) || error_33);
                        _t.label = 8;
                    case 8:
                        _t.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(childSession.Id)];
                    case 9:
                        _t.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        cdrError_3 = _t.sent();
                        console.warn(__TAG__ + "CancelAttendedTransfer: CDR failed in exception catch", (cdrError_3 === null || cdrError_3 === void 0 ? void 0 : cdrError_3.message) || cdrError_3);
                        return [3 /*break*/, 11];
                    case 11:
                        _t.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(childSession.Id)];
                    case 12:
                        _t.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        removeError_1 = _t.sent();
                        console.warn(__TAG__ + "CancelAttendedTransfer: RemoveSession failed in exception catch", (removeError_1 === null || removeError_1 === void 0 ? void 0 : removeError_1.message) || removeError_1);
                        return [3 /*break*/, 14];
                    case 14:
                        resolve({ Success: false, Reason: "CancelAttendedTransfer error: " + ((error_33 === null || error_33 === void 0 ? void 0 : error_33.message) || error_33) });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Handle cleanup when a participant leaves a conference call
     * Updates parent session, creates CDR, and removes child session
     * @param session - The child session of a conference call where the participant has left
     * @returns Promise that resolves when cleanup is complete
     */
    BrowserPhoneSipProvider.HandleParticipantLeftConferenceCall = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var displayLabel, audioCtxError_1, graph, inputId, input, teardownError_6, parentSession, updatedConferenceChildren, index, _i, updatedConferenceChildren_1, remainingId, remainingSession, graph, input, currentCDRs, currentCdrIds, error_34;
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    _k.trys.push([0, 14, , 15]);
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%c HandleParticipantLeftConferenceCall: Handling participant left conference call", "color: blue; font-weight: bold;", session.DisplayName);
                                    displayLabel = (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.ToNumber) || ((_b = session === null || session === void 0 ? void 0 : session.Data) === null || _b === void 0 ? void 0 : _b.To) || (session === null || session === void 0 ? void 0 : session.Id);
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "Conference: Participant left", {
                                            SessionId: session === null || session === void 0 ? void 0 : session.Id,
                                            DisplayName: displayLabel,
                                            ParentSessionId: session === null || session === void 0 ? void 0 : session.ParentSessionId,
                                        });
                                    if (!(session === null || session === void 0 ? void 0 : session.ConferenceAudioContext)) return [3 /*break*/, 6];
                                    _k.label = 1;
                                case 1:
                                    _k.trys.push([1, 4, , 5]);
                                    if (!(session.ConferenceAudioContext.state !== "closed")) return [3 /*break*/, 3];
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "HandleParticipantLeftConferenceCall: Closing ConferenceAudioContext", session.Id);
                                    return [4 /*yield*/, session.ConferenceAudioContext.close()];
                                case 2:
                                    _k.sent();
                                    _k.label = 3;
                                case 3: return [3 /*break*/, 5];
                                case 4:
                                    audioCtxError_1 = _k.sent();
                                    console.warn(__TAG__ + "HandleParticipantLeftConferenceCall: Error closing ConferenceAudioContext", audioCtxError_1);
                                    return [3 /*break*/, 5];
                                case 5:
                                    session.ConferenceAudioContext = null;
                                    _k.label = 6;
                                case 6:
                                    // Disconnect all audio graph nodes so the mic source nodes are freed.
                                    // Note: we do NOT stop input.stream tracks here — the parent session may still be in a call.
                                    if (session === null || session === void 0 ? void 0 : session.ConferenceAudioContextGraph) {
                                        graph = session.ConferenceAudioContextGraph;
                                        try {
                                            if (graph === null || graph === void 0 ? void 0 : graph.inputs) {
                                                for (inputId in graph.inputs) {
                                                    input = graph.inputs[inputId];
                                                    try {
                                                        if ((_c = input === null || input === void 0 ? void 0 : input.source) === null || _c === void 0 ? void 0 : _c.disconnect)
                                                            input.source.disconnect();
                                                        if ((_d = input === null || input === void 0 ? void 0 : input.gain) === null || _d === void 0 ? void 0 : _d.disconnect)
                                                            input.gain.disconnect();
                                                    }
                                                    catch (e) { }
                                                }
                                            }
                                            if ((_e = graph === null || graph === void 0 ? void 0 : graph.masterGain) === null || _e === void 0 ? void 0 : _e.disconnect)
                                                graph.masterGain.disconnect();
                                            if ((_f = graph === null || graph === void 0 ? void 0 : graph.destination) === null || _f === void 0 ? void 0 : _f.disconnect)
                                                graph.destination.disconnect();
                                        }
                                        catch (graphError) {
                                            console.warn(__TAG__ + "HandleParticipantLeftConferenceCall: Error disconnecting audio graph", graphError);
                                        }
                                        session.ConferenceAudioContextGraph = null;
                                    }
                                    _k.label = 7;
                                case 7:
                                    _k.trys.push([7, 10, , 11]);
                                    if (!((_g = BrowserPhoneSipProvider.SipProvider) === null || _g === void 0 ? void 0 : _g.TeardownSession)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.SipProvider.TeardownSession(session.Id)];
                                case 8:
                                    _k.sent();
                                    if (__DEBUG__) {
                                        console.log(__TAG__ + "HandleParticipantLeftConferenceCall: Teardown complete", session.Id);
                                    }
                                    _k.label = 9;
                                case 9: return [3 /*break*/, 11];
                                case 10:
                                    teardownError_6 = _k.sent();
                                    console.warn(__TAG__ + "HandleParticipantLeftConferenceCall: Teardown failed", (teardownError_6 === null || teardownError_6 === void 0 ? void 0 : teardownError_6.message) || teardownError_6);
                                    return [3 /*break*/, 11];
                                case 11:
                                    BrowserPhoneSipProvider.StopSessionLocalMedia(session === null || session === void 0 ? void 0 : session.Id);
                                    if (session.EarlyConferenceCallRejected) {
                                        BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                            Disposition: SipProviderTypes_1.Dispositions.ConferenceCallRejected,
                                            ReasonCode: 202,
                                            ReasonText: "Conference Call Rejected",
                                            TerminatedBy: "them",
                                            CallEnded: window.phone.TimeNow()
                                        });
                                    }
                                    return [4 /*yield*/, BrowserPhoneSipProvider.BuildAndAddCDRMessage(session.Id)];
                                case 12:
                                    _k.sent();
                                    return [4 /*yield*/, BrowserPhoneSipProvider.RemoveSession(session.Id)];
                                case 13:
                                    _k.sent();
                                    parentSession = BrowserPhoneSipProvider.SessionManager.get(session.ParentSessionId);
                                    if (parentSession) {
                                        updatedConferenceChildren = __spreadArray([], (parentSession.ConferenceChildren || []), true);
                                        index = updatedConferenceChildren.indexOf(session.Id);
                                        if (index > -1) {
                                            updatedConferenceChildren.splice(index, 1);
                                        }
                                        // Remove the leaving participant from each remaining mix graph.
                                        for (_i = 0, updatedConferenceChildren_1 = updatedConferenceChildren; _i < updatedConferenceChildren_1.length; _i++) {
                                            remainingId = updatedConferenceChildren_1[_i];
                                            if (remainingId === session.Id) {
                                                continue;
                                            }
                                            remainingSession = BrowserPhoneSipProvider.SessionManager.get(remainingId);
                                            graph = remainingSession === null || remainingSession === void 0 ? void 0 : remainingSession.ConferenceAudioContextGraph;
                                            input = (_h = graph === null || graph === void 0 ? void 0 : graph.inputs) === null || _h === void 0 ? void 0 : _h[session.Id];
                                            if (!input) {
                                                continue;
                                            }
                                            try {
                                                if (input.source && typeof input.source.disconnect === "function") {
                                                    input.source.disconnect();
                                                }
                                                if (input.gain && typeof input.gain.disconnect === "function") {
                                                    input.gain.disconnect();
                                                }
                                            }
                                            catch (e) {
                                            }
                                            delete graph.inputs[session.Id];
                                        }
                                        // Add event that the participant has left the conference
                                        window.phone.AddSessionEvent(parentSession.Id, {
                                            Timestamp: window.phone.TimeNow(),
                                            Activity: SipProviderTypes_1.SipProviderPostMessage.OnConferenceCallLeft,
                                            Data: {
                                                SessionId: parentSession.Id,
                                                DisplayName: parentSession.DisplayName,
                                                ParticipantSessionId: session.Id,
                                                ParticipantDisplayName: session.DisplayName,
                                                ParticipantBuddyId: session.BuddyId,
                                                RemainingParticipants: updatedConferenceChildren.length,
                                                Time: window.phone.TimeNow(),
                                            }
                                        });
                                        currentCDRs = parentSession.CDRs || [];
                                        currentCdrIds = ((_j = parentSession.Data) === null || _j === void 0 ? void 0 : _j.CDRs) || [];
                                        if (!currentCDRs.some(function (item) { return (item === null || item === void 0 ? void 0 : item.CDRId) === session.Id; })) {
                                            currentCDRs.push({ CDRId: session.Id });
                                        }
                                        if (!currentCdrIds.includes(session.Id)) {
                                            currentCdrIds.push(session.Id);
                                        }
                                        // Update ConferenceChildren and CDRs in one call
                                        BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                                            ConferenceChildren: updatedConferenceChildren,
                                            CDRs: currentCDRs,
                                            Data: {
                                                CDRs: currentCdrIds
                                            }
                                        });
                                        // If the last conference participant has left, the parent reverts to a regular call.
                                        if (updatedConferenceChildren.length === 0) {
                                            console.log(__TAG__ + "%c Conference ended — last participant left, parent call continues", "color: blue; font-weight: bold;");
                                            BrowserPhoneSipProvider.UpdateSession(parentSession.Id, {
                                                Data: {
                                                    ConferenceEnded: window.phone.TimeNow(),
                                                }
                                            });
                                            window.phone.AddSessionEvent(parentSession.Id, {
                                                Timestamp: window.phone.TimeNow(),
                                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnConferenceCallLeft,
                                                Data: {
                                                    SessionId: parentSession.Id,
                                                    DisplayName: parentSession.DisplayName,
                                                    Time: window.phone.TimeNow(),
                                                }
                                            });
                                        }
                                    }
                                    resolve();
                                    return [3 /*break*/, 15];
                                case 14:
                                    error_34 = _k.sent();
                                    reject(error_34);
                                    return [3 /*break*/, 15];
                                case 15: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // -- Call Timer Utilities --
    //#region Call Timer Utilities
    /**
     * Start a timer for tracking call duration
     * @param sessionId - The session ID to start timer for
     */
    /**
     * Start the per-session timer incrementing once per second.
     * @param sessionId - Session ID to track
     */
    BrowserPhoneSipProvider.StartCallTimer = function (sessionId) {
        var _a;
        // Find the session by id and check if TimerInterval is already set
        var session = null;
        (_a = window.phone.MyBuddies) === null || _a === void 0 ? void 0 : _a.forEach(function (buddy) {
            var _a;
            (_a = buddy.Sessions) === null || _a === void 0 ? void 0 : _a.forEach(function (s) {
                if (s.Id === sessionId) {
                    session = s;
                }
            });
        });
        if (!session) {
            console.warn("StartCallTimer: Session not found for sessionId:", sessionId);
            return;
        }
        if (session.TimerInterval) {
            clearInterval(session.TimerInterval);
        }
        if (session.Timer == undefined || session.Timer == null) {
            session.Timer = 0;
        }
        session.TimerInterval = setInterval(function () {
            if (typeof session.Timer != "number") {
                session.Timer = 0;
            }
            session.Timer = session.Timer + 1;
        }, 1000);
    };
    /**
   * Stop the call timer for a specific session
   * @param sessionId - The session ID to stop timer for
   */
    BrowserPhoneSipProvider.StopCallTimer = function (sessionId) {
        window.phone.MyBuddies.forEach(function (buddy) {
            var _a;
            (_a = buddy.Sessions) === null || _a === void 0 ? void 0 : _a.forEach(function (s) {
                if (s.Id === sessionId) {
                    if (s.TimerInterval) {
                        clearInterval(s.TimerInterval);
                        s.TimerInterval = null;
                    }
                }
            });
        });
    };
    /**
     * Update the timer value for a session
     * @param sessionId - The session ID to update
     * @param timer - The new timer value in seconds
     */
    /**
     * Update a session's timer to a specific value.
     * @param sessionId - Session ID
     * @param timer - Seconds to set
     */
    BrowserPhoneSipProvider.UpdateTimer = function (sessionId, timer) {
        var _a;
        // find session by id
        (_a = window.phone.MyBuddies) === null || _a === void 0 ? void 0 : _a.forEach(function (buddy) {
            var _a;
            (_a = buddy.Sessions) === null || _a === void 0 ? void 0 : _a.forEach(function (s) {
                if (s.Id === sessionId) {
                    if (!(s === null || s === void 0 ? void 0 : s.Timer)) {
                        s.Timer = 0;
                    }
                    s.Timer = timer;
                }
            });
        });
    };
    //#endregion Call Timer Utilities
    // -- Call Detail Records (CDR) --
    //#region Call Detail Records (CDR)
    /**
     * Safely stringify objects with circular references for logging.
     * @param value - Value to serialize
     * @returns Safely stringified value
     */
    BrowserPhoneSipProvider.SafeStringify = function (value) {
        if (value === null || value === undefined) {
            return String(value);
        }
        if (typeof value !== "object") {
            return JSON.stringify(value);
        }
        var seen = new WeakSet();
        try {
            return JSON.stringify(value, function (key, val) {
                if (typeof val === "object" && val !== null) {
                    if (seen.has(val)) {
                        return "[Circular Reference]";
                    }
                    seen.add(val);
                }
                return val;
            });
        }
        catch (error) {
            return JSON.stringify({ error: "Failed to stringify value", type: typeof value });
        }
    };
    /**
     * Build and add a Call Detail Record (CDR) message for a completed call
     * @param sessionId - The session ID to create CDR for
     * @returns Promise that resolves when CDR is created and added
     */
    /**
     * Extract a named header value from a raw SIP message string.
     * @param sipData - Raw SIP message text
     * @param header - Header name (case-insensitive, e.g. "from")
     */
    BrowserPhoneSipProvider._extractSipHeader = function (sipData, header) {
        var prefix = header.toLowerCase() + ":";
        for (var _i = 0, _a = sipData.split(/\r?\n/); _i < _a.length; _i++) {
            var line = _a[_i];
            if (line.toLowerCase().startsWith(prefix)) {
                return line.substring(header.length + 1).trim();
            }
        }
        return "";
    };
    /**
     * Parse the user part of the From URI out of a SIP header string or invite message object.
     * Handles sanitized SIP.js objects ({ message: { from, data } }), plain From header strings,
     * and raw SIP message strings.
     * Returns the local-part of the SIP URI (e.g. "1001" from "sip:1001@domain.com").
     */
    BrowserPhoneSipProvider._sipFromUser = function (inviteMessage, inviteFrom) {
        var _a, _b;
        var toStr = function (v) {
            if (!v)
                return "";
            if (typeof v === "string")
                return v;
            if (typeof (v === null || v === void 0 ? void 0 : v.toString) === "function")
                return v.toString();
            return "";
        };
        var parseUser = function (fromHeader) {
            try {
                var s = toStr(fromHeader);
                if (!s)
                    return "";
                var angleMatch = s.match(/<sips?:([^@>]+)@/);
                if (angleMatch)
                    return angleMatch[1];
                var bareMatch = s.match(/sips?:([^@;>\s]+)@/);
                return (bareMatch === null || bareMatch === void 0 ? void 0 : bareMatch[1]) || "";
            }
            catch (_a) {
                return "";
            }
        };
        if (inviteMessage) {
            try {
                var fromHeader = "";
                if (typeof inviteMessage === "object") {
                    // Sanitized SIP.js object: { message: { from, data } }
                    fromHeader = ((_a = inviteMessage === null || inviteMessage === void 0 ? void 0 : inviteMessage.message) === null || _a === void 0 ? void 0 : _a.from) || (inviteMessage === null || inviteMessage === void 0 ? void 0 : inviteMessage.from) || "";
                    if (!fromHeader) {
                        var rawData = toStr(((_b = inviteMessage === null || inviteMessage === void 0 ? void 0 : inviteMessage.message) === null || _b === void 0 ? void 0 : _b.data) || (inviteMessage === null || inviteMessage === void 0 ? void 0 : inviteMessage.data));
                        if (rawData)
                            fromHeader = BrowserPhoneSipProvider._extractSipHeader(rawData, "from");
                    }
                }
                else if (typeof inviteMessage === "string") {
                    fromHeader = BrowserPhoneSipProvider._extractSipHeader(inviteMessage, "from");
                }
                var user = parseUser(fromHeader);
                if (user)
                    return user;
            }
            catch (_c) {
                // fall through to inviteFrom
            }
        }
        // Fallback: InviteFrom stored separately (outbound calls — From header from outgoingRequestMessage)
        return parseUser(inviteFrom);
    };
    /**
     * Builds and adds a Call Detail Record (CDR) message for a completed call
     * @param sessionId - The session ID to create CDR for
     * @returns Promise that resolves when CDR is created and added
     */
    BrowserPhoneSipProvider.BuildAndAddCDRMessage = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var Session, buddy, e_36, parentSession, e_37, contactNumber, sessionInfo, message, duration, duration, duration, cleanedSessionData, _rc, _tb, _tb, Events, CDRMessageData, normalizeCdrIds, cdrIdsFromData, cdrIdsFromSession, cdrIdsFromConference, parentSession_1, cdrIdsFromParent, mergedCdrIds, _i, _a, recording, result, e_38, CleanedMessage, safeMessage, error_35, e_39;
                        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41;
                        return __generator(this, function (_42) {
                            switch (_42.label) {
                                case 0:
                                    _42.trys.push([0, 23, , 24]);
                                    Session = BrowserPhoneSipProvider.SessionManager.get(sessionId);
                                    if (!Session) {
                                        console.warn(__TAG__ + "BuildAndAddCDRMessage: Session not found", sessionId);
                                        resolve(null);
                                        return [2 /*return*/];
                                    }
                                    // console.log(__TAG__ + "BuildAndAddCDRMessage: Session", BrowserPhoneSipProvider.SafeStringify(Session));
                                    if (!Session.Data) {
                                        Session.Data = {};
                                    }
                                    // Check if CDR was already created to prevent duplicates
                                    if ((_b = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _b === void 0 ? void 0 : _b.CDRCreated) {
                                        console.warn(__TAG__ + "BuildAndAddCDRMessage: CDR already created for session", sessionId);
                                        resolve(null);
                                        return [2 /*return*/];
                                    }
                                    // Mark CDR as being created to prevent race conditions
                                    BrowserPhoneSipProvider.UpdateSession(sessionId, {
                                        Data: {
                                            CDRCreated: true
                                        }
                                    });
                                    buddy = null;
                                    // Try to get buddy from session's BuddyId first
                                    if (Session === null || Session === void 0 ? void 0 : Session.BuddyId) {
                                        buddy = BrowserPhoneSipProvider.GetBuddyWithID(Session.BuddyId);
                                    }
                                    if (!!buddy) return [3 /*break*/, 4];
                                    _42.label = 1;
                                case 1:
                                    _42.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, BrowserPhoneSipProvider.GetBuddyWithSession(sessionId)];
                                case 2:
                                    buddy = _42.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_36 = _42.sent();
                                    console.warn(__TAG__ + "BuildAndAddCDRMessage: Failed to get buddy with session", e_36);
                                    return [3 /*break*/, 4];
                                case 4:
                                    if (!(!buddy && Session.ParentSessionId)) return [3 /*break*/, 9];
                                    _42.label = 5;
                                case 5:
                                    _42.trys.push([5, 8, , 9]);
                                    parentSession = BrowserPhoneSipProvider.SessionManager.get(Session.ParentSessionId);
                                    if (parentSession && parentSession.BuddyId) {
                                        buddy = BrowserPhoneSipProvider.GetBuddyWithID(parentSession.BuddyId);
                                    }
                                    if (!(!buddy && parentSession)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.GetBuddyWithSession(Session.ParentSessionId)];
                                case 6:
                                    buddy = _42.sent();
                                    _42.label = 7;
                                case 7: return [3 /*break*/, 9];
                                case 8:
                                    e_37 = _42.sent();
                                    console.warn(__TAG__ + "BuildAndAddCDRMessage: Failed to get parent session buddy", e_37);
                                    return [3 /*break*/, 9];
                                case 9:
                                    // Try ParentBuddyId if available
                                    if (!buddy && Session.ParentBuddyId) {
                                        buddy = BrowserPhoneSipProvider.GetBuddyWithID(Session.ParentBuddyId);
                                    }
                                    // Try to find buddy by contact number (From/To) as last resort
                                    if (!buddy && Session.Data) {
                                        try {
                                            contactNumber = Session.Data.FromNumber || Session.Data.ToNumber || Session.Data.From || Session.Data.To;
                                            if (contactNumber && window.phone.GetBuddyByContact) {
                                                buddy = window.phone.GetBuddyByContact(contactNumber);
                                            }
                                        }
                                        catch (e) {
                                            console.warn(__TAG__ + "BuildAndAddCDRMessage: Failed to get buddy by contact", e);
                                        }
                                    }
                                    if (!buddy) {
                                        sessionInfo = {
                                            SessionId: sessionId,
                                            BuddyId: Session.BuddyId,
                                            ParentSessionId: Session === null || Session === void 0 ? void 0 : Session.ParentSessionId,
                                            ParentBuddyId: Session === null || Session === void 0 ? void 0 : Session.ParentBuddyId,
                                            DisplayName: Session.DisplayName,
                                            Direction: (_c = Session.Data) === null || _c === void 0 ? void 0 : _c.Direction,
                                            From: (_d = Session.Data) === null || _d === void 0 ? void 0 : _d.From,
                                            To: (_e = Session.Data) === null || _e === void 0 ? void 0 : _e.To,
                                            FromNumber: (_f = Session.Data) === null || _f === void 0 ? void 0 : _f.FromNumber,
                                            ToNumber: (_g = Session.Data) === null || _g === void 0 ? void 0 : _g.ToNumber,
                                            ConferenceCall: Session === null || Session === void 0 ? void 0 : Session.ConferenceCall,
                                            ConferenceChildren: Session === null || Session === void 0 ? void 0 : Session.ConferenceChildren
                                        };
                                        console.warn(__TAG__ + "BuildAndAddCDRMessage: Buddy not found for session", sessionInfo);
                                        resolve(null);
                                        return [2 /*return*/];
                                    }
                                    if (!Session) return [3 /*break*/, 21];
                                    message = {
                                        Direction: 'inbound',
                                        Date: window.phone.TimeNow(),
                                        Body: "",
                                        Type: 'CDR',
                                        MessageId: Session.Id,
                                        Duration: Session.Data.Duration || 0,
                                    };
                                    if (!Session.Data) {
                                        Session.Data = {};
                                    }
                                    if (Session.Data.Direction == 'inbound') {
                                        Session.Data.ToName = window.phone.Settings.ProfileUserName || "";
                                        Session.Data.ToNumber = "Unknown check connections";
                                    }
                                    Session.Data.RingTime = 0;
                                    Session.Data.TalkTime = 0;
                                    Session.Data.Duration = 0;
                                    Session.Data.Provider = "sip";
                                    message.Direction = Session.Data.Direction;
                                    message.Date = Session.Data.DateAndTime;
                                    message.TalkTime = 0;
                                    message.WithVideo = Session.WithVideo || Session.Data.WithVideo || false;
                                    if (!Session.Data.EndTime) {
                                        Session.Data.EndTime = window.phone.TimeNow();
                                    }
                                    // Sanity Check
                                    // if (!Session.Data.EndTime  || !Session.Data.From || !Session.Data.To) {
                                    // }
                                    // Talk Time
                                    if (((_h = Session.Data) === null || _h === void 0 ? void 0 : _h.AnswerTime) && ((_j = Session.Data) === null || _j === void 0 ? void 0 : _j.EndTime)) {
                                        duration = BrowserPhoneSipProvider.CalculateDuration(Session.Data.AnswerTime, Session.Data.EndTime);
                                        Session.Data.Duration = duration;
                                        Session.Data.TalkTime = duration;
                                    }
                                    else {
                                        Session.Data.Duration = 0;
                                        Session.Data.TalkTime = 0;
                                    }
                                    // Ring Time - time from start to answer (or end if not answered)
                                    if (((_k = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _k === void 0 ? void 0 : _k.StartTime) && ((_l = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _l === void 0 ? void 0 : _l.AnswerTime)) {
                                        duration = BrowserPhoneSipProvider.CalculateDuration(Session.Data.StartTime, Session.Data.AnswerTime);
                                        Session.Data.RingTime = duration;
                                    }
                                    else if (((_m = Session.Data) === null || _m === void 0 ? void 0 : _m.StartTime) && ((_o = Session.Data) === null || _o === void 0 ? void 0 : _o.EndTime)) {
                                        duration = BrowserPhoneSipProvider.CalculateDuration(Session.Data.StartTime, Session.Data.EndTime);
                                        Session.Data.RingTime = duration;
                                    }
                                    else {
                                        Session.Data.RingTime = 0;
                                    }
                                    if (Session.Data.RingTime < 0)
                                        Session.Data.RingTime = 0;
                                    if (Session.Data.TalkTime < 0)
                                        Session.Data.TalkTime = 0;
                                    if ((_p = Session.Data) === null || _p === void 0 ? void 0 : _p.RtpSenderStats) {
                                        // message.Body += "\nRtpSenderStats: " + JSON.stringify(Session.Data?.RtpSenderStats.slice(0, 10).join(", "));
                                    }
                                    if ((_q = Session.Data) === null || _q === void 0 ? void 0 : _q.RtpReceiverStats) {
                                        // message.Body += "\nRtpReceiverStats: " + JSON.stringify(Session.Data?.RtpReceiverStats.slice(0, 10).join(", "));
                                    }
                                    cleanedSessionData = Session.Data;
                                    cleanedSessionData.Events = ((_r = BrowserPhoneSipProvider.SessionManager.get(sessionId)) === null || _r === void 0 ? void 0 : _r.Events) || [];
                                    // Disposition fallback — set a sensible value if not already assigned by a handler
                                    if (!((_s = Session.Data) === null || _s === void 0 ? void 0 : _s.Disposition)) {
                                        _rc = (_t = Session.Data) === null || _t === void 0 ? void 0 : _t.ReasonCode;
                                        _tb = (((_u = Session.Data) === null || _u === void 0 ? void 0 : _u.TerminatedBy) || '').toLowerCase();
                                        if (_rc == 16) {
                                            Session.Data.Disposition = SipProviderTypes_1.Dispositions.NormalCallClearing;
                                        }
                                        else if (_rc === 486 || _rc === 600) {
                                            Session.Data.Disposition = SipProviderTypes_1.Dispositions.BusyHere;
                                        }
                                        else if (_rc === 487) {
                                            // SIP 487 = Request Terminated (cancel before answer)
                                            Session.Data.Disposition = (_tb === 'them') ? SipProviderTypes_1.Dispositions.Missed : SipProviderTypes_1.Dispositions.Cancelled;
                                        }
                                        else if (_rc === 603 || _rc === 403 || _rc === 488 || _rc === 480 || _rc === 404) {
                                            Session.Data.Disposition = SipProviderTypes_1.Dispositions.CallRejected;
                                        }
                                        else if (typeof _rc === 'number' && _rc >= 500 && _rc < 600) {
                                            // SIP 5xx = Server / infrastructure failure
                                            Session.Data.Disposition = SipProviderTypes_1.Dispositions.CallFailed;
                                        }
                                    }
                                    // Ultimate fallback — pre-INVITE teardown where no SIP response code is available
                                    if (!((_v = Session.Data) === null || _v === void 0 ? void 0 : _v.Disposition)) {
                                        _tb = (((_w = Session.Data) === null || _w === void 0 ? void 0 : _w.TerminatedBy) || '').toLowerCase();
                                        Session.Data.Disposition = (_tb === 'them') ? SipProviderTypes_1.Dispositions.Missed : SipProviderTypes_1.Dispositions.Cancelled;
                                    }
                                    Events = [];
                                    try {
                                        Events = ((_x = Session.Data) === null || _x === void 0 ? void 0 : _x.Events) || Session.Events || ((_y = window.phone.GetSession(sessionId)) === null || _y === void 0 ? void 0 : _y.Events) || [];
                                        if (Events.length == 0 || Events == null) {
                                            Events = [];
                                        }
                                        Events = Events.filter(function (event) { return event != null; });
                                        // if (Events.length > 0) {
                                        //   for (var event of Events) {
                                        //     if ((window as any).phone?.Lang) {
                                        //       if ((window as any).phone.Lang[event.Activity] !== undefined && (window as any).phone.Lang[event.Activity] !== null) {
                                        //         event.Activity = (window as any).phone.Lang[event.Activity];
                                        //       } else {
                                        //         event.Activity = event.Activity || "Unknown";
                                        //       }
                                        //     } else {
                                        //       event.Activity = event.Activity || "Unknown";
                                        //     }
                                        //   }
                                        // }
                                    }
                                    catch (error) {
                                        Events = [];
                                    }
                                    CDRMessageData = {
                                        ExtraCallDetailRecordValues: ((_z = BrowserPhoneSipProvider.Settings) === null || _z === void 0 ? void 0 : _z.ExtraCallDetailRecordValues) || {},
                                        SessionId: Session.Id,
                                        BuddyId: buddy.Id,
                                        Direction: Session.Data.Direction,
                                        StartTime: Session.Data.StartTime || Session.StartTime,
                                        EndTime: Session.Data.EndTime,
                                        TalkTime: Session.Data.TalkTime,
                                        Duration: Session.Data.TalkTime,
                                        AnswerTime: Session.Data.AnswerTime || Session.AnswerTime || undefined,
                                        UserAgent: ((_0 = Session.Data) === null || _0 === void 0 ? void 0 : _0.UserAgent) || "",
                                        ProviderData: {
                                            Type: "sip",
                                            Description: BrowserPhoneSipProvider.ProviderDescription || "",
                                            Invite: ((_1 = Session.Data) === null || _1 === void 0 ? void 0 : _1.InviteMessage) || "",
                                            TargetUri: ((_2 = Session.Data) === null || _2 === void 0 ? void 0 : _2.TargetUri) || "",
                                            User: BrowserPhoneSipProvider._sipFromUser((_3 = Session.Data) === null || _3 === void 0 ? void 0 : _3.InviteMessage, (_4 = Session.Data) === null || _4 === void 0 ? void 0 : _4.InviteFrom),
                                            ReasonCode: Session.Data.ReasonCode,
                                            ReasonText: Session.Data.ReasonText,
                                        },
                                        ProfileUserId: Session.ProfileUserId || window.phone.PROFILE_USER_ID || "",
                                        ToName: Session.Data.ToName || Session.ToName || "",
                                        ToNumber: ((_5 = Session.Data) === null || _5 === void 0 ? void 0 : _5.ToNumber) || Session.ToNumber || ((_6 = window.phone.GetSession(sessionId)) === null || _6 === void 0 ? void 0 : _6.ToNumber) || "",
                                        FromName: ((_7 = Session.Data) === null || _7 === void 0 ? void 0 : _7.FromName) || Session.FromName || "",
                                        FromNumber: ((_8 = Session.Data) === null || _8 === void 0 ? void 0 : _8.FromNumber) || Session.FromNumber || ((_9 = window.phone.GetSession(sessionId)) === null || _9 === void 0 ? void 0 : _9.FromNumber) || "",
                                        WithVideo: Session.WithVideo || Session.Data.WithVideo || false,
                                        Events: Events,
                                        Network: Session.Data.Network || "",
                                        CallId: Session.Data.CallId,
                                        Disposition: Session.Data.Disposition,
                                        TerminatedBy: Session.Data.TerminatedBy || Session.TerminatedBy || "",
                                        ReasonCode: Session.Data.ReasonCode,
                                        ReasonText: Session.Data.ReasonText,
                                        TransferFromDisplayName: ((_10 = Session.Data) === null || _10 === void 0 ? void 0 : _10.TransferFromDisplayName) || undefined,
                                        TransferToDisplayName: ((_11 = Session.Data) === null || _11 === void 0 ? void 0 : _11.TransferToDisplayName) || undefined,
                                        BlindTransferDestination: ((_12 = Session.Data) === null || _12 === void 0 ? void 0 : _12.BlindTransferDestination) || undefined,
                                        AttendedTransferee: ((_13 = Session.Data) === null || _13 === void 0 ? void 0 : _13.AttendedTransferee) || undefined,
                                        AttendedTransferTarget: ((_14 = Session.Data) === null || _14 === void 0 ? void 0 : _14.AttendedTransferTarget) || undefined,
                                        PeerConnection: {
                                            InboundRtpStreamStats: (((_15 = window.phone.GetSession(sessionId)) === null || _15 === void 0 ? void 0 : _15.RtpReceiverStats) || ((_16 = Session.Data) === null || _16 === void 0 ? void 0 : _16.RtpReceiverStats) || []).filter(function (item) { return item != null; }),
                                            OutboundRtpStreamStats: (((_17 = window.phone.GetSession(sessionId)) === null || _17 === void 0 ? void 0 : _17.RtpSenderStats) || ((_18 = Session.Data) === null || _18 === void 0 ? void 0 : _18.RtpSenderStats) || []).filter(function (item) { return item != null; }),
                                            RemoteInboundRtpStreamStats: (((_19 = window.phone.GetSession(sessionId)) === null || _19 === void 0 ? void 0 : _19.RtpRemoteInboundStats) || ((_20 = Session.Data) === null || _20 === void 0 ? void 0 : _20.RtpRemoteInboundStats) || ((_22 = (_21 = BrowserPhoneSipProvider.SessionManager.get(sessionId)) === null || _21 === void 0 ? void 0 : _21.Data) === null || _22 === void 0 ? void 0 : _22.RtpRemoteInboundStats) || []).filter(function (item) { return item != null; }),
                                            SdpData: Session.Data.LocalDescription || Session.LocalDescription || ((_23 = Session.Data) === null || _23 === void 0 ? void 0 : _23.SdpData) || "",
                                            IceCandidate: ((_24 = Session.Data) === null || _24 === void 0 ? void 0 : _24.IceCandidates) || [],
                                            TurnServer: ((_25 = Session.Data) === null || _25 === void 0 ? void 0 : _25.TurnServer) || Session.TurnServer || ((_26 = Session.Data) === null || _26 === void 0 ? void 0 : _26.TurnServer) || "",
                                            StunServer: (Session === null || Session === void 0 ? void 0 : Session.StunServer) || ((_27 = Session.Data) === null || _27 === void 0 ? void 0 : _27.StunServer) || "",
                                        }
                                    };
                                    normalizeCdrIds = function (items) {
                                        if (!Array.isArray(items))
                                            return [];
                                        var ids = items
                                            .map(function (item) { return (typeof item === "string" ? item : item === null || item === void 0 ? void 0 : item.CDRId); })
                                            .filter(function (id) { return typeof id === "string" && id.length > 0; });
                                        return Array.from(new Set(ids));
                                    };
                                    cdrIdsFromData = normalizeCdrIds(((_28 = Session.Data) === null || _28 === void 0 ? void 0 : _28.CDRs) || []);
                                    cdrIdsFromSession = normalizeCdrIds(Session.CDRs || []);
                                    cdrIdsFromConference = normalizeCdrIds(Session.ConferenceChildren || []).filter(function (id) { return id !== Session.Id; });
                                    parentSession_1 = Session.ParentSessionId
                                        ? BrowserPhoneSipProvider.SessionManager.get(Session.ParentSessionId)
                                        : null;
                                    cdrIdsFromParent = parentSession_1
                                        ? normalizeCdrIds(__spreadArray([parentSession_1.Id], (parentSession_1.ConferenceChildren || []), true)).filter(function (id) { return id !== Session.Id; })
                                        : [];
                                    mergedCdrIds = Array.from(new Set(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], cdrIdsFromData, true), cdrIdsFromSession, true), cdrIdsFromConference, true), cdrIdsFromParent, true)));
                                    if (mergedCdrIds.length > 0) {
                                        CDRMessageData.CDRs = mergedCdrIds.map(function (id) { return ({ CDRId: id }); });
                                    }
                                    if (__DEBUG__ && (((_29 = Session.ConferenceChildren) === null || _29 === void 0 ? void 0 : _29.length) || Session.ConferenceCall || Session.ParentSessionId)) {
                                        console.log(__TAG__ + "BuildAndAddCDRMessage: Conference CDR links", {
                                            SessionId: Session.Id,
                                            ConferenceChildren: Session.ConferenceChildren || [],
                                            CDRs: mergedCdrIds
                                        });
                                    }
                                    try {
                                        delete cleanedSessionData.SipHandlerCompleted;
                                        delete cleanedSessionData.ProviderCompleted;
                                        delete cleanedSessionData.CallCancelledByUs;
                                        delete cleanedSessionData.UserInitiated;
                                        delete cleanedSessionData.TeardownCompleted;
                                        delete cleanedSessionData.PeerConnectionStatsIntervalTimer;
                                        delete cleanedSessionData.AudioLevelIntervalTimer;
                                        delete cleanedSessionData.PeerConnection;
                                        delete cleanedSessionData.RtpReceiverAudioMediaStream;
                                        delete cleanedSessionData.LocalMediaStream;
                                    }
                                    catch (error) {
                                    }
                                    cleanedSessionData.Provider = {
                                        Type: "sip",
                                        Invite: ((_30 = Session.Data) === null || _30 === void 0 ? void 0 : _30.InviteMessage) || "",
                                        To: (_31 = Session.Data) === null || _31 === void 0 ? void 0 : _31.To,
                                        From: (_32 = Session.Data) === null || _32 === void 0 ? void 0 : _32.From,
                                        CallId: ((_33 = Session.Data) === null || _33 === void 0 ? void 0 : _33.CallId) || (Session === null || Session === void 0 ? void 0 : Session.CallId) || "",
                                        SpdData: ((_34 = Session.Data) === null || _34 === void 0 ? void 0 : _34.LocalDescription) || "",
                                        ReasonCode: (_35 = Session.Data) === null || _35 === void 0 ? void 0 : _35.ReasonCode,
                                        ReasonText: (_36 = Session.Data) === null || _36 === void 0 ? void 0 : _36.ReasonText,
                                        TerminatedBy: (_37 = Session.Data) === null || _37 === void 0 ? void 0 : _37.TerminatedBy,
                                    };
                                    _42.label = 10;
                                case 10:
                                    _42.trys.push([10, 15, , 16]);
                                    if (!(Session.Data.Recordings && Session.Data.Recordings.length > 0)) return [3 /*break*/, 14];
                                    _i = 0, _a = Session.Data.Recordings;
                                    _42.label = 11;
                                case 11:
                                    if (!(_i < _a.length)) return [3 /*break*/, 14];
                                    recording = _a[_i];
                                    if (!(recording.State == "recording")) return [3 /*break*/, 13];
                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.StopRecording(Session)];
                                case 12:
                                    result = _42.sent();
                                    recording.State = "completed";
                                    recording.StopTime = window.phone.TimeNow();
                                    _42.label = 13;
                                case 13:
                                    _i++;
                                    return [3 /*break*/, 11];
                                case 14: return [3 /*break*/, 16];
                                case 15:
                                    e_38 = _42.sent();
                                    console.warn(__TAG__ + "BuildAndAddCDRMessage Error", e_38);
                                    return [3 /*break*/, 16];
                                case 16:
                                    CleanedMessage = __assign({ Id: Session.Id, Type: 'CDR', Body: ((_38 = Session.Data) === null || _38 === void 0 ? void 0 : _38.Direction) + " call to " + ((_39 = Session.Data) === null || _39 === void 0 ? void 0 : _39.To) + " Duration: " + ((_40 = Session.Data) === null || _40 === void 0 ? void 0 : _40.Duration) + " " + Session.Data.Disposition, Date: (_41 = Session.Data) === null || _41 === void 0 ? void 0 : _41.StartTime, Direction: Session.Data.Direction, WithVideo: Session.WithVideo || Session.Data.WithVideo || false, Recordings: Session.Data.Recordings || [], Flagged: false, Comments: [], Reactions: [] }, CDRMessageData);
                                    try {
                                        delete cleanedSessionData.RtpSenderStats;
                                        delete cleanedSessionData.RtpReceiverStats;
                                        delete cleanedSessionData.InviteMessage;
                                        delete cleanedSessionData.LocalDescription;
                                        delete cleanedSessionData.DateAndTime;
                                        delete cleanedSessionData.PeerConnection;
                                        delete cleanedSessionData.LocalMediaStream;
                                        delete cleanedSessionData.CallId;
                                    }
                                    catch (error) {
                                    }
                                    if (cleanedSessionData.Direction == "inbound" && cleanedSessionData.Duration == 0) {
                                        if (window.phone.AddMissedCallBadge) {
                                            window.phone.AddMissedCallBadge(buddy);
                                        }
                                    }
                                    _42.label = 17;
                                case 17:
                                    _42.trys.push([17, 19, , 20]);
                                    safeMessage = BrowserPhoneSipProvider.SanitizeForStorage(CleanedMessage);
                                    return [4 /*yield*/, window.phone.AddMessage(buddy, safeMessage)];
                                case 18:
                                    _42.sent();
                                    BrowserPhoneSipProvider.PostMessage({
                                        Event: SipProviderTypes_1.SipProviderPostMessage.OnCallDetailRecord,
                                        Source: "SipProvider",
                                        Destination: "Phone",
                                        Data: __assign({ SessionId: sessionId }, safeMessage)
                                    });
                                    resolve(safeMessage);
                                    return [3 /*break*/, 20];
                                case 19:
                                    error_35 = _42.sent();
                                    console.warn(__TAG__ + "BuildAndAddCDRMessage: Error adding message", error_35.message);
                                    resolve(false);
                                    return [3 /*break*/, 20];
                                case 20: return [3 /*break*/, 22];
                                case 21:
                                    console.warn(__TAG__ + "BuildAndAddCDRMessage: Session or buddy not available", sessionId);
                                    resolve(false);
                                    _42.label = 22;
                                case 22: return [3 /*break*/, 24];
                                case 23:
                                    e_39 = _42.sent();
                                    console.warn(__TAG__ + "BuildAndAddCDRMessage", e_39.message);
                                    resolve(false);
                                    return [3 /*break*/, 24];
                                case 24: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    //#endregion Call Detail Records (CDR)
    // -- Incoming Call Post-setup --
    //#region Incoming Call Post-setup
    /**
     * Handle the completion of an incoming call session. DoNotDisturb, AutoAnswer, CallWaiting are handled here.
     * @param session - The initialized incoming session
     */
    BrowserPhoneSipProvider.IncomingCallCompleted = function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var incomingSession, buddy, isDoNotDistubEnabled, isAutoAnswerEnabled, isCallWaitingEnabled, isSelectRingingLineEnabled, hasActiveCalls, phoneBuddy, phoneBuddy, answerTimeout;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        incomingSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                        return [4 /*yield*/, window.phone.GetBuddyById(session.BuddyId)];
                    case 1:
                        buddy = _a.sent();
                        if (buddy && incomingSession) {
                            BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                Status: SipProviderTypes_1.CallStatus.Incoming
                            });
                            BrowserPhoneSipProvider.StartCallTimer(session.Id);
                            if (!incomingSession.Data) {
                                incomingSession.Data = {};
                            }
                            window.phone.UpdateBuddyList();
                            window.phone.UpdateStage();
                            isDoNotDistubEnabled = window.phone.Settings.DoNotDisturb && typeof window.phone.Settings.DoNotDisturb == "boolean";
                            isAutoAnswerEnabled = window.phone.Settings.AutoAnswer && typeof window.phone.Settings.AutoAnswer == "boolean";
                            isCallWaitingEnabled = window.phone.Settings.CallWaiting && typeof window.phone.Settings.CallWaiting == "boolean";
                            isSelectRingingLineEnabled = window.phone.Settings.SelectRingingLine && typeof window.phone.Settings.SelectRingingLine == "boolean";
                            hasActiveCalls = window.phone.GetCallCount(session.Id) > 0;
                            // Sanity Checks
                            if (isDoNotDistubEnabled === undefined) {
                                isDoNotDistubEnabled = false;
                                window.phone.Settings.DoNotDisturb = false;
                                window.phone.SaveSettings();
                            }
                            if (isAutoAnswerEnabled === undefined) {
                                isAutoAnswerEnabled = false;
                                window.phone.Settings.AutoAnswer = false;
                                window.phone.SaveSettings();
                            }
                            if (isSelectRingingLineEnabled === undefined) {
                                isSelectRingingLineEnabled = false;
                                window.phone.Settings.SelectRingingLine = false;
                                window.phone.SaveSettings();
                            }
                            if (isCallWaitingEnabled === undefined) {
                                isCallWaitingEnabled = true;
                                window.phone.Settings.CallWaiting = true;
                                window.phone.SaveSettings();
                            }
                            if (window.phone.GetCallCount(session.Id) <= 1) {
                                phoneBuddy = window.phone.MyBuddies.find(function (b) { return b.Id == buddy.Id; });
                                if (phoneBuddy) {
                                    window.phone.SelectBuddy(phoneBuddy);
                                }
                            }
                            else {
                                if (isSelectRingingLineEnabled) {
                                    if (__DEBUG__)
                                        console.log(__TAG__ + "%cSelectRingingLine Enabled: " + window.phone.Settings.SelectRingingLine, "color: teal; font-weight: bold;");
                                    phoneBuddy = window.phone.MyBuddies.find(function (b) { return b.Id == buddy.Id; });
                                    if (phoneBuddy) {
                                        window.phone.SelectBuddy(phoneBuddy);
                                    }
                                }
                            }
                            if (isDoNotDistubEnabled) {
                                if (buddy === null || buddy === void 0 ? void 0 : buddy.EnableDuringDnd) { }
                                else {
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var sessionDND, response, e_40;
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    window.phone.AddSessionEvent(session.Id, {
                                                        Timestamp: window.phone.TimeNow(),
                                                        Activity: SipProviderTypes_1.SipProviderPostMessage.CallDeclinedByDoNotDisturb,
                                                        Data: {
                                                            SessionId: session.Id,
                                                            Time: window.phone.TimeNow(),
                                                            DisplayName: session.DisplayName,
                                                            BuddyId: session.BuddyId,
                                                            Direction: 'inbound',
                                                            From: (session === null || session === void 0 ? void 0 : session.From) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.From),
                                                        }
                                                    });
                                                    // Log in color red
                                                    if (__DEBUG__)
                                                        console.log(__TAG__ + "%c Incoming Call Declined by Do Not Disturb");
                                                    sessionDND = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                    BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                        Data: {
                                                            DateAndTime: window.phone.TimeNow(),
                                                            EndTime: window.phone.TimeNow(),
                                                            TerminatedBy: 'us',
                                                            StartTime: window.phone.TimeNow(),
                                                            Duration: 0,
                                                            ReasonCode: 0,
                                                            ReasonText: 'Call Declined by DoNotDisturb',
                                                            Direction: 'inbound'
                                                        }
                                                    });
                                                    window.phone.UpdateProfileStatus("☎️Call Declined by DoNotDisturb");
                                                    _b.label = 1;
                                                case 1:
                                                    _b.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, BrowserPhoneSipProvider.Core.Decline(sessionDND, 486, 'Do Not Disturb')];
                                                case 2:
                                                    response = _b.sent();
                                                    if (__DEBUG__)
                                                        console.log(__TAG__ + "OnIncomingCall DoNotDisturb Decline response", response);
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_40 = _b.sent();
                                                    console.warn(__TAG__ + "OnIncomingCall DoNotDisturb Decline failed", e_40);
                                                    return [3 /*break*/, 4];
                                                case 4:
                                                    BrowserPhoneSipProvider.RemoveSession(session.Id);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 100);
                                }
                            }
                            if (isAutoAnswerEnabled) {
                                if (__DEBUG__)
                                    console.log(__TAG__ + "AutoAnswer Enabled");
                                answerTimeout = 1000;
                                if (typeof window.phone.Settings.AutoAnswerTimeout == "number" && window.phone.Settings.AutoAnswerTimeout) {
                                    answerTimeout = window.phone.Settings.AutoAnswerTimeout;
                                }
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var answerSession, response, updatedData, key;
                                    var _a, _b, _c, _d, _e;
                                    return __generator(this, function (_f) {
                                        switch (_f.label) {
                                            case 0:
                                                window.phone.AddSessionEvent(session.Id, {
                                                    Timestamp: window.phone.TimeNow(),
                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.AutoAnswer,
                                                    Data: {
                                                        SessionId: session.Id,
                                                        Time: window.phone.TimeNow(),
                                                        DisplayName: session.DisplayName,
                                                        BuddyId: session.BuddyId,
                                                        Direction: 'inbound',
                                                        From: (session === null || session === void 0 ? void 0 : session.From) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.From),
                                                    }
                                                });
                                                session.Status = SipProviderTypes_1.CallStatus.CallInProgress;
                                                BrowserPhoneSipProvider.UpdateSession(session.Id, {
                                                    Status: SipProviderTypes_1.CallStatus.CallInProgress,
                                                    AnswerTime: window.phone.TimeNow(),
                                                    Data: {
                                                        AnswerTime: window.phone.TimeNow(),
                                                    }
                                                });
                                                window.phone.UpdateCallStatus(session.Id, "☎️Call Answered with AutoAnswer");
                                                answerSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                if (!answerSession) return [3 /*break*/, 2];
                                                return [4 /*yield*/, BrowserPhoneSipProvider.Core.Answer(answerSession)];
                                            case 1:
                                                response = _f.sent();
                                                // console.log(__TAG__ + "AutoAnswer: Answer response", response);
                                                if (response.Success == true) {
                                                    if (response.CallData) {
                                                        updatedData = {};
                                                        for (key in response.CallData) {
                                                            updatedData[key] = response.CallData[key];
                                                        }
                                                        BrowserPhoneSipProvider.UpdateSession(answerSession.Id, {
                                                            Data: {
                                                                AnswerTime: window.phone.TimeNow(),
                                                                InviteMessage: ((_b = response.CallData.Data) === null || _b === void 0 ? void 0 : _b.InviteMessage) || "",
                                                                StunServer: ((_c = response.CallData.Data) === null || _c === void 0 ? void 0 : _c.StunServer) || answerSession.StunServer || "",
                                                                TurnServer: ((_d = response.CallData.Data) === null || _d === void 0 ? void 0 : _d.TurnServer) || answerSession.TurnServer || "",
                                                                SdpData: ((_e = response.CallData.Data) === null || _e === void 0 ? void 0 : _e.LocalDescription) || "",
                                                            }
                                                        });
                                                    }
                                                }
                                                _f.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); }, answerTimeout);
                            }
                            // Call Waiting
                            if (hasActiveCalls && isCallWaitingEnabled) {
                                if (__DEBUG__)
                                    console.log(__TAG__ + "Call Waiting is enabled, rejecting call");
                                window.phone.UpdateProfileStatus("☎️Call Waiting is enabled, rejecting call");
                                window.phone.UpdateCallStatus(session.Id, "☎️Call Waiting is enabled, rejecting call");
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var declineSession, buddy, response, e_41;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 3, , 4]);
                                                declineSession = BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                                window.phone.AddSessionEvent(declineSession.Id, {
                                                    Timestamp: window.phone.TimeNow(),
                                                    Activity: SipProviderTypes_1.SipProviderPostMessage.OnCallWaitingDisabled,
                                                    Data: {
                                                        SessionId: declineSession.Id,
                                                        Time: window.phone.TimeNow(),
                                                        DisplayName: declineSession === null || declineSession === void 0 ? void 0 : declineSession.DisplayName,
                                                        BuddyId: declineSession === null || declineSession === void 0 ? void 0 : declineSession.BuddyId,
                                                        Direction: 'inbound',
                                                        From: (declineSession === null || declineSession === void 0 ? void 0 : declineSession.From) || ((_a = declineSession === null || declineSession === void 0 ? void 0 : declineSession.Data) === null || _a === void 0 ? void 0 : _a.From),
                                                    }
                                                });
                                                if (!declineSession) return [3 /*break*/, 2];
                                                BrowserPhoneSipProvider.UpdateSession(declineSession.Id, {
                                                    ReasonCode: 486,
                                                    ReasonText: 'Call Waiting Disabled',
                                                    Data: {
                                                        ReasonCode: 486,
                                                        ReasonText: 'Call Waiting Disabled',
                                                        EndTime: window.phone.TimeNow(),
                                                        TerminatedBy: 'us',
                                                        Direction: 'inbound'
                                                    }
                                                });
                                                buddy = window.phone.GetBuddyWithSession(declineSession.Id);
                                                return [4 /*yield*/, window.phone.SipProvider.Decline(declineSession, 486, 'Call Waiting Disabled')];
                                            case 1:
                                                response = _b.sent();
                                                _b.label = 2;
                                            case 2: return [3 /*break*/, 4];
                                            case 3:
                                                e_41 = _b.sent();
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); }, 0);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    BrowserPhoneSipProvider.UpdateSession = function (sessionOrId, patch) {
        var _a, _b;
        BrowserPhoneSipProvider.SessionManager.UpdateSession(sessionOrId, patch);
        var _id = typeof sessionOrId === 'string' ? sessionOrId : sessionOrId.Id;
        var _updatedSession = BrowserPhoneSipProvider.SessionManager.get(_id);
        if (_updatedSession) {
            (_b = (_a = window.phone) === null || _a === void 0 ? void 0 : _a.UpdateSession) === null || _b === void 0 ? void 0 : _b.call(_a, _updatedSession);
        }
    };
    /**
     * Stop local media streams for a session (best-effort).
     * Reason: Conference teardown may miss a LocalMediaStream reference, leaving the mic open.
     */
    BrowserPhoneSipProvider.StopSessionLocalMedia = function (sessionId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        if (!sessionId) {
            return;
        }
        var stopStreamTracks = function (stream) {
            if (!stream || typeof stream.getTracks !== "function") {
                return;
            }
            try {
                stream.getTracks().forEach(function (track) {
                    if (track) {
                        track.enabled = false;
                        track.stop();
                    }
                });
            }
            catch (e) {
            }
        };
        var sessionFromManager = BrowserPhoneSipProvider.SessionManager.get(sessionId);
        var sessionFromPhone = (_b = (_a = window.phone) === null || _a === void 0 ? void 0 : _a.GetSession) === null || _b === void 0 ? void 0 : _b.call(_a, sessionId);
        var sessionFromBuddies = BrowserPhoneSipProvider.GetSessionWithID(sessionId);
        var sessionFromSipProvider = (_d = (_c = BrowserPhoneSipProvider.SipProvider) === null || _c === void 0 ? void 0 : _c.GetSession) === null || _d === void 0 ? void 0 : _d.call(_c, sessionId);
        if (sessionFromSipProvider && __DEBUG__) {
            console.log(__TAG__ + "StopSessionLocalMedia: Using SipProvider session for cleanup", sessionId);
        }
        var sessions = [sessionFromManager, sessionFromPhone, sessionFromBuddies, sessionFromSipProvider].filter(Boolean);
        for (var _i = 0, sessions_1 = sessions; _i < sessions_1.length; _i++) {
            var session = sessions_1[_i];
            try {
                stopStreamTracks((_e = session === null || session === void 0 ? void 0 : session.Data) === null || _e === void 0 ? void 0 : _e.LocalMediaStream);
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.LocalMediaStream);
                stopStreamTracks((_f = session === null || session === void 0 ? void 0 : session.Data) === null || _f === void 0 ? void 0 : _f.RtpSenderAudioMediaStream);
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.RtpSenderAudioMediaStream);
                stopStreamTracks((_g = session === null || session === void 0 ? void 0 : session.Data) === null || _g === void 0 ? void 0 : _g.RtpSenderVideoMediaStream);
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.RtpSenderVideoMediaStream);
                stopStreamTracks((_h = session === null || session === void 0 ? void 0 : session.Data) === null || _h === void 0 ? void 0 : _h.LocalVideoMediaStream);
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.RtpReceiverVideoMediaStream);
                stopStreamTracks((_j = session === null || session === void 0 ? void 0 : session.Data) === null || _j === void 0 ? void 0 : _j.RtpReceiverVideoMediaStream);
                if (Array.isArray(session === null || session === void 0 ? void 0 : session.RtpReceiverVideoMediaStreams)) {
                    for (var _r = 0, _s = session.RtpReceiverVideoMediaStreams; _r < _s.length; _r++) {
                        var stream = _s[_r];
                        stopStreamTracks(stream);
                    }
                }
                else {
                    stopStreamTracks(session === null || session === void 0 ? void 0 : session.RtpReceiverVideoMediaStreams);
                }
                if (Array.isArray((_k = session === null || session === void 0 ? void 0 : session.Data) === null || _k === void 0 ? void 0 : _k.RtpReceiverVideoMediaStreams)) {
                    for (var _t = 0, _u = session.Data.RtpReceiverVideoMediaStreams; _t < _u.length; _t++) {
                        var stream = _u[_t];
                        stopStreamTracks(stream);
                    }
                }
                else {
                    stopStreamTracks((_l = session === null || session === void 0 ? void 0 : session.Data) === null || _l === void 0 ? void 0 : _l.RtpReceiverVideoMediaStreams);
                }
                if (Array.isArray(session === null || session === void 0 ? void 0 : session.RtpSenderVideoMediaStreams)) {
                    for (var _v = 0, _w = session.RtpSenderVideoMediaStreams; _v < _w.length; _v++) {
                        var stream = _w[_v];
                        stopStreamTracks(stream);
                    }
                }
                else {
                    stopStreamTracks(session === null || session === void 0 ? void 0 : session.RtpSenderVideoMediaStreams);
                }
                if (Array.isArray((_m = session === null || session === void 0 ? void 0 : session.Data) === null || _m === void 0 ? void 0 : _m.RtpSenderVideoMediaStreams)) {
                    for (var _x = 0, _y = session.Data.RtpSenderVideoMediaStreams; _x < _y.length; _x++) {
                        var stream = _y[_x];
                        stopStreamTracks(stream);
                    }
                }
                else {
                    stopStreamTracks((_o = session === null || session === void 0 ? void 0 : session.Data) === null || _o === void 0 ? void 0 : _o.RtpSenderVideoMediaStreams);
                }
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.ConferenceMixedOutputStream);
                stopStreamTracks((_p = session === null || session === void 0 ? void 0 : session.Data) === null || _p === void 0 ? void 0 : _p.ConferenceMixedOutputStream);
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.AudioContextOriginalSenderStream);
                stopStreamTracks(session === null || session === void 0 ? void 0 : session.AudioContextMixedOutputStream);
                // Stop any legacy mixed tracks if present (UI layers may store these).
                if (((_q = session === null || session === void 0 ? void 0 : session.Data) === null || _q === void 0 ? void 0 : _q.AudioSourceTrack) && typeof session.Data.AudioSourceTrack.stop === "function") {
                    session.Data.AudioSourceTrack.stop();
                }
                if ((session === null || session === void 0 ? void 0 : session.AudioSourceTrack) && typeof session.AudioSourceTrack.stop === "function") {
                    session.AudioSourceTrack.stop();
                }
                // Close any open ConferenceAudioContext — Chrome keeps the mic indicator active
                // while a live AudioContext has a createMediaStreamSource node, even after track.stop().
                // HandleParticipantLeftConferenceCall closes it explicitly, but this is a safety net
                // for any path that skips that function (e.g. direct Hangup, CancelConference).
                if (session === null || session === void 0 ? void 0 : session.ConferenceAudioContext) {
                    try {
                        if (session.ConferenceAudioContext.state !== "closed") {
                            session.ConferenceAudioContext.close().catch(function () { });
                        }
                        session.ConferenceAudioContext = null;
                    }
                    catch (e) { }
                }
            }
            catch (e) {
            }
        }
    };
    /**
     * Remove a session from all buddy lists and update UI
     * @param sessionId - The session ID to remove
     * @returns Promise that resolves when session is removed
     */
    /**
     * Remove a session from buddies and refresh UI.
     * @param sessionId - ID of session to remove
     */
    BrowserPhoneSipProvider.RemoveSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            try {
                                if ((_a = window.phone) === null || _a === void 0 ? void 0 : _a.MyBuddies) {
                                    (_b = window.phone) === null || _b === void 0 ? void 0 : _b.MyBuddies.forEach(function (buddy) {
                                        if (buddy === null || buddy === void 0 ? void 0 : buddy.Sessions) {
                                            for (var _i = 0, _a = buddy.Sessions; _i < _a.length; _i++) {
                                                var session = _a[_i];
                                                if (session.Id == sessionId) {
                                                    buddy.Sessions = buddy.Sessions.filter(function (s) { return s.Id !== sessionId; });
                                                }
                                            }
                                            if (buddy === null || buddy === void 0 ? void 0 : buddy.Sessions) {
                                                buddy.Sessions = buddy.Sessions.filter(function (s) { return s.Id !== sessionId; });
                                            }
                                        }
                                    });
                                    (_c = window.phone) === null || _c === void 0 ? void 0 : _c.UpdateBuddyList();
                                    (_d = window.phone) === null || _d === void 0 ? void 0 : _d.UpdateStage();
                                    (_e = window.phone) === null || _e === void 0 ? void 0 : _e.UpdateUI();
                                    BrowserPhoneSipProvider.SessionManager.Remove(sessionId);
                                    resolve();
                                }
                                else {
                                    console.warn(__TAG__ + "RemoveSession: MyBuddies not initialized");
                                    // Reason: avoid leaving callers awaiting forever if MyBuddies isn't initialized.
                                    BrowserPhoneSipProvider.SessionManager.Remove(sessionId);
                                    resolve();
                                }
                            }
                            catch (e) {
                                console.warn(__TAG__ + "RemoveSession", e.message);
                                BrowserPhoneSipProvider.SessionManager.Remove(sessionId);
                                resolve();
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    /**
     * Find a buddy by their display name
     * @param displayName - The display name to search for
     * @returns The buddy object or null if not found
     */
    /**
     * Lookup a buddy by display name.
     * @param displayName - Buddy's display name
     */
    BrowserPhoneSipProvider.GetBuddyWithDisplayName = function (displayName) {
        var retBuddy = null;
        window.phone.MyBuddies.forEach(function (buddy) {
            if (buddy.DisplayName === displayName) {
                retBuddy = buddy;
            }
        });
        return retBuddy;
    };
    /**
     * Find a buddy by their ID
     * @param id - The buddy ID to search for
     * @returns The buddy object or null if not found
     */
    /**
     * Lookup a buddy by unique identifier.
     * @param id - Buddy ID
     */
    BrowserPhoneSipProvider.GetBuddyWithID = function (id) {
        var retBuddy = null;
        window.phone.MyBuddies.forEach(function (buddy) {
            if (buddy.Id === id || (buddy === null || buddy === void 0 ? void 0 : buddy.BuddyId) === id) {
                retBuddy = buddy;
            }
        });
        return retBuddy;
    };
    //#endregion Session Update and Buddy Utilities
    // -- Messaging --
    //#region Messaging
    /**
     * Post a message to the phone system or external webhooks
     * @param message - The message object to post
     */
    BrowserPhoneSipProvider.PostMessage = function (message) {
        var _a, _b, _c;
        try {
            if (!message.Provider) {
                message.Provider = "sip";
            }
            if (!((_a = window.phone) === null || _a === void 0 ? void 0 : _a.Webhooks)) {
                window.phone.Webhooks = {};
            }
            if (typeof ((_c = (_b = window.phone) === null || _b === void 0 ? void 0 : _b.Webhooks) === null || _c === void 0 ? void 0 : _c[message.Event]) == "function") {
                window.phone.Webhooks[message.Event](message);
            }
            window.postMessage(JSON.parse(JSON.stringify(message)), window.location.origin + "/phone");
            window.phone.RaiseEvent({
                Event: message.Event || message.Activity || "Unknown",
                Data: message.Data || {},
            });
        }
        catch (error) {
        }
    };
    //#endregion Messaging
    /**
     * Calculate elapsed seconds between two timestamps.
     * Accepts ISO strings or variants with " UTC" suffix.
     * @param StartTime - Start timestamp
     * @param EndTime - End timestamp
     * @returns Seconds elapsed (0 on failure)
     */
    BrowserPhoneSipProvider.CalculateDuration = function (StartTime, EndTime) {
        try {
            // 2025-09-10T12:49:56.158Z
            var startTimeISO = StartTime.replace(" UTC", "Z").replace(" ", "T");
            var endTimeISO = EndTime.replace(" UTC", "Z").replace(" ", "T");
            var startTime = new Date(startTimeISO);
            var endTime = new Date(endTimeISO);
            return Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        }
        catch (e) {
            return 0;
        }
    };
    /**
     * Reconnect calls that have been captured due to lost internet connection
     * Handles busy state to prevent concurrent reconnection attempts
     */
    BrowserPhoneSipProvider.CallReconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof BrowserPhoneSipProvider.Core.CallReconnect === 'function')) return [3 /*break*/, 2];
                        if (BrowserPhoneSipProvider.BusyCallReconnect) {
                            return [2 /*return*/];
                        }
                        BrowserPhoneSipProvider.BusyCallReconnect = true;
                        return [4 /*yield*/, BrowserPhoneSipProvider.Core.CallReconnect()];
                    case 1:
                        _a.sent();
                        BrowserPhoneSipProvider.BusyCallReconnect = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // -- Static fields and constructor --
    BrowserPhoneSipProvider.DeviceId = null;
    BrowserPhoneSipProvider.HealthCheckInterval = 6000;
    BrowserPhoneSipProvider.HealthCheckIntervalTimer = null;
    BrowserPhoneSipProvider.Core = null;
    BrowserPhoneSipProvider.SipProvider = null;
    BrowserPhoneSipProvider.ProviderDescription = "Provides standard SIP (no text) compliant messaging, with audio and video, but not text, according to the RFC1583";
    BrowserPhoneSipProvider.CallTimeoutIntervalTime = 3000;
    BrowserPhoneSipProvider.NoAnswerTimeout = 15 * 1000;
    BrowserPhoneSipProvider.RingbackTimeout = 120;
    BrowserPhoneSipProvider.LastToastTime = 0;
    BrowserPhoneSipProvider.Settings = {};
    BrowserPhoneSipProvider.BusyCallReconnect = false;
    return BrowserPhoneSipProvider;
}());
exports.BrowserPhoneSipProvider = BrowserPhoneSipProvider;
//#endregion Provider methods (shared Web/Mobile)
// ============================================================================
// Section: Global helpers and initialization
// ============================================================================
/**
 * Initialize the SIP provider and attach it to the global phone object
 * @param settings - Optional configuration settings for the SIP provider
 * @returns Promise that resolves when SIP provider is initialized
 */
window.phone.InitSipProvider = function (settings) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var sipProvider, providerItem, error_36;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                sipProvider = new BrowserPhoneSipProvider();
                                if (__DEBUG__)
                                    console.log(__TAG__, "-------------------------------- Initialising RNSipProvider --------------------------------\n\n", settings);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, sipProvider.Init(settings)];
                            case 2:
                                providerItem = _a.sent();
                                window.phone.SipProvider = providerItem;
                                if (__DEBUG__)
                                    console.log(__TAG__, "-------------------------------- RNSipProvider Initialised --------------------------------\n\n", providerItem);
                                resolve(providerItem);
                                return [3 /*break*/, 4];
                            case 3:
                                error_36 = _a.sent();
                                console.error(__TAG__, "Error initialising SipProvider", error_36);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
};
// (window as any).phone.SipProviderCore.Web = WebSipCore;
// (window as any).phone.SipProviderCore.Mobile = MobileSipCore;


/***/ }),

/***/ "./src/MobileSipCore.ts":
/*!******************************!*\
  !*** ./src/MobileSipCore.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileSipCoreConfiguration = void 0;
var Browser_Phone_SipProvider_1 = __webpack_require__(/*! ./Browser-Phone-SipProvider */ "./src/Browser-Phone-SipProvider.ts");
var SipProviderTypes_1 = __webpack_require__(/*! ./SipProviderTypes */ "./src/SipProviderTypes.ts");
var __TAG__ = "MobileSipCore: ";
var __DEBUG__ = false;
// Constants
var DEFAULT_TIMEOUT_MS = 20000;
if (!window.phone) {
    window.phone = {};
}
if (!window.phone.SipProviderCore) {
    window.phone.SipProviderCore = {};
}
var MobileSipMethods = {
// This to be done on the mobile side
};
var MobileSipCoreSource = "RNSipProvider";
var MobileSipProviderItemMethods = {
    /**
     * Initializes the mobile SIP provider with the given settings
     * @param {SipProviderSettings} settings - Configuration settings for the SIP provider
     * @returns {Promise<any>} Promise that resolves with the initialization response
     */
    Init: function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    settings.UserAgentStr += " " + navigator.userAgent;
                                    try {
                                        if (settings.DeviceId) {
                                            Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.DeviceId = settings.DeviceId;
                                        }
                                    }
                                    catch (e) {
                                        console.warn(__TAG__ + "Init: DeviceId Error", e, settings);
                                    }
                                    return [4 /*yield*/, this.AwaitPostMessage({
                                            Source: MobileSipCoreSource,
                                            Action: SipProviderTypes_1.SipProviderMobileEvents.InitSipProvider,
                                            Data: settings,
                                            Destination: "Application",
                                        }, SipProviderTypes_1.SipProviderMobileEvents.InitSipProviderResponse)];
                                case 1:
                                    response = _a.sent();
                                    window.addEventListener("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                        var messageData;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    messageData = msg.data;
                                                    try {
                                                        messageData = JSON.parse(messageData);
                                                    }
                                                    catch (error) {
                                                    }
                                                    return [4 /*yield*/, this.OnMessage(messageData)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    resolve(response);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    },
    /**
     * Connects the mobile SIP provider to the WebRTC service
     * @returns {Promise<any>} Promise that resolves when connection is initiated
     */
    Connect: function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.PostMessage({
                    Source: MobileSipCoreSource,
                    Action: SipProviderTypes_1.SipProviderMobileEvents.ConnectSiperbWebRTC,
                    Destination: "Application",
                    Data: null,
                });
                resolve(true);
                return [2 /*return*/];
            });
        }); });
    },
    /**
     * Connects to a remote peer using an SDP offer (not supported on mobile core)
     * @param {string} sdp - Remote SDP offer
     * @returns {Promise<SipProviderResponse>} Promise resolving with an error response
     */
    ConnectWithSDP: function (sdp) {
        return Promise.resolve({ Success: false, Reason: "ConnectWithSDP not supported on mobile core" });
    },
    /**
     * Disconnects the mobile SIP provider from the WebRTC service
     * @returns {Promise<void>} Promise that resolves when disconnection is initiated
     */
    Disconnect: function () {
        this.PostMessage({
            Source: MobileSipCoreSource,
            Action: SipProviderTypes_1.SipProviderMobileEvents.DisconnectSiperbWebRTC,
            Destination: "Application",
            Data: null,
        });
        return Promise.resolve();
    },
    /**
     * Makes an audio call to the specified contact
     * @param {any} contact - The contact to call
     * @param {SessionObject} session - The session object
     * @returns {Promise<any>} Promise that resolves with the call response
     */
    AudioCall: function (contact, session) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.AudioCall,
                            Destination: "Application",
                            Data: {
                                contact: contact,
                                session: session,
                            },
                        }, SipProviderTypes_1.SipProviderMobileEvents.AudioCallResponse)];
                    case 1:
                        response = _a.sent();
                        resolve(response);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Hangs up an active call session
     * @param {SessionObject} session - The session to hang up
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the hangup response
     */
    Hangup: function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.Hangup,
                            Destination: "Application",
                            Data: {
                                session: session,
                            },
                        }, SipProviderTypes_1.SipProviderMobileEvents.HangupResponse)];
                    case 1:
                        response = _a.sent();
                        resolve(response);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Cancels an outgoing call session
     * @param {SessionObject} session - The session to cancel
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the cancel response
     */
    Cancel: function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, Session, updatedData, updatedSession, data;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, SipProviderRNAwaitPostMessage({
                                        Source: MobileSipCoreSource,
                                        Action: SipProviderTypes_1.SipProviderMobileEvents.Cancel,
                                        Destination: "Application",
                                        Data: {
                                            session: session,
                                        },
                                    }, SipProviderTypes_1.SipProviderMobileEvents.CancelResponse)];
                                case 1:
                                    response = _b.sent();
                                    try {
                                        // Log only if there's an unexpected termination reason
                                        if (((_a = response === null || response === void 0 ? void 0 : response.CallData) === null || _a === void 0 ? void 0 : _a.TerminatedBy) && response.CallData.TerminatedBy !== 'us') {
                                            if (__DEBUG__)
                                                console.log(__TAG__ + "Cancel Response Terminated By", response.CallData.TerminatedBy);
                                        }
                                    }
                                    catch (e) {
                                        console.warn(__TAG__ + "Cancel Response processing error", e);
                                    }
                                    Session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(session.Id);
                                    updatedData = {};
                                    updatedSession = {};
                                    for (data in response === null || response === void 0 ? void 0 : response.CallData) {
                                        updatedData[data] = response === null || response === void 0 ? void 0 : response.CallData[data];
                                        updatedSession[data] = response === null || response === void 0 ? void 0 : response.CallData[data];
                                    }
                                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(session.Id, __assign({ Data: __assign(__assign({}, Session.Data), updatedData) }, updatedSession));
                                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallCancelled(session.Id, response === null || response === void 0 ? void 0 : response.CallData)];
                                case 2:
                                    _b.sent();
                                    resolve(response);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    },
    /**
     * Answers an incoming call session
     * @param {SessionObject} session - The session to answer
     * @param {BuddyObject} buddy - The buddy associated with the call
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the answer response
     */
    Answer: function (session, buddy) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.AwaitPostMessage({
                                        Source: MobileSipCoreSource,
                                        Action: SipProviderTypes_1.SipProviderMobileEvents.Answer,
                                        Destination: "Application",
                                        Data: {
                                            session: session,
                                            buddy: buddy,
                                        },
                                    }, SipProviderTypes_1.SipProviderMobileEvents.AnswerResponse)];
                                case 1:
                                    response = _a.sent();
                                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallAnswered(session.Id);
                                    resolve(response);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    },
    /**
     * Declines an incoming call session
     * @param {SessionObject} session - The session to decline
     * @param {number} [reasonCode] - Optional reason code for declining
     * @param {string} [reasonText] - Optional reason text for declining
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the decline response
     */
    Decline: function (session, reasonCode, reasonText) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.AwaitPostMessage({
                                        Source: MobileSipCoreSource,
                                        Action: SipProviderTypes_1.SipProviderMobileEvents.Decline,
                                        Destination: "Application",
                                        Data: {
                                            session: session,
                                            reasonCode: reasonCode,
                                            reasonText: reasonText,
                                        },
                                    }, SipProviderTypes_1.SipProviderMobileEvents.DeclineResponse)];
                                case 1:
                                    response = _a.sent();
                                    window.phone.AddSessionEvent(session.Id, {
                                        Timestamp: window.phone.TimeNow(),
                                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnDecline,
                                        Data: {
                                            SessionId: session.Id,
                                            Time: window.phone.TimeNow(),
                                        }
                                    });
                                    resolve(response);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    },
    /**
     * Mutes audio for an active call session
     * @param {SessionObject} session - The session to mute
     * @param {BuddyObject} buddy - The buddy associated with the call
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the mute response
     */
    Mute: function (session, buddy) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var Session, response, sessionID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(session.Id)];
                    case 1:
                        Session = _a.sent();
                        if (!((Session === null || Session === void 0 ? void 0 : Session.isOnHold) == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.Core.Unhold(session)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, SipProviderRNAwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.Mute,
                            Destination: "Application",
                            Data: {
                                session: Session,
                                buddy: buddy,
                            },
                        }, SipProviderTypes_1.SipProviderMobileEvents.MuteResponse)];
                    case 4:
                        response = _a.sent();
                        resolve(response);
                        sessionID = session.Id;
                        Session.isOnMute = true;
                        window.phone.UpdateStage();
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Unmutes audio for an active call session
     * @param {SessionObject} session - The session to unmute
     * @param {BuddyObject} buddy - The buddy associated with the call
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the unmute response
     */
    Unmute: function (session, buddy) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var Session, response, sessionID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(session.Id)];
                    case 1:
                        Session = _a.sent();
                        return [4 /*yield*/, SipProviderRNAwaitPostMessage({
                                Source: MobileSipCoreSource,
                                Action: SipProviderTypes_1.SipProviderMobileEvents.UnMute,
                                Destination: "Application",
                                Data: {
                                    session: Session,
                                    buddy: buddy,
                                },
                            }, SipProviderTypes_1.SipProviderMobileEvents.UnMuteResponse)];
                    case 2:
                        response = _a.sent();
                        resolve(response);
                        sessionID = session.Id;
                        Session.isOnMute = false;
                        window.phone.UpdateStage();
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Takes a call off hold
     * @param {SessionObject} session - The session to take off hold
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the unhold response
     */
    Unhold: function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var Session, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(session.Id)];
                    case 1:
                        Session = _a.sent();
                        return [4 /*yield*/, SipProviderRNAwaitPostMessage({
                                Source: MobileSipCoreSource,
                                Action: SipProviderTypes_1.SipProviderMobileEvents.UnHold,
                                Destination: "Application",
                                Data: {
                                    session: SafeJsonParse(Session),
                                },
                            }, SipProviderTypes_1.SipProviderMobileEvents.UnHoldResponse)];
                    case 2:
                        response = _a.sent();
                        if ((response === null || response === void 0 ? void 0 : response.Success) == true) {
                            Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(session.Id, {
                                isOnHold: false,
                                isOnMute: false
                            });
                            window.phone.UpdateSession(session);
                        }
                        resolve(response);
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallIsOnUnHold(session.Id);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Puts a call on hold
     * @param {SessionObject} session - The session to put on hold
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the hold response
     */
    Hold: function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var Session, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(session.isOnMute == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.Core.Unmute(session)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(session.Id)];
                    case 3:
                        Session = _a.sent();
                        return [4 /*yield*/, SipProviderRNAwaitPostMessage({
                                Source: MobileSipCoreSource,
                                Action: SipProviderTypes_1.SipProviderMobileEvents.Hold,
                                Destination: "Application",
                                Data: {
                                    session: SafeJsonParse(Session),
                                },
                            }, SipProviderTypes_1.SipProviderMobileEvents.HoldResponse)];
                    case 4:
                        response = _a.sent();
                        if ((response === null || response === void 0 ? void 0 : response.Success) == true) {
                            Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(session.Id, {
                                isOnHold: true
                            });
                            window.phone.UpdateSession(session);
                        }
                        resolve(response);
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallIsOnHold(session.Id);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Performs an attended transfer between two call sessions
     * @param {BuddyObject} currentBuddy - The current buddy in the call
     * @param {SessionObject} session - The current session
     * @param {BuddyObject} buddy - The buddy to transfer to
     * @param {any} contact - The contact information
     * @param {SessionObject} targetSession - The target session for transfer
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the transfer response
     */
    AttendedTransfer: function (currentBuddy, session, buddy, contact, targetSession) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.AttendedTransfer,
                            Destination: "Application",
                            Data: {
                                currentBuddy: SafeJsonParse(currentBuddy),
                                session: SafeJsonParse(session),
                                buddy: SafeJsonParse(buddy),
                                contact: contact,
                                targetSession: SafeJsonParse(targetSession),
                            },
                        }, SipProviderTypes_1.SipProviderMobileEvents.AttendedTransferResponse)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.MakeAttendedCall(response === null || response === void 0 ? void 0 : response.TargetSession, response === null || response === void 0 ? void 0 : response.TargetContact)];
                    case 2:
                        _a.sent();
                        resolve(response);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Completes an attended transfer operation
     * @param {SessionObject} childSession - The child session to complete transfer for
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the complete response
     */
    CompleteTransfer: function (childSession) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.PostMessage({
                    Source: MobileSipCoreSource,
                    Action: SipProviderTypes_1.SipProviderMobileEvents.CompleteTransfer,
                    Destination: "Application",
                    Data: {
                        childSession: SafeJsonParse(childSession),
                    },
                });
                resolve({ Success: true, Reason: "Complete Transfer" });
                return [2 /*return*/];
            });
        }); });
    },
    /**
     * Cancels an attended transfer operation
     * @param {SessionObject} childSession - The child session to cancel transfer for
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the cancel response
     */
    CancelAttendedTransfer: function (childSession) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = resolve;
                        return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CancelAttendedTransfer(childSession)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Hangs up an attended transfer session
     * @param {SessionObject} childSession - The child session to hang up
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the hangup response
     */
    HangupAttendedTransfer: function (childSession) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.HangupAttendedTransfer,
                            Destination: "Application",
                            Data: {
                                childSession: childSession,
                            },
                        }, SipProviderTypes_1.SipProviderMobileEvents.HangupAttendedTransferResponse)];
                    case 1:
                        response = _a.sent();
                        resolve(response);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Performs a blind transfer to another contact
     * @param {any} currentBuddy - The current buddy in the call
     * @param {SessionObject} session - The current session
     * @param {any} buddy - The buddy to transfer to
     * @param {any} contact - The contact information
     * @returns {Promise<any>} Promise that resolves with the transfer response
     */
    BlindTransfer: function (currentBuddy, session, buddy, contact) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.BlindTransfer,
                            Destination: "Application",
                            Data: {
                                currentBuddy: currentBuddy,
                                session: session,
                                buddy: buddy,
                                contact: contact,
                            },
                        }, SipProviderTypes_1.SipProviderMobileEvents.BlindTransferResponse)];
                    case 1:
                        response = _a.sent();
                        resolve(response);
                        window.phone.UpdateStage();
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Re-registers the SIP provider (not implemented)
     * @returns {Promise<SipProviderResponse>} Promise that rejects with not implemented error
     */
    ReRegister: function () {
        throw new Error("Function not implemented.");
    },
    /**
     * Refreshes the SIP registration
     * @returns {Promise<SipProviderResponse>} Promise that resolves with the refresh response
     */
    RefreshRegistration: function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.PostMessage({
                    Source: MobileSipCoreSource,
                    Action: SipProviderTypes_1.SipProviderMobileEvents.RefreshRegistration,
                    Destination: "Application",
                    Data: {},
                });
                resolve({
                    Success: true,
                    Reason: "Refreshed registration",
                });
                return [2 /*return*/];
            });
        }); });
    },
    /**
     * Disconnects the transport connection
     * @returns {Promise<void>} Promise that resolves when disconnection is complete
     */
    DisconnectTransport: function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.DisconnectTransport,
                            Destination: "Application",
                            Data: {},
                        }, SipProviderTypes_1.SipProviderMobileEvents.DisconnectTransportResponse)];
                    case 1:
                        response = _a.sent();
                        resolve(response);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Reconnects the transport connection
     * @returns {Promise<void>} Promise that resolves when reconnection is complete
     */
    ReconnectTransport: function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.ReconnectTransport,
                            Destination: "Application",
                            Data: {},
                        }, SipProviderTypes_1.SipProviderMobileEvents.ReconnectTransportResponse)];
                    case 1:
                        response = _a.sent();
                        resolve(response);
                        return [2 /*return*/];
                }
            });
        }); });
    },
    /**
     * Handles call reconnection after network issues
     * @returns {Promise<void>} Promise that resolves when reconnection is initiated
     */
    CallReconnect: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.AwaitPostMessage({
                            Source: MobileSipCoreSource,
                            Action: SipProviderTypes_1.SipProviderMobileEvents.CallReconnect,
                            Destination: "Application",
                            Data: {},
                        }, SipProviderTypes_1.SipProviderMobileEvents.CallReconnectResponse);
                        resolve();
                    })];
            });
        });
    }
};
exports.MobileSipCoreConfiguration = __assign({ PostMessage: function (message) {
        var _a, _b, _c;
        if (!message.Provider) {
            message.Provider = "sip";
        }
        if (!((_a = window.phone) === null || _a === void 0 ? void 0 : _a.Webhooks)) {
            window.phone.Webhooks = {};
        }
        if (typeof ((_c = (_b = window.phone) === null || _b === void 0 ? void 0 : _b.Webhooks) === null || _c === void 0 ? void 0 : _c[message.Event]) == "function") {
            window.phone.Webhooks[message.Event](message);
        }
        else {
            try {
                SipProviderRNPostMessage(message);
            }
            catch (e) {
                console.warn(__TAG__ + "PostMessage Error", e);
            }
        }
    }, AwaitPostMessage: function (message, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SipProviderRNAwaitPostMessage(message, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }, OnMessage: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, onSipProviderRNMessage(JSON.parse(JSON.stringify(message)))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.warn("OnMessage Error: " + JSON.stringify(message, null, 2) + " Error: " + JSON.stringify(e_1, null, 2));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }, CallInviteRejected: function (sessionId, callData) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                resolve();
                return [2 /*return*/];
            });
        }); });
    }, IncomingCallCompleted: function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.IncomingCallCompleted(session)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }, OnRegistrationAccepted: function (sipMessage) {
        var _this = this;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallReconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 0);
    } }, MobileSipProviderItemMethods);
/**
 * Safely parses JSON data, handling circular references and complex objects
 * @param {any} data - The data to safely parse
 * @returns {any} A safe copy of the data without circular references
 */
function SafeJsonParse(data) {
    if (data === null || data === undefined) {
        return data;
    }
    try {
        // Try to serialize and parse to break any circular references
        return JSON.parse(JSON.stringify(data));
    }
    catch (e) {
        // If serialization fails due to circular references, create a safe shallow copy
        if (typeof data === 'object') {
            var safeObj = {};
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = data[key];
                    // Only include primitive values and simple objects
                    if (value === null ||
                        typeof value === 'string' ||
                        typeof value === 'number' ||
                        typeof value === 'boolean') {
                        safeObj[key] = value;
                    }
                    else if (typeof value === 'object' && !Array.isArray(value)) {
                        // For nested objects, try recursively (but limit depth to prevent infinite recursion)
                        try {
                            safeObj[key] = SafeJsonParse(value);
                        }
                        catch (_a) {
                            // If recursive call fails, skip this property
                            safeObj[key] = '[Object]';
                        }
                    }
                    else {
                        // Convert complex types to string representations
                        safeObj[key] = Array.isArray(value) ? '[Array]' : '[Complex Object]';
                    }
                }
            }
            return safeObj;
        }
        return data;
    }
}
function getTotalNotifications() {
    var _a, _b;
    var totalMissedCalls = 0;
    // Get total Missed Calls
    for (var i = 0; i < window.phone.MyBuddies.length; i++) {
        if (((_a = window.phone.MyBuddies[i]) === null || _a === void 0 ? void 0 : _a.isDeleted) && ((_b = window.phone.MyBuddies[i]) === null || _b === void 0 ? void 0 : _b.isDeleted) === true) {
            continue;
        }
        if (window.phone.MyBuddies[i].Missed > 0) {
            totalMissedCalls += window.phone.MyBuddies[i].Missed;
        }
    }
    return totalMissedCalls;
}
function GetTotalNotifications() {
    exports.MobileSipCoreConfiguration.PostMessage({
        Action: "SetTotalNotifications",
        Source: "Siperb",
        Destination: "Application",
        Data: {
            "count": getTotalNotifications()
        }
    });
}
function GetOrCreateBuddy(cdr) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var callData, asNonEmptyString, direction, isOutbound, remoteNumber, remoteHandle, remoteDisplayName, contactCandidates, idCandidates, displayCandidates, buddy, did, _i, idCandidates_1, candidate, _c, displayCandidates_1, candidate, contact, resolvedId, displayName, contacts, newBuddy, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    callData = (cdr === null || cdr === void 0 ? void 0 : cdr.CallData) || {};
                    if (__DEBUG__)
                        console.log(__TAG__ + "GetOrCreateBuddy: Getting or creating buddy", callData);
                    asNonEmptyString = function (value) {
                        if (typeof value !== "string") {
                            return null;
                        }
                        var trimmed = value.trim();
                        return trimmed ? trimmed : null;
                    };
                    direction = ((_a = asNonEmptyString(callData.Direction)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
                    isOutbound = direction === "outbound" || direction === "outgoing" || direction === "out";
                    remoteNumber = asNonEmptyString(isOutbound ? (callData.ToNumber || callData.To) : (callData.FromNumber || callData.From));
                    remoteHandle = asNonEmptyString(isOutbound ? (callData.To || callData.ToName) : (callData.From || callData.FromName));
                    remoteDisplayName = asNonEmptyString(isOutbound ? (callData.ToName || callData.To || callData.CallerID) : (callData.FromName || callData.From || callData.CallerID));
                    contactCandidates = [remoteNumber, remoteHandle, asNonEmptyString(callData.FromNumber), asNonEmptyString(callData.ToNumber), asNonEmptyString(callData.From), asNonEmptyString(callData.To)]
                        .filter(function (value, index, list) { return !!value && list.indexOf(value) === index; });
                    idCandidates = [asNonEmptyString(callData.BuddyId), asNonEmptyString(callData.BuddyDisplayName), asNonEmptyString(callData.DisplayName)]
                        .filter(function (value, index, list) { return !!value && list.indexOf(value) === index; });
                    displayCandidates = [remoteDisplayName, asNonEmptyString(callData.BuddyDisplayName), asNonEmptyString(callData.DisplayName), asNonEmptyString(callData.BuddyId)]
                        .filter(function (value, index, list) { return !!value && list.indexOf(value) === index; });
                    buddy = null;
                    did = asNonEmptyString(callData.DID) || asNonEmptyString(callData.ToNumber) || asNonEmptyString(callData.To) || asNonEmptyString(callData.FromNumber) || asNonEmptyString(callData.From);
                    if (!did) return [3 /*break*/, 2];
                    if (__DEBUG__)
                        console.log(__TAG__ + "GetOrCreateBuddy: Getting buddy by DID", did);
                    return [4 /*yield*/, window.phone.GetBuddyByContact(did)];
                case 1:
                    buddy = _d.sent();
                    if (buddy) {
                        if (__DEBUG__)
                            console.log(__TAG__ + "GetOrCreateBuddy: Buddy Found with DID", did);
                        return [2 /*return*/, buddy];
                    }
                    if (__DEBUG__)
                        console.log(__TAG__ + "GetOrCreateBuddy: Buddy Not Found with DID", did);
                    _d.label = 2;
                case 2:
                    // Create buddy 
                    if (__DEBUG__)
                        console.log(__TAG__ + "GetOrCreateBuddy: Creating new buddy", did);
                    if (!buddy) {
                        for (_i = 0, idCandidates_1 = idCandidates; _i < idCandidates_1.length; _i++) {
                            candidate = idCandidates_1[_i];
                            buddy = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithID(candidate);
                            if (buddy) {
                                break;
                            }
                        }
                    }
                    if (!buddy) {
                        for (_c = 0, displayCandidates_1 = displayCandidates; _c < displayCandidates_1.length; _c++) {
                            candidate = displayCandidates_1[_c];
                            buddy = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithDisplayName(candidate);
                            if (buddy) {
                                break;
                            }
                        }
                    }
                    if (!!buddy) return [3 /*break*/, 7];
                    contact = contactCandidates[0] || null;
                    resolvedId = idCandidates[0] || remoteDisplayName || contact || asNonEmptyString(callData.CallId) || asNonEmptyString(cdr === null || cdr === void 0 ? void 0 : cdr.Id);
                    if (!resolvedId) {
                        resolvedId = typeof ((_b = window.phone) === null || _b === void 0 ? void 0 : _b.UID) === "function" ? window.phone.UID() : "Unknown";
                    }
                    displayName = remoteDisplayName || asNonEmptyString(callData.BuddyDisplayName) || asNonEmptyString(callData.BuddyId) || contact || "Unknown";
                    contacts = contact ? [{
                            Number: contact,
                            Provider: 'sip',
                        }] : [];
                    newBuddy = {
                        Id: resolvedId,
                        DisplayName: displayName,
                        BuddyId: asNonEmptyString(callData.BuddyId) || resolvedId,
                        Avatar: window.phone.RandomAvatar(),
                        DateCreated: window.phone.TimeNow(),
                        Contacts: contacts,
                        Missed: 0,
                        AutoDelete: true,
                        MessageStreamItems: [],
                        LastActivity: window.phone.TimeNow(),
                        Data: {},
                        Sessions: []
                    };
                    window.phone.MyBuddies.push(newBuddy);
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, window.phone.SaveBuddy(newBuddy.Id, newBuddy)];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _d.sent();
                    console.warn(__TAG__ + "OnIncomingCall SaveBuddy Error", e_2);
                    return [3 /*break*/, 6];
                case 6:
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    window.phone.UpdateUI();
                    // Toast Buddy Added
                    window.phone.Toast(newBuddy.Id, "Buddy Added", null, 'green');
                    buddy = newBuddy;
                    _d.label = 7;
                case 7: return [2 /*return*/, buddy];
            }
        });
    });
}
/**
 * Resolve a contact handle from a synchronized session payload.
 * @param {SessionObject} session - The synchronized session data
 * @returns {string | null} Contact handle or null if unavailable
 */
function ResolveSessionContact(session) {
    if (!session) {
        return null;
    }
    var data = session.Data || session.CallData || null;
    var contact = (data === null || data === void 0 ? void 0 : data.From) || (data === null || data === void 0 ? void 0 : data.To) || session.From || session.To;
    return typeof contact === 'string' ? contact : null;
}
/**
 * Create a buddy entry when a synchronized session arrives without one.
 * @param {SessionObject} session - The synchronized session data
 * @param {string} sessionId - The session identifier
 * @param {string | null} buddyId - Buddy identifier from session payload
 * @param {string | null} contact - Contact handle if available
 * @returns {Promise<BuddyObject | null>} The new buddy or null on failure
 */
function CreateBuddyFromSession(session, sessionId, buddyId, contact) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var resolvedId, displayName, ContactNumber, contacts, buddy, newBuddy, e_3, e_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    resolvedId = buddyId || (session === null || session === void 0 ? void 0 : session.DisplayName) || contact || sessionId;
                    displayName = session.DisplayNumber || (session === null || session === void 0 ? void 0 : session.DisplayName) || ((_a = session === null || session === void 0 ? void 0 : session.Data) === null || _a === void 0 ? void 0 : _a.FromName) || ((_b = session === null || session === void 0 ? void 0 : session.Data) === null || _b === void 0 ? void 0 : _b.ToName) || buddyId || contact || sessionId || "Unknown";
                    ContactNumber = contact || session.DisplayNumber;
                    contacts = ContactNumber ? [{
                            Number: ContactNumber,
                            Provider: 'sip',
                        }] : [];
                    return [4 /*yield*/, window.phone.GetBuddyByContact(ContactNumber)];
                case 1:
                    buddy = _c.sent();
                    if (buddy) {
                        if (__DEBUG__)
                            console.log(__TAG__ + "CreateBuddyFromSession: Buddy Found with Contact", ContactNumber);
                        return [2 /*return*/, buddy];
                    }
                    else {
                    }
                    newBuddy = {
                        Id: resolvedId,
                        DisplayName: displayName,
                        BuddyId: buddyId || resolvedId,
                        Avatar: window.phone.RandomAvatar(),
                        DateCreated: window.phone.TimeNow(),
                        Contacts: contacts,
                        Missed: 0,
                        AutoDelete: true,
                        MessageStreamItems: [],
                        LastActivity: window.phone.TimeNow(),
                        Data: {},
                        Sessions: [],
                        isDeleted: false,
                    };
                    window.phone.MyBuddies.push(newBuddy);
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, window.phone.SaveBuddy(newBuddy.Id, newBuddy)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    console.warn(__TAG__ + "SynchronizeSession SaveBuddy Error", e_3);
                    return [3 /*break*/, 5];
                case 5:
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    window.phone.UpdateUI();
                    // (window as any).phone.Toast(newBuddy.Id, "Buddy Added", null, 'green');
                    return [2 /*return*/, newBuddy];
                case 6:
                    e_4 = _c.sent();
                    console.warn(__TAG__ + "SynchronizeSession CreateBuddy Error", e_4);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// async function SynchronizeSession(instruction: any) {
//     /**
//      * {"AnswerTime": "2026-01-29T07:26:41.318Z", "BuddyDisplayName": "Seven Hundred", "BuddyId": "Seven Hundred", "CallId": "436924aa-9e1c-419b-b10e-3b89eac15498", "CallerID": "Seven Hundred", "DID": "700", "Data": {"AnswerInProgress": false, "AnswerTime": "2026-01-29T07:26:41.318Z", "AudioLevelIntervalTimer": 1780, "BuddyDisplayName": "Seven Hundred", "BuddyId": "Seven Hundred", "CallId": "436924aa-9e1c-419b-b10e-3b89eac15498", "CallStarted": "2026-01-29T07:26:37.188Z", "CallerID": "Seven Hundred", "Comments": [], "DID": "700", "Direction": "inbound", "Events": [[Object]], "Flagged": false, "From": "Seven Hundred", "FromName": "Seven Hundred", "FromNumber": "700", "IceCandidates": [[Object], [Object], [Object], [Object], [Object], [Object]], 
//      */
//     console.log(__TAG__ + "SynchronizeSession: Synchronizing Session", JSON.stringify(instruction.Data));
//     const sessionFromRN = instruction?.Data?.Session;
//     var buddy = null;
//     console.log(__TAG__ + "SynchronizeSession: Session from REACT NATIVE", sessionFromRN);
//     if (!sessionFromRN) {
//         console.warn(__TAG__ + "SynchronizeSession: Missing session data", instruction);
//         return;
//     }
//     var displayName = sessionFromRN?.DisplayName || sessionFromRN.Data?.DisplayName;
//     var displayNumber = sessionFromRN?.DisplayNumber || sessionFromRN.Data?.DisplayNumber;
//     buddy = await BrowserPhoneSipProvider.GetBuddyWithDisplayName(displayName);
//     if (buddy) {
//         console.log(__TAG__ + "SynchronizeSession: Buddy Found with Display Name", displayName);
//     } else {
//         console.log(__TAG__ + "SynchronizeSession: Buddy Not Found with Display Name", displayName);
//         buddy = await (window as any).phone.GetBuddyByContact(displayNumber);
//     }
//     const dataSessionId = instruction?.Data?.Id;
//     if (dataSessionId && sessionFromRN.Id && dataSessionId !== sessionFromRN.Id) {
//         console.warn(__TAG__ + "SynchronizeSession: Session Id mismatch", dataSessionId, sessionFromRN.Id);
//         (window as any).phone.Toast(dataSessionId, "Session Id mismatch for sync", null, 'red');
//         return;
//     }
//     const sessionId = dataSessionId || sessionFromRN.Id || sessionFromRN.SessionId || sessionFromRN?.Data?.SessionId;
//     if (!sessionId) {
//         console.warn(__TAG__ + "SynchronizeSession: Missing session Id for buddy sync", instruction);
//         return;
//     }
//     if (sessionFromRN.Id !== sessionId) {
//         sessionFromRN.Id = sessionId;
//     }
//     const buddyId = sessionFromRN.BuddyId;
//     if (!displayName) {
//         displayName = sessionFromRN.BuddyId;
//     }
//     const buddies = (window as any).phone?.MyBuddies || [];
//     const findUniqueBuddyByDisplayName = (displayName: string) => {
//         if (!displayName) {
//             return null;
//         }
//         const matches = buddies.filter((b: any) => b.DisplayName === displayName);
//         if (matches.length === 1) {
//             return matches[0];
//         }
//         if (matches.length > 1) {
//             console.warn(__TAG__ + "SynchronizeSession: Multiple buddies share display name", displayName);
//             (window as any).phone.Toast(displayName, "Multiple buddies share display name", null, 'red');
//         }
//         return null;
//     };
//     const sessionContact = ResolveSessionContact(sessionFromRN);
//     // Find buddy object (BuddyId is unique, only use display name when unique)
//     if (!buddy) {
//         buddy = buddyId ? await BrowserPhoneSipProvider.GetBuddyWithID(buddyId) : null;
//     }
//     if (buddy) {
//         console.log(__TAG__ + "SynchronizeSession: Buddy Found with ID", buddyId);
//     }
//     if (!buddy && buddyId) {
//         buddy = findUniqueBuddyByDisplayName(displayName);
//         if (buddy) {
//             console.log(__TAG__ + "SynchronizeSession: Buddy Found with Display Name", buddyId);
//         }
//     }
//     if (!buddy && sessionContact && typeof (window as any).phone?.GetBuddyByContact === "function") {
//         buddy = (window as any).phone.GetBuddyByContact(sessionContact);
//         if (buddy) {
//             console.log(__TAG__ + "SynchronizeSession: Buddy Found with Contact", sessionContact);
//         }
//     }
//     if (!buddy && sessionFromRN.DisplayName) {
//         buddy = findUniqueBuddyByDisplayName(sessionFromRN.DisplayName);
//         if (buddy) {
//             console.log(__TAG__ + "SynchronizeSession: Buddy Found with Display Name from Session", sessionFromRN.DisplayName);
//         }
//     }
//     if (!buddy) {
//         const buddyLabel = buddyId || sessionFromRN.DisplayName || sessionContact || sessionId;
//         // Reason: session sync can arrive before buddies are loaded or for unknown contacts.
//         buddy = await CreateBuddyFromSession(sessionFromRN, sessionId, buddyId || null, sessionContact);
//         if (buddy) {
//             console.log(__TAG__ + "SynchronizeSession: Buddy Created", buddy.Id);
//         } else {
//             console.log(__TAG__ + "SynchronizeSession: Buddy Object Not Found", sessionId, buddyId, buddy);
//             // (window as any).phone.Toast(buddyLabel, "Buddy Not Found for Session " + sessionId, null, 'red');
//             return;
//         }
//     }
//     if (!sessionFromRN.BuddyId) {
//         sessionFromRN.BuddyId = buddy.Id;
//     }
//     if (!sessionFromRN.DisplayName && buddy.DisplayName) {
//         sessionFromRN.DisplayName = buddy.DisplayName;
//     }
//     // Check if the session is already in the SessionManager
//     let existingSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
//     if (!existingSession) {
//         console.log(__TAG__ + "SynchronizeSession: No Existing Session Found", sessionId);
//         BrowserPhoneSipProvider.SessionManager.set(sessionFromRN);
//         existingSession = BrowserPhoneSipProvider.SessionManager.get(sessionId);
//         // Select the buddy
//         (window as any).phone.SelectBuddy(buddy);
//     }
//     const sessionToStore = existingSession || sessionFromRN;
//     if (!sessionToStore.Id) {
//         sessionToStore.Id = sessionId;
//     }
//     const sessions = buddy.Sessions || (buddy.Sessions = []);
//     const existingSessionIndex = sessions.findIndex((sess: any) => GetNormalizedSessionId(sess) === sessionId);
//     if (existingSessionIndex === -1) {
//         console.log(__TAG__ + "SynchronizeSession: Adding Session to Buddy", sessionId);
//         (window as any).phone.AddSession(buddy, sessionToStore);
//         const hasSession = sessions.some((sess: any) => GetNormalizedSessionId(sess) === sessionId);
//         if (!hasSession) {
//             sessions.push(sessionToStore);
//         }
//         (window as any).phone.UpdateProfileStatus("🔄Syncing Session...");
//         (window as any).phone.Toast(buddyId, "Sync Session Added", null, 'green');
//         (window as any).phone.UpdateStage();
//         (window as any).phone.UpdateUI();
//         (window as any).phone.UpdateBuddyList();
//     } else {
//         sessions[existingSessionIndex] = sessionToStore;
//     }
//     buddy.Sessions = sessions.filter((sess: any, index: number, list: any[]) => {
//         const id = GetNormalizedSessionId(sess);
//         if (!id) {
//             return true;
//         }
//         return list.findIndex((other: any) => GetNormalizedSessionId(other) === id) === index;
//     });
// }
function CreateSessionFromRN(sessionFromRN) {
    /**
     * udioInputDevice
:
"default"
AudioOutputDevice
:
"default"
BuddyId
:
"c2836232-1ff4-4669-9dc4-fbfcf7277b79"
Comments
:
[]
Data
:
{Direction: 'outbound', StartTime: '2026-02-03T10:54:18.454Z', To: '700', From: 'Us', DateAndTime: '2026-02-03T10:54:17.867Z', …}
Direction
:
"outbound"
DisplayName
:
"700"
DisplayNumber
:
"700"
Events
:
(4) [null, {…}, {…}, {…}]
Flagged
:
false
Id
:
"8812bfa8-b1bf-4d44-9172-a2d467e52913"
ProfileUserId
:
"taab7fc5e2f45af5ac7cb2eecd62f98776d26fca190737c669f2242b89e467ea2"
Provider
:
"sip"
RTPSession
:
{pendingReinvite: false, pendingReinviteAck: false, _state: 'Establishing', delegate: {…}, _stateEventEmitter: {…}, …}
Reactions
:
[]
Recording
:
[]
StartTime
:
"2026-02-03T10:54:18.443Z"
State
:
"Establishing"
Status
:
"Connecting..."
Timer
:
10
TimerInterval
:
50
View
:
"extended"
WithVideo
:
false
isOnHold
:
false
isOnMute
:
false
     */
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    function GetSessionState(sessionFromRN) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (sessionFromRN.State) {
            return sessionFromRN.State;
        }
        if ((_a = sessionFromRN.Data) === null || _a === void 0 ? void 0 : _a.State) {
            return (_b = sessionFromRN.Data) === null || _b === void 0 ? void 0 : _b.State;
        }
        var rtpState = ((_c = sessionFromRN.RTPSession) === null || _c === void 0 ? void 0 : _c._state) ||
            ((_d = sessionFromRN.RTPSession) === null || _d === void 0 ? void 0 : _d.state) ||
            ((_f = (_e = sessionFromRN.Data) === null || _e === void 0 ? void 0 : _e.RTPSession) === null || _f === void 0 ? void 0 : _f._state) ||
            ((_h = (_g = sessionFromRN.Data) === null || _g === void 0 ? void 0 : _g.RTPSession) === null || _h === void 0 ? void 0 : _h.state);
        if (rtpState) {
            return rtpState;
        }
        var endTime = sessionFromRN.EndTime ||
            ((_j = sessionFromRN.Data) === null || _j === void 0 ? void 0 : _j.EndTime) ||
            sessionFromRN.CallEnded ||
            ((_k = sessionFromRN.Data) === null || _k === void 0 ? void 0 : _k.CallEnded);
        if (endTime) {
            return SipProviderTypes_1.CallState.Terminated;
        }
        var answerTime = sessionFromRN.AnswerTime ||
            sessionFromRN.AnsweredTime ||
            ((_l = sessionFromRN.Data) === null || _l === void 0 ? void 0 : _l.AnswerTime) ||
            ((_m = sessionFromRN.Data) === null || _m === void 0 ? void 0 : _m.AnsweredTime);
        if (answerTime) {
            return SipProviderTypes_1.CallState.Established;
        }
        if (__DEBUG__)
            console.log(__TAG__ + "GetSessionState: Missing State", sessionFromRN);
        return SipProviderTypes_1.CallState.Establishing;
    }
    function GetSessionStatus(sessionFromRN, resolvedState) {
        var _a, _b, _c, _d, _e;
        if (sessionFromRN.Status) {
            return sessionFromRN.Status;
        }
        if ((_a = sessionFromRN.Data) === null || _a === void 0 ? void 0 : _a.Status) {
            return (_b = sessionFromRN.Data) === null || _b === void 0 ? void 0 : _b.Status;
        }
        var lang = (_c = window.phone) === null || _c === void 0 ? void 0 : _c.Lang;
        var direction = sessionFromRN.Direction || ((_d = sessionFromRN.Data) === null || _d === void 0 ? void 0 : _d.Direction);
        var isInbound = direction == "inbound";
        var isOnHold = sessionFromRN.isOnHold || ((_e = sessionFromRN.Data) === null || _e === void 0 ? void 0 : _e.isOnHold);
        if (resolvedState === SipProviderTypes_1.CallState.Established) {
            if (isOnHold) {
                return SipProviderTypes_1.CallStatus.OnHold;
            }
            return SipProviderTypes_1.CallStatus.CallInProgress;
        }
        if (resolvedState === SipProviderTypes_1.CallState.Terminated) {
            return SipProviderTypes_1.CallStatus.Ended;
        }
        if (isInbound) {
            return SipProviderTypes_1.CallStatus.Incoming;
        }
        return SipProviderTypes_1.CallStatus.Connecting;
    }
    var resolvedState = GetSessionState(sessionFromRN);
    var resolvedStatus = GetSessionStatus(sessionFromRN, resolvedState);
    var returnSession = {
        AudioOutputDevice: sessionFromRN.AudioOutputDevice || "default",
        AudioInputDevice: sessionFromRN.AudioInputDevice || "default",
        BuddyId: sessionFromRN.BuddyId || ((_a = sessionFromRN.Data) === null || _a === void 0 ? void 0 : _a.BuddyId) || "Unknown",
        Comments: sessionFromRN.Comments || [],
        Flagged: sessionFromRN.Flagged || false,
        DateAndTime: sessionFromRN.DateAndTime || ((_b = sessionFromRN.Data) === null || _b === void 0 ? void 0 : _b.DateAndTime) || ((_c = sessionFromRN.Data) === null || _c === void 0 ? void 0 : _c.StartTime),
        Id: sessionFromRN.Id || ((_d = sessionFromRN.Data) === null || _d === void 0 ? void 0 : _d.Id) || "Unknown",
        SessionId: sessionFromRN.SessionId || ((_e = sessionFromRN.Data) === null || _e === void 0 ? void 0 : _e.SessionId) || "Unknown",
        Data: sessionFromRN.Data,
        State: resolvedState,
        To: sessionFromRN.To || ((_f = sessionFromRN.Data) === null || _f === void 0 ? void 0 : _f.To) || "Unknown",
        Direction: sessionFromRN.Direction || ((_g = sessionFromRN.Data) === null || _g === void 0 ? void 0 : _g.Direction) || "inbound",
        DisplayName: sessionFromRN.DisplayName || ((_h = sessionFromRN.Data) === null || _h === void 0 ? void 0 : _h.DisplayName) || "Unknown",
        Events: sessionFromRN.Events || ((_j = sessionFromRN.Data) === null || _j === void 0 ? void 0 : _j.Events) || [],
        From: sessionFromRN.From || ((_k = sessionFromRN.Data) === null || _k === void 0 ? void 0 : _k.From) || "Unknown",
        FromName: sessionFromRN.FromName || ((_l = sessionFromRN.Data) === null || _l === void 0 ? void 0 : _l.FromName) || "Unknown",
        FromNumber: sessionFromRN.FromNumber || ((_m = sessionFromRN.Data) === null || _m === void 0 ? void 0 : _m.FromNumber) || "Unknown",
        IceCandidates: sessionFromRN.IceCandidates || ((_o = sessionFromRN.Data) === null || _o === void 0 ? void 0 : _o.IceCandidates) || [],
        Reactions: sessionFromRN.Reactions || ((_p = sessionFromRN.Data) === null || _p === void 0 ? void 0 : _p.Reactions) || [],
        Recording: sessionFromRN.Recording || ((_q = sessionFromRN.Data) === null || _q === void 0 ? void 0 : _q.Recording) || [],
        StartTime: sessionFromRN.StartTime || ((_r = sessionFromRN.Data) === null || _r === void 0 ? void 0 : _r.StartTime) || "Unknown",
        Status: resolvedStatus,
        Timer: sessionFromRN.Timer || 10,
        View: sessionFromRN.View || ((_s = sessionFromRN.Data) === null || _s === void 0 ? void 0 : _s.View) || SipProviderTypes_1.CallView.Extended,
        WithVideo: sessionFromRN.WithVideo || ((_t = sessionFromRN.Data) === null || _t === void 0 ? void 0 : _t.WithVideo) || false,
        isOnHold: sessionFromRN.isOnHold || false,
        isOnMute: sessionFromRN.isOnMute || false,
        Provider: 'sip',
        RTPSession: sessionFromRN.RTPSession || ((_u = sessionFromRN.Data) === null || _u === void 0 ? void 0 : _u.RTPSession) || null,
        ProfileUserId: window.phone.PROFILE_USER_ID || "Unknown",
    };
    return returnSession;
}
function SynchronizeSession(instruction) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var sessionFromRN, did, displayName, dataSessionId, sessionId, buddy, existingSession, createSession, sessionToStore, sessions, existingSessionIndex, hasSession;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    /**
                     * {"AnswerTime": "2026-01-29T07:26:41.318Z", "BuddyDisplayName": "Seven Hundred", "BuddyId": "Seven Hundred", "CallId": "436924aa-9e1c-419b-b10e-3b89eac15498", "CallerID": "Seven Hundred", "DID": "700", "Data": {"AnswerInProgress": false, "AnswerTime": "2026-01-29T07:26:41.318Z", "AudioLevelIntervalTimer": 1780, "BuddyDisplayName": "Seven Hundred", "BuddyId": "Seven Hundred", "CallId": "436924aa-9e1c-419b-b10e-3b89eac15498", "CallStarted": "2026-01-29T07:26:37.188Z", "CallerID": "Seven Hundred", "Comments": [], "DID": "700", "Direction": "inbound", "Events": [[Object]], "Flagged": false, "From": "Seven Hundred", "FromName": "Seven Hundred", "FromNumber": "700", "IceCandidates": [[Object], [Object], [Object], [Object], [Object], [Object]],
                     */
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeSession: Synchronizing Session", JSON.stringify(instruction.Data.SessionId));
                    sessionFromRN = (_a = instruction === null || instruction === void 0 ? void 0 : instruction.Data) === null || _a === void 0 ? void 0 : _a.Session;
                    did = sessionFromRN.DID || ((_b = sessionFromRN.Data) === null || _b === void 0 ? void 0 : _b.DID) || ((_c = sessionFromRN.Data) === null || _c === void 0 ? void 0 : _c.DisplayNumber);
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeSession: Session from REACT NATIVE", sessionFromRN);
                    if (!sessionFromRN) {
                        console.warn(__TAG__ + "SynchronizeSession: Missing session data", instruction);
                        return [2 /*return*/];
                    }
                    displayName = (sessionFromRN === null || sessionFromRN === void 0 ? void 0 : sessionFromRN.DisplayName) || ((_d = sessionFromRN.Data) === null || _d === void 0 ? void 0 : _d.DisplayName);
                    if (!displayName) {
                        console.warn(__TAG__ + "SynchronizeSession: Missing display name", sessionFromRN);
                        return [2 /*return*/];
                    }
                    dataSessionId = (_e = instruction === null || instruction === void 0 ? void 0 : instruction.Data) === null || _e === void 0 ? void 0 : _e.Id;
                    sessionId = dataSessionId || sessionFromRN.Id || sessionFromRN.SessionId || ((_f = sessionFromRN === null || sessionFromRN === void 0 ? void 0 : sessionFromRN.Data) === null || _f === void 0 ? void 0 : _f.SessionId);
                    return [4 /*yield*/, window.phone.GetBuddyByContact(did)];
                case 1:
                    buddy = _g.sent();
                    if (!!buddy) return [3 /*break*/, 3];
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeSession: Buddy Not Found with DID", did);
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeSession: Getting buddy by Display Number", sessionFromRN.DisplayNumber);
                    return [4 /*yield*/, window.phone.GetBuddyByContact(sessionFromRN.DisplayNumber)];
                case 2:
                    buddy = _g.sent();
                    if (!buddy) {
                        if (__DEBUG__)
                            console.log(__TAG__ + "SynchronizeSession: Buddy Not Found with Display Number", sessionFromRN.DisplayNumber);
                    }
                    _g.label = 3;
                case 3:
                    if (!!buddy) return [3 /*break*/, 5];
                    // Create a new buddy
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeSession: Creating new buddy", did);
                    return [4 /*yield*/, CreateBuddyFromSession(sessionFromRN, sessionId, null, did)];
                case 4:
                    buddy = _g.sent();
                    window.phone.SelectBuddy(buddy);
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    window.phone.UpdateUI();
                    window.phone.Toast(buddy.Id, "Buddy Created", null, 'green');
                    _g.label = 5;
                case 5:
                    if (dataSessionId && sessionFromRN.Id && dataSessionId !== sessionFromRN.Id) {
                        console.warn(__TAG__ + "SynchronizeSession: Session Id mismatch", dataSessionId, sessionFromRN.Id);
                        window.phone.Toast(dataSessionId, "Session Id mismatch for sync", null, 'red');
                        return [2 /*return*/];
                    }
                    if (!sessionId) {
                        console.warn(__TAG__ + "SynchronizeSession: Missing session Id for buddy sync", instruction);
                        return [2 /*return*/];
                    }
                    if (sessionFromRN.Id !== sessionId) {
                        sessionFromRN.Id = sessionId;
                    }
                    if (!sessionFromRN.BuddyId) {
                        sessionFromRN.BuddyId = buddy.Id;
                    }
                    if (!sessionFromRN.DisplayName && buddy.DisplayName) {
                        sessionFromRN.DisplayName = buddy.DisplayName;
                    }
                    existingSession = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(sessionId);
                    if (!existingSession) {
                        if (__DEBUG__)
                            console.log(__TAG__ + "SynchronizeSession: No Existing Session Found", sessionId);
                        createSession = CreateSessionFromRN(sessionFromRN);
                        if (__DEBUG__)
                            console.log(__TAG__ + "SynchronizeSession: Creating Session from RN", createSession);
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.set(createSession);
                        if (__DEBUG__)
                            console.log(__TAG__ + "SynchronizeSession: Session Added to SessionManager", createSession);
                        existingSession = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(sessionId);
                    }
                    sessionToStore = existingSession || sessionFromRN;
                    if (!sessionToStore.Id) {
                        sessionToStore.Id = sessionId;
                    }
                    sessions = buddy.Sessions || (buddy.Sessions = []);
                    existingSessionIndex = sessions.findIndex(function (sess) { return GetNormalizedSessionId(sess) === sessionId; });
                    if (existingSessionIndex === -1) {
                        if (__DEBUG__)
                            console.log(__TAG__ + "SynchronizeSession: Adding Session to Buddy", sessionId);
                        if (__DEBUG__)
                            console.log(__TAG__ + "SynchronizeSession: Adding Session to Buddy", sessionToStore);
                        window.phone.AddSession(buddy, sessionToStore);
                        hasSession = sessions.some(function (sess) { return GetNormalizedSessionId(sess) === sessionId; });
                        if (!hasSession) {
                            sessions.push(sessionToStore);
                        }
                        window.phone.UpdateProfileStatus("🔄Syncing Session...");
                        // (window as any).phone.Toast(sessionFromRN.BuddyId, "Sync Session Added", null, 'green');
                        window.phone.UpdateStage();
                        window.phone.UpdateUI();
                        window.phone.UpdateBuddyList();
                        // Select the buddy
                        window.phone.SelectBuddy(buddy);
                    }
                    else {
                        sessions[existingSessionIndex] = sessionToStore;
                    }
                    buddy.Sessions = sessions.filter(function (sess, index, list) {
                        var id = GetNormalizedSessionId(sess);
                        if (!id) {
                            return true;
                        }
                        return list.findIndex(function (other) { return GetNormalizedSessionId(other) === id; }) === index;
                    });
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Normalize a session identifier from known fields.
 * @param {SessionObject} session - The session to inspect
 * @returns {string | null} Normalized session id
 */
function GetNormalizedSessionId(session) {
    var _a;
    if (!session) {
        return null;
    }
    return session.Id || session.SessionId || ((_a = session.Data) === null || _a === void 0 ? void 0 : _a.SessionId) || null;
}
function HandleSynchronizeCDRs(cdrs) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, cdrs_1, cdr, buddy, cdrMessage, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, cdrs_1 = cdrs;
                    _a.label = 1;
                case 1:
                    if (!(_i < cdrs_1.length)) return [3 /*break*/, 6];
                    cdr = cdrs_1[_i];
                    if (__DEBUG__)
                        console.log(__TAG__ + "HandleSynchronizeCDRs: Synchronizing CDR", cdr);
                    return [4 /*yield*/, GetOrCreateBuddy(cdr)];
                case 2:
                    buddy = _a.sent();
                    cdrMessage = buddy.MessageStreamItems.find(function (message) { return (message.Id == cdr.CallData.Id); });
                    if (!!cdrMessage) return [3 /*break*/, 4];
                    if (__DEBUG__)
                        console.log(__TAG__ + "HandleSynchronizeCDRs: Creating new cdr message", cdr.CallData.Id);
                    // Create a new cdr message
                    cdrMessage = __assign({ Type: 'CDR', Id: cdr.CallData.Id, MessageId: cdr.CallData.Id, Body: cdr.CallData.Direction + " call to " + cdr.CallData.To + " Duration: " + cdr.CallData.Duration + " " + cdr.CallData.Disposition, Date: cdr.CallData.StartTime, Direction: cdr.CallData.Direction || "inbound", WithVideo: cdr.CallData.WithVideo || false, Recordings: cdr.CallData.Recordings || [], Flagged: false, Comments: [], Reactions: [], SessionId: cdr.CallData.Id, BuddyId: buddy.Id || cdr.CallData.BuddyId, CDRId: cdr.CallData.Id, StartTime: cdr.CallData.StartTime || cdr.CallData.CallStarted, EndTime: cdr.CallData.EndTime, TalkTime: cdr.CallData.TalkTime || 0, Duration: cdr.CallData.Duration || 0, AnswerTime: cdr.CallData.AnswerTime || cdr.CallData.CallStarted || cdr.CallData.StartTime, UserAgent: cdr.CallData.UserAgent || "", ProviderData: cdr.CallData.ProviderData || {
                            Type: "sip",
                            Description: "",
                            Invite: "",
                            TargetUri: "",
                            ReasonCode: cdr.CallData.ReasonCode || 0,
                            ReasonText: cdr.CallData.ReasonText || "",
                        }, ProfileUserId: window.phone.PROFILE_USER_ID || "", ToName: cdr.CallData.ToName || "", ToNumber: cdr.CallData.ToNumber || "", FromName: cdr.CallData.FromName || "", FromNumber: cdr.CallData.FromNumber || "", Network: cdr.CallData.Network || "", CallId: cdr.CallData.CallId || "", Disposition: cdr.CallData.Disposition || "", TerminatedBy: cdr.CallData.TerminatedBy || "" }, cdr.CallData);
                    if (__DEBUG__)
                        console.log(__TAG__ + "HandleSynchronizeCDRs: CDR Message", cdrMessage);
                    // cdrMessage = normalizeCdr(cdrMessage);
                    buddy.MessageStreamItems.push(cdrMessage);
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(cdr.CallData.Id, {
                        BuddyId: buddy.Id || cdr.CallData.BuddyId,
                        Data: __assign({}, (cdr.CallData || {}))
                    });
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.BuildAndAddCDRMessage(cdr.CallData.Id)];
                case 3:
                    _a.sent();
                    if (__DEBUG__)
                        console.log(__TAG__ + "HandleSynchronizeCDRs: CDR Message Built", cdr.CallData.Id);
                    // (window as any).phone.Toast(cdr.Id, "CDR Synchronized", null, 'green');
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    window.phone.UpdateUI();
                    return [3 /*break*/, 5];
                case 4:
                    if (__DEBUG__)
                        console.log(__TAG__ + "HandleSynchronizeCDRs: CDR Message Already Exists", cdr.CallData.Id);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_5 = _a.sent();
                    console.warn(__TAG__ + "HandleSynchronizeCDRs Error", e_5);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Handles incoming messages from React Native SIP provider
 * @param {any} instruction - The message instruction from React Native
 */
function onSipProviderRNMessage(instruction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
    return __awaiter(this, void 0, void 0, function () {
        var _14, incomingCallResponse, session, sessionFromRN, Session, updatedData2, updatedSession2, data, session, buddy, updatedData, updatedSession, data, session, updatedData3, updatedSession3, data, session, updatedData4, data, e_6, session, CancelledBuddy, e_7, session, session, sessionID, Session, currentSession, data, session, e_8, sessionID, session, session, session, session, sessionID, message, msi, _i, _15, buddy, _16, _17, item, session, existingEvents, sessionID, session, buddy, sessionID, session, buddy, session, buddy, session, buddy, session, session, data, buddy, sessions, response, responseNotFound, contact, handle, buddy, buddyName, buddyImage, callConfirmHtml, session, DID, newCDR, existingCDR, buddyId, _18, _19, buddy, _20, _21, item, newBuddyId, newBuddy, e_9, e_10, addCDR, error_1;
        var _this = this;
        return __generator(this, function (_22) {
            switch (_22.label) {
                case 0:
                    if (instruction.Source != "SiperbWebRTC" && instruction.Source != "ReactNative" && instruction.Source != "RNSipProvider") {
                        // not for us
                        return [2 /*return*/];
                    }
                    _22.label = 1;
                case 1:
                    _22.trys.push([1, 95, , 96]);
                    _14 = instruction.Action;
                    switch (_14) {
                        case SipProviderTypes_1.SipProviderMobileEvents.IncomingCall: return [3 /*break*/, 2];
                        case SipProviderTypes_1.SipProviderMobileEvents.SynchronizeSession: return [3 /*break*/, 6];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateProviderStatus: return [3 /*break*/, 8];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateCallStatus: return [3 /*break*/, 9];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateProfileStatus: return [3 /*break*/, 10];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateCallState: return [3 /*break*/, 11];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallConnected: return [3 /*break*/, 12];
                        case SipProviderTypes_1.SipProviderMobileEvents.OnCallAnswered: return [3 /*break*/, 13];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallHasEnded: return [3 /*break*/, 14];
                        case SipProviderTypes_1.SipProviderMobileEvents.AddCallAnsweredEvent: return [3 /*break*/, 16];
                        case SipProviderTypes_1.SipProviderMobileEvents.UserHungUpCall: return [3 /*break*/, 17];
                        case SipProviderTypes_1.SipProviderMobileEvents.HangupResponse: return [3 /*break*/, 20];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallInviteRejected: return [3 /*break*/, 22];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallCancelled: return [3 /*break*/, 26];
                        case SipProviderTypes_1.SipProviderMobileEvents.Hangup || SipProviderTypes_1.SipProviderMobileEvents.UserHungUpCall: return [3 /*break*/, 31];
                        case SipProviderTypes_1.SipProviderMobileEvents.UserCancelledCall: return [3 /*break*/, 33];
                        case SipProviderTypes_1.SipProviderMobileEvents.Cancel: return [3 /*break*/, 35];
                        case SipProviderTypes_1.SipProviderMobileEvents.ForceRemoveCallSession: return [3 /*break*/, 40];
                        case SipProviderTypes_1.SipProviderMobileEvents.Connecting: return [3 /*break*/, 42];
                        case SipProviderTypes_1.SipProviderMobileEvents.OnAccept: return [3 /*break*/, 43];
                        case SipProviderTypes_1.SipProviderMobileEvents.OnTrying: return [3 /*break*/, 44];
                        case SipProviderTypes_1.SipProviderMobileEvents.OnProgress: return [3 /*break*/, 45];
                        case SipProviderTypes_1.SipProviderMobileEvents.OnTrackAdded: return [3 /*break*/, 46];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallAnsweredElsewhere: return [3 /*break*/, 47];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateSenderAudioLevel: return [3 /*break*/, 52];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateReceiverAudioLevel: return [3 /*break*/, 53];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateSenderStats: return [3 /*break*/, 54];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateReceiverStats: return [3 /*break*/, 55];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateRemoteInboundRtpStreamStats: return [3 /*break*/, 56];
                        case SipProviderTypes_1.SipProviderMobileEvents.AddCallActivity: return [3 /*break*/, 57];
                        case SipProviderTypes_1.SipProviderMobileEvents.LogTransportEvent: return [3 /*break*/, 58];
                        case SipProviderTypes_1.SipProviderMobileEvents.LogEvent: return [3 /*break*/, 59];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallHold: return [3 /*break*/, 60];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallUnHold: return [3 /*break*/, 63];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallMuted: return [3 /*break*/, 66];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallUnMuted: return [3 /*break*/, 67];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallAnswered: return [3 /*break*/, 68];
                        case SipProviderTypes_1.SipProviderMobileEvents.OnSessionReceivedBye: return [3 /*break*/, 69];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallHoldResponse: return [3 /*break*/, 71];
                        case SipProviderTypes_1.SipProviderMobileEvents.CallMutedResponse: return [3 /*break*/, 72];
                        case SipProviderTypes_1.SipProviderMobileEvents.AddCDR: return [3 /*break*/, 73];
                        case SipProviderTypes_1.SipProviderMobileEvents.GetBuddySessions: return [3 /*break*/, 75];
                        case SipProviderTypes_1.SipProviderMobileEvents.DeepLinkMakeAudioCall: return [3 /*break*/, 79];
                        case SipProviderTypes_1.SipProviderMobileEvents.SynchronizeCDRs: return [3 /*break*/, 80];
                        case SipProviderTypes_1.SipProviderMobileEvents.UpdateCDR: return [3 /*break*/, 81];
                    }
                    return [3 /*break*/, 94];
                case 2:
                    // Update Profile Status to Incoming Call
                    window.phone.UpdateProfileStatus("☎️Incoming Call");
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.OnIncomingCall(instruction.Data)];
                case 3:
                    incomingCallResponse = _22.sent();
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(instruction.Data.Id)];
                case 4:
                    session = _22.sent();
                    if (__DEBUG__)
                        console.log(__TAG__ + "IncomingCall: Posting Buddy Id back", session.BuddyId, session.Id);
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.IncomingCallCompleted(session)];
                case 5:
                    _22.sent();
                    exports.MobileSipCoreConfiguration.PostMessage({
                        Action: SipProviderTypes_1.SipProviderMobileEvents.IncomingCallBuddyId,
                        Source: "RNSipProvider",
                        Destination: "SiperbWebRTC",
                        Data: {
                            BuddyId: session.BuddyId || "Unknown",
                            SessionId: session.Id || "Unknown",
                        }
                    });
                    if (__DEBUG__)
                        console.log(__TAG__ + "IncomingCall: Session Completed", session);
                    // Post Buddy Id back
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var session;
                        return __generator(this, function (_a) {
                            session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                            if (session && session.State === SipProviderTypes_1.CallState.Established) {
                                Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallAnswered(instruction.Data.Id);
                            }
                            if (!session) {
                                // Toast call ended no session found
                                window.phone.Toast(instruction.Data.Id, "Call Ended", null, 'red');
                                // Remove the session
                                Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.RemoveSession(instruction.Data.Id);
                                // Update the stage
                                window.phone.UpdateStage();
                            }
                            return [2 /*return*/];
                        });
                    }); }, 1000);
                    return [3 /*break*/, 94];
                case 6:
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeSession: Synchronizing Session", JSON.stringify(instruction.Data));
                    sessionFromRN = (_a = instruction === null || instruction === void 0 ? void 0 : instruction.Data) === null || _a === void 0 ? void 0 : _a.Session;
                    return [4 /*yield*/, SynchronizeSession(instruction)];
                case 7:
                    _22.sent();
                    return [3 /*break*/, 94];
                case 8:
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.UpdateProviderStatus(instruction.Data.Status);
                    return [3 /*break*/, 94];
                case 9:
                    window.phone.UpdateCallStatus(instruction.Data.Id, instruction.Data.Status);
                    return [3 /*break*/, 94];
                case 10:
                    window.phone.UpdateProfileStatus(instruction.Data.Status || "");
                    return [3 /*break*/, 94];
                case 11:
                    window.phone.UpdateCallState(instruction.Data.Id, instruction.Data.State);
                    return [3 /*break*/, 94];
                case 12:
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.OnCallConnected(instruction.Data.Id);
                    return [3 /*break*/, 94];
                case 13:
                    window.phone.AddSessionEvent(instruction.Data.Id, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnAccept,
                        Data: {
                            SessionId: instruction.Data.Id,
                            Time: window.phone.TimeNow(),
                        }
                    });
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallAnswered(instruction.Data.Id);
                    return [3 /*break*/, 94];
                case 14:
                    if (__DEBUG__)
                        console.log(__TAG__ + "CallHasEnded: Call Has Ended", instruction.Data);
                    Session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    updatedData2 = {};
                    updatedSession2 = {};
                    for (data in (_b = instruction.Data) === null || _b === void 0 ? void 0 : _b.CallData) {
                        updatedData2[data] = (_c = instruction.Data) === null || _c === void 0 ? void 0 : _c.CallData[data];
                        updatedSession2[data] = (_d = instruction.Data) === null || _d === void 0 ? void 0 : _d.CallData[data];
                    }
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, __assign({ Data: __assign(__assign({}, Session.Data), updatedData2) }, updatedSession2));
                    // Check if inbound or outbound call
                    if (Session.Data.Direction == 'inbound') {
                        // Check State is Established
                        if (Session.State === SipProviderTypes_1.CallState.Established) {
                            window.phone.AddSessionEvent(instruction.Data.Id, {
                                Timestamp: window.phone.TimeNow(),
                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnHangup,
                                Data: {
                                    SessionId: instruction.Data.Id,
                                    Time: window.phone.TimeNow(),
                                }
                            });
                        }
                        else if (Session.State === SipProviderTypes_1.CallState.Establishing) {
                            window.phone.AddSessionEvent(instruction.Data.Id, {
                                Timestamp: window.phone.TimeNow(),
                                Activity: SipProviderTypes_1.SipProviderPostMessage.OnDecline,
                                Data: {
                                    SessionId: instruction.Data.Id,
                                    Time: window.phone.TimeNow(),
                                }
                            });
                        }
                    }
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.BuildAndAddCDRMessage(instruction.Data.Id)];
                case 15:
                    _22.sent();
                    setTimeout(function () {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.RemoveSession(instruction.Data.Id);
                        window.phone.UpdateStage();
                    }, 10);
                    return [3 /*break*/, 94];
                case 16:
                    window.phone.AddSessionEvent(instruction.Data.Id, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnAccept,
                        Data: {
                            SessionId: instruction.Data.Id,
                            Time: window.phone.TimeNow(),
                        }
                    });
                    return [3 /*break*/, 94];
                case 17:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithSession(instruction.Data.Id)];
                case 18:
                    buddy = _22.sent();
                    updatedData = {};
                    updatedSession = {};
                    for (data in (_e = instruction.Data) === null || _e === void 0 ? void 0 : _e.CallData) {
                        updatedData[data] = (_f = instruction.Data) === null || _f === void 0 ? void 0 : _f.CallData[data];
                        updatedSession[data] = (_g = instruction.Data) === null || _g === void 0 ? void 0 : _g.CallData[data];
                    }
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, __assign({ Data: __assign(__assign({}, session.Data), updatedData) }, updatedSession));
                    return [4 /*yield*/, window.phone.OnHangup(session, buddy)];
                case 19:
                    _22.sent();
                    return [3 /*break*/, 94];
                case 20:
                    if (__DEBUG__)
                        console.log(__TAG__ + "HangupResponse: Hangup Response", instruction.Data);
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    updatedData3 = {};
                    updatedSession3 = {};
                    for (data in (_h = instruction.Data) === null || _h === void 0 ? void 0 : _h.CallData) {
                        updatedData3[data] = (_j = instruction.Data) === null || _j === void 0 ? void 0 : _j.CallData[data];
                        updatedSession3[data] = (_k = instruction.Data) === null || _k === void 0 ? void 0 : _k.CallData[data];
                    }
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, __assign({ Data: __assign(__assign({}, session.Data), updatedData3) }, updatedSession3));
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.BuildAndAddCDRMessage(instruction.Data.Id)];
                case 21:
                    _22.sent();
                    setTimeout(function () {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.RemoveSession(instruction.Data.Id);
                        window.phone.UpdateStage();
                    }, 1000);
                    return [3 /*break*/, 94];
                case 22:
                    _22.trys.push([22, 24, , 25]);
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    updatedData4 = {};
                    for (data in (_l = instruction.Data) === null || _l === void 0 ? void 0 : _l.CallData) {
                        updatedData4[data] = (_m = instruction.Data) === null || _m === void 0 ? void 0 : _m.CallData[data];
                    }
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, {
                        Data: __assign(__assign({}, session.Data), updatedData4)
                    });
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallInviteRejected(instruction.Data.Id, instruction.Data.CallData)];
                case 23:
                    _22.sent();
                    return [3 /*break*/, 25];
                case 24:
                    e_6 = _22.sent();
                    console.warn(__TAG__ + "CallInviteRejected Error", e_6);
                    return [3 /*break*/, 25];
                case 25: return [3 /*break*/, 94];
                case 26:
                    _22.trys.push([26, 29, , 30]);
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    if ((_o = session === null || session === void 0 ? void 0 : session.Data) === null || _o === void 0 ? void 0 : _o.ProviderCompleted) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, window.phone.GetBuddyWithSession(session.Id)];
                case 27:
                    CancelledBuddy = _22.sent();
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallCancelled(session.Id, instruction.Data.CallData)];
                case 28:
                    _22.sent();
                    return [3 /*break*/, 30];
                case 29:
                    e_7 = _22.sent();
                    console.warn(__TAG__ + "CallCancelled Error", e_7);
                    return [3 /*break*/, 30];
                case 30: return [3 /*break*/, 94];
                case 31:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.Hangup(session)];
                case 32:
                    _22.sent();
                    return [3 /*break*/, 94];
                case 33:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    sessionID = instruction.Data.Id;
                    Session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(sessionID);
                    if ((_p = Session === null || Session === void 0 ? void 0 : Session.Data) === null || _p === void 0 ? void 0 : _p.ProviderCompleted) {
                        return [2 /*return*/];
                    }
                    currentSession = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(sessionID);
                    for (data in (_q = instruction.Data) === null || _q === void 0 ? void 0 : _q.CallData) {
                        currentSession.Data[data] = (_r = instruction.Data) === null || _r === void 0 ? void 0 : _r.CallData[data];
                        currentSession[data] = (_s = instruction.Data) === null || _s === void 0 ? void 0 : _s.CallData[data];
                    }
                    currentSession.Data.ProviderCompleted = true;
                    currentSession.Data.CallEnded = window.phone.TimeNow();
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, {
                        Data: __assign(__assign({}, currentSession.Data), { TerminatedBy: 'us', ReasonCode: 0, ReasonText: 'Call Cancelled', CallData: (_t = instruction.Data) === null || _t === void 0 ? void 0 : _t.CallData })
                    });
                    // Was this a attended transfer call?
                    if ((_u = currentSession === null || currentSession === void 0 ? void 0 : currentSession.Data) === null || _u === void 0 ? void 0 : _u.AttendedTransferCall) {
                        // Attended transfer call cancelled
                    }
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.BuildAndAddCDRMessage(sessionID)];
                case 34:
                    _22.sent();
                    window.phone.RemoveSession(sessionID);
                    return [3 /*break*/, 94];
                case 35:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    _22.label = 36;
                case 36:
                    _22.trys.push([36, 38, , 39]);
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.Cancel(session, instruction.Data.ReasonCode, "Call Cancelled")];
                case 37:
                    _22.sent();
                    return [3 /*break*/, 39];
                case 38:
                    e_8 = _22.sent();
                    console.warn(__TAG__ + "Cancel Error", e_8);
                    return [3 /*break*/, 39];
                case 39: return [3 /*break*/, 94];
                case 40:
                    sessionID = instruction.Data.Id;
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.RemoveSession(sessionID)];
                case 41:
                    _22.sent();
                    window.phone.UpdateStage();
                    return [3 /*break*/, 94];
                case 42:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    session.Status = SipProviderTypes_1.CallStatus.Connecting;
                    session.State = SipProviderTypes_1.CallState.Establishing;
                    window.phone.UpdateSession(session);
                    return [3 /*break*/, 94];
                case 43:
                    session = window.phone.GetSession(instruction.Data.Id);
                    session.Status = session.isOnHold ? SipProviderTypes_1.CallStatus.OnHold : SipProviderTypes_1.CallStatus.CallInProgress;
                    session.State = SipProviderTypes_1.CallState.Established;
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.StartCallTimer(session.Id);
                    window.phone.UpdateSession(session);
                    window.phone.AddSessionEvent(session.Id, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnAccept,
                        Data: {
                            SessionId: session.Id,
                            SipCore: true,
                            Time: window.phone.TimeNow(),
                        }
                    });
                    return [3 /*break*/, 94];
                case 44:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    session.Status = SipProviderTypes_1.CallStatus.Trying;
                    session.State = SipProviderTypes_1.CallState.Establishing;
                    window.phone.UpdateSession(session);
                    window.phone.AddSessionEvent(session.Id, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnTrying,
                        Data: {
                            SessionId: session.Id,
                            SipCore: true,
                            Time: window.phone.TimeNow(),
                        }
                    });
                    return [3 /*break*/, 94];
                case 45:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    session.Status = SipProviderTypes_1.CallStatus.Ringing;
                    window.phone.UpdateSession(session);
                    window.phone.AddSessionEvent(session.Id, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnProgress,
                        Data: {
                            SessionId: session.Id,
                            SipCore: true,
                            Time: window.phone.TimeNow(),
                        }
                    });
                    return [3 /*break*/, 94];
                case 46:
                    window.phone.AddSessionEvent(instruction.Data.Id, {
                        Timestamp: window.phone.TimeNow(),
                        Activity: SipProviderTypes_1.SipProviderPostMessage.OnTrackAdded,
                        Data: {
                            SessionId: instruction.Data.Id,
                            SipCore: true,
                            Time: window.phone.TimeNow(),
                        }
                    });
                    return [3 /*break*/, 94];
                case 47:
                    sessionID = instruction.Data.Id;
                    return [4 /*yield*/, window.phone.GetMessageStreamItem(sessionID)];
                case 48:
                    message = _22.sent();
                    if (!message) return [3 /*break*/, 51];
                    message.Disposition = SipProviderTypes_1.Dispositions.AnsweredElsewhere;
                    return [4 /*yield*/, window.phone.SetMessageStreamItem(message)];
                case 49:
                    _22.sent();
                    return [4 /*yield*/, window.phone.BuildMessageStreamItem(message)];
                case 50:
                    msi = _22.sent();
                    // loop through phone.MyBuddies.MessageItemStream and update the message with the new message
                    for (_i = 0, _15 = window.phone.MyBuddies; _i < _15.length; _i++) {
                        buddy = _15[_i];
                        if (buddy === null || buddy === void 0 ? void 0 : buddy.MessageStreamItems) {
                            for (_16 = 0, _17 = buddy.MessageStreamItems; _16 < _17.length; _16++) {
                                item = _17[_16];
                                if (item.Id == sessionID || (item === null || item === void 0 ? void 0 : item.id) == sessionID || (item === null || item === void 0 ? void 0 : item.SessionId) == sessionID) {
                                    item = JSON.parse(JSON.stringify(msi));
                                    window.phone.UpdateBuddyList();
                                    window.phone.UpdateStage();
                                }
                            }
                        }
                    }
                    _22.label = 51;
                case 51: return [3 /*break*/, 94];
                case 52:
                    try {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.UpdateSenderAudioLevel(instruction.Data.Id, instruction.Data.Level);
                    }
                    catch (e) {
                        console.warn(__TAG__ + "UpdateSenderAudioLevel Error", e);
                    }
                    return [3 /*break*/, 94];
                case 53:
                    try {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.UpdateReceiverAudioLevel(instruction.Data.Id, instruction.Data.Level);
                    }
                    catch (e) {
                        console.warn(__TAG__ + "UpdateReceiverAudioLevel Error", e);
                    }
                    return [3 /*break*/, 94];
                case 54:
                    try {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.UpdateSenderStats(instruction.Data.Id, instruction.Data.Stats);
                    }
                    catch (e) {
                        console.warn(__TAG__ + "UpdateSenderStats Error", e);
                    }
                    return [3 /*break*/, 94];
                case 55:
                    try {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.UpdateReceiverStats(instruction.Data.Id, instruction.Data.Stats);
                    }
                    catch (e) {
                        console.warn(__TAG__ + "UpdateReceiverStats Error", e);
                    }
                    return [3 /*break*/, 94];
                case 56:
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.UpdateRemoteInboundRtpStreamStats(instruction.Data.Id, instruction.Data.Stats);
                    return [3 /*break*/, 94];
                case 57:
                    {
                        if (__DEBUG__)
                            console.log(__TAG__ + "AddCallActivity: Adding call activity", instruction.Data.Id, instruction.Data.Activity);
                        session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                        if (session) {
                            existingEvents = session.Events || [];
                            if (existingEvents.some(function (event) { return event.Activity === instruction.Data.Activity && event.Activity === "OnCallAnswered"; })) {
                                return [2 /*return*/];
                            }
                        }
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.AddCallActivity(instruction.Data.Id, {
                            Activity: instruction.Data.Activity,
                            Data: instruction.Data.Data,
                            Timestamp: instruction.Data.Timestamp
                        });
                        return [3 /*break*/, 94];
                    }
                    _22.label = 58;
                case 58:
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.LogTransportEvent(instruction.Data.Direction, instruction.Data.Message);
                    return [3 /*break*/, 94];
                case 59:
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.LogEvent(instruction.Data.Event, instruction.Data.Message);
                    return [3 /*break*/, 94];
                case 60:
                    sessionID = instruction.Data.Id;
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(sessionID)];
                case 61:
                    session = _22.sent();
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithSession(sessionID)];
                case 62:
                    buddy = _22.sent();
                    session.isOnHold = true;
                    window.phone.UpdateStage();
                    return [3 /*break*/, 94];
                case 63:
                    sessionID = instruction.Data.Id;
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetSessionWithID(sessionID)];
                case 64:
                    session = _22.sent();
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithSession(sessionID)];
                case 65:
                    buddy = _22.sent();
                    session.isOnHold = false;
                    window.phone.UpdateStage();
                    return [3 /*break*/, 94];
                case 66:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    buddy = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithSession(instruction.Data.Id);
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.Core.Mute(session, buddy);
                    return [3 /*break*/, 94];
                case 67:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    buddy = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithSession(instruction.Data.Id);
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.Core.Unmute(session, buddy);
                    return [3 /*break*/, 94];
                case 68:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallAnswered(session.Id);
                    return [3 /*break*/, 94];
                case 69:
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    for (data in (_v = instruction.Data) === null || _v === void 0 ? void 0 : _v.CallData) {
                        session.Data[data] = (_w = instruction.Data) === null || _w === void 0 ? void 0 : _w.CallData[data];
                        session[data] = (_x = instruction.Data) === null || _x === void 0 ? void 0 : _x.CallData[data];
                    }
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, {
                        Data: __assign(__assign({}, session.Data), (_y = instruction.Data) === null || _y === void 0 ? void 0 : _y.CallData)
                    });
                    if (__DEBUG__)
                        console.log(__TAG__ + "OnSessionReceivedBye: Session", session);
                    if (__DEBUG__)
                        console.log(__TAG__ + "OnSessionReceivedBye: CallData", (_z = instruction.Data) === null || _z === void 0 ? void 0 : _z.CallData);
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.OnSessionReceivedBye(instruction.Data.Id, (_0 = instruction.Data) === null || _0 === void 0 ? void 0 : _0.CallData)];
                case 70:
                    _22.sent();
                    window.phone.UpdateStage();
                    return [3 /*break*/, 94];
                case 71:
                    if (instruction.Data.Hold == true) {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallIsOnHold(instruction.Data.Id);
                    }
                    else {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallIsOnUnHold(instruction.Data.Id);
                    }
                    return [3 /*break*/, 94];
                case 72:
                    if (instruction.Data.Muted == true) {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallIsMuted(instruction.Data.Id);
                    }
                    else {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.CallIsUnMuted(instruction.Data.Id);
                    }
                    return [3 /*break*/, 94];
                case 73:
                    if (__DEBUG__)
                        console.log(__TAG__ + "AddCDR: Adding CDR for session", instruction.Data.Id, instruction.Data.CallData);
                    if ((_1 = instruction.Data) === null || _1 === void 0 ? void 0 : _1.CallData) {
                        Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.UpdateSession(instruction.Data.Id, {
                            Data: __assign({}, (instruction.Data.CallData || {}))
                        });
                    }
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.BuildAndAddCDRMessage(instruction.Data.Id)];
                case 74:
                    _22.sent();
                    return [3 /*break*/, 94];
                case 75:
                    if (!instruction.Data.BuddyId) {
                        console.warn(__TAG__ + "GetBuddySessions: Missing Buddy Id", instruction.Data);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithID(instruction.Data.BuddyId)];
                case 76:
                    buddy = _22.sent();
                    if (!!buddy) return [3 /*break*/, 78];
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.GetBuddyWithDisplayName(instruction.Data.BuddyId)];
                case 77:
                    // try display name
                    buddy = _22.sent();
                    _22.label = 78;
                case 78:
                    // Toast
                    if (buddy) {
                        if (!buddy.Sessions) {
                            buddy.Sessions = [];
                        }
                        sessions = buddy.Sessions;
                        response = {
                            Reason: "Buddy Sessions",
                            Action: SipProviderTypes_1.SipProviderMobileEvents.GetBuddySessionsResponse,
                            Data: {
                                Sessions: sessions
                            }
                        };
                        exports.MobileSipCoreConfiguration.PostMessage(response);
                    }
                    else {
                        responseNotFound = {
                            Reason: "Buddy Not Found",
                            Action: SipProviderTypes_1.SipProviderMobileEvents.GetBuddySessionsResponse,
                            Data: {
                                Sessions: []
                            }
                        };
                        exports.MobileSipCoreConfiguration.PostMessage(responseNotFound);
                    }
                    return [3 /*break*/, 94];
                case 79:
                    contact = instruction.Data.Contact;
                    handle = instruction.Data.Handle;
                    buddy = window.phone.GetBuddyByContact(contact);
                    if (!buddy) {
                        buddy = window.phone.GetBuddyByContact(handle);
                    }
                    buddyName = (buddy === null || buddy === void 0 ? void 0 : buddy.DisplayName) || (buddy === null || buddy === void 0 ? void 0 : buddy.Name) || contact || handle || "Unknown";
                    buddyImage = (buddy === null || buddy === void 0 ? void 0 : buddy.Avatar) || window.phone.RandomAvatar();
                    callConfirmHtml = "\n                    <div style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 8px 0; width: 100%; text-align: center;\">\n                        <div style=\"font-size: 16px; font-weight: 600; line-height: 1.3; margin-bottom: 2px;\">Would you like to call ".concat(buddyName, "?</div>\n                        <div style=\"width: 96px; height: 96px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; margin: 0 auto;\">\n                            <img src=\"").concat(buddyImage, "\" alt=\"Buddy\" style=\"width: 100%; height: 100%; object-fit: cover; display: block;\">\n                        </div>\n                        <div style=\"display: flex; flex-direction: column; align-items: center; gap: 2px;\">\n                            <div style=\"font-size: 20px; font-weight: 600; line-height: 1.2;\">").concat(buddyName, "</div>\n                            <div style=\"font-size: 12px; opacity: 0.75;\">").concat(contact || handle || "", "</div>\n                        </div>\n                    </div>\n                ");
                    // Show alert
                    window.phone.Confirm(callConfirmHtml, // message
                    "", // title
                    function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var contactObj;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        contactObj = {
                                            Number: contact,
                                            Provider: 'sip'
                                        };
                                        return [4 /*yield*/, window.phone.OnAudioCall(contactObj, buddy)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }, function () {
                        // Cancel button pressed
                    });
                    return [3 /*break*/, 94];
                case 80:
                    if (__DEBUG__)
                        console.log(__TAG__ + "SynchronizeCDRs: Synchronizing CDRs");
                    // Update Profile Status to Synchronizing CDRs
                    window.phone.UpdateProfileStatus("🔄Synchronizing CDRs");
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, HandleSynchronizeCDRs(instruction.Data.CDRs)];
                                case 1:
                                    _a.sent();
                                    setTimeout(function () {
                                        GetTotalNotifications();
                                    }, 1000);
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                    return [3 /*break*/, 94];
                case 81:
                    if (__DEBUG__)
                        console.log(__TAG__ + "UpdateCDR: Updating CDR", instruction.Data);
                    session = Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.get(instruction.Data.Id);
                    DID = ((_2 = instruction.Data.CDR) === null || _2 === void 0 ? void 0 : _2.DID) || ((_3 = instruction.Data.CDR) === null || _3 === void 0 ? void 0 : _3.ToNumber) || ((_4 = instruction.Data.CDR) === null || _4 === void 0 ? void 0 : _4.To) || ((_5 = instruction.Data.CDR) === null || _5 === void 0 ? void 0 : _5.FromNumber) || ((_6 = instruction.Data.CDR) === null || _6 === void 0 ? void 0 : _6.From);
                    if (!DID) {
                        console.warn(__TAG__ + "UpdateCDR: Missing DID");
                        return [2 /*return*/];
                    }
                    newCDR = instruction.Data.CDR;
                    existingCDR = null;
                    buddyId = null;
                    // Loop through all buddies and find the CDR
                    for (_18 = 0, _19 = window.phone.MyBuddies; _18 < _19.length; _18++) {
                        buddy = _19[_18];
                        if ((buddy === null || buddy === void 0 ? void 0 : buddy.isDeleted) && typeof (buddy === null || buddy === void 0 ? void 0 : buddy.isDeleted) === "boolean" && (buddy === null || buddy === void 0 ? void 0 : buddy.isDeleted) === true) {
                            continue;
                        }
                        if (buddy.Contacts.find(function (contact) { return contact.Number == DID; })) {
                            buddyId = buddy.Id;
                        }
                        if (buddy.MessageStreamItems) {
                            for (_20 = 0, _21 = buddy.MessageStreamItems; _20 < _21.length; _20++) {
                                item = _21[_20];
                                if (item.Id == instruction.Data.Id || item.SessionId == instruction.Data.Id || item.MessageId == instruction.Data.Id) {
                                    existingCDR = item;
                                }
                            }
                        }
                    }
                    if (!!buddyId) return [3 /*break*/, 86];
                    newBuddyId = window.phone.UID();
                    newBuddy = {
                        DisplayName: ((_7 = instruction.Data.CDR) === null || _7 === void 0 ? void 0 : _7.DisplayName) || "",
                        BuddyId: newBuddyId,
                        Id: newBuddyId,
                        Avatar: window.phone.RandomAvatar(),
                        DateCreated: window.phone.TimeNow(),
                        Contacts: [{
                                Number: ((_8 = instruction.Data.CDR) === null || _8 === void 0 ? void 0 : _8.FromNumber) || "",
                                Provider: 'sip',
                            }],
                        AutoDelete: true,
                        Missed: 0,
                        MessageStreamItems: [],
                        LastActivity: window.phone.TimeNow(),
                        Data: {},
                        Sessions: [],
                    };
                    window.phone.MyBuddies.push(newBuddy);
                    _22.label = 82;
                case 82:
                    _22.trys.push([82, 84, , 85]);
                    return [4 /*yield*/, window.phone.SaveBuddy(newBuddy.Id, newBuddy)];
                case 83:
                    _22.sent();
                    return [3 /*break*/, 85];
                case 84:
                    e_9 = _22.sent();
                    console.warn(__TAG__ + "UpdateCDR: Error saving new buddy", e_9);
                    return [3 /*break*/, 85];
                case 85:
                    buddyId = newBuddy.BuddyId;
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    _22.label = 86;
                case 86:
                    if (!existingCDR) return [3 /*break*/, 91];
                    if (__DEBUG__)
                        console.log(__TAG__ + "UpdateCDR: Updating CDR", existingCDR);
                    _22.label = 87;
                case 87:
                    _22.trys.push([87, 89, , 90]);
                    return [4 /*yield*/, window.phone.UpdateCallDetailRecord(buddyId, instruction.Data.CDR)];
                case 88:
                    _22.sent();
                    return [3 /*break*/, 90];
                case 89:
                    e_10 = _22.sent();
                    console.warn(__TAG__ + "UpdateCDR: Error updating call detail record", e_10);
                    return [3 /*break*/, 90];
                case 90:
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    return [3 /*break*/, 93];
                case 91:
                    if (__DEBUG__)
                        console.log(__TAG__ + "UpdateCDR: CDR not found", instruction.Data.Id);
                    addCDR = __assign({ BuddyId: buddyId, Type: 'CDR', Id: instruction.Data.Id, MessageId: instruction.Data.Id, Body: ((_9 = instruction.Data.CDR) === null || _9 === void 0 ? void 0 : _9.Body) || "", Date: instruction.Data.CDR.Date, Direction: ((_10 = instruction.Data.CDR) === null || _10 === void 0 ? void 0 : _10.Direction) || "", WithVideo: ((_11 = instruction.Data.CDR) === null || _11 === void 0 ? void 0 : _11.WithVideo) || false, Recordings: ((_12 = instruction.Data.CDR) === null || _12 === void 0 ? void 0 : _12.Recordings) || [], Flagged: ((_13 = instruction.Data.CDR) === null || _13 === void 0 ? void 0 : _13.Flagged) || false }, instruction.Data.CDR);
                    if (__DEBUG__)
                        console.log(__TAG__ + "UpdateCDR: Adding new CDR", addCDR);
                    Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.SessionManager.set(addCDR);
                    // Add new CDR
                    return [4 /*yield*/, Browser_Phone_SipProvider_1.BrowserPhoneSipProvider.BuildAndAddCDRMessage(instruction.Data.Id)];
                case 92:
                    // Add new CDR
                    _22.sent();
                    window.phone.UpdateBuddyList();
                    window.phone.UpdateStage();
                    _22.label = 93;
                case 93:
                    setTimeout(function () {
                        GetTotalNotifications();
                    }, 1000);
                    return [3 /*break*/, 94];
                case 94: return [3 /*break*/, 96];
                case 95:
                    error_1 = _22.sent();
                    console.warn(__TAG__ + "onSipProviderRNMessage Error", error_1, instruction);
                    return [3 /*break*/, 96];
                case 96: return [2 /*return*/];
            }
        });
    });
}
/**
 * Adds a message listener for React Native communication
 * @param {string} responseEvent - The event name to listen for
 * @param {Function} listener - The callback function to execute
 * @returns {Function} Cleanup function to remove the listener
 */
function AddSipProviderRNMessageListener(responseEvent, listener) {
    function handler(event) {
        try {
            var data = event.data;
            if (typeof data === "string") {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                }
            }
            if (data.Action === responseEvent)
                listener(data);
        }
        catch (error) {
            console.warn(__TAG__ + "AddRNMessageListener Error", error);
        } // Ignore malformed messages
    }
    window.addEventListener("message", handler);
    return function () {
        window.removeEventListener("message", handler);
    };
}
/**
 * Sends a message to React Native and waits for a response
 * @param {Object} message - The message to send
 * @param {string} responseEvent - The expected response event name
 * @param {number} timeoutMs - Timeout in milliseconds (default: DEFAULT_TIMEOUT_MS)
 * @returns {Promise} Promise that resolves with the response data
 */
function SipProviderRNAwaitPostMessage(message, responseEvent, timeoutMs) {
    if (timeoutMs === void 0) { timeoutMs = DEFAULT_TIMEOUT_MS; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    function onResponse(data) {
                        clearTimeout(timeout);
                        cleanup();
                        setTimeout(function () {
                            if (data.Data) {
                                resolve(data.Data);
                            }
                            else {
                                resolve(data);
                            }
                        }, 0);
                        // resolve(data);
                    }
                    var cleanup = AddSipProviderRNMessageListener(responseEvent, onResponse);
                    var timeout = setTimeout(function () {
                        cleanup();
                        reject({
                            Success: false,
                            Error: "Timeout: No response for '".concat(responseEvent, "' within ").concat(timeoutMs, "ms")
                        });
                    }, timeoutMs);
                    try {
                        SipProviderRNPostMessage(message);
                    }
                    catch (err) {
                        cleanup();
                        clearTimeout(timeout);
                        reject(new Error("RNPostMessage failed: ".concat(err.message)));
                    }
                })];
        });
    });
}
/**
 * Posts a message to React Native
 * @param {Object} message - The message to send
 */
function SipProviderRNPostMessage(message) {
    /**
     * Send a message to the parent windowparent.postMessage(
                JSON.stringify({
                    Destination: "Application",
                    Source: "RNSipProvider",
                    Action: "RefreshRegistration",
                    Data: {},
                })
            );
            top.ReactNativeWebView.postMessage(JSON.stringify({
                    Destination: "Application",
                    Source: "RNSipProvider",
                    Action: "RefreshRegistration",
                    Data: {},
                }));
     */
    try {
        var msg = SafeJsonParse(message);
        try {
            parent.postMessage(JSON.stringify({
                Destination: "Application",
                Source: "RNSipProvider",
                Action: msg.Action,
                Data: msg.Data,
            }));
        }
        catch (e) {
            console.error("SipProviderRNPostMessage", e, msg);
        }
    }
    catch (e) {
        console.error("SipProviderRNPostMessage", e);
    }
}
if (!window.phone)
    window.phone = {};
window.phone.SipProviderCore = window.phone.SipProviderCore || {};
window.phone.SipProviderCore.Mobile = exports.MobileSipCoreConfiguration;
exports["default"] = exports.MobileSipCoreConfiguration;


/***/ }),

/***/ "./src/SessionManager.ts":
/*!*******************************!*\
  !*** ./src/SessionManager.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionManager = void 0;
/**
 * Manages in-memory session objects keyed by `Id`.
 * Minimal API: get, set, getAll, update (shallow merge).
 */
var SessionManager = /** @class */ (function () {
    function SessionManager(config) {
        if (config == null || config == undefined) {
            config = {};
            config.Platform = "web";
        }
        this.config = config;
        this.sessions = new Map();
    }
    /**
     * Returns a session by Id or undefined if not found.
     */
    SessionManager.prototype.get = function (id) {
        return this.sessions.get(id);
    };
    /**
     * Inserts or replaces a session using its `Id`.
     */
    SessionManager.prototype.set = function (session) {
        this.sessions.set(session.Id, session);
    };
    /**
     * Returns all sessions as an array.
     */
    SessionManager.prototype.getAll = function () {
        return Array.from(this.sessions.values());
    };
    /**
     * Applies a shallow merge to an existing session, with deep merge for Data property.
     * Reason: Prevents Data property from being completely replaced, preserving existing Data properties
     * @returns true if updated, false if the session was not found
     */
    SessionManager.prototype.update = function (id, patch) {
        var _session = this.get(id);
        if (_session == null || _session == undefined) {
            // Add the session
            this.set(patch);
            return true;
        }
        for (var key in patch) {
            if (key == 'Data') {
                if (!_session.Data) {
                    _session.Data = {};
                }
                var patchData = patch.Data;
                if (patchData) {
                    _session.Data = __assign(__assign({}, _session.Data), patchData);
                }
            }
            else {
                _session[key] = patch[key];
            }
        }
        this.set(_session);
        return true;
    };
    SessionManager.prototype.Remove = function (id) {
        this.sessions.delete(id);
    };
    SessionManager.prototype.UpdateSession = function (sessionOrId, patch) {
        if (typeof sessionOrId === 'string') {
            // Pattern: UpdateSession(id, patch)
            var id = sessionOrId;
            var existingSession = this.get(id);
            if (existingSession == null || existingSession == undefined) {
                // Create new session with id and patch merged
                var newSession = __assign({ Id: id }, patch);
                this.set(newSession);
            }
            else {
                // Update existing session with patch
                this.update(id, patch);
            }
        }
        else {
            // Pattern: UpdateSession(session)
            var session = sessionOrId;
            if (this.get(session.Id) == null || this.get(session.Id) == undefined) {
                this.set(session);
            }
            else {
                this.update(session.Id, session);
            }
        }
    };
    /**
     * Host callback to bubble session updates to `window.phone.UpdateSession` on web.
     */
    SessionManager.prototype.PhoneUpdateSession = function (session) {
        var _a, _b;
        if (this.config.Platform == "web") {
            (_b = (_a = window.phone) === null || _a === void 0 ? void 0 : _a.UpdateSession) === null || _b === void 0 ? void 0 : _b.call(_a, session);
        }
        else {
            // Non-web platforms can implement their own bridge here
        }
    };
    return SessionManager;
}());
exports.SessionManager = SessionManager;
exports["default"] = SessionManager;


/***/ }),

/***/ "./src/SipProviderTypes.ts":
/*!*********************************!*\
  !*** ./src/SipProviderTypes.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SipProviderMobileEvents = exports.SipProviderError = exports.MessageDirection = exports.MessageType = exports.SipProviderPostMessage = exports.CallView = exports.CallState = exports.CallStatus = exports.Dispositions = void 0;
// Dispositions
var Dispositions;
(function (Dispositions) {
    /** Call completed normally (Q.850 code 16) */
    Dispositions["NormalCallClearing"] = "NormalCallClearing";
    /** Remote end was busy (Q.850 code 17) */
    Dispositions["BusyHere"] = "BusyHere";
    /** Call was rejected (Q.850 code 21) */
    Dispositions["CallRejected"] = "CallRejected";
    /** Call was not answered — ringback timeout */
    Dispositions["NoAnswer"] = "NoAnswer";
    /** Blind transfer — main session (we transferred the party away) */
    Dispositions["BlindTransfer"] = "BlindTransfer";
    /** Blind transfer — target CDR (synthetic record for the destination) */
    Dispositions["BlindTransferTo"] = "BlindTransferTo";
    /** Attended transfer — main session (original call, completed the transfer) */
    Dispositions["AttendedTransfer"] = "AttendedTransfer";
    /** Attended transfer — consultation/child session (the outbound leg) */
    Dispositions["AttendedTransferTo"] = "AttendedTransferTo";
    /** Conference call session */
    Dispositions["ConferenceCall"] = "ConferenceCall";
    /** Conference call was rejected by a participant */
    Dispositions["ConferenceCallRejected"] = "ConferenceCallRejected";
    /** Call was answered on another device */
    Dispositions["AnsweredElsewhere"] = "AnsweredElsewhere";
    /** Call declined because Do Not Disturb is active */
    Dispositions["DeclinedDoNotDisturb"] = "DeclinedDoNotDisturb";
    /** Call declined because call waiting is disabled */
    Dispositions["DeclinedCallWaiting"] = "DeclinedCallWaiting";
    /** Outbound call cancelled by us before it was answered (SIP 487) */
    Dispositions["Cancelled"] = "Cancelled";
    /** Inbound call — remote party hung up before we answered (SIP 487, missed call) */
    Dispositions["Missed"] = "Missed";
    /** Call failed due to a server or infrastructure error (SIP 5xx) */
    Dispositions["CallFailed"] = "CallFailed";
})(Dispositions = exports.Dispositions || (exports.Dispositions = {}));
var CallStatus;
(function (CallStatus) {
    /** Call is trying (outbound, before ring) */
    CallStatus["Trying"] = "Trying";
    /** Call is ringing */
    CallStatus["Ringing"] = "Ringing";
    /** Connecting to remote (transport/SDP in progress) */
    CallStatus["Connecting"] = "Connecting";
    /** Call is being answered */
    CallStatus["Answering"] = "Answering";
    /** Incoming call waiting to be answered */
    CallStatus["Incoming"] = "Incoming";
    /** Call is in progress */
    CallStatus["InProgress"] = "InProgress";
    /** Call has been answered and is actively connected */
    CallStatus["CallInProgress"] = "CallInProgress";
    /** Session is in progress (conference / multi-party) */
    CallStatus["SessionInProgress"] = "SessionInProgress";
    /** Call is on hold */
    CallStatus["OnHold"] = "OnHold";
    /** Call is on mute */
    CallStatus["OnMute"] = "OnMute";
    /** Conference call in progress */
    CallStatus["Conference"] = "Conference";
    /** Recording started */
    CallStatus["RecordingStarted"] = "RecordingStarted";
    /** Recording stopped */
    CallStatus["RecordingStopped"] = "RecordingStopped";
    CallStatus["StartingVideoCall"] = "StartingVideoCall";
    CallStatus["StartingAudioCall"] = "StartingAudioCall";
    /** Call ended normally */
    CallStatus["Ended"] = "Ended";
    /** Call cancelled */
    CallStatus["Cancelled"] = "Cancelled";
    /** Call failed */
    CallStatus["Failed"] = "Failed";
    /** Call rejected */
    CallStatus["Rejected"] = "Rejected";
    /** Call missed */
    CallStatus["Missed"] = "Missed";
    /** Call was answered on another device */
    CallStatus["AnsweredElsewhere"] = "AnsweredElsewhere";
    /** SIP redirect received */
    CallStatus["Redirect"] = "Redirect";
    /** Provider or session is disconnected */
    CallStatus["Disconnected"] = "Disconnected";
})(CallStatus = exports.CallStatus || (exports.CallStatus = {}));
var CallState;
(function (CallState) {
    /** Call is in initial/pre-setup state */
    CallState["Inital"] = "Inital";
    /** Call is being established (ringing/negotiating) */
    CallState["Establishing"] = "Establishing";
    /** Call is fully established and connected */
    CallState["Established"] = "Established";
    /** Call terminated normally */
    CallState["Terminated"] = "Terminated";
    /** Call or session rejected */
    CallState["Rejected"] = "Rejected";
    /** Provider or transport disconnected */
    CallState["Disconnected"] = "Disconnected";
})(CallState = exports.CallState || (exports.CallState = {}));
var CallView;
(function (CallView) {
    CallView["Basic"] = "basic";
    CallView["Extended"] = "extended";
})(CallView = exports.CallView || (exports.CallView = {}));
/**
 * Enumeration of SIP provider post message events
 * @enum SipProviderPostMessage
 */
var SipProviderPostMessage;
(function (SipProviderPostMessage) {
    SipProviderPostMessage["IncomingCallBuddyId"] = "IncomingCallBuddyId";
    /** DTMF was sent */
    SipProviderPostMessage["OnSendDtmf"] = "OnSendDtmf";
    /** DTMF was received */
    SipProviderPostMessage["OnReceiveDtmf"] = "OnReceiveDtmf";
    /** Session state changed */
    SipProviderPostMessage["OnSessionStateChange"] = "OnSessionStateChange";
    /** Conference call was rejected by a participant */
    SipProviderPostMessage["OnConferenceCallRejected"] = "OnConferenceCallRejected";
    /** Conference call was left by a participant */
    SipProviderPostMessage["OnConferenceCallLeft"] = "OnConferenceCallLeft";
    /** Conference was joined */
    SipProviderPostMessage["OnConferenceJoined"] = "OnConferenceJoined";
    /** Conference was started */
    SipProviderPostMessage["OnConferenceStarted"] = "OnConferenceStarted";
    /** Conference was ended */
    SipProviderPostMessage["OnConferenceEnded"] = "OnConferenceEnded";
    SipProviderPostMessage["ConferenceCallJoined"] = "ConferenceCallJoined";
    SipProviderPostMessage["ConferenceCallLeft"] = "ConferenceCallLeft";
    /** Call was answered */
    SipProviderPostMessage["OnCallAnswered"] = "OnCallAnswered";
    /** Invite was cancelled by us */
    SipProviderPostMessage["OnInviteCancelledByUs"] = "OnInviteCancelledByUs";
    /** Invite was cancelled by them */
    SipProviderPostMessage["OnInviteCancelledByThem"] = "OnInviteCancelledByThem";
    /** Invite was rejected by us */
    SipProviderPostMessage["OnInviteRejectedByUs"] = "OnInviteRejectedByUs";
    /** Invite was rejected by them */
    SipProviderPostMessage["OnInviteRejectedByThem"] = "OnInviteRejectedByThem";
    /** Call failed due to a server or infrastructure error (SIP 5xx) */
    SipProviderPostMessage["OnCallFailed"] = "OnCallFailed";
    /** Registration was successful */
    SipProviderPostMessage["OnRegistrationSuccessful"] = "OnRegistrationSuccessful";
    /** Recording was stopped */
    SipProviderPostMessage["OnRecordingStopped"] = "OnRecordingStopped";
    /** Recording was started */
    SipProviderPostMessage["OnRecordingStarted"] = "OnRecordingStarted";
    /** Recording was completed */
    SipProviderPostMessage["OnRecordingCompleted"] = "OnRecordingCompleted";
    /** Blind transfer was started */
    SipProviderPostMessage["OnBlindTransferStarted"] = "OnBlindTransferStarted";
    /** Auto answer triggered */
    SipProviderPostMessage["AutoAnswer"] = "AutoAnswer";
    /** Call was declined due to Do Not Disturb */
    SipProviderPostMessage["CallDeclinedByDoNotDisturb"] = "CallDeclinedByDoNotDisturb";
    /** Transfer was completed */
    SipProviderPostMessage["OnCompleteTransfer"] = "OnCompleteTransfer";
    /** Call waiting was disabled */
    SipProviderPostMessage["OnCallWaitingDisabled"] = "OnCallWaitingDisabled";
    /** Registerer state changed */
    SipProviderPostMessage["OnRegistererStateChange"] = "OnRegistererStateChange";
    /** Provider was unregistered */
    SipProviderPostMessage["OnUnregistered"] = "OnUnregistered";
    /** Registerer encountered an error */
    SipProviderPostMessage["OnRegistererError"] = "OnRegistererError";
    /** Ringback timeout occurred */
    SipProviderPostMessage["OnRingbackTimeout"] = "OnRingbackTimeout";
    /** Transport connection error */
    SipProviderPostMessage["OnTransportConnectError"] = "OnTransportConnectError";
    /** Call was connected */
    SipProviderPostMessage["OnCallConnected"] = "OnCallConnected";
    /** Registration was sent */
    SipProviderPostMessage["OnRegistrationSent"] = "OnRegistrationSent";
    /** Session description handler was created */
    SipProviderPostMessage["OnSessionDescriptionHandlerCreated"] = "OnSessionDescriptionHandlerCreated";
    /** Call was declined */
    SipProviderPostMessage["OnDecline"] = "OnDecline";
    /** Call was put on hold */
    SipProviderPostMessage["OnHold"] = "OnHold";
    /** Call was taken off hold */
    SipProviderPostMessage["OnUnhold"] = "OnUnhold";
    /** Call was unmuted */
    SipProviderPostMessage["OnUnmute"] = "OnUnmute";
    /** Call was muted */
    SipProviderPostMessage["OnMute"] = "OnMute";
    /** Call was accepted */
    SipProviderPostMessage["OnAccept"] = "OnAccept";
    /** Call was cancelled */
    SipProviderPostMessage["OnCancel"] = "OnCancel";
    /** Call was rejected by us */
    SipProviderPostMessage["OnCallRejectedByUs"] = "OnCallRejectedByUs";
    /** Invite was cancelled */
    SipProviderPostMessage["OnInviteCancelled"] = "OnInviteCancelled";
    /** ICE candidate was received */
    SipProviderPostMessage["OnIceCandidate"] = "OnIceCandidate";
    /** ICE connection state changed */
    SipProviderPostMessage["OnIceConnectionStateChange"] = "OnIceConnectionStateChange";
    /** Invite was rejected */
    SipProviderPostMessage["OnInviteReject"] = "OnInviteReject";
    /** BYE was sent */
    SipProviderPostMessage["OnByeSent"] = "OnByeSent";
    /** BYE was received */
    SipProviderPostMessage["OnBye"] = "OnBye";
    /** Device change occurred */
    SipProviderPostMessage["OnDeviceChange"] = "OnDeviceChange";
    /** Call is trying */
    SipProviderPostMessage["OnTrying"] = "OnTrying";
    /** Call is in progress */
    SipProviderPostMessage["OnProgress"] = "OnProgress";
    /** Call was rejected */
    SipProviderPostMessage["OnReject"] = "OnReject";
    /** Invite was sent */
    SipProviderPostMessage["OnInviteSent"] = "OnInviteSent";
    /** Track was added */
    SipProviderPostMessage["OnTrackAdded"] = "OnTrackAdded";
    /** Track was removed */
    SipProviderPostMessage["OnTrackRemoved"] = "OnTrackRemoved";
    /** User agent was created */
    SipProviderPostMessage["OnUserAgentCreated"] = "OnUserAgentCreated";
    /** Provider was registered */
    SipProviderPostMessage["OnRegistered"] = "OnRegistered";
    /** Registration was accepted */
    SipProviderPostMessage["OnRegistrationAccepted"] = "OnRegistrationAccepted";
    /** Registration failed */
    SipProviderPostMessage["OnRegistrationFailed"] = "OnRegistrationFailed";
    /** Transport was disconnected */
    SipProviderPostMessage["OnTransportDisconnected"] = "OnTransportDisconnected";
    /** Transport was connected */
    SipProviderPostMessage["OnTransportConnected"] = "OnTransportConnected";
    /** Invite was accepted */
    SipProviderPostMessage["OnInviteAccepted"] = "OnInviteAccepted";
    /** Invite was rejected
     *
     * We rejected an incoming
    */
    SipProviderPostMessage["OnInviteRejected"] = "OnInviteRejected";
    /** Invite was received */
    SipProviderPostMessage["OnInviteReceived"] = "OnInviteReceived";
    /** Incoming call includes video */
    SipProviderPostMessage["OnIncomingVideoCall"] = "OnIncomingVideoCall";
    /** Outbound video call was started */
    SipProviderPostMessage["OnVideoCallStarted"] = "OnVideoCallStarted";
    /** Session received BYE */
    SipProviderPostMessage["OnSessionReceivedBye"] = "OnSessionReceivedBye";
    /** Call was hung up */
    SipProviderPostMessage["OnHangup"] = "OnHangup";
    /** Call ended */
    SipProviderPostMessage["OnEnded"] = "OnCallEnded";
    /** Call was cancelled */
    SipProviderPostMessage["OnCancelled"] = "OnCancelledCompleted";
    /** Call received BYE */
    SipProviderPostMessage["OnByeReceived"] = "OnCallReceivedBye";
    /** Blind transfer was completed */
    SipProviderPostMessage["OnBlindTransferCompleted"] = "OnBlindTransferCompleted";
    /** Attended transfer was completed */
    SipProviderPostMessage["OnAttendedTransferCompleted"] = "OnAttendedTransferCompleted";
    /** Attended transfer was hung up */
    SipProviderPostMessage["OnHangupAttendedTransfer"] = "OnHangupAttendedTransfer";
    /** Cancel was received */
    SipProviderPostMessage["OnCancelReceived"] = "OnCancelReceived";
    /** Cancel was sent */
    SipProviderPostMessage["OnCancelSent"] = "OnCancelSent";
    /** Call detail record was created */
    SipProviderPostMessage["OnCallDetailRecord"] = "OnCallDetailRecord";
    /** Call was cancelled by remote */
    SipProviderPostMessage["OnCallCancelledByRemote"] = "OnCallCancelledByRemote";
    /** Attended transfer was started */
    SipProviderPostMessage["OnAttendedTransferStarted"] = "OnAttendedTransferStarted";
    /** Attended transfer was cancelled */
    SipProviderPostMessage["OnCancelAttendedTransfer"] = "OnCancelAttendedTransfer";
    /** Attended transfer was rejected by the remote party */
    SipProviderPostMessage["OnAttendedTransferFailed"] = "OnAttendedTransferFailed";
    /** Video track was enabled or disabled mid-call */
    SipProviderPostMessage["OnToggleVideo"] = "OnToggleVideo";
    /** Incoming SIP MESSAGE (or text/plain) received */
    SipProviderPostMessage["OnMessageReceived"] = "OnMessageReceived";
    /** Outbound message state changed (SENT_PENDING or SENT_CONFIRMED) */
    SipProviderPostMessage["OnMessageSent"] = "OnMessageSent";
    /** Outbound message failed (4xx/5xx or 10s timeout) */
    SipProviderPostMessage["OnMessageFailed"] = "OnMessageFailed";
    /** Received DELIVERED receipt for an outbound message */
    SipProviderPostMessage["OnMessageDelivered"] = "OnMessageDelivered";
    /** Received READ receipt for an outbound message */
    SipProviderPostMessage["OnMessageRead"] = "OnMessageRead";
})(SipProviderPostMessage = exports.SipProviderPostMessage || (exports.SipProviderPostMessage = {}));
var MessageType;
(function (MessageType) {
    MessageType["MSG"] = "MSG";
    MessageType["SMS"] = "SMS";
    MessageType["MMS"] = "MMS";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageDirection;
(function (MessageDirection) {
    MessageDirection["Inbound"] = "Inbound";
    MessageDirection["Outbound"] = "Outbound";
})(MessageDirection = exports.MessageDirection || (exports.MessageDirection = {}));
/**
 * Custom error class for SIP Provider operations
 * Extends the standard Error class with additional context and error codes
 * @class SipProviderError
 */
var SipProviderError = /** @class */ (function (_super) {
    __extends(SipProviderError, _super);
    /**
     * Creates a new SipProviderError instance
     * @param message - Human-readable error message
     * @param code - Machine-readable error code for programmatic handling
     * @param context - Additional context data about the error
     * @param originalError - The original error that caused this error (if any)
     */
    function SipProviderError(message, code, context, originalError) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.context = context;
        _this.originalError = originalError;
        _this.name = 'SipProviderError';
        // Maintain stack trace for debugging
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, SipProviderError);
        }
        return _this;
    }
    /**
     * Convert the error to a serializable object for logging and debugging
     * @returns A plain object representation of the error
     */
    SipProviderError.prototype.toJSON = function () {
        var _a;
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            context: this.context,
            stack: this.stack,
            originalError: (_a = this.originalError) === null || _a === void 0 ? void 0 : _a.message
        };
    };
    return SipProviderError;
}(Error));
exports.SipProviderError = SipProviderError;
/**
 * Enumeration of SIP provider mobile events for React Native communication
 * @enum SipProviderMobileEvents
 */
var SipProviderMobileEvents;
(function (SipProviderMobileEvents) {
    /** WebView is unresponsive */
    SipProviderMobileEvents["WebViewUnresponsive"] = "WebViewUnresponsive";
    /** Update CDR */
    SipProviderMobileEvents["UpdateCDR"] = "UpdateCDR";
    /** App is active */
    SipProviderMobileEvents["AppIsActive"] = "AppIsActive";
    /** Synchronize session */
    SipProviderMobileEvents["SynchronizeSession"] = "SynchronizeSession";
    /** Sip registered */
    SipProviderMobileEvents["SipRegistered"] = "SipRegistered";
    /** WebView content process did terminate */
    SipProviderMobileEvents["WebViewContentProcessDidTerminate"] = "WebViewContentProcessDidTerminate";
    /** Incoming call buddy id */
    SipProviderMobileEvents["IncomingCallBuddyId"] = "IncomingCallBuddyId";
    /** Synchronize CDRs */
    SipProviderMobileEvents["SynchronizeCDRs"] = "SynchronizeCDRs";
    /** Update SIP configuration */
    SipProviderMobileEvents["UpdateSipConfiguration"] = "UpdateSipConfiguration";
    /** Check web online status */
    SipProviderMobileEvents["CheckWebOnlineStatus"] = "CheckWebOnlineStatus";
    /** Check web online status response */
    SipProviderMobileEvents["CheckWebOnlineStatusResponse"] = "CheckWebOnlineStatusResponse";
    /** Check webview responsiveness */
    SipProviderMobileEvents["CheckWebViewReponsiveness"] = "CheckWebViewReponsiveness";
    /** Check webview responsiveness response */
    SipProviderMobileEvents["CheckWebViewReponsivenessResponse"] = "CheckWebViewReponsivenessResponse";
    SipProviderMobileEvents["OnCallAnswered"] = "OnCallAnswered";
    SipProviderMobileEvents["AddCallAnsweredEvent"] = "AddCallAnsweredEvent";
    /** User declined call */
    SipProviderMobileEvents["UserDeclinedCall"] = "UserDeclinedCall";
    /** Device is online */
    SipProviderMobileEvents["IsOnline"] = "IsOnline";
    /** Device is offline */
    SipProviderMobileEvents["IsOffline"] = "IsOffline";
    /** Show toast message */
    SipProviderMobileEvents["Toast"] = "Toast";
    /** Network connection changed */
    SipProviderMobileEvents["OnNetworkChanged"] = "OnNetworkChanged";
    /** Disconnect transport */
    SipProviderMobileEvents["DisconnectTransport"] = "DisconnectTransport";
    /** Reconnect transport */
    SipProviderMobileEvents["ReconnectTransport"] = "ReconnectTransport";
    /** Reconnect transport response */
    SipProviderMobileEvents["ReconnectTransportResponse"] = "ReconnectTransportResponse";
    /** Disconnect transport response */
    SipProviderMobileEvents["DisconnectTransportResponse"] = "DisconnectTransportResponse";
    /** Call was answered elsewhere */
    SipProviderMobileEvents["CallAnsweredElsewhere"] = "CallAnsweredElsewhere";
    /** Call is connecting */
    SipProviderMobileEvents["Connecting"] = "Connecting";
    /** Call is trying */
    SipProviderMobileEvents["OnTrying"] = "OnTrying";
    /** Call is in progress */
    SipProviderMobileEvents["OnProgress"] = "OnProgress";
    /** Source identifier */
    SipProviderMobileEvents["Source"] = "RNSipProvider";
    /** Keep alive message */
    SipProviderMobileEvents["KeepAlive"] = "KeepAlive";
    /** Make audio call */
    SipProviderMobileEvents["MakeAudioCall"] = "MakeAudioCall";
    /** Remote call was cancelled */
    SipProviderMobileEvents["RemoteCallCancelled"] = "RemoteCallCancelled";
    /** Disconnect Siperb WebRTC */
    SipProviderMobileEvents["DisconnectSiperbWebRTC"] = "DisconnectSiperbWebRTC";
    /** Update provider status */
    SipProviderMobileEvents["UpdateProviderStatus"] = "UpdateProviderStatus";
    /** Initialize SIP provider */
    SipProviderMobileEvents["InitSipProvider"] = "InitSipProvider";
    /** Initialize SIP provider response */
    SipProviderMobileEvents["InitSipProviderResponse"] = "InitSipProviderResponse";
    /** Connect Siperb WebRTC */
    SipProviderMobileEvents["ConnectSiperbWebRTC"] = "ConnectSiperbWebRTC";
    /** Connect Siperb WebRTC response */
    SipProviderMobileEvents["ConnectSiperbWebRTCResponse"] = "ConnectSiperbWebRTCResponse";
    /** Refresh registration */
    SipProviderMobileEvents["RefreshRegistration"] = "RefreshRegistration";
    /** Refresh registration response */
    SipProviderMobileEvents["RefreshRegistrationResponse"] = "RefreshRegistrationResponse";
    /** Audio call */
    SipProviderMobileEvents["AudioCall"] = "AudioCall";
    /** Audio call response */
    SipProviderMobileEvents["AudioCallResponse"] = "AudioCallResponse";
    /** Hangup call */
    SipProviderMobileEvents["Hangup"] = "Hangup";
    /** Hangup response */
    SipProviderMobileEvents["HangupResponse"] = "HangupResponse";
    /** Cancel call */
    SipProviderMobileEvents["Cancel"] = "Cancel";
    /** Cancel response */
    SipProviderMobileEvents["CancelResponse"] = "CancelResponse";
    /** Call connected */
    SipProviderMobileEvents["CallConnected"] = "CallConnected";
    /** Call answered */
    SipProviderMobileEvents["OnAnswer"] = "OnAnswer";
    /** Call accepted */
    SipProviderMobileEvents["OnAccept"] = "OnAccept";
    /** Call declined */
    SipProviderMobileEvents["OnDecline"] = "OnDecline";
    /** Call decline response */
    SipProviderMobileEvents["OnDeclineResponse"] = "OnDeclineResponse";
    /** Call hold this UI to application */
    SipProviderMobileEvents["Hold"] = "Hold";
    /** Call hold response */
    SipProviderMobileEvents["HoldResponse"] = "HoldResponse";
    /** Call unhold this UI to application */
    SipProviderMobileEvents["UnHold"] = "UnHold";
    /** Call unhold response */
    SipProviderMobileEvents["UnHoldResponse"] = "UnHoldResponse";
    /** Call mute this UI to application */
    SipProviderMobileEvents["Mute"] = "Mute";
    /** Call mute response */
    SipProviderMobileEvents["MuteResponse"] = "MuteResponse";
    /** Call unmute this UI to application */
    SipProviderMobileEvents["UnMute"] = "UnMute";
    /** Call unmute response */
    SipProviderMobileEvents["UnMuteResponse"] = "UnMuteResponse";
    /** Send DTMF */
    SipProviderMobileEvents["SendDtmf"] = "SendDtmf";
    /** Send DTMF response */
    SipProviderMobileEvents["SendDtmfResponse"] = "SendDtmfResponse";
    /** Attended transfer */
    SipProviderMobileEvents["AttendedTransfer"] = "AttendedTransfer";
    /** Attended transfer response */
    SipProviderMobileEvents["AttendedTransferResponse"] = "AttendedTransferResponse";
    /** Complete transfer */
    SipProviderMobileEvents["CompleteTransfer"] = "CompleteTransfer";
    /** Complete transfer response */
    SipProviderMobileEvents["CompleteTransferResponse"] = "CompleteTransferResponse";
    /** Blind transfer */
    SipProviderMobileEvents["BlindTransfer"] = "BlindTransfer";
    /** Blind transfer response */
    SipProviderMobileEvents["BlindTransferResponse"] = "BlindTransferResponse";
    /** Incoming call */
    SipProviderMobileEvents["IncomingCall"] = "IncomingCall";
    /** Incoming call response */
    SipProviderMobileEvents["IncomingCallResponse"] = "IncomingCallResponse";
    /** Track added */
    SipProviderMobileEvents["OnTrackAdded"] = "OnTrackAdded";
    /** Track added response */
    SipProviderMobileEvents["OnTrackAddedResponse"] = "OnTrackAddedResponse";
    /** User hung up call */
    SipProviderMobileEvents["UserHungUpCall"] = "UserHungUpCall";
    /** User cancelled call */
    SipProviderMobileEvents["UserCancelledCall"] = "UserCancelledCall";
    /** Force remove call session */
    SipProviderMobileEvents["ForceRemoveCallSession"] = "ForceRemoveCallSession";
    /** Call ended */
    SipProviderMobileEvents["CallEnded"] = "CallEnded";
    /** Call invite rejected */
    SipProviderMobileEvents["CallInviteRejected"] = "CallInviteRejected";
    // Stream Stats
    /** Update remote inbound RTP stream stats */
    SipProviderMobileEvents["UpdateRemoteInboundRtpStreamStats"] = "UpdateRemoteInboundRtpStreamStats";
    /** Update sender audio level */
    SipProviderMobileEvents["UpdateSenderAudioLevel"] = "UpdateSenderAudioLevel";
    /** Update receiver audio level */
    SipProviderMobileEvents["UpdateReceiverAudioLevel"] = "UpdateReceiverAudioLevel";
    /** Update sender stats */
    SipProviderMobileEvents["UpdateSenderStats"] = "UpdateSenderStats";
    /** Update receiver stats */
    SipProviderMobileEvents["UpdateReceiverStats"] = "UpdateReceiverStats";
    /** Update receiver levels */
    SipProviderMobileEvents["UpdateReceiverLevels"] = "UpdateReceiverLevels";
    /** Update sender levels */
    SipProviderMobileEvents["UpdateSenderLevels"] = "UpdateSenderLevels";
    /** Log transport event */
    SipProviderMobileEvents["LogTransportEvent"] = "LogTransportEvent";
    /** Add call activity */
    SipProviderMobileEvents["AddCallActivity"] = "AddCallActivity";
    /** Log event */
    SipProviderMobileEvents["LogEvent"] = "LogEvent";
    // Call Activities These are the after affect
    /** Call muted */
    SipProviderMobileEvents["CallMuted"] = "CallMuted";
    /** Call unmuted */
    SipProviderMobileEvents["CallUnMuted"] = "CallUnMuted";
    /** Call unhold */
    SipProviderMobileEvents["CallUnHold"] = "CallUnHold";
    /** Call hold */
    SipProviderMobileEvents["CallHold"] = "CallHold";
    /** Call unmuted response */
    SipProviderMobileEvents["CallUnMutedResponse"] = "CallUnMutedResponse";
    /** Call muted response */
    SipProviderMobileEvents["CallMutedResponse"] = "CallMutedResponse";
    /** Call unhold response */
    SipProviderMobileEvents["CallUnHoldResponse"] = "CallUnHoldResponse";
    /** Call hold response */
    SipProviderMobileEvents["CallHoldResponse"] = "CallHoldResponse";
    /** Audio routes updated */
    SipProviderMobileEvents["AudioRoutesUpdated"] = "AudioRoutesUpdated";
    /** Call cancelled */
    SipProviderMobileEvents["CallCancelled"] = "CallCancelled";
    /** Call cancelled response */
    SipProviderMobileEvents["CallCancelledResponse"] = "CallCancelledResponse";
    /** Answer call Update the Session State to "Established"*/
    SipProviderMobileEvents["Answer"] = "Answer";
    /** Answer response */
    SipProviderMobileEvents["AnswerResponse"] = "AnswerResponse";
    /** Decline call Update the Session State to "Ended" And remove the session from the SessionManager*/
    SipProviderMobileEvents["Decline"] = "Decline";
    /** Decline response */
    SipProviderMobileEvents["DeclineResponse"] = "DeclineResponse";
    /** Call answered */
    SipProviderMobileEvents["CallAnswered"] = "CallAnswered";
    /** Update call status */
    SipProviderMobileEvents["UpdateCallStatus"] = "UpdateCallStatus";
    /** Update call state */
    SipProviderMobileEvents["UpdateCallState"] = "UpdateCallState";
    /** Session received BYE */
    SipProviderMobileEvents["OnSessionReceivedBye"] = "OnSessionReceivedBye";
    /** Make attended call */
    SipProviderMobileEvents["MakeAttendedCall"] = "MakeAttendedCall";
    /** Cancel attended transfer */
    SipProviderMobileEvents["CancelAttendedTransfer"] = "CancelAttendedTransfer";
    /** Hangup attended transfer */
    SipProviderMobileEvents["HangupAttendedTransfer"] = "HangupAttendedTransfer";
    /** Hangup attended transfer response */
    SipProviderMobileEvents["HangupAttendedTransferResponse"] = "HangupAttendedTransferResponse";
    /** Deep link make audio call */
    SipProviderMobileEvents["DeepLinkMakeAudioCall"] = "DeepLinkMakeAudioCall";
    /** Call has ended */
    SipProviderMobileEvents["CallHasEnded"] = "CallHasEnded";
    /** Capture calls */
    SipProviderMobileEvents["CaptureCalls"] = "CaptureCalls";
    /** Call reconnect */
    SipProviderMobileEvents["CallReconnect"] = "CallReconnect";
    /** Call reconnect response */
    SipProviderMobileEvents["CallReconnectResponse"] = "CallReconnectResponse";
    /** Update profile status */
    SipProviderMobileEvents["UpdateProfileStatus"] = "UpdateProfileStatus";
    /** Show phone */
    SipProviderMobileEvents["ShowPhone"] = "ShowPhone";
    SipProviderMobileEvents["GetBuddySessions"] = "GetBuddySessions";
    /** Get buddy sessions response */
    SipProviderMobileEvents["GetBuddySessionsResponse"] = "GetBuddySessionsResponse";
    SipProviderMobileEvents["AddCDR"] = "AddCDR";
    /** Add CDR response */
    SipProviderMobileEvents["AddCDRResponse"] = "AddCDRResponse";
})(SipProviderMobileEvents = exports.SipProviderMobileEvents || (exports.SipProviderMobileEvents = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/MobileSipCore.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=MobileSipCore.js.map