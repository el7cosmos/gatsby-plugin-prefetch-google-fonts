const GoogleFontsWebpackPlugin = require('google-fonts-plugin');
const path = require('path');

module.exports = async ({
  fonts,
  formats = [
    // `eot`,
    'woff2',
    'woff',
    // `ttf`,
    // `svg`,
  ],
}, config) => {
  const googleFontsPlugin = new GoogleFontsWebpackPlugin({
    fonts,
    formats,
    outputDir: path.join('.cache/google-fonts', config.pathPrefix),
    encode: false,
    minify: false,
    verbose: true,
  });
  await googleFontsPlugin.make();
};
