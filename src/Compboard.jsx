/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mq, pink, blue, size2, textPink } from './const';
import Board from './Board';
import Button from './Button';

function Compboard({ boardId, title, checked, handleBoard, onToggle }) {
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

  const compBoards = JSON.parse(localStorage.getItem('comp'));
  const board = compBoards.find((b) => b.id === boardId);
  // activeから削除
  const del = () => {
    delete compBoards[boardId];
    const filteredComp = compBoards.filter(Boolean);
    const fixedIdActive = filteredComp.map((item, index) => {
      console.log();
      return {
        ...item,
        id: index,
      };
    });
    localStorage.setItem('comp', JSON.stringify(fixedIdActive));
    handleBoard();
  };

  return (
    <Board cssName={pink}>
      <div css={boardInner}>
        <div>
          <h3>
            <input
              type='checkbox'
              css={css`
                vertical-align: middle;
              `}
              checked={checked}
              onChange={onToggle}
            />
            {title}
          </h3>
          <ul>
            {board.tasks.map((task) => (
              <li key={task.taskNum} css={textPink}>
                {task.value}
              </li>
            ))}
          </ul>
        </div>
        <div css={btnArea}>
          <Button cssName={[blue, size2]} onClick={del}>
            削除
          </Button>
        </div>
      </div>
    </Board>
  );
}

export default Compboard;
