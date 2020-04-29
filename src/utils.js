export function isPrimitive(val) {
  const primitives = ['boolean', 'string', 'number', 'undefined'];
  return primitives.indexOf(typeof val) !== -1;
}

export function getMultiplier(attr, attrWeights) {
  return typeof attrWeights[attr] === 'number'
    ? attrWeights[attr]
    : 1;
}
