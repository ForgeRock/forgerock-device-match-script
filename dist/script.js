(function(){'use strict';

/**
 * FORGEROCK | DEVICE MATCH SAMPLE SCRIPT
 * For more information, visit https://github.com/cerebrl/forgerock-device-match.
 * 
 * If you would like to modify this script or use it as a reference for building
 * your own matching script, we recommend cloning the git repo above to get started.
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}var constants = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.areaConversion = exports.timeConversion = exports.distanceConversion = exports.altitudeKeys = exports.latitudeKeys = exports.longitudeKeys = exports.MAXLON = exports.MINLON = exports.MAXLAT = exports.MINLAT = exports.earthRadius = exports.sexagesimalPattern = void 0;
  var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;
  exports.sexagesimalPattern = sexagesimalPattern;
  var earthRadius = 6378137;
  exports.earthRadius = earthRadius;
  var MINLAT = -90;
  exports.MINLAT = MINLAT;
  var MAXLAT = 90;
  exports.MAXLAT = MAXLAT;
  var MINLON = -180;
  exports.MINLON = MINLON;
  var MAXLON = 180;
  exports.MAXLON = MAXLON;
  var longitudeKeys = ["lng", "lon", "longitude", 0];
  exports.longitudeKeys = longitudeKeys;
  var latitudeKeys = ["lat", "latitude", 1];
  exports.latitudeKeys = latitudeKeys;
  var altitudeKeys = ["alt", "altitude", "elevation", "elev", 2];
  exports.altitudeKeys = altitudeKeys;
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
  exports.distanceConversion = distanceConversion;
  var timeConversion = {
    m: 60,
    h: 3600,
    d: 86400
  };
  exports.timeConversion = timeConversion;
  var areaConversion = {
    m2: 1,
    km2: 0.000001,
    ha: 0.0001,
    a: 0.01,
    ft2: 10.763911,
    yd2: 1.19599,
    in2: 1550.0031
  };
  exports.areaConversion = areaConversion;
  areaConversion.sqm = areaConversion.m2;
  areaConversion.sqkm = areaConversion.km2;
  areaConversion.sqft = areaConversion.ft2;
  areaConversion.sqyd = areaConversion.yd2;
  areaConversion.sqin = areaConversion.in2;
});
unwrapExports(constants);
var constants_1 = constants.areaConversion;
var constants_2 = constants.timeConversion;
var constants_3 = constants.distanceConversion;
var constants_4 = constants.altitudeKeys;
var constants_5 = constants.latitudeKeys;
var constants_6 = constants.longitudeKeys;
var constants_7 = constants.MAXLON;
var constants_8 = constants.MINLON;
var constants_9 = constants.MAXLAT;
var constants_10 = constants.MINLAT;
var constants_11 = constants.earthRadius;
var constants_12 = constants.sexagesimalPattern;var getCoordinateKey_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

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

  var _default = getCoordinateKey;
  exports.default = _default;
});
unwrapExports(getCoordinateKey_1);var isDecimal_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var isDecimal = function isDecimal(value) {
    var checkedValue = value.toString().trim();

    if (isNaN(parseFloat(checkedValue))) {
      return false;
    }

    return parseFloat(checkedValue) === Number(checkedValue);
  };

  var _default = isDecimal;
  exports.default = _default;
});
unwrapExports(isDecimal_1);var isSexagesimal_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var isSexagesimal = function isSexagesimal(value) {
    return constants.sexagesimalPattern.test(value.toString().trim());
  };

  var _default = isSexagesimal;
  exports.default = _default;
});
unwrapExports(isSexagesimal_1);var sexagesimalToDecimal_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var sexagesimalToDecimal = function sexagesimalToDecimal(sexagesimal) {
    var data = new RegExp(constants.sexagesimalPattern).exec(sexagesimal);

    if (typeof data === "undefined" || data === null) {
      throw new Error("Given value is not in sexagesimal format");
    }

    var min = Number(data[2]) / 60 || 0;
    var sec = Number(data[4]) / 3600 || 0;
    var decimal = parseFloat(data[1]) + min + sec;
    return ["S", "W"].includes(data[7]) ? -decimal : decimal;
  };

  var _default = sexagesimalToDecimal;
  exports.default = _default;
});
unwrapExports(sexagesimalToDecimal_1);var getCoordinateKeys_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _getCoordinateKey = _interopRequireDefault(getCoordinateKey_1);

  function _interopRequireDefault(obj) {
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

  var getCoordinateKeys = function getCoordinateKeys(point) {
    var keysToLookup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      longitude: constants.longitudeKeys,
      latitude: constants.latitudeKeys,
      altitude: constants.altitudeKeys
    };
    var longitude = (0, _getCoordinateKey.default)(point, keysToLookup.longitude);
    var latitude = (0, _getCoordinateKey.default)(point, keysToLookup.latitude);
    var altitude = (0, _getCoordinateKey.default)(point, keysToLookup.altitude);
    return _objectSpread({
      latitude: latitude,
      longitude: longitude
    }, altitude ? {
      altitude: altitude
    } : {});
  };

  var _default = getCoordinateKeys;
  exports.default = _default;
});
unwrapExports(getCoordinateKeys_1);var isValidLatitude_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _isDecimal = _interopRequireDefault(isDecimal_1);

  var _isSexagesimal = _interopRequireDefault(isSexagesimal_1);

  var _sexagesimalToDecimal = _interopRequireDefault(sexagesimalToDecimal_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var isValidLatitude = function isValidLatitude(value) {
    if ((0, _isDecimal.default)(value)) {
      if (parseFloat(value) > constants.MAXLAT || value < constants.MINLAT) {
        return false;
      }

      return true;
    }

    if ((0, _isSexagesimal.default)(value)) {
      return isValidLatitude((0, _sexagesimalToDecimal.default)(value));
    }

    return false;
  };

  var _default = isValidLatitude;
  exports.default = _default;
});
unwrapExports(isValidLatitude_1);var isValidLongitude_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _isDecimal = _interopRequireDefault(isDecimal_1);

  var _isSexagesimal = _interopRequireDefault(isSexagesimal_1);

  var _sexagesimalToDecimal = _interopRequireDefault(sexagesimalToDecimal_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var isValidLongitude = function isValidLongitude(value) {
    if ((0, _isDecimal.default)(value)) {
      if (parseFloat(value) > constants.MAXLON || value < constants.MINLON) {
        return false;
      }

      return true;
    }

    if ((0, _isSexagesimal.default)(value)) {
      return isValidLongitude((0, _sexagesimalToDecimal.default)(value));
    }

    return false;
  };

  var _default = isValidLongitude;
  exports.default = _default;
});
unwrapExports(isValidLongitude_1);var isValidCoordinate_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _getCoordinateKeys2 = _interopRequireDefault(getCoordinateKeys_1);

  var _isValidLatitude = _interopRequireDefault(isValidLatitude_1);

  var _isValidLongitude = _interopRequireDefault(isValidLongitude_1);

  function _interopRequireDefault(obj) {
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

  var _default = isValidCoordinate;
  exports.default = _default;
});
unwrapExports(isValidCoordinate_1);var toDecimal_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _isDecimal = _interopRequireDefault(isDecimal_1);

  var _isSexagesimal = _interopRequireDefault(isSexagesimal_1);

  var _sexagesimalToDecimal = _interopRequireDefault(sexagesimalToDecimal_1);

  var _isValidCoordinate = _interopRequireDefault(isValidCoordinate_1);

  var _getCoordinateKeys = _interopRequireDefault(getCoordinateKeys_1);

  function _interopRequireDefault(obj) {
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

      return _objectSpread({}, value, {}, keys.latitude && _defineProperty({}, keys.latitude, toDecimal(value[keys.latitude])), {}, keys.longitude && _defineProperty({}, keys.longitude, toDecimal(value[keys.longitude])));
    }

    if (Array.isArray(value)) {
      return value.map(function (point) {
        return (0, _isValidCoordinate.default)(point) ? toDecimal(point) : point;
      });
    }

    return value;
  };

  var _default = toDecimal;
  exports.default = _default;
});
unwrapExports(toDecimal_1);var getLatitude_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _getCoordinateKey = _interopRequireDefault(getCoordinateKey_1);

  var _toDecimal = _interopRequireDefault(toDecimal_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var getLatitude = function getLatitude(point, raw) {
    var latKey = (0, _getCoordinateKey.default)(point, constants.latitudeKeys);

    if (typeof latKey === "undefined" || latKey === null) {
      return;
    }

    var value = point[latKey];
    return raw === true ? value : (0, _toDecimal.default)(value);
  };

  var _default = getLatitude;
  exports.default = _default;
});
unwrapExports(getLatitude_1);var getLongitude_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _getCoordinateKey = _interopRequireDefault(getCoordinateKey_1);

  var _toDecimal = _interopRequireDefault(toDecimal_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var getLongitude = function getLongitude(point, raw) {
    var latKey = (0, _getCoordinateKey.default)(point, constants.longitudeKeys);

    if (typeof latKey === "undefined" || latKey === null) {
      return;
    }

    var value = point[latKey];
    return raw === true ? value : (0, _toDecimal.default)(value);
  };

  var _default = getLongitude;
  exports.default = _default;
});
unwrapExports(getLongitude_1);var toRad_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var toRad = function toRad(value) {
    return value * Math.PI / 180;
  };

  var _default = toRad;
  exports.default = _default;
});
unwrapExports(toRad_1);var getDistance_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _getLatitude = _interopRequireDefault(getLatitude_1);

  var _getLongitude = _interopRequireDefault(getLongitude_1);

  var _toRad = _interopRequireDefault(toRad_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var normalizeACosArg = function normalizeACosArg(val) {
    if (val > 1) {
      return 1;
    }

    if (val < -1) {
      return -1;
    }

    return val;
  };

  var getDistance = function getDistance(from, to) {
    var accuracy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    accuracy = typeof accuracy !== "undefined" && !isNaN(accuracy) ? accuracy : 1;
    var fromLat = (0, _getLatitude.default)(from);
    var fromLon = (0, _getLongitude.default)(from);
    var toLat = (0, _getLatitude.default)(to);
    var toLon = (0, _getLongitude.default)(to);

    var distance = Math.acos(normalizeACosArg(Math.sin((0, _toRad.default)(toLat)) * Math.sin((0, _toRad.default)(fromLat)) + Math.cos((0, _toRad.default)(toLat)) * Math.cos((0, _toRad.default)(fromLat)) * Math.cos((0, _toRad.default)(fromLon) - (0, _toRad.default)(toLon)))) * constants.earthRadius;

    return Math.round(distance / accuracy) * accuracy;
  };

  var _default = getDistance;
  exports.default = _default;
});
var getDistance = unwrapExports(getDistance_1);function locationMatcher() {
  var allowedRadius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return function location(incoming, stored) {
    var distance = getDistance(incoming, stored);
    return distance < allowedRadius;
  };
}function isPrimitive(val) {
  var natives = ['boolean', 'string', 'number', 'undefined'];
  return natives.indexOf(_typeof(val)) !== -1;
}
function getMultiplier(attr, attrWeights) {
  return attrWeights[attr] || 1;
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

  function checkForMismatch(a, b, multiplier) {
    if (a !== b) {
      numOfUnmatchedAttrs = numOfUnmatchedAttrs + multiplier;
    }
  }

  function checkValueOrCallNext(incoming, stored, key) {
    if (isPrimitive(stored)) {
      var multiplier = getMultiplier(key, attrWeights);
      checkForMismatch(stored, incoming, multiplier);
    } else if (Array.isArray(stored)) {
      arrayMatch(incoming, stored, key);
    } else {
      objectMatch(incoming, stored);
    }
  }

  function objectMatch(incoming, stored) {
    if (!stored) {
      return checkForMismatch(stored, incoming);
    }

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
}function deviceMatcher(_ref) {
  var _ref$allowedRadius = _ref.allowedRadius,
      allowedRadius = _ref$allowedRadius === void 0 ? 100 : _ref$allowedRadius,
      _ref$attrWeights = _ref.attrWeights,
      attrWeights = _ref$attrWeights === void 0 ? {} : _ref$attrWeights,
      _ref$maxUnmatchedAttr = _ref.maxUnmatchedAttrs,
      maxUnmatchedAttrs = _ref$maxUnmatchedAttr === void 0 ? 0 : _ref$maxUnmatchedAttr;
  var metadata = metadataMatcher(attrWeights, maxUnmatchedAttrs);
  var location = locationMatcher(allowedRadius);
  return [metadata, location];
}var username = sharedState.get('username');
var realm = sharedState.get('realm');
var incoming = {
  identifier: sharedState.get('forgeRock.device.identifier'),
  metadata: sharedState.get('forgeRock.device.metadata'),
  location: sharedState.get('forgeRock.device.location')
};
var storedProfiles = deviceProfilesDao.getDeviceProfiles(username, realm);
outcome = 'doesNotExist';

if (storedProfiles) {
  for (var i = 0; i < storedProfiles.size(); i++) {
    try {
      var stored = JSON.parse(storedProfiles.get(i));

      if (incoming.identifier === stored.identifier) {
        var config = {
          allowedRadius: 250,
          attrWeights: {
            deviceMemory: 3
          },
          maxUnmatchedAttrs: 2
        };

        var _deviceMatcher = deviceMatcher(config),
            _deviceMatcher2 = _slicedToArray(_deviceMatcher, 2),
            metadataMatch = _deviceMatcher2[0],
            locationMatch = _deviceMatcher2[1];

        var isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
        var isLocationMatching = locationMatch(incoming.location, stored.location);
        outcome = isMetadataMatching && isLocationMatching ? 'true' : 'false';
        break;
      }
    } catch (err) {
      logger.message(err.message);
    }
  }
}}());