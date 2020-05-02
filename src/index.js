import { deviceMatcher } from './profile';

/**
 * The variable `outcome` is a global variable to which the result of the
 * matching is assigned. The values are 'true', 'false' or 'doesNotExist',
 * notice the values are of type `string`.
 *
 * Here, we are going to default to 'doesNotExist', which allows us to
 * only worry about the condition of finding the profile
 */
outcome = 'doesNotExist';

/**
 * To ensure a native JS structure, call `toString` and parse back into an object
 */
const incomingJson = sharedState.get('forgeRock.device.profile').toString();
let incoming = null;

try {
  incoming = JSON.parse(incomingJson);
} catch (err) {
  logger.message(`Error parsing incoming profile: ${err.message}`);
  return;
}

/**
 * Retrieve incoming user's stored profiles API
 */
const username = sharedState.get('username').asString();
const realm = sharedState.get('realm').asString();
const storedProfiles = deviceProfilesDao.getDeviceProfiles(username, realm);

if (!storedProfiles) {
  return;
}

for (let i = 0; i < storedProfiles.size(); i++) {
  // If we can't parse it, we just continue with the next profile
  let stored = null;
  try {
    stored = JSON.parse(storedProfiles.get(i));
  } catch (err) {
    logger.message(`Error parsing stored profile: ${err.message}`);
    continue;
  }

  // Find the device profile with the identifier
  if (incoming.identifier === stored.identifier) {
    /**
     * Configure deviceMatcher with your desired settings.
     * More information can be found in respective files
     */
    const config = {
      allowedRadius: 250, // <number> defaults to 100 meters
      attrWeights: {
        deviceMemory: 3 // <number> all attributes default to 1
        // ... as many attributes as you want to weigh
      },
      maxUnmatchedAttrs: 2, // <number> default to 0
    };
    const [metadataMatch, locationMatch] = deviceMatcher(config);
    const isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
    const isLocationMatching = locationMatch(incoming.location, stored.location);

    outcome = (isMetadataMatching && isLocationMatching).toString();
    return;
  }
}
