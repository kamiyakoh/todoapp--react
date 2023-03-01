import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { fs3, bgLightYellow, sec, toastBoard } from './const';
import Container from './Container';
import Wrapper from './Wrapper';
import Activeboard from './Activeboard';
// import Button from './Button';

function Active({ active, comp, setNewActive, setNewComp }) {
  const activeBoards = active;
  const [activeCount, setActiveCount] = useState(0);
  useEffect(() => setActiveCount(active.length), [active]);
  const toastDel = () => toast('削除しました', { icon: '🚮' });
  const toastSubmit = () => toast.success('完了おめでとう');

  return (
    <div css={[sec, bgLightYellow]}>
      <Container>
        <h2 css={fs3}>進行中： {activeCount}</h2>
        <Wrapper>
          {activeBoards.map((obj) => (
            <Activeboard
              active={active}
              comp={comp}
              boardId={obj.id}
              title={obj.title}
              key={obj.id}
              setNewActive={setNewActive}
              setNewComp={setNewComp}
              toastDel={toastDel}
              toastSubmit={toastSubmit}
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

export default Active;
