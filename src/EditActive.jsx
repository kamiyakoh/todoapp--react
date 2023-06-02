import { useParams, useNavigate } from 'react-router-dom';
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
} from './styles/const';
import Container from './components/uiParts/Container';
import Board from './components/uiParts/Board';
import Button from './components/uiParts/Button';

function EditActive({ active, setNewActive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const board = active.find((b) => b.id === Number(id)) || false;
  useEffect(() => {
    if (!board) {
      navigate('404');
    }
  }, [board, navigate]);
  const taskList = board.tasks || [{ task: '' }];
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
  const toastError = () => toast.error('することを入力してください');
  const toastEdit = () => toast.success('編集しました');
  const submitEdit = (data) => {
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
      board.title = data.title;
      board.tasks = taskValues;
      setNewActive(active);
      reset();
      isTask = false;
      toastEdit();
      setTimeout(() => navigate('/active', { state: { isEdited: true } }), 1);
    } else {
      setIsError(true);
      toastError();
      setFocus(`tasks.0.task`);
    }
  };
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

  if (board)
    return (
      <div css={[sec, bgLightYellow]}>
        <Container isSingle>
          <h2 css={fs3}>編集中のID： {id}</h2>
          <Board cssName={singleBoard}>
            <form css={form} onSubmit={handleSubmit(submitEdit)}>
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
              {formState.isDirty && (
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
              )}
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
