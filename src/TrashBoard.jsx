/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mq, pink, blue, yellow, green, size2, textPink } from './const';
import Board from './Board';
import Button from './Button';

function TrashBoard({
  isActive,
  distArr,
  trashArr,
  boardId,
  title,
  setDist,
  setTrash,
  toastDel,
  toastTakeOut,
}) {
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

  const trashBoards = trashArr;
  const board = trashBoards.find((b) => b.id === boardId);
  // trashから破棄
  const del = () => {
    delete trashBoards[boardId];
    const filteredTrash = trashBoards.filter(Boolean);
    const fixedIdTrash = filteredTrash.map((item, index) => {
      console.log();
      return {
        ...item,
        id: index,
      };
    });
    setTrash(fixedIdTrash);
  };
  const onClickDel = () => {
    if (window.confirm('完全に破棄しますか？')) {
      del();
      toastDel('完全に破棄しました');
    }
  };
  // trashから戻す
  const takeOut = () => {
    const distObj = { ...trashBoards[boardId], id: distArr.length };
    const newDist = [...distArr, distObj];
    setDist(newDist);
    del();
    toastTakeOut();
  };

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

export default TrashBoard;
