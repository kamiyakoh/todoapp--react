import { memo } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mq, pink, blue, size2, textPink } from '../../styles/const';
import Board from '../uiParts/Board';
import Button from '../uiParts/Button';
import useCompBoard from '../../hooks/useCompBoard';

const Compboard = memo(({ boardId }) => {
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

  const { board, trash } = useCompBoard(boardId);

  return (
    <Board cssName={pink}>
      <div css={boardInner}>
        <div>
          <h3>{board.title}</h3>
          <ul>
            {board.tasks.map((task) => (
              <li key={task.taskNum} css={textPink}>
                {task.value}
              </li>
            ))}
          </ul>
        </div>
        <div css={btnArea}>
          <Button cssName={[blue, size2]} onClick={trash}>
            削除
          </Button>
        </div>
      </div>
    </Board>
  );
});

export default Compboard;
