import { isPrimitive, getMultiplier } from './utils';

/**
 * @function metadataMatcher - compares two metadata objects with allowable mismatches
 * @param {Object} attrWeights - object with weighted attributes and the assign number
 *     Example: { deviceMemory: 3 } // deviceMemory rarely changes, so more weight can be given
 * @param {number} maxUnmatchedAttrs - number of allowed unmatched attributes before failing
 * @returns {boolean}
 */
export function metadataMatcher(attrWeights = {}, maxUnmatchedAttrs = 0) {
  let numOfUnmatchedAttrs = 0;

  function arrayMatch(incoming, stored, key) {
    const len = stored.length;
    for (let i = 0; i < len; i++) {
      if (numOfUnmatchedAttrs > maxUnmatchedAttrs) { break; }
      const storedVal = stored[i];
      const incomingVal = incoming && incoming[i];
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
      let multiplier = getMultiplier(key, attrWeights);
      checkForMismatch(stored, incoming, multiplier);
    } else if (Array.isArray(stored)) {
      arrayMatch(incoming, stored, key);
    } else {
      objectMatch(incoming, stored);
    }
  }

  function objectMatch(incoming, stored) {
    // `typeof null` returns "object", so handle this case first
    if (!stored) { return checkForMismatch(stored, incoming); }

    const keys = Object.keys(stored);
    for (const key of keys) {
      if (numOfUnmatchedAttrs > maxUnmatchedAttrs) { break; }
      const storedVal = stored[key];
      const incomingVal = incoming && incoming[key];
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
  }
}
