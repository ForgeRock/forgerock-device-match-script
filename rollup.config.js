const babel = require('rollup-plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'src/index.js',
  output: {
    compact: true,
    file: 'dist/script.js',
    format: 'iife',
    intro: '\n\n' +
      '/** ************************************************************************\n' +
      ' * FORGEROCK | AM DEVICE MATCH SCRIPT\n' +
      ' * This is a generated file. Do not directly modify.\n' +
      ' * For more information about this file, visit this Github repo:\n' +
      ' * https://github.com/ForgeRock/forgerock-device-match-script.\n' +
      ' * \n' +
      ' * If you would like to modify this script or use it as a reference\n' +
      ' * for building your own matching script, we recommend cloning the git\n' +
      ' * repo above and use it as a development toolkit to get started.\n' +
      ' * *************************************************************************/'
  },
  plugins: [ resolve(), commonjs(), babel() ]
};
