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
export const fwBold = css`
  font-weight: bold;
`;
