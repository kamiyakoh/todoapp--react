import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import Button from './Button';
import Board from './Board';

function App() {
  const example = css`
    --color: #f00;
    --size: 2;
  `;

  const boardNew = css`
    max-width: 640px;
    width: 100%;
    margin: 2em auto;
  `;

  const test1 = () => {
    alert('propsテスト成功');
  };

  return (
    <div className='App'>
      <Header />
      <main
        css={css`
          padding-top: 80px;
        `}
      >
        <Button cssName={example} onClick={test1}>
          削除
        </Button>
        <Board cssName={boardNew}> </Board>
      </main>
    </div>
  );
}

export default App;
