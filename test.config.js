const incoming = require('./test/profiles/test-profile');
const stored = require('./test/profiles/test-profile');

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
            return 'ec3f8bbee78406bb-NtheX1L1Z2zjW/c4FrPo3X+zyb97=';
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
