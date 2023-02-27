import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  mq,
  pink,
  blue,
  yellow,
  size3,
  textOrange,
  dInline,
  dNone,
  fs3,
  fwBold,
  singleBoard,
  toastBoard,
} from './const';
import Container from './Container';
import Board from './Board';
import Button from './Button';

function New() {
  const secNew = css`
    padding: 32px 0 32px;
  `;
  const counter = css`
    display: flex;
    justify-content: space-evenly;
    ${mq('sp')} {
      justify-content: space-around;
    }
  `;
  const sizeResp = css`
    --size: 3;
    ${mq('tab')} {
      --size: 2;
    }
    ${mq('sp')} {
      --size: 1.5;
    }
  `;
  const form = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    ${mq('sp')} {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 24px;
    }

    div {
      * + * {
        margin-top: 8px;
      }
      label + button {
        margin-top: 24px;
      }
    }

    input {
      display: block;
      width: 100%;
    }
  `;

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
  // 進行中
  const [actives, setActives] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  useEffect(
    () => setActives(JSON.parse(localStorage.getItem('active')) || []),
    []
  );
  useEffect(() => setActiveCount(actives.length), [actives]);
  // 完了済
  const comps = JSON.parse(localStorage.getItem('comp')) || [];
  // submitボタンを押した時
  const [isError, setIsError] = useState(false);
  let isTask = false;
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
        isTask = true;
      }
    });
    if (isTask) {
      setIsError(false);
      const newBoard = {
        id: actives.length || 0,
        title: data.title,
        tasks: taskValues,
      };
      const newActive = [...actives, { ...newBoard }];
      localStorage.setItem('active', JSON.stringify(newActive));
      setActives(newActive);
      setFocus('title');
      reset();
      isTask = false;
      toast.success('作成しました');
    } else {
      setIsError(true);
      toast.error('することを入力してください');
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
    <div css={secNew}>
      <Container isSingle>
        <h2 css={fs3}>作成</h2>
        <p>することを1つ以上は必ず入力してください</p>
        <Board cssName={[singleBoard, yellow, counter]}>
          <Button cssName={[yellow, sizeResp]}>進行中 {activeCount}</Button>
          <Button cssName={[pink, sizeResp]}>完了済 {comps.length}</Button>
        </Board>
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
              作成
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

export default New;
