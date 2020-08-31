const React = require('react');
const globby = require('globby').sync;
const { readFileSync } = require('fs');
const path = require('path');

exports.onRenderBody = ({ pathPrefix = '', setHeadComponents }) => {
  const files = globby('./public/google-fonts/**/*.woff2');
  const css = readFileSync(path.join('./.cache/google-fonts/', pathPrefix, 'google-fonts.css'));
  setHeadComponents([
    ...files.map((file) => (
      <link
        key={path.basename(file)}
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href={file.replace('./public', pathPrefix)}
      />
    )),
    <style
      key="googleFontsCSS"
      type="text/css"
      dangerouslySetInnerHTML={{ __html: css }}
    />,
  ]);
};
