import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Router from './router/Router';
import Header from './components/projects/Header';
import { toastBoard } from './styles/const';

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <main
            css={css`
              padding-top: 80px;
            `}
          >
            <Router />
          </main>
          <Toaster
            toastOptions={{
              className: '',
              style: toastBoard,
            }}
          />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
