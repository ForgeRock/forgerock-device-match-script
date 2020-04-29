export function isPrimitive(val) {
  const natives = ['boolean', 'string', 'number', 'undefined'];
  return natives.indexOf(typeof val) !== -1;
}

export function getMultiplier(attr, attrWeights) {
  return attrWeights[attr] || 1;
}
