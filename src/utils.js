export function isPrimitive(val) {
  const natives = ['boolean', 'string', 'number', 'undefined'];
  return natives.indexOf(typeof val) !== -1;
}

export function getMultiplier(attr, attrWeights) {
  return attrWeights[attr] || 1;
}

export function hasProperGeocoordinates(a, b) {
  if (!a || !b) {
    return false;
  }
  let isAProper = typeof a.latitude === 'number' && typeof a.longitude === 'number';
  let isBProper = typeof b.latitude === 'number' && typeof b.longitude === 'number';
  return isAProper && isBProper;
}
