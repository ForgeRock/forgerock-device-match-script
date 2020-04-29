import { locationMatcher } from '../../src/location';
import similarProfile from '../profiles/similar-profile';
import storedProfile from '../profiles/stored-profile';
import unmatchingProfile from '../profiles/unmatching-profile';

describe('Test location coordinates matcher with range', () => {
  it('should return true with exact coordinates', () => {
    const locationMatch = locationMatcher(200);
    expect(locationMatch(storedProfile.location, storedProfile.location)).toBe(true);
  });

  it('should return true of within range', () => {
    const locationMatch = locationMatcher(200);
    expect(locationMatch(similarProfile.location, storedProfile.location)).toBe(true);
  });

  it('should return false when out of range', () => {
    const locationMatch = locationMatcher(200);
    expect(locationMatch(unmatchingProfile.location, storedProfile.location)).toBe(false);
  });

  it('should return false when bad coordinates are given', () => {
    const locationMatch = locationMatcher(200);
    expect(locationMatch({ latitude: 34 }, storedProfile.location)).toBe(false);
    expect(locationMatch('not proper', storedProfile.location)).toBe(false);
    expect(locationMatch(storedProfile.location, { latitude: '34', logitude: -54.3456 })).toBe(false);
  });
});
