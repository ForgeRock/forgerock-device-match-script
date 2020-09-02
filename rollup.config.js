import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

module.exports = {
  input: 'src/index.js',
  output: {
    compact: true,
    file: 'dist/script.js',
    format: 'iife',
    intro: '\n\n' +
      '/** ************************************************************************\n' +
      ' * FORGEROCK | AM DEVICE MATCH SCRIPT\n' +
      ' * \n' +
      ' * script.js\n' +
      ' * \n' +
      ' *  Copyright (c) 2020 ForgeRock. All rights reserved.\n' +
      ' *  This software may be modified and distributed under the terms\n' +
      ' *  of the MIT license. See the LICENSE file for details.\n' +
      ' * \n' +
      ' * *************************************************************************\n' +
      ' * \n' +
      ' * THIS IS A GENERATED FILE. Do not directly modify.\n' +
      ' * For more information about this file, visit this Github repo:\n' +
      ' * https://github.com/ForgeRock/forgerock-device-match-script.\n' +
      ' * \n' +
      ' * If you would like to modify this script or use it as a reference\n' +
      ' * for building your own matching script, we recommend cloning the git\n' +
      ' * repo above and use it as a development toolkit to get started.\n' +
      ' * *************************************************************************/'
  },
  plugins: [ nodeResolve(), commonjs(), babel({ babelHelpers: 'bundled' }) ]
};
