/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Container({ children }) {
  const container = css`
    max-width: 1280px;
    width: 90%;
    margin: 0 auto;
  `;

  return <div css={container}>{children}</div>;
}

export default Container;
