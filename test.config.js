const incoming = require('./test/profiles/test-profile');
const stored = require('./test/profiles/test-profile');

module.exports = {
  globals: {
    sharedState: {
      get: (path) => {
        switch (path) {
          case 'username':
            return { asString: () => 'tester' };
          case 'realm':
            return { asString: () => 'root' };
          case 'forgeRock.device.profile':
            return {
              toString: () => JSON.stringify(incoming)
            }
        }
      }
    },
    deviceProfilesDao: {
      getDeviceProfiles: () => ({
        size: () => 1,
        get: () => [JSON.stringify(stored)]
      })
    },
    logger: {
      message: () => {}
    },
    outcome: ''
  },
};
