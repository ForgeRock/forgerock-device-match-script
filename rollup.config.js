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
      '/**\n' +
      ' * FORGEROCK | DEVICE MATCH SAMPLE SCRIPT\n' +
      ' * For more information, visit https://github.com/cerebrl/forgerock-device-match.\n' +
      ' * \n' +
      ' * If you would like to modify this script or use it as a reference for building\n' +
      ' * your own matching script, we recommend cloning the git repo above to get started.\n' +
      ' */'
  },
  plugins: [ resolve(), commonjs(), babel() ]
};
