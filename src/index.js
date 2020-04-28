function isPrimitive(val) {
  const natives = ['boolean', 'string', 'number', 'undefined'];
  return natives.indexOf(typeof val) !== -1;
}

function deviceMatch({ maxUnmatchedAttrs }) {
  let numOfMismatches = 0;

  function checkForMismatch(a, b) {
    if (a !== b) {
      numOfMismatches++;
    }
  }

  function objectMatch(incoming, stored) {
    // `typeof null` returns "object", so handle this case first
    if (!stored) {
      return checkForMismatch(stored, incoming);
    }

    let propKeys = Object.keys(stored);
    for (const key of propKeys) {
      const storedVal = stored[key];
      const incomingVal = incoming && incoming[key];
      if (isPrimitive(storedVal)) {
        checkForMismatch(storedVal, incomingVal);
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
        checkForMismatch(storedVal, incomingVal);
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

