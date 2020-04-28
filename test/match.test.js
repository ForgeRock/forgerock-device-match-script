import { deviceMatch } from '../src';
import similarProfile from './profiles/similar-profile';
import storedProfile from './profiles/stored-profile';
import unmatchingProfile from './profiles/unmatching-profile';
import missingPropsProfile from './profiles/missing-props-profile';

const a = { num: 1, undef: undefined, nulla: null, obj: { alpha: 'a', beta: 'b' }, arr: [ 'one', 'two' ] };
const b = { num: 1, undef: undefined, nulla: null, obj: { alpha: 'a', beta: 'c' }, arr: [ 'one', 'three' ] };
const c = { num: 1, undef: undefined, nulla: null, obj: { alpha: 'c', beta: 'b' }, arr: [ 'two', 'three' ] };

describe('Test simple objects with diverse value types', () => {
  it('should return true for exact profile match', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(a, a)).toBe(true);
  });

  it('should return true for allowed number of mismatch', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(a, b)).toBe(true);
  });

  it('should return false for exceeding allowed mismatch', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(a, c)).toBe(false);
  });
});

describe('Test actual profiles', () => {
  it('should return true for exact profile match', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(storedProfile, storedProfile)).toBe(true);
  });

  it('should return true for allowed number of mismatch', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(similarProfile, storedProfile)).toBe(true);
  });

  it('should return false for exceeding allowed mismatch', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(unmatchingProfile, storedProfile)).toBe(false);
  });

  it('should return false, and not crash, for missing props allowed mismatch', () => {
    expect(deviceMatch({ maxUnmatchedAttrs: 2 })(missingPropsProfile, storedProfile)).toBe(false);
  });
});
