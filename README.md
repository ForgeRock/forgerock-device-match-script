# ForgeRock Device Match Sample Script

This is a development toolkit for customizing your AM authentication tree, device match node. The purpose of this project is to help you develop complex scripts in modern JavaScript with modular architecture. You also have the availability of the NPM ecosystem to help speed up development.

There are a few things to note:

- You can use the existing script as-is by simply copying the file from `dist/script.js` and pasting its contents into the Device Match node in AM
- If you'd like to configure or customize this script, you can use it as a development toolkit
- Using the build system with automated tests during development is recommended
- Use the NPM ecosystem with care. Importing external dependencies can bloat the output and/or introduce unwanted side-effects.
- If you want to use new/modern, native Object/Array/String methods, you will have to add the necessary polyfills. [FAQ: 1]

## Project Overview

- The production-ready script that can be copied and pasted into AM can be found here `dist/`
- Source code can be found in the `src/` directory and can be as modular as one desires
- The top-level JavaScript file is `src/index.js`
- Tests can be found in the `test/` directory along with sample device profiles
- The build system used is Babel and Rollup
- Test framework is Jest

## Requirements

- Node v13.10 or higher
- NPM v6 or higher

## Instructions

After cloning this repo locally, install the needed dependencies and build the project:

```
npm install
npm run build
```

The `build` command will test the source code, "compile" and bundle the output, and then run a test on the final script.

## Ways To Use This Project

1. Copy the file contents of `dist/script.js` and paste it into your Device Match node in AM; This will incorporate both metadata and location match with defaults
2. Modify `src/index.js` to use the metadata match without the location match or vice versa
3. Simply configure the existing function to your needs in `src/index.js`
4. Modify the underlying logic within the metadata match and location match functions (`src/metadata.js` and `src/location.js`, respectively)

## Configuration of Features

### Comparing Metadata

This script uses recursive iteration to compare the two metadata objects. It is written with small to moderately large sized JavaScript objects in mind, and is not optimized for very large or very deep structures.

When the recursion meets a primitive value (string, number, boolean, etc), it does a comparison of values. If there's a mismatch, it will increment the number of mismatches. There are two ways to configure this algorithm:

1. Configure the maximum number of allowed mismatches (`maxUnmatchedAttrs`)
2. Configure the "weight" of specific attributes; i.e. a particular unmatched property may have more for more than others (`attrWeights`)

To expand on #2, let's say you have a maximum number of mismatches set to 2. This could be exceeded by having three attributes with the default weight of 1 not match (n=1+1+1), or you could have 1 property with a weight of 3 not match (n=3).

Why would you do this? Well, certain profile properties, like display width or height, will vary if the user changes displays from the prior authentication. If you're less concerned with the display properties, because they can easily change (e.g. extending your laptop's display), and more concerned with things that will remained unchanged, like the device's memory, you can weigh them appropriately.

### Comparing Location

This script doesn't internally compare geolocation coordinates. We are using an [external library called `geolib`](https://www.npmjs.com/package/geolib), which is well built and very powerful. `getDistance` is the only function used out of the library, and all we do is wrap it with a comparison of the distance between two points to that of the maximum allowed radius (all units in meters). This radius can be configured (`allowedRadius`).

### Code Examples

```js
// Run without configuration
const [ metadataMatch, locationMatch ] = deviceMatcher();
const isMetadataMatching = metadataMatch(a, b);
const isLocationMatching = locationMatch(a, b);

// Run without location match
const [ metadataMatch ] = deviceMatcher();
const isMetadataMatching = metadataMatch(a, b);

// Or, with just location match
const [ _, locationMatch ] = deviceMatcher();
const isLocationMatching = locationMatch(a, b);

// Run with configuration
// (all properties are optional)
const config = {
  allowedRadius: 250, // type `number`; defaults to 100 (meters)
  attrWeights: {
    // Custom weights for metadata attributes (object keys)
    deviceMemory: 3 // type `number`
    // ... as many attributes as you want
    // all attributes default to 1
  },
  maxUnmatchedAttrs: 2, // type `number`; default to 0 (exact match)
};
const [ metadataMatch, locationMatch ] = deviceMatcher(config);
const isMetadataMatching = metadataMatch(a, b);
const isLocationMatching = locationMatch(a, b);
```

## Using the Development Toolkit

After finalizing your changes, you can build the unified script with the below command:

```
npm run build
```

This will test the source code, "compile" and bundle the output, and then run a test on the final script. You can find this output script within the `dist/` directory. This script is what you'll copy and paste into AM's script editor for the Device Match node.

For convenience, you can also run a watch command, and it will watch for source file changes and test your code and build the output upon changes:

```
npm run watch
```

### Build tools

Rollup is the library used for the bundling. You can find more information on it here: http://rollupjs.org.

Babel is the library used to transpile your modern JavaScript down to the appropriate version for Rhino (JS runtime used in AM). You can find more about Babel here: https://babeljs.io/. As-is, this build step will not support the new, native Object/Array/String methods without a polyfill [FAQ: 1].

## Testing

You can run tests on the source code as well as a test for the final script:

```
# Test source code
npm run test

# Test bundled script
npm run test:bundle
```

_(You may notice a `test.config.js` in the root of the project. This is only used for testing the bundled script (not the source code), so it can inject the appropriate globals that the script expects.)_

Jest is the test framework used. You can find more information about it here: https://jestjs.io.

## FAQ

### 1. Why no polyfills?

For this sample script, we didn't see enough need for the new, native Object/Array/String methods to offset the cost of the additional code output. So, we didn't include the polyfills. But, if you see the need for them, you can easily add them by following these instructions: https://babeljs.io/docs/en/babel-polyfill.
