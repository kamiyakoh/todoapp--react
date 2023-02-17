/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import New from './New';

function App() {
  return (
    <div className='App'>
      <Header />
      <main
        css={css`
          padding-top: 80px;
        `}
      >
        <New />
      </main>
    </div>
  );
}

export default App;
