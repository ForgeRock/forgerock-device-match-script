const incoming = require('./test/profiles/similar-profile');
const stored = require('./test/profiles/stored-profile');

module.exports = {
  globals: {
    sharedState: {
      get: (path) => {
        switch (path) {
          case 'username':
            return 'tester';
          case 'realm':
            return 'root';
          case 'forgeRock.device.identifier':
            return '714524572-2799534390-3707617532';
          case 'forgeRock.device.metadata':
            return incoming.metadata;
          case 'forgeRock.device.location':
            return incoming.location;
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
