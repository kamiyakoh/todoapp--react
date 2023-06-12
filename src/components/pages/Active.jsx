// import { useCallback } from 'react';
// import toast from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import { fs3, bgLightYellow, sec } from '../../styles/const';
import useActive from '../../hooks/useActive';
import useTrashActive from '../../hooks/useTrashActive';
import Container from '../uiParts/Container';
import Wrapper from '../uiParts/Wrapper';
import Activeboard from './Activeboard';
import Trash from '../projects/Trash';
import Naviboard from '../projects/Naviboard';

function Active() {
  const { active, setNewActive } = useActive();
  const { trashActive, setNewTrashActive } = useTrashActive();

  return (
    <div css={[sec, bgLightYellow]}>
      <Trash
        isActive
        distArr={active}
        setDist={setNewActive}
        trashArr={trashActive}
        setTrash={setNewTrashActive}
      />
      <Container>
        <h2 css={fs3}>進行中： {active.length}件</h2>
        <Wrapper>
          {active.length < 1 && <Naviboard isActive />}
          {active.map((obj) => (
            <Activeboard key={obj.id} boardId={obj.id} />
          ))}
        </Wrapper>
      </Container>
    </div>
  );
}

export default Active;
