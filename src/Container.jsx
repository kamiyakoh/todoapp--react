/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Container({ isSingle, children }) {
  const container = css`
    width: 90%;
    margin: 0 auto;
  `;
  const single = css`
    max-width: 720px;
  `;
  const multi = css`
    max-width: 1280px;
  `;

  return <div css={[container, isSingle ? single : multi]}>{children}</div>;
}

export default Container;
