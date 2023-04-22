import { useState, useEffect } from 'react';
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
} from './const';
import Board from './Board';
import Button from './Button';

function Activeboard({
  active,
  comp,
  boardId,
  title,
  trashActive,
  setNewActive,
  setNewComp,
  setTrash,
  toastTrash,
  toastSubmit,
}) {
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

  const activeBoards = active;
  const board = activeBoards.find((b) => b.id === boardId);
  // tasksのstateの初期設定
  const [taskList, setTaskList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    setTaskList(board.tasks);
  }, [activeBoards]);
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
  // activeからゴミ箱へ
  const trash = () => {
    const trashArr = trashActive;
    const newTrashBoard = { ...board, id: trashArr.length };
    const newTrash = [...trashArr, newTrashBoard];
    setTrash(newTrash);
    delete activeBoards[boardId];
    const filteredActive = activeBoards.filter(Boolean);
    const fixedIdActive = filteredActive.map((item, index) => ({
      ...item,
      id: index,
    }));
    setNewActive(fixedIdActive);
    toastTrash();
  };
  // submitボタンを押した時
  const onSubmit = (event) => {
    event.preventDefault();
    const compBoards = comp;
    const taskValues = taskList.map((item) => ({
      taskNum: item.taskNum,
      value: item.value,
      checked: item.checked,
    }));
    const compBoard = {
      id: compBoards.length || 0,
      title,
      tasks: taskValues,
    };
    const newComp = [...compBoards, { ...compBoard }];
    setNewComp(newComp);
    delete activeBoards[boardId];
    const filteredActive = activeBoards.filter(Boolean);
    const fixedIdActive = filteredActive.map((item, index) => ({
      ...item,
      id: index,
    }));
    setNewActive(fixedIdActive);
    toastSubmit();
  };

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
}

export default Activeboard;
