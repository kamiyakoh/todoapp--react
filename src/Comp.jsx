import { memo, useCallback, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
import { bgLightPink, fs3, sec, toastBoard } from './styles/const';
import Container from './components/uiParts/Container';
import Wrapper from './components/uiParts/Wrapper';
import Compboard from './Compboard';
import Trash from './components/projects/Trash';
import Naviboard from './components/uiParts/Naviboard';

const Comp = memo(({ active, comp, setNewComp }) => {
  // const comp = comp;
  const [trashComp, setTrashComp] = useState(
    JSON.parse(localStorage.getItem('trashComp')) || []
  );
  const setNewTrashComp = useCallback((newTrashComp) => {
    localStorage.setItem('trashComp', JSON.stringify(newTrashComp));
    setTrashComp(newTrashComp);
  }, []);
  const toastTrash = useCallback(
    () => toast('ゴミ箱へ移動しました', { icon: '🚮' }),
    []
  );
  const toastDel = useCallback((text) => toast(text, { icon: '💥' }), []);
  const toastTakeOut = useCallback(
    () => toast.success('ゴミ箱から戻しました'),
    []
  );

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
        <h2 css={fs3}>完了済： {comp.length}件</h2>
        <Wrapper>
          {comp.length < 1 && <Naviboard active={active} comp={comp} isComp />}
          {comp.map((obj) => (
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
});

export default Comp;
