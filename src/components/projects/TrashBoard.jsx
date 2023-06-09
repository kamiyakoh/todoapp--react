import { memo } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  mq,
  pink,
  blue,
  yellow,
  green,
  size2,
  textPink,
} from '../../styles/const';
import Board from '../uiParts/Board';
import Button from '../uiParts/Button';
import useTrashBoard from '../../hooks/useTrashBoard';

const TrashBoard = memo(
  ({ isActive, distArr, trashArr, boardId, setDist, setTrash }) => {
    const boardInner = css`
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      height: 100%;
      ${mq('sp')} {
        justify-content: initial;
        grid-template-rows: auto auto;
        grid-template-columns: auto;
        gap: 24px;
      }
    `;
    const btnArea = css`
      display: flex;
      align-self: flex-end;
      gap: 16px;
      ${mq('sp')} {
        justify-content: flex-end;
      }
    `;
    const txtDecLT = css`
      text-decoration: line-through;
    `;

    const { board, title, onClickDel, takeOut } = useTrashBoard(
      distArr,
      trashArr,
      boardId,
      setDist,
      setTrash
    );

    return (
      <Board
        cssName={[
          css`
            width: 100%;
          `,
          isActive ? yellow : pink,
        ]}
      >
        <div css={boardInner}>
          <div>
            <h3>{title}</h3>
            <ul>
              {board.tasks.map((task) => (
                <li
                  key={task.taskNum}
                  css={task.checked ? [textPink, isActive ? txtDecLT : ''] : ''}
                >
                  {task.value}
                </li>
              ))}
            </ul>
          </div>
          <div css={btnArea}>
            <Button cssName={[size2, green]} onClick={takeOut}>
              戻す
            </Button>
            <Button cssName={[size2, blue]} onClick={onClickDel}>
              破棄
            </Button>
          </div>
        </div>
      </Board>
    );
  }
);

export default TrashBoard;
