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
var _this = this;
var startTime;
var endTime;
var time = null;
var startCoord;
var endCoord;
var distance;
var speed;
var toggle = function () { document.getElementsByTagName("button")[0].textContent = (document.getElementsByTagName("button")[0].textContent === "Start") ? "End" : "Start"; };
var currLocation = function (divId) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        if (divId === "startLocation") {
            startCoord = crd;
        }
        else {
            endCoord = crd;
        }
    }
    function error(err) {
        console.warn("ERROR(".concat(err.code, "): ").concat(err.message));
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
};
var refresh = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currLocation("startLocation");
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
            case 1:
                _a.sent();
                currLocation("endLocation");
                return [2 /*return*/];
        }
    });
}); };
// Convert from degrees to radians
var degreesToRadians = function (degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
};
// Function takes two objects, that contain coordinates to a starting and destination location.
var calcDistance = function (startingCoords, destinationCoords) {
    var startingLat = degreesToRadians(startingCoords.latitude);
    var startingLong = degreesToRadians(startingCoords.longitude);
    var destinationLat = degreesToRadians(destinationCoords.latitude);
    var destinationLong = degreesToRadians(destinationCoords.longitude);
    // Radius of the Earth in kilometers
    var radius = 6371;
    // Haversine equation
    var distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
        Math.cos(startingLat) * Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)) * radius;
    var distanceInMeters = distanceInKilometers * 1000;
    return distanceInMeters;
};
var calcRealTimeDistance = function (startingCoords) { return __awaiter(_this, void 0, void 0, function () {
    var totalDist, destinationCoords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                totalDist = 0;
                _a.label = 1;
            case 1:
                if (!(document.getElementsByTagName("button")[0].textContent !== "Start")) return [3 /*break*/, 3];
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 2:
                _a.sent();
                currLocation("endLocation");
                destinationCoords = endCoord;
                // document.getElementById("debug").textContent = `${(new Date()).getSeconds()}, ${startCoord.latitude}, ${startCoord.longitude}, ${endCoord.latitude}, ${endCoord.longitude}`;
                totalDist += calcDistance(startingCoords, destinationCoords);
                document.getElementById("debug2").textContent = "Current Distance: ".concat(totalDist.toFixed(2), " m");
                startingCoords = destinationCoords;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, totalDist];
        }
    });
}); };
var timer = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                toggle();
                if (!(document.getElementsByTagName("button")[0].textContent === "End")) return [3 /*break*/, 3];
                return [4 /*yield*/, refresh()];
            case 1:
                _a.sent();
                startTime = Date.parse((new Date()).toString());
                currLocation("startLocation");
                return [4 /*yield*/, calcRealTimeDistance(startCoord)];
            case 2:
                distance = _a.sent();
                return [3 /*break*/, 5];
            case 3:
                endTime = Date.parse((new Date()).toString());
                time = (endTime - startTime) / 1000;
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 4:
                _a.sent();
                document.getElementById("debug2").textContent = "";
                document.getElementById("startLocation").textContent = "Distance: ".concat(distance.toFixed(2), " m");
                document.getElementById("time").textContent = "Time: ".concat(time, " s");
                speed = distance / time;
                document.getElementById("endLocation").textContent = "Speed: ".concat(speed.toFixed(2), " m/s");
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
