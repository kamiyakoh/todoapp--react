import { memo } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mq, pink, blue, size2, textPink } from './styles/const';
import Board from './components/uiParts/Board';
import Button from './components/uiParts/Button';

const Compboard = memo(
  ({
    comp,
    boardId,
    title,
    trashComp,
    setNewComp,
    setNewTrash,
    toastTrash,
  }) => {
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

    const compBoards = comp;
    const board = compBoards.find((b) => b.id === boardId);
    // compからゴミ箱へ
    const trash = () => {
      const trashArr = trashComp;
      const newTrashBoard = { ...board, id: trashArr.length };
      const newTrash = [...trashArr, newTrashBoard];
      setNewTrash(newTrash);
      delete compBoards[boardId];
      const filteredComp = compBoards.filter(Boolean);
      const fixedIdComp = filteredComp.map((item, index) => ({
        ...item,
        id: index,
      }));
      setNewComp(fixedIdComp);
      toastTrash();
    };

    return (
      <Board cssName={pink}>
        <div css={boardInner}>
          <div>
            <h3>{title}</h3>
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
  }
);

export default Compboard;
