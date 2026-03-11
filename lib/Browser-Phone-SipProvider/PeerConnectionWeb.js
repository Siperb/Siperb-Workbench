(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PeerConnectionWeb"] = factory();
	else
		root["PeerConnectionWeb"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PeerConnectionWeb.ts":
/*!**********************************!*\
  !*** ./src/PeerConnectionWeb.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {


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
exports.PeerConnectionWeb = void 0;
if (!window.phone.SipProviderCore) {
    window.phone.SipProviderCore = {};
    window.phone.SipProviderCore.PeerConnectionCore = {};
}
var PeerConnectionWeb = /** @class */ (function () {
    function PeerConnectionWeb(sessionId) {
        this.sessionId = sessionId;
        this.isHeld = false;
    }
    PeerConnectionWeb.prototype.initMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                                audio: {
                                    echoCancellation: true,
                                    noiseSuppression: true,
                                    autoGainControl: true,
                                },
                                video: false,
                            })];
                    case 1:
                        _a.localStream = _b.sent();
                        this.pc = new RTCPeerConnection();
                        this.localStream.getTracks().forEach(function (track) { return _this.pc.addTrack(track, _this.localStream); });
                        return [2 /*return*/];
                }
            });
        });
    };
    PeerConnectionWeb.prototype.createOfferSDP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pc.createOffer()];
                    case 1:
                        offer = _a.sent();
                        return [4 /*yield*/, this.pc.setLocalDescription(offer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, offer.sdp || ""];
                }
            });
        });
    };
    PeerConnectionWeb.prototype.setRemoteSDP = function (sdp, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pc.setRemoteDescription({ type: type, sdp: sdp })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PeerConnectionWeb.prototype.createAnswerSDP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pc.createAnswer()];
                    case 1:
                        answer = _a.sent();
                        return [4 /*yield*/, this.pc.setLocalDescription(answer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, answer.sdp || ""];
                }
            });
        });
    };
    PeerConnectionWeb.prototype.mute = function () {
        var _a;
        (_a = this.localStream) === null || _a === void 0 ? void 0 : _a.getAudioTracks().forEach(function (t) { return (t.enabled = false); });
    };
    PeerConnectionWeb.prototype.unmute = function () {
        var _a;
        (_a = this.localStream) === null || _a === void 0 ? void 0 : _a.getAudioTracks().forEach(function (t) { return (t.enabled = true); });
    };
    PeerConnectionWeb.prototype.hold = function () {
        var _a;
        (_a = this.localStream) === null || _a === void 0 ? void 0 : _a.getTracks().forEach(function (t) { return (t.enabled = false); });
        this.isHeld = true;
    };
    PeerConnectionWeb.prototype.unhold = function () {
        var _a;
        (_a = this.localStream) === null || _a === void 0 ? void 0 : _a.getTracks().forEach(function (t) { return (t.enabled = true); });
        this.isHeld = false;
    };
    PeerConnectionWeb.prototype.close = function () {
        var _a, _b;
        (_a = this.pc) === null || _a === void 0 ? void 0 : _a.close();
        (_b = this.localStream) === null || _b === void 0 ? void 0 : _b.getTracks().forEach(function (t) { return t.stop(); });
    };
    return PeerConnectionWeb;
}());
exports.PeerConnectionWeb = PeerConnectionWeb;
var PeerConnection = {
    PeerConnection: new PeerConnectionWeb(),
    initMedia: function () {
        console.log("PeerConnectionWeb initMedia");
        return PeerConnection.PeerConnection.initMedia();
    },
    createOfferSDP: function () {
        return PeerConnection.PeerConnection.createOfferSDP();
    },
    setRemoteSDP: function (sdp, type) {
        return PeerConnection.PeerConnection.setRemoteSDP(sdp, type);
    },
    createAnswerSDP: function () {
        return PeerConnection.PeerConnection.createAnswerSDP();
    },
    mute: function () {
        return PeerConnection.PeerConnection.mute();
    },
    unmute: function () {
        return PeerConnection.PeerConnection.unmute();
    },
    hold: function () {
        return PeerConnection.PeerConnection.hold();
    },
    unhold: function () {
        return PeerConnection.PeerConnection.unhold();
    },
    close: function () {
        return PeerConnection.PeerConnection.close();
    },
};
if (!window.phone)
    window.phone = {};
window.phone.SipProviderCore.PeerConnectionCore = window.phone.PeerConnectionCore || {};
window.phone.SipProviderCore.PeerConnectionCore.Web = PeerConnection;
exports["default"] = PeerConnection;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/PeerConnectionWeb.ts"](0, __webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=PeerConnectionWeb.js.map