import { memo } from 'react';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  yellow,
  pink,
  blue,
  green,
  size2,
  textPink,
  textYellow,
  btn,
} from '../../styles/const';
import useActiveBoard from '../../hooks/useActiveBoard';
import Board from '../uiParts/Board';
import Button from '../uiParts/Button';

const Activeboard = memo(({ boardId }) => {
  const boardInner = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    height: 100%;
  `;
  const isChecked = css`
    text-decoration: line-through;
  `;
  const btnArea = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `;

  const { title, taskList, allChecked, onChange, trash, onSubmit } =
    useActiveBoard(boardId);

  return (
    <Board cssName={yellow}>
      <form css={boardInner} onSubmit={onSubmit}>
        <div>
          <input type='hidden' name='title' value={title} />
          <h3 css={textYellow}>{title}</h3>
          {taskList.map((task) => (
            <div key={task.taskNum}>
              <input
                type='checkbox'
                id={task.taskNum}
                name='tasks'
                value={task.value}
                checked={task.checked}
                onChange={(e) => onChange(e, task.taskNum)}
              />
              <span css={task.checked ? [isChecked, textPink] : ''}>
                {task.value}
              </span>
            </div>
          ))}
        </div>
        <div css={btnArea}>
          <Link to={`/active/${boardId} `} css={[btn, green, size2]}>
            編集
          </Link>
          <div>
            {allChecked && (
              <Button isSubmit cssName={[pink, size2]}>
                完了
              </Button>
            )}
            <Button
              cssName={[
                blue,
                size2,
                css`
                  margin-left: 16px;
                `,
              ]}
              onClick={trash}
            >
              削除
            </Button>
          </div>
        </div>
      </form>
    </Board>
  );
});

export default Activeboard;
