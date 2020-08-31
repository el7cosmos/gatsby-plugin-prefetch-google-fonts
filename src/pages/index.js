import React from 'react';
import { css } from 'emotion';

const testStyles = css({
  fontFamily: 'Roboto',
});

export default function () {
  return <div className={testStyles}>Test font.</div>;
}
