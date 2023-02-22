import { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Board from './Board';
import Button from './Button';

function Activeboard({ boardId, title, handleBoard }) {
  const breakpoints = { sp: 600, tab: 960 };
  function mq(bp) {
    return `@media (width < ${breakpoints[bp]}px)`;
  }

  const yellow = css`
    --color: #ffff6b;
  `;
  const pink = css`
    --color: #ff7fbf;
  `;
  const blue = css`
    --color: #6fd1ff;
  `;
  const size2 = css`
    --size: 2;
  `;
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
  const isChecked = css`
    color: #ff7fbf;
    text-decoration: line-through;
  `;
  const btnArea = css`
    display: flex;
    align-self: flex-end;
    gap: 16px;
    ${mq('sp')} {
      justify-content: flex-end;
    }
  `;

  const activeBoards = JSON.parse(localStorage.getItem('active'));
  const board = activeBoards.find((b) => b.id === boardId);
  // tasksのstateの初期設定
  const [taskList, setTaskList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    setTaskList(board.tasks);
  }, []);
  useEffect(() => {
    const allItemsChecked = taskList.every((item) => item.checked);
    setAllChecked(allItemsChecked);
  }, [taskList]);
  // checkboxを切り替えた時
  const onChange = (e, taskNum) => {
    const { checked } = e.target;
    const updatedTaskList = taskList.map((item) => {
      if (item.taskNum === taskNum) {
        return { ...item, checked };
      }
      return item;
    });
    setTaskList(updatedTaskList);
    activeBoards[boardId].tasks = updatedTaskList;
    localStorage.setItem('active', JSON.stringify(activeBoards));
  };
  // activeから削除
  const del = () => {
    delete activeBoards[boardId];
    const filteredActive = activeBoards.filter(Boolean);
    const fixedIdActive = filteredActive.map((item, index) => {
      console.log();
      return {
        ...item,
        id: index,
      };
    });
    localStorage.setItem('active', JSON.stringify(fixedIdActive));
    handleBoard();
  };
  // submitボタンを押した時
  const onSubmit = (event) => {
    event.preventDefault();
    const compBoards = JSON.parse(localStorage.getItem('comp')) || [];
    const taskValues = [];
    taskList.forEach((item) => {
      taskValues.push({
        taskNum: item.taskNum,
        value: item.value,
        checked: item.checked,
      });
    });
    const compBoard = {
      id: compBoards.length || 0,
      title,
      tasks: taskValues,
    };
    const newComp = [...compBoards, { ...compBoard }];
    localStorage.setItem('comp', JSON.stringify(newComp));
    del();
  };

  return (
    <Board cssName={yellow}>
      <form css={boardInner} onSubmit={onSubmit}>
        <div>
          <input type='hidden' name='title' value={title} />
          <h3
            css={css`
              color: #ffff6b;
            `}
          >
            {title}
          </h3>
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
              <span css={task.checked ? isChecked : ''}>{task.value}</span>
            </div>
          ))}
        </div>
        <div css={btnArea}>
          {allChecked && (
            <Button isSubmit cssName={[pink, size2]}>
              完了
            </Button>
          )}
          <Button cssName={[blue, size2]} onClick={del}>
            削除
          </Button>
        </div>
      </form>
    </Board>
  );
}

export default Activeboard;
