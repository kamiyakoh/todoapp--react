/** @jsxImportSource @emotion/react */
import { bgLightPink, fs3, sec } from '../../styles/const';
import useComp from '../../hooks/useComp';
import useTrashComp from '../../hooks/useTrashComp';
import customToast from '../../utils/customToast';
import Container from '../uiParts/Container';
import Wrapper from '../uiParts/Wrapper';
import Compboard from './Compboard';
import Trash from '../projects/Trash';
import Naviboard from '../projects/Naviboard';

function Comp() {
  const { comp, setNewComp } = useComp();
  const { trashComp, setNewTrashComp } = useTrashComp();
  const { toastTrash, toastDel, toastTakeOut } = customToast();

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
          {comp.length < 1 && <Naviboard isComp />}
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
      </Container>
    </div>
  );
}

export default Comp;
