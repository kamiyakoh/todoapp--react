import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useActive from './useActive';
import customToast from '../utils/customToast';

const useEditActive = (id) => {
  const navigate = useNavigate();
  const { active, setNewActive } = useActive();
  const { toastError, toastEdit } = customToast();
  const board = active.find((b) => b.id === Number(id)) || false;
  const taskList = useMemo(() => board.tasks || [{ task: '' }], [board]);
  // React Hook Form用宣言
  const defaultTasks = taskList.map((t) => ({ task: t.value }));
  const {
    register,
    handleSubmit,
    control,
    reset,
    setFocus,
    getValues,
    formState,
  } = useForm({
    defaultValues: {
      title: board.title,
      tasks: defaultTasks,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });
  // submitボタンを押した時
  const [isError, setIsError] = useState(false);
  const submitEdit = useCallback(
    (data) => {
      let isTask = false;
      const dataTask = data.tasks;
      const taskValues = dataTask
        .map((item, index) => {
          let taskValue = null;
          if (item.task) {
            let isChecked = false;
            const thisTask = taskList.find((t) => t.taskNum === index) || {};
            if (thisTask.value === item.task) isChecked = thisTask.checked;
            taskValue = {
              taskNum: index,
              value: item.task,
              checked: isChecked,
            };
            isTask = true;
          }
          return taskValue;
        })
        .filter(Boolean);
      if (isTask) {
        setIsError(false);
        const newBoard = {
          id: Number(id),
          title: data.title,
          tasks: taskValues,
        };
        const newActive = active.map((item) => {
          if (item === board) {
            return newBoard;
          }
          return item;
        });
        setNewActive(newActive);
        reset();
        isTask = false;
        toastEdit();
        navigate('/active', { state: { isEdited: true } });
      } else {
        setIsError(true);
        toastError();
        setFocus(`tasks.0.task`);
      }
    },
    [
      active,
      board,
      reset,
      setFocus,
      setNewActive,
      taskList,
      id,
      navigate,
      toastEdit,
      toastError,
    ]
  );

  // することのinput欄を増減
  const [isInline, setIsInline] = useState(false);
  const [taskCount, setTaskCount] = useState(taskList.length);
  useEffect(() => {
    if (taskCount > 1) {
      setIsInline(true);
    } else if (taskCount < 2) {
      setIsInline(false);
    }
  }, [taskCount]);

  const addTask = () => {
    append({ task: '' });
    setTaskCount(taskCount + 1);
  };
  const reduceTask = (number) => {
    remove(number - 1);
    setTaskCount(taskCount - 1);
  };
  // 漢字変換・予測変換（サジェスト）選択中か否かの判定
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  // タイトル入力中にエンターですること入力欄にフォーカス
  const onKeydownTitle = (e, key) => {
    switch (key) {
      // 変換中でない時に エンター で input を増やす
      case 'Enter':
        e.preventDefault();
        if (composing) break;
        setFocus('tasks.0.task');
        break;
      default:
        break;
    }
  };
  // input入力時にキーボード操作でinput欄を増減
  const onKeydown = (e, key, index) => {
    const value = getValues(`tasks.${index}.task`);
    switch (key) {
      // 変換中でない時に エンター で input を増やす
      case 'Enter':
        e.preventDefault();
        if (composing) break;
        addTask();
        break;
      // input が空欄時に バックスペース で input を減らす
      case 'Backspace':
        if (value === '') {
          if (taskCount === 0) {
            setFocus('title');
          } else {
            const prev = index - 1;
            const prevInput = `tasks.${prev}.task`;
            if (index === 0) {
              setFocus('title');
            } else {
              reduceTask(index);
              setFocus(prevInput);
            }
          }
        }
        break;
      default:
        break;
    }
  };

  return {
    board,
    register,
    handleSubmit,
    getValues,
    formState,
    fields,
    submitEdit,
    isError,
    isInline,
    taskCount,
    addTask,
    reduceTask,
    startComposition,
    endComposition,
    onKeydownTitle,
    onKeydown,
  };
};

export default useEditActive;
