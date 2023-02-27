/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const breakpoints = { sp: 600, tab: 960 };
export function mq(bp) {
  return `@media (width < ${breakpoints[bp]}px)`;
}
export const pink = css`
  --color: #ff7fbf;
`;
export const blue = css`
  --color: #6fd1ff;
`;
export const yellow = css`
  --color: #ffff6b;
`;
export const size2 = css`
  --size: 2;
`;
export const size3 = css`
  --size: 3;
`;
export const textOrange = css`
  color: #ff6c00;
`;
export const textPink = css`
  color: #ff7fbf;
`;
export const textYellow = css`
  color: #ffff6b;
`;
export const dInline = css`
  display: inline;
`;
export const dNone = css`
  display: none;
`;
export const fs3 = css`
  font-size: 3rem;
`;
export const fwBold = css`
  font-weight: bold;
`;
export const singleBoard = css`
  width: 100%;
  margin: 2em auto;
`;
export const toastBoard = {
  padding: '1em',
  background: '#202020',
  color: '#fff',
  border: '8px solid #8b4513',
  borderRadius: '3px',
  boxShadow: '0 0 5px #333, 0 0 5px #555 inset',
};
