const {
  readFile,
  outputFile,
} = require('fs-extra');
const CleanCss = require('clean-css');
const path = require('path');

function getLines(data) {
  const lines = {};
  data.split('\n').forEach((line) => {
    line = line.trim();
    if (line.indexOf('src:') === 0) {
      const items = line
        .replace(';', '')
        .replace('src:', '')
        .split(',')
        .map((item) => item.trim());
      const name = items.shift();
      lines[name] = {
        items,
        line: line.replace(';', ''),
      };
    }
  });
  return lines;
}

function mergeLines(origin, newLines) {
  Object.keys(origin).forEach((key) => {
    if (newLines[key]) {
      origin[key].newLine = `${origin[key].newLine || origin[key].line}, ${newLines[key].items[newLines[key].items.length - 1]}`;
    }
  });
}

function createCssString(str, obj) {
  Object.keys(obj).forEach((key) => {
    str = str.replace(obj[key].line, obj[key].newLine);
  });
  return str;
}

module.exports = async (config) => {
  const cachedPath = path.join('./.cache/google-fonts/', config.pathPrefix);

  // Read files
  const [woff2, woff] = await Promise.all([
    readFile(`${cachedPath}/woff2.css`, 'utf8'),
    readFile(`${cachedPath}/woff.css`, 'utf8'),
  ]);

  const woff2Lines = getLines(woff2);
  const woffLines = getLines(woff);
  mergeLines(woff2Lines, woffLines);

  let css = createCssString(woff2, woff2Lines);
  css = new CleanCss().minify(css).styles;

  // Add font-display swap as recommended here https://css-tricks.com/font-display-masses/.
  css = css.replace(/}/g, ';font-display: swap;}');

  await outputFile(`${cachedPath}/google-fonts.css`, css);
};
