import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { bgLightPink, fs3, sec, toastBoard } from './const';
import Container from './Container';
// import Button from './Button';
import Wrapper from './Wrapper';
import Compboard from './Compboard';

function Comp({ comp, setNewComp }) {
  const compBoards = comp;
  const [compCount, setcompCount] = useState(0);
  useEffect(() => setcompCount(comp.length), [comp]);
  const toastDel = () => toast('削除しました', { icon: '🚮' });

  return (
    <div css={[sec, bgLightPink]}>
      <Container>
        <h2 css={fs3}>完了済： {compCount}件</h2>
        <Wrapper>
          {compBoards.map((obj) => (
            <Compboard
              comp={comp}
              boardId={obj.id}
              title={obj.title}
              key={obj.id}
              setNewComp={setNewComp}
              toastDel={toastDel}
            />
          ))}
        </Wrapper>
        <Toaster
          toastOptions={{
            className: '',
            style: toastBoard,
          }}
        />
      </Container>
    </div>
  );
}

export default Comp;
