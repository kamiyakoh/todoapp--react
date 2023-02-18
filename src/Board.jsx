/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Board({ cssName, children }) {
  const breakpoints = [600, 960];
  const mq = breakpoints.map((bp) => `@media (width < ${bp}px)`);
  const board = css`
    position: relative;
    padding: 1em;
    width: calc(50% - 1em);
    background: #006633;
    color: #fff;
    border: 8px solid #b2771f;
    border-radius: 3px;
    box-shadow: 0 0 5px #333, 0 0 5px #555 inset;
    ${mq[1]} {
      width: 100%;
    }
    &:before,
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
    }
    &:before {
      width: 20px;
      right: 10px;
      border: solid 3px var(--color, #6fd1ff);
      border-radius: 3px 2px 0 2px;
    }
    &:after {
      width: 15px;
      right: 45px;
      border: solid 3px #fff;
      border-radius: 8px 5px 2px 5px;
    }
  `;

  return <div css={[board, cssName]}>{children}</div>;
}

export default Board;
