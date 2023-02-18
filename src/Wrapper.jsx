/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Wrapper({ children }) {
  const wrapper = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2em;
    padding: 2em 0;
  `;

  return <div css={wrapper}>{children}</div>;
}

export default Wrapper;
