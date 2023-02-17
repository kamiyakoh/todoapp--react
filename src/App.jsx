/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import Todo from './Todo';

function App() {
  return (
    <div className='App'>
      <Header />
      <main
        css={css`
          padding-top: 80px;
        `}
      >
        <Todo />
      </main>
    </div>
  );
}

export default App;
