import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const btn = css`
  cursor: pointer;
  color: var(--color, #fff);
  background-color: transparent;
  border-radius: calc(var(--size, 1) * 2px + 2px);
  border: solid 2px var(--color, #fff);
  font-size: calc(var(--size, 1) * 1rem);
  line-height: 1;
  padding: calc(var(--size, 1) * 2px + 2px);
  border-width: calc(var(--size, 1) * 2px);
`;

function Button({ cssName, onClick, children }) {
  return (
    <button type="button" css={[btn, cssName]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
