import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  bgLightYellow,
  pink,
  blue,
  yellow,
  size3,
  textOrange,
  dInline,
  dNone,
  fs3,
  fwBold,
  sec,
  singleBoard,
  form,
  toastBoard,
} from './const';
import Container from './Container';
import Board from './Board';
import Button from './Button';

function EditActive({ active, setNewActive }) {
  const { id } = useParams();
  const activeBoards = active;
  const board = activeBoards.find((b) => b.id === Number(id));
  // tasksのstateの初期設定
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    setTaskList(board.tasks);
  }, []);
  // React Hook Form用宣言
  const [defaultTasks, setDefaultTasks] = useState([]);
  useEffect(() => {
    const arr = [];
    taskList.forEach((t) => arr.push({ task: t.value }));
    setDefaultTasks(arr);
  }, []);
  console.log(defaultTasks);
  const { register, handleSubmit, control, reset, setFocus, getValues } =
    useForm({
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
  const [isTask, setIsTask] = useState(false);
  const toastSuccess = () => toast.success('編集しました');
  const toastError = () => toast.error('することを入力してください');
  const submitNew = (data) => {
    const dataTask = data.tasks;
    const taskValues = [];
    dataTask.forEach((item) => {
      if (item.task) {
        taskValues.push({
          taskNum: taskValues.length || 0,
          value: item.task,
          checked: false,
        });
        setIsTask(true);
      }
    });
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
      setIsTask(false);
      toastSuccess();
    } else {
      setIsError(true);
      toastError();
      setFocus(`tasks.0.task`);
    }
  };
  // することのinput欄を増減
  const [isInline, setIsInline] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const addTask = () => {
    append({ task: '' });
    setTaskCount(taskCount + 1);
    if (taskCount > -1) {
      setIsInline(true);
    }
  };
  const reduceTask = (number) => {
    remove(number);
    setTaskCount(taskCount - 1);
    if (taskCount < 2) {
      setIsInline(false);
    }
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

  return (
    <div css={[sec, bgLightYellow]}>
      <Container isSingle>
        <h2 css={fs3}>進行中ID： {id}</h2>
        <Board cssName={singleBoard}>
          <form css={form} onSubmit={handleSubmit(submitNew)}>
            <div>
              <label htmlFor='newTitle'>
                <span css={fwBold}>タイトル</span>
                <br />
                <input
                  {...register('title')}
                  onCompositionStart={startComposition}
                  onCompositionEnd={endComposition}
                  onKeyDown={(e) => onKeydownTitle(e, e.key)}
                />
                <br />
              </label>
              <label htmlFor='tasks'>
                <span css={fwBold}>すること</span>
                <br />
                <span css={[isError ? dInline : dNone, fwBold, textOrange]}>
                  することを1つ以上は必ず入力してください
                </span>
                <div id='taskInputs'>
                  {fields.map((field, index) => (
                    <input
                      key={field.id}
                      {...register(`tasks.${index}.task`)}
                      defaultValue={field.value}
                      onCompositionStart={startComposition}
                      onCompositionEnd={endComposition}
                      onKeyDown={(e) => onKeydown(e, e.key, index)}
                    />
                  ))}
                </div>
              </label>
              <Button cssName={pink} onClick={addTask}>
                追加する
              </Button>
              <Button
                btnId='btnReduce'
                cssName={[
                  isInline ? dInline : dNone,
                  blue,
                  css`
                    margin-left: 24px;
                  `,
                ]}
                onClick={() => reduceTask(taskCount)}
              >
                枠を減らす
              </Button>
            </div>
            <Button
              isSubmit
              cssName={[
                yellow,
                size3,
                css`
                  align-self: flex-end;
                `,
              ]}
            >
              決定
            </Button>
          </form>
        </Board>
      </Container>
      <Toaster
        toastOptions={{
          className: '',
          style: toastBoard,
        }}
      />
    </div>
  );
}

export default EditActive;
