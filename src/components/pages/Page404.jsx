import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  mq,
  pink,
  yellow,
  fs3,
  fwBold,
  sec,
  singleBoard,
} from '../../styles/const';
import useActive from '../../hooks/useActive';
import useComp from '../../hooks/useComp';
import Container from '../uiParts/Container';
import Board from '../uiParts/Board';
import Button from '../uiParts/Button';

function Page404() {
  const flexbox = css`
    display: flex;
    justify-content: space-around;
    ${mq('sp')} {
      flex-direction: column;
      align-items: center;
      gap: 2em;
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
    <div css={sec}>
      <Container isSingle>
        <h2 css={fs3}>404 ERROR</h2>
        <p
          css={[
            fwBold,
            css`
              font-size: 1.5rem;
            `,
          ]}
        >
          お探しのURLのページは見つかりませんでした
        </p>
        <Board cssName={[singleBoard, yellow, flexbox]}>
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
          <Link to='/active'>
            <Button cssName={[yellow, sizeResp]}>進行中 {active.length}</Button>
          </Link>
          <Link to='/comp'>
            <Button cssName={[pink, sizeResp]}>完了済 {comp.length}</Button>
          </Link>
        </Board>
      </Container>
    </div>
  );
}

export default Page404;
