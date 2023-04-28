import { memo, useCallback, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { fs3, bgLightYellow, sec, toastBoard } from './const';
import Container from './Container';
import Wrapper from './Wrapper';
import Activeboard from './Activeboard';
import Trash from './Trash';
import Naviboard from './Naviboard';

const Active = memo(({ active, comp, setNewActive, setNewComp }) => {
  const [trashActive, setTrashActive] = useState(
    JSON.parse(localStorage.getItem('trashActive')) || []
  );
  const setNewTrashActive = useCallback(
    (newTrashActive) => {
      localStorage.setItem('trashActive', JSON.stringify(newTrashActive));
      setTrashActive(newTrashActive);
    },
    [trashActive]
  );
  const toastTrash = useCallback(
    () => toast('ゴミ箱へ移動しました', { icon: '🚮' }),
    []
  );
  const toastSubmit = useCallback(() => toast.success('完了おめでとう'), []);
  const toastDel = useCallback((text) => toast(text, { icon: '💥' }), []);
  const toastTakeOut = useCallback(
    () => toast.success('ゴミ箱から戻しました'),
    []
  );

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
        <h2 css={fs3}>進行中： {active.length}件</h2>
        <Wrapper>
          {active.length < 1 && (
            <Naviboard active={active} comp={comp} isActive />
          )}
          {active.map((obj) => (
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
});

export default Active;
