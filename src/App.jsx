import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import Button from './Button';

const example = css`
  --color: #f00;
  --size: 2;
`;

const test1 = () => {
  alert('propsテスト成功');
};

function App() {
  return (
    <div className="App">
      <Header />
      <main
        css={css`
          padding-top: 80px;
        `}
      >
        <Button cssName={example} onClick={test1}>
          削除
        </Button>
      </main>
    </div>
  );
}

export default App;
