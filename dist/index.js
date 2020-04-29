"use strict";

var _match = require("../src/match");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Capture data from incoming request
 */
var username = sharedState.get('username');
var realm = sharedState.get('realm');
var incoming = {
  identifier: sharedState.get('forgeRock.device.identifier'),
  metadata: sharedState.get('forgeRock.device.metadata'),
  location: sharedState.get('forgeRock.device.location')
};
/**
 * Retrieve incoming user's stored profiles API
 */

var storedProfiles = deviceProfilesDao.getDeviceProfiles(username, realm);
/**
 * The variable `outcome` is a global variable to which the result of the
 * matching is assigned. The values are 'true', 'false' or 'doesNotExist',
 * notice the values are of type `string`.
 *
 * Here, we are going to default to 'doesNotExist', which allows us to
 * only worry about the condition of finding the profile
 */

outcome = 'doesNotExist';

if (storedProfiles) {
  for (var i = 0; i < storedProfiles.size(); i++) {
    // try-catch due to JSON.parse throwing error with invalid JSON
    try {
      var stored = JSON.parse(storedProfiles.get(i));

      if (incoming.identifier === stored.identifier) {
        /**
         * Configure deviceMatcher with the following settings:
         *
         * maxUnmatchedAttrs (number) - the maximum number of unmatched profile
         * attributes before failing the whole device profile match
         *
         * allowedRadius (number) - the number of meters of distance between the
         * stored location and incoming location.
         *
         * returns an array of two functions, each function returns a boolean.
         */
        var _deviceMatcher = (0, _match.deviceMatcher)({
          maxUnmatchedAttrs: 2,
          allowedRadius: 5
        }),
            _deviceMatcher2 = _slicedToArray(_deviceMatcher, 2),
            metadataMatch = _deviceMatcher2[0],
            locationMatch = _deviceMatcher2[1];

        var isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
        var isLocationMatching = locationMatch(incoming.location, stored.location);
        outcome = isMetadataMatching && isLocationMatching ? 'true' : 'false';
        break; // out of loop
      }
    } catch (err) {
      /**
       * If JSON parsing error is detected, just log and continue loop.
       */
      logger.message(err.message);
    }
  }
}