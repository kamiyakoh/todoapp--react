import { useState, useEffect } from 'react';
import useActive from './useActive';
import useComp from './useComp';
import useTrashActive from './useTrashActive';
import customToast from '../utils/customToast';

const useActiveBoard = (boardId) => {
  const { active, setNewActive, delActive } = useActive();
  const { comp, setNewComp } = useComp();
  const { trashActive, setNewTrashActive } = useTrashActive();
  const { toastTrash, toastSubmit } = customToast();
  const board = active.find((b) => b.id === boardId);
  // tasksのstateの初期設定
  const { title } = board;
  const [taskList, setTaskList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    setTaskList(board.tasks);
  }, [active, board.tasks]);
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
    const tasks = updatedTaskList;
    const updatedActive = active.map((item) => {
      if (item.id === boardId) {
        return { ...item, tasks };
      }
      return item;
    });
    setNewActive(updatedActive);
  };
  // activeからゴミ箱へ
  const trash = () => {
    const trashArr = trashActive;
    const newTrashBoard = { ...board, id: trashArr.length };
    const newTrash = [...trashArr, newTrashBoard];
    setNewTrashActive(newTrash);
    delActive(boardId);
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
    delete active[boardId];
    const filteredActive = active.filter(Boolean);
    const fixedIdActive = filteredActive.map((item, index) => ({
      ...item,
      id: index,
    }));
    setNewActive(fixedIdActive);
    toastSubmit();
  };

  return { title, taskList, allChecked, onChange, trash, onSubmit };
};

export default useActiveBoard;
