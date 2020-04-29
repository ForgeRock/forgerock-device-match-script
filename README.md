# ForgeRock Device Match Sample Script

This is a sample or starter script for customizing your AM authentication tree, device match node. The purpose of this project is to help you develop complex scripts in modern JavaScript with modular architecture. You can even use NPM modules to help speed up development.

There are a few things to note:

- Importing external scripts can bloat the output and/or introduce unwanted side-effects. Use sparingly.
- If you want to use new, native Object methods, you will have to add the necessary polyfills. [FAQ: 1]

## Overview

- The final script that can be copied and pasted into AM's script editor can be found in the `dist/` directory
- Source code can be found in the `src/` directory and can be as modular as one desires
- Tests can be found in the `test/` directory along with sample device profiles

## Requirements

- Node v13.10 or higher
- NPM v6 or higher

## Instructions

After cloning this repo locally, install the needed dev dependencies:

```
npm install
npm run build
```

The `build` command will test the source code, bundle the output, and then run a test on the bundled output.

## Features

### Comparing Metadata

This script uses recursive iteration to compare the two metadata objects. It is written with small to moderately sized JavaScript objects, and is not optimized for very large or very deep structures.

When the recursion meets a leaf node (a primitive value), it does a comparison of values. If there's a mismatch, it will increment the number of mismatches. There are two ways to configure this algorithm:

1. Configure the maximum number of allowed mismatches (`maxUnmatchedAttrs`)
2. The "weight" of attributes; i.e. a particular unmatched property may have more "weight" (`attrWeights`)

To expand on #2, let's say you have a maximum number of mismatches set to 2. This could be exceeded by having three attributes with the default weight of 1 not match (n=1+1+1), or you could have 1 property with a weight of 3 not match (n=3).

### Comparing Location

This script doesn't internally compare geolocation coordinates. We are using an [external library called `geolib`](https://www.npmjs.com/package/geolib), which is well built and very powerful. `getDistance` is the only function used out of the library, and all we do is wrap it with a comparison of the distance between two points to that of the maximum allowed radius (all units in meters). This radius can be configured (`allowedRadius`).

## Usage

```js
const config = {
  // all properties are optional
  allowedRadius: 250, // type `number`; defaults to 100 (meters)
  attrWeights: {
    // all attributes default to 1
    deviceMemory: 3 // type `number`
    // ... as many attributes as you want to configure
  },
  maxUnmatchedAttrs: 2, // type `number`; default to 0
};
// deviceMatcher takes a config  object (required), returns the metadata and location match functions
const [ metadataMatch, locationMatch ] = deviceMatcher(config);
// Both of these functions take the two objects for comparison and return a boolean
const isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
const isLocationMatching = locationMatch(incoming.location, stored.location);
```

## Building the Output

After finalizing your changes, you can build the unified script with the below command:

```
npm run build
```

This will transpile and bundle all your modules into a unified script with all dependencies included. You can find this script within the `dist/` directory. This script is what you'll copy and paste into AM's script editor for the device match node.

Rollup is the library used for the bundling. You can find more information on it here: http://rollupjs.org.

Babel is the library used to transpile your modern JavaScript down to the appropriate version for Rhino (JS runtime used in AM). You can find more about Babel here: https://babeljs.io/. This will not support the new, native Object/Array/String methods without a polyfill [FAQ: 1].

## Testing

You can run the tests for the source code as well as a test for the final script:

```
# Test source code
npm run test

# Test bundled script
npm run test:bundle
```

_(You may notice a `test.config.js` in the root of the project. This is for testing the bundled script, so it can inject the appropriate globals that the script expects.)_

While developing, it's recommended that you run a watch command that continuously tests your code for better feedback:

```
npm run watch
```

## FAQ

### 1. Why no polyfills?

For this sample script, we didn't see enough need for the new, native Object/Array/String methods to offset the cost of the additional code output. So, we didn't include the polyfills. But, if you see the need for them, you can easily add them by following these instructions: https://babeljs.io/docs/en/babel-polyfill.
