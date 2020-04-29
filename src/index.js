import { deviceMatcher } from './profile';

/**
 * Capture data from incoming request
 */
const username = sharedState.get('username');
const realm = sharedState.get('realm');
const incoming = {
  identifier: sharedState.get('forgeRock.device.identifier'),
  metadata: sharedState.get('forgeRock.device.metadata'),
  location: sharedState.get('forgeRock.device.location'),
};

/**
 * Retrieve incoming user's stored profiles API
 */
const storedProfiles = deviceProfilesDao.getDeviceProfiles(username, realm);

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

  for (let i = 0; i < storedProfiles.size(); i++) {
    // try-catch due to JSON.parse throwing error with invalid JSON
    // if we can't parse it, we just continue with the next profile
    try {
      let stored = JSON.parse(storedProfiles.get(i));

      // Find the device profile with the identifier
      if (incoming.identifier === stored.identifier) {
        /**
         * Configure deviceMatcher with your desired settings.
         * More information can be found in respective files
         */
        const config = {
          allowedRadius: 250, // defaults to 100
          attrWeights: {
            deviceMemory: 3 // `number` only value; all attributes default to 1
            // ... as many attributes as you want to weigh
          },
          maxUnmatchedAttrs: 2, // default to 0
        };
        const [ metadataMatch, locationMatch ] = deviceMatcher(config);
        const isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
        const isLocationMatching = locationMatch(incoming.location, stored.location);

        outcome = isMetadataMatching && isLocationMatching
          ? 'true'
          : 'false';
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
