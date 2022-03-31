(function(){'use strict';

/** ************************************************************************
 * FORGEROCK | AM DEVICE MATCH SCRIPT
 * 
 * script.js
 * 
 *  Copyright (c) 2020 ForgeRock. All rights reserved.
 *  This software may be modified and distributed under the terms
 *  of the MIT license. See the LICENSE file for details.
 * 
 * *************************************************************************
 * 
 * THIS IS A GENERATED FILE. Do not directly modify.
 * For more information about this file, visit this Github repo:
 * https://github.com/ForgeRock/forgerock-device-match-script.
 * 
 * If you would like to modify this script or use it as a reference
 * for building your own matching script, we recommend cloning the git
 * repo above and use it as a development toolkit to get started.
 * *************************************************************************/

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var getDistance$1 = {};var getLatitude$1 = {};var constants = {};Object.defineProperty(constants, "__esModule", {
  value: true
});
constants.areaConversion = constants.timeConversion = constants.distanceConversion = constants.altitudeKeys = constants.latitudeKeys = constants.longitudeKeys = constants.MAXLON = constants.MINLON = constants.MAXLAT = constants.MINLAT = constants.earthRadius = constants.sexagesimalPattern = void 0;
var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;
constants.sexagesimalPattern = sexagesimalPattern;
var earthRadius = 6378137;
constants.earthRadius = earthRadius;
var MINLAT = -90;
constants.MINLAT = MINLAT;
var MAXLAT = 90;
constants.MAXLAT = MAXLAT;
var MINLON = -180;
constants.MINLON = MINLON;
var MAXLON = 180;
constants.MAXLON = MAXLON;
var longitudeKeys = ["lng", "lon", "longitude", 0];
constants.longitudeKeys = longitudeKeys;
var latitudeKeys = ["lat", "latitude", 1];
constants.latitudeKeys = latitudeKeys;
var altitudeKeys = ["alt", "altitude", "elevation", "elev", 2];
constants.altitudeKeys = altitudeKeys;
var distanceConversion = {
  m: 1,
  km: 0.001,
  cm: 100,
  mm: 1000,
  mi: 1 / 1609.344,
  sm: 1 / 1852.216,
  ft: 100 / 30.48,
  in: 100 / 2.54,
  yd: 1 / 0.9144
};
constants.distanceConversion = distanceConversion;
var timeConversion = {
  m: 60,
  h: 3600,
  d: 86400
};
constants.timeConversion = timeConversion;
var areaConversion = {
  m2: 1,
  km2: 0.000001,
  ha: 0.0001,
  a: 0.01,
  ft2: 10.763911,
  yd2: 1.19599,
  in2: 1550.0031
};
constants.areaConversion = areaConversion;
areaConversion.sqm = areaConversion.m2;
areaConversion.sqkm = areaConversion.km2;
areaConversion.sqft = areaConversion.ft2;
areaConversion.sqyd = areaConversion.yd2;
areaConversion.sqin = areaConversion.in2;var getCoordinateKey$1 = {};Object.defineProperty(getCoordinateKey$1, "__esModule", {
  value: true
});
getCoordinateKey$1.default = void 0;

var getCoordinateKey = function getCoordinateKey(point, keysToLookup) {
  return keysToLookup.reduce(function (foundKey, key) {
    if (typeof point === "undefined" || point === null) {
      throw new Error("'".concat(point, "' is no valid coordinate."));
    }

    if (Object.prototype.hasOwnProperty.call(point, key) && typeof key !== "undefined" && typeof foundKey === "undefined") {
      foundKey = key;
      return key;
    }

    return foundKey;
  }, undefined);
};

var _default$d = getCoordinateKey;
getCoordinateKey$1.default = _default$d;var toDecimal$1 = {};var isDecimal$1 = {};Object.defineProperty(isDecimal$1, "__esModule", {
  value: true
});
isDecimal$1.default = void 0;

var isDecimal = function isDecimal(value) {
  var checkedValue = value.toString().trim();

  if (isNaN(parseFloat(checkedValue))) {
    return false;
  }

  return parseFloat(checkedValue) === Number(checkedValue);
};

var _default$c = isDecimal;
isDecimal$1.default = _default$c;var isSexagesimal$1 = {};Object.defineProperty(isSexagesimal$1, "__esModule", {
  value: true
});
isSexagesimal$1.default = void 0;
var _constants$7 = constants;

var isSexagesimal = function isSexagesimal(value) {
  return _constants$7.sexagesimalPattern.test(value.toString().trim());
};

var _default$b = isSexagesimal;
isSexagesimal$1.default = _default$b;var sexagesimalToDecimal$1 = {};Object.defineProperty(sexagesimalToDecimal$1, "__esModule", {
  value: true
});
sexagesimalToDecimal$1.default = void 0;
var _constants$6 = constants;

var sexagesimalToDecimal = function sexagesimalToDecimal(sexagesimal) {
  var data = new RegExp(_constants$6.sexagesimalPattern).exec(sexagesimal.toString().trim());

  if (typeof data === "undefined" || data === null) {
    throw new Error("Given value is not in sexagesimal format");
  }

  var min = Number(data[2]) / 60 || 0;
  var sec = Number(data[4]) / 3600 || 0;
  var decimal = parseFloat(data[1]) + min + sec;
  return ["S", "W"].includes(data[7]) ? -decimal : decimal;
};

var _default$a = sexagesimalToDecimal;
sexagesimalToDecimal$1.default = _default$a;var isValidCoordinate$1 = {};var getCoordinateKeys$1 = {};Object.defineProperty(getCoordinateKeys$1, "__esModule", {
  value: true
});
getCoordinateKeys$1.default = void 0;
var _constants$5 = constants;

var _getCoordinateKey$2 = _interopRequireDefault$7(getCoordinateKey$1);

function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var getCoordinateKeys = function getCoordinateKeys(point) {
  var keysToLookup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    longitude: _constants$5.longitudeKeys,
    latitude: _constants$5.latitudeKeys,
    altitude: _constants$5.altitudeKeys
  };
  var longitude = (0, _getCoordinateKey$2.default)(point, keysToLookup.longitude);
  var latitude = (0, _getCoordinateKey$2.default)(point, keysToLookup.latitude);
  var altitude = (0, _getCoordinateKey$2.default)(point, keysToLookup.altitude);
  return _objectSpread$1({
    latitude: latitude,
    longitude: longitude
  }, altitude ? {
    altitude: altitude
  } : {});
};

var _default$9 = getCoordinateKeys;
getCoordinateKeys$1.default = _default$9;var isValidLatitude$1 = {};Object.defineProperty(isValidLatitude$1, "__esModule", {
  value: true
});
isValidLatitude$1.default = void 0;

var _isDecimal$2 = _interopRequireDefault$6(isDecimal$1);

var _isSexagesimal$2 = _interopRequireDefault$6(isSexagesimal$1);

var _sexagesimalToDecimal$2 = _interopRequireDefault$6(sexagesimalToDecimal$1);

var _constants$4 = constants;

function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var isValidLatitude = function isValidLatitude(value) {
  if ((0, _isDecimal$2.default)(value)) {
    if (parseFloat(value) > _constants$4.MAXLAT || value < _constants$4.MINLAT) {
      return false;
    }

    return true;
  }

  if ((0, _isSexagesimal$2.default)(value)) {
    return isValidLatitude((0, _sexagesimalToDecimal$2.default)(value));
  }

  return false;
};

var _default$8 = isValidLatitude;
isValidLatitude$1.default = _default$8;var isValidLongitude$1 = {};Object.defineProperty(isValidLongitude$1, "__esModule", {
  value: true
});
isValidLongitude$1.default = void 0;

var _isDecimal$1 = _interopRequireDefault$5(isDecimal$1);

var _isSexagesimal$1 = _interopRequireDefault$5(isSexagesimal$1);

var _sexagesimalToDecimal$1 = _interopRequireDefault$5(sexagesimalToDecimal$1);

var _constants$3 = constants;

function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var isValidLongitude = function isValidLongitude(value) {
  if ((0, _isDecimal$1.default)(value)) {
    if (parseFloat(value) > _constants$3.MAXLON || value < _constants$3.MINLON) {
      return false;
    }

    return true;
  }

  if ((0, _isSexagesimal$1.default)(value)) {
    return isValidLongitude((0, _sexagesimalToDecimal$1.default)(value));
  }

  return false;
};

var _default$7 = isValidLongitude;
isValidLongitude$1.default = _default$7;Object.defineProperty(isValidCoordinate$1, "__esModule", {
  value: true
});
isValidCoordinate$1.default = void 0;

var _getCoordinateKeys2 = _interopRequireDefault$4(getCoordinateKeys$1);

var _isValidLatitude = _interopRequireDefault$4(isValidLatitude$1);

var _isValidLongitude = _interopRequireDefault$4(isValidLongitude$1);

function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var isValidCoordinate = function isValidCoordinate(point) {
  var _getCoordinateKeys = (0, _getCoordinateKeys2.default)(point),
      latitude = _getCoordinateKeys.latitude,
      longitude = _getCoordinateKeys.longitude;

  if (Array.isArray(point) && point.length >= 2) {
    return (0, _isValidLongitude.default)(point[0]) && (0, _isValidLatitude.default)(point[1]);
  }

  if (typeof latitude === "undefined" || typeof longitude === "undefined") {
    return false;
  }

  var lon = point[longitude];
  var lat = point[latitude];

  if (typeof lat === "undefined" || typeof lon === "undefined") {
    return false;
  }

  if ((0, _isValidLatitude.default)(lat) === false || (0, _isValidLongitude.default)(lon) === false) {
    return false;
  }

  return true;
};

var _default$6 = isValidCoordinate;
isValidCoordinate$1.default = _default$6;Object.defineProperty(toDecimal$1, "__esModule", {
  value: true
});
toDecimal$1.default = void 0;

var _isDecimal = _interopRequireDefault$3(isDecimal$1);

var _isSexagesimal = _interopRequireDefault$3(isSexagesimal$1);

var _sexagesimalToDecimal = _interopRequireDefault$3(sexagesimalToDecimal$1);

var _isValidCoordinate = _interopRequireDefault$3(isValidCoordinate$1);

var _getCoordinateKeys = _interopRequireDefault$3(getCoordinateKeys$1);

function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var toDecimal = function toDecimal(value) {
  if ((0, _isDecimal.default)(value)) {
    return Number(value);
  }

  if ((0, _isSexagesimal.default)(value)) {
    return (0, _sexagesimalToDecimal.default)(value);
  }

  if ((0, _isValidCoordinate.default)(value)) {
    var keys = (0, _getCoordinateKeys.default)(value);

    if (Array.isArray(value)) {
      return value.map(function (v, index) {
        return [0, 1].includes(index) ? toDecimal(v) : v;
      });
    }

    return _objectSpread(_objectSpread(_objectSpread({}, value), keys.latitude && _defineProperty({}, keys.latitude, toDecimal(value[keys.latitude]))), keys.longitude && _defineProperty({}, keys.longitude, toDecimal(value[keys.longitude])));
  }

  if (Array.isArray(value)) {
    return value.map(function (point) {
      return (0, _isValidCoordinate.default)(point) ? toDecimal(point) : point;
    });
  }

  return value;
};

var _default$5 = toDecimal;
toDecimal$1.default = _default$5;Object.defineProperty(getLatitude$1, "__esModule", {
  value: true
});
getLatitude$1.default = void 0;
var _constants$2 = constants;

var _getCoordinateKey$1 = _interopRequireDefault$2(getCoordinateKey$1);

var _toDecimal$1 = _interopRequireDefault$2(toDecimal$1);

function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var getLatitude = function getLatitude(point, raw) {
  var latKey = (0, _getCoordinateKey$1.default)(point, _constants$2.latitudeKeys);

  if (typeof latKey === "undefined" || latKey === null) {
    return;
  }

  var value = point[latKey];
  return raw === true ? value : (0, _toDecimal$1.default)(value);
};

var _default$4 = getLatitude;
getLatitude$1.default = _default$4;var getLongitude$1 = {};Object.defineProperty(getLongitude$1, "__esModule", {
  value: true
});
getLongitude$1.default = void 0;
var _constants$1 = constants;

var _getCoordinateKey = _interopRequireDefault$1(getCoordinateKey$1);

var _toDecimal = _interopRequireDefault$1(toDecimal$1);

function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var getLongitude = function getLongitude(point, raw) {
  var latKey = (0, _getCoordinateKey.default)(point, _constants$1.longitudeKeys);

  if (typeof latKey === "undefined" || latKey === null) {
    return;
  }

  var value = point[latKey];
  return raw === true ? value : (0, _toDecimal.default)(value);
};

var _default$3 = getLongitude;
getLongitude$1.default = _default$3;var toRad$1 = {};Object.defineProperty(toRad$1, "__esModule", {
  value: true
});
toRad$1.default = void 0;

var toRad = function toRad(value) {
  return value * Math.PI / 180;
};

var _default$2 = toRad;
toRad$1.default = _default$2;var robustAcos$1 = {};Object.defineProperty(robustAcos$1, "__esModule", {
  value: true
});
robustAcos$1.default = void 0;

var robustAcos = function robustAcos(value) {
  if (value > 1) {
    return 1;
  }

  if (value < -1) {
    return -1;
  }

  return value;
};

var _default$1 = robustAcos;
robustAcos$1.default = _default$1;Object.defineProperty(getDistance$1, "__esModule", {
  value: true
});
var default_1 = getDistance$1.default = void 0;

var _getLatitude = _interopRequireDefault(getLatitude$1);

var _getLongitude = _interopRequireDefault(getLongitude$1);

var _toRad = _interopRequireDefault(toRad$1);

var _robustAcos = _interopRequireDefault(robustAcos$1);

var _constants = constants;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var getDistance = function getDistance(from, to) {
  var accuracy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  accuracy = typeof accuracy !== "undefined" && !isNaN(accuracy) ? accuracy : 1;
  var fromLat = (0, _getLatitude.default)(from);
  var fromLon = (0, _getLongitude.default)(from);
  var toLat = (0, _getLatitude.default)(to);
  var toLon = (0, _getLongitude.default)(to);

  var distance = Math.acos((0, _robustAcos.default)(Math.sin((0, _toRad.default)(toLat)) * Math.sin((0, _toRad.default)(fromLat)) + Math.cos((0, _toRad.default)(toLat)) * Math.cos((0, _toRad.default)(fromLat)) * Math.cos((0, _toRad.default)(fromLon) - (0, _toRad.default)(toLon)))) * _constants.earthRadius;

  return Math.round(distance / accuracy) * accuracy;
};

var _default = getDistance;
default_1 = getDistance$1.default = _default;function locationMatcher() {
  var allowedRadius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return function location(incoming, stored) {
    var distance = default_1(incoming, stored);
    return distance < allowedRadius;
  };
}function isPrimitive(val) {
  var primitives = ['boolean', 'string', 'number', 'undefined'];
  return primitives.indexOf(_typeof(val)) !== -1;
}
function getMultiplier(attr, attrWeights) {
  return typeof attrWeights[attr] === 'number' ? attrWeights[attr] : 1;
}function metadataMatcher() {
  var attrWeights = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var maxUnmatchedAttrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var numOfUnmatchedAttrs = 0;

  function arrayMatch(incoming, stored, key) {
    var len = stored.length;

    for (var i = 0; i < len; i++) {
      if (numOfUnmatchedAttrs > maxUnmatchedAttrs) {
        break;
      }

      var storedVal = stored[i];
      var incomingVal = incoming && incoming[i];
      checkValueOrCallNext(incomingVal, storedVal, key);
    }
  }

  function checkForMismatch(a, b, key) {
    if (a !== b) {
      var multiplier = getMultiplier(key, attrWeights);
      numOfUnmatchedAttrs = numOfUnmatchedAttrs + multiplier;
    }
  }

  function checkValueOrCallNext(incoming, stored, key) {
    if (isPrimitive(stored) || stored === null) {
      checkForMismatch(stored, incoming, key);
    } else if (Array.isArray(stored)) {
      arrayMatch(incoming, stored, key);
    } else {
      objectMatch(incoming, stored);
    }
  }

  function objectMatch(incoming, stored) {
    var keys = Object.keys(stored);

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var key = _keys[_i];

      if (numOfUnmatchedAttrs > maxUnmatchedAttrs) {
        break;
      }

      var storedVal = stored[key];
      var incomingVal = incoming && incoming[key];
      checkValueOrCallNext(incomingVal, storedVal, key);
    }
  }

  return function (incomingProfile, storedProfile) {
    if (Array.isArray(incomingProfile)) {
      arrayMatch(incomingProfile, storedProfile);
    } else {
      objectMatch(incomingProfile, storedProfile);
    }

    return numOfUnmatchedAttrs <= maxUnmatchedAttrs;
  };
}function deviceMatcher() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var allowedRadius = config.allowedRadius,
      attrWeights = config.attrWeights,
      maxUnmatchedAttrs = config.maxUnmatchedAttrs;
  var metadata = metadataMatcher(attrWeights, maxUnmatchedAttrs);
  var location = locationMatcher(allowedRadius);
  return [metadata, location];
}outcome = 'unknownDevice';

function processDeviceProfiles() {
  var incomingJson = sharedState.get('forgeRock.device.profile').toString();
  var incoming = null;

  try {
    incoming = JSON.parse(incomingJson);
  } catch (err) {
    logger.message("Error parsing incoming profile: ".concat(err.message));
    return;
  }

  var username = sharedState.get('username').asString();
  var realm = sharedState.get('realm').asString();
  var storedProfiles = deviceProfilesDao.getDeviceProfiles(username, realm);

  if (!storedProfiles) {
    return;
  }

  for (var i = 0; i < storedProfiles.size(); i++) {
    var stored = null;

    try {
      stored = JSON.parse(storedProfiles.get(i));
    } catch (err) {
      logger.message("Error parsing stored profile: ".concat(err.message));
      continue;
    }

    if (incoming.identifier === stored.identifier) {
      var _deviceMatcher = deviceMatcher(),
          _deviceMatcher2 = _slicedToArray(_deviceMatcher, 2),
          metadataMatch = _deviceMatcher2[0],
          locationMatch = _deviceMatcher2[1];

      var isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
      var isLocationMatching = locationMatch(incoming.location, stored.location);
      outcome = (isMetadataMatching && isLocationMatching).toString();
      return;
    }
  }
}

processDeviceProfiles();})();