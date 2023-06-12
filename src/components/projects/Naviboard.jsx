import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mq, pink, yellow } from '../../styles/const';
import useActive from '../../hooks/useActive';
import useComp from '../../hooks/useComp';
import Board from '../uiParts/Board';
import Button from '../uiParts/Button';

function Naviboard({ isActive, isComp }) {
  const flexbox = css`
    display: flex;
    justify-content: space-evenly;
    ${mq('sp')} {
      justify-content: space-around;
    }
  `;
  const sizeResp = css`
    --size: 3;
    ${mq('tab')} {
      --size: 2;
    }
    ${mq('sp')} {
      --size: 1.5;
    }
  `;

  const { active } = useActive();
  const { comp } = useComp();

  return (
    <Board cssName={[flexbox, isActive ? pink : yellow]}>
      <Link to='/'>
        <Button
          cssName={[
            sizeResp,
            css`
              --color: #fff;
            `,
          ]}
        >
          作成
        </Button>
      </Link>
      {isActive || active.length < 0 || (
        <Link to='/active'>
          <Button cssName={[yellow, sizeResp]}>進行中 {active.length}</Button>
        </Link>
      )}
      {isComp || (
        <Link to='/comp'>
          <Button cssName={[pink, sizeResp]}>完了済 {comp.length}</Button>
        </Link>
      )}
    </Board>
  );
}

export default Naviboard;
