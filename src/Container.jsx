import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const container = css`
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
`;

function Container() {
  return (
    <div>
      <div css={container}> </div>
    </div>
  );
}

export default Container;
