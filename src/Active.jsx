import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { fs3, bgLightYellow, sec, toastBoard } from './const';
import Container from './Container';
import Wrapper from './Wrapper';
import Activeboard from './Activeboard';
import Trash from './Trash';
import Naviboard from './Naviboard';

function Active({ active, comp, setNewActive, setNewComp }) {
  const activeBoards = active;
  const [activeCount, setActiveCount] = useState(0);
  useEffect(() => setActiveCount(active.length), [active]);
  const [trashActive, setTrashActive] = useState(
    JSON.parse(localStorage.getItem('trashActive')) || []
  );
  const setNewTrashActive = (newTrashActive) => {
    localStorage.setItem('trashActive', JSON.stringify(newTrashActive));
    setTrashActive(newTrashActive);
  };
  const toastTrash = () => toast('ゴミ箱へ移動しました', { icon: '🚮' });
  const toastSubmit = () => toast.success('完了おめでとう');
  const toastDel = (text) => toast(text, { icon: '💥' });
  const toastTakeOut = () => toast.success('ゴミ箱から戻しました');

  return (
    <div css={[sec, bgLightYellow]}>
      <Trash
        isActive
        distArr={active}
        setDist={setNewActive}
        trashArr={trashActive}
        setTrash={setNewTrashActive}
        toastDel={toastDel}
        toastTakeOut={toastTakeOut}
      />
      <Container>
        <h2 css={fs3}>進行中： {activeCount}件</h2>
        <Wrapper>
          {activeBoards.length < 1 && (
            <Naviboard active={active} comp={comp} isActive />
          )}
          {activeBoards.map((obj) => (
            <Activeboard
              active={active}
              comp={comp}
              boardId={obj.id}
              title={obj.title}
              trashActive={trashActive}
              key={obj.id}
              setNewActive={setNewActive}
              setNewComp={setNewComp}
              setTrash={setNewTrashActive}
              toastTrash={toastTrash}
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
