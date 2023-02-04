import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Container from './Container';

const breakpoints = [600, 960];
const mq = breakpoints.map((bp) => `@media (width < ${bp}px)`);

const header = css`
  position: fixed;
  background: #1fb068;
  color: #fff;
  width: 100%;
  height: 80px;
  padding: 16px 0;
  z-index: 10;
`;

const headerFlex = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const headerTtl = css`
  ${mq[0]} {
    font-size: 16px;
    text-align: center;
  }
`;

const headerBr = css`
  display: none;
  ${mq[0]} {
    display: block;
  }
`;

const navUl = css`
  display: flex;
`;

const navLi = css`
  color: var(--color, #fff);
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  border: solid 2px var(--color, #fff);
  margin-left: 8px;
`;

function Header() {
  return (
    <header css={header}>
      <Container>
        <div css={headerFlex}>
          <h1 css={headerTtl}>
            すること
            <br css={headerBr} />
            リスト
          </h1>
          <nav>
            <ul css={navUl}>
              <li css={navLi}>
                <a href='#l-new'>作成</a>
              </li>
              <li css={[navLi, `--color: #ffff6b;`]}>
                <a href='#a-active'>進行中</a>
              </li>
              <li css={[navLi, `--color: #ff7fbf`]}>
                <a href='#a-completed'>完了済</a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
