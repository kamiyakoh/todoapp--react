import { BrowserRouter } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import Router from './router/Router';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main
          css={css`
            padding-top: 80px;
          `}
        >
          <Router />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
