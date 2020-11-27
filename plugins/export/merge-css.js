const {
  readFile,
  outputFile,
} = require('fs-extra');
const CleanCss = require('clean-css');
const path = require('path');

module.exports = async (config) => {
  const cachedPath = path.join('./.cache/google-fonts/', config.pathPrefix);

  // Read files
  const [woff2, woff] = await Promise.all([
    readFile(`${cachedPath}/woff2.css`, 'utf8'),
    readFile(`${cachedPath}/woff.css`, 'utf8'),
  ]);

  let css = woff2 + woff;
  css = new CleanCss().minify(css).styles;

  // Add font-display swap as recommended here https://css-tricks.com/font-display-masses/.
  css = css.replace(/}/g, ';font-display: swap;}');

  await outputFile(`${cachedPath}/google-fonts.css`, css);
};
