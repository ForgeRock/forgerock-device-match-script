function isPrimitive(val) {
  switch (typeof val) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined':
      return true;
    default:
      return false;
  }
}

function deviceMatch({ maxUnmatchedAttrs }) {
  let numOfMismatches = 0;

  function objectMatch(incoming, stored) {
    // `typeof null` returns "object", so handle this case first
    if (!stored) {
      return numOfMismatches = stored === incoming
        ? numOfMismatches
        : numOfMismatches + 1;
    }
    let propKeys = Object.keys(stored);
    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i];
      const storedVal = stored[key];
      const incomingVal = incoming && incoming[key];
      if (isPrimitive(storedVal)) {
        numOfMismatches = storedVal === incomingVal
          ? numOfMismatches
          : numOfMismatches + 1;
      } else if (Array.isArray(storedVal)) {
        arrayMatch(incomingVal, storedVal);
      } else {
        objectMatch(incomingVal, storedVal);
      }
    }
  }

  function arrayMatch(incoming, stored) {
    for (let i = 0; i < stored.length; i++) {
      const storedVal = stored[i];
      const incomingVal = incoming && incoming[i];
      if (isPrimitive(storedVal)) {
        numOfMismatches = storedVal === incomingVal
          ? numOfMismatches
          : numOfMismatches + 1;
      } else if (Array.isArray(storedVal)) {
        arrayMatch(incomingVal, storedVal);
      } else {
        objectMatch(incomingVal, storedVal);
      }
    }
  }

  return function (incomingProfile, storedProfile) {
    if (Array.isArray(incomingProfile)) {
      arrayMatch(incomingProfile, storedProfile);
    } else {
      objectMatch(incomingProfile, storedProfile);
    }
    return numOfMismatches <= maxUnmatchedAttrs;
  }
}

export { deviceMatch };
