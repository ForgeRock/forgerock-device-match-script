import getDistance from 'geolib/es/getDistance';

/**
 * @function locationMatcher - compares two sets of coordinates; checks distance with allowed radius
 * @param {number} allowedRadius - the number of allowed meters of distance
 * @returns {boolean}
 */
export function locationMatcher(allowedRadius = 100) {
  return function location(incoming, stored) {
    const distance = getDistance(incoming, stored);
    return distance < allowedRadius;
  };
}
