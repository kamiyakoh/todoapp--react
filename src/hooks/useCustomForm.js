import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import useActive from './useActive';
import customToast from '../utils/customToast';

const useCustomForm = () => {
  const { active, setNewActive } = useActive();
  // React Hook Form用宣言
  const { register, handleSubmit, control, reset, setFocus, getValues } =
    useForm({
      defaultValues: {
        title: '',
        tasks: [{ task: '' }],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });
  // submitボタンを押した時
  const { toastSuccess, toastError } = customToast();
  const [isError, setIsError] = useState(false);

  const submitNew = useCallback(
    (data) => {
      let isTask = false;
      const dataTask = data.tasks;
      const taskValues = dataTask
        .map((item, index) => {
          let taskValue = null;
          if (item.task) {
            taskValue = {
              taskNum: index,
              value: item.task,
              checked: false,
            };
            isTask = true;
          }
          return taskValue;
        })
        .filter(Boolean);
      if (isTask) {
        setIsError(false);
        const newBoard = {
          id: active.length || 0,
          title: data.title,
          tasks: taskValues,
        };
        const newActive = [...active, { ...newBoard }];
        setNewActive(newActive);
        setFocus('title');
        reset();
        isTask = false;
        toastSuccess();
      } else {
        setIsError(true);
        toastError();
        setFocus(`tasks.0.task`);
      }
    },
    [
      active,
      reset,
      setFocus,
      setIsError,
      setNewActive,
      toastSuccess,
      toastError,
    ]
  );

  // することのinput欄を増減
  const [isInline, setIsInline] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  useEffect(() => {
    if (taskCount > 0) {
      setIsInline(true);
    } else if (taskCount < 2) {
      setIsInline(false);
    }
  }, [taskCount, setIsInline]);
  const addTask = () => {
    append({ task: '' });
    setTaskCount(taskCount + 1);
  };
  const reduceTask = (number) => {
    remove(number);
    setTaskCount(taskCount - 1);
  };
  // 漢字変換・予測変換（サジェスト）選択中か否かの判定
  const [composing, setComposition] = useState(false);
  const startComposition = useCallback(
    () => setComposition(true),
    [setComposition]
  );
  const endComposition = useCallback(
    () => setComposition(false),
    [setComposition]
  );
  // タイトル入力中にエンターですること入力欄にフォーカス
  const onKeydownTitle = useCallback(
    (e, key) => {
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
    },
    [composing, setFocus]
  );
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
            reduceTask(index);
            const prev = index - 1;
            const prevInput = `tasks.${prev}.task`;
            if (index === 0) {
              setFocus('title');
            } else {
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
    register,
    handleSubmit,
    fields,
    isError,
    submitNew,
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

export default useCustomForm;
