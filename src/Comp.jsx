import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { bgLightPink, fs3, sec, toastBoard } from './const';
import Container from './Container';
// import Button from './Button';
import Wrapper from './Wrapper';
import Compboard from './Compboard';
import Trash from './Trash';

function Comp({ comp, setNewComp }) {
  const compBoards = comp;
  const [compCount, setcompCount] = useState(0);
  useEffect(() => setcompCount(comp.length), [comp]);
  const [trashComp, setTrashComp] = useState(
    JSON.parse(localStorage.getItem('trashComp')) || []
  );
  const setNewTrashComp = (newTrashComp) => {
    localStorage.setItem('trashComp', JSON.stringify(newTrashComp));
    setTrashComp(newTrashComp);
  };
  const toastTrash = () => toast('ゴミ箱へ移動しました', { icon: '🚮' });
  const toastDel = (text) => toast(text, { icon: '💥' });
  const toastTakeOut = () => toast.success('ゴミ箱から戻しました');

  return (
    <div css={[sec, bgLightPink]}>
      <Trash
        isComp
        distArr={comp}
        setDist={setNewComp}
        trashArr={trashComp}
        setTrash={setNewTrashComp}
        toastDel={toastDel}
        toastTakeOut={toastTakeOut}
      />
      <Container>
        <h2 css={fs3}>完了済： {compCount}件</h2>
        <Wrapper>
          {compBoards.map((obj) => (
            <Compboard
              comp={comp}
              boardId={obj.id}
              title={obj.title}
              trashComp={trashComp}
              key={obj.id}
              setNewComp={setNewComp}
              setNewTrash={setNewTrashComp}
              toastTrash={toastTrash}
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
