const {
  pathExists,
  readFile,
  outputFile,
  remove,
  copy,
} = require('fs-extra');
const Hash = require('object-hash');
const path = require('path');
const downloadCSS = require('./download-css');
const mergeCSS = require('./merge-css');
const downloadFonts = require('./download-fonts');

exports.onPreBootstrap = async (config, options) => {
  const cachedPath = path.join('./.cache/google-fonts/', config.pathPrefix);
  const hashPath = path.join(cachedPath, 'hash.txt');

  const hash = Hash(options);
  if (!await pathExists(hashPath) || await readFile(hashPath, 'utf8') !== hash) {
    await remove('./.cache/google-fonts');
    await downloadCSS(options, config);
    await mergeCSS(config);
    await downloadFonts(config);
    await outputFile(hashPath, hash);
  }
  await copy(`${cachedPath}/fonts`, './public/google-fonts');
};
