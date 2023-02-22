import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Container from './Container';
import Board from './Board';
import Button from './Button';
import Wrapper from './Wrapper';
import Activeboard from './Activeboard';
import Compboard from './Compboard';

function New() {
  const breakpoints = { sp: 600, tab: 960 };
  function mq(bp) {
    return `@media (width < ${breakpoints[bp]}px)`;
  }

  const secNew = css`
    padding: 32px 0 32px;
  `;
  const boardNew = css`
    max-width: 640px;
    width: 100%;
    margin: 2em auto;
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
  const fwBold = css`
    font-weight: bold;
  `;
  const pink = css`
    --color: #ff7fbf;
  `;
  const blue = css`
    --color: #6fd1ff;
  `;
  const yellow = css`
    --color: #ffff6b;
  `;
  const size3 = css`
    --size: 3;
  `;
  const dInline = css`
    display: inline;
  `;
  const dNone = css`
    display: none;
  `;
  const sec = css`
    padding: 32px 0;
  `;

  // React Hook Form用宣言
  const { register, handleSubmit, control, reset, getValues } = useForm({
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
  const activeBoards = JSON.parse(localStorage.getItem('active')) || [];
  const [activeCount, setActiveCount] = useState(0);
  const handleActiveBoard = () => {
    setActiveCount(activeCount + 1);
  };
  // 完了済
  const compBoards = JSON.parse(localStorage.getItem('comp')) || [];
  const [compCount, setCompCount] = useState(0);
  const handleCompBoard = () => {
    setCompCount(compCount + 1);
  };
  const [checkedIds, setCheckedIds] = useState([]);
  useEffect(() => {
    const ids = [];
    compBoards.map((item) => ids.push({ id: item.id, checked: false }));
    setCheckedIds(ids);
  }, [compCount, activeCount]);
  const handleToggle = (id) => {
    const newCheckedIds = [...checkedIds];
    newCheckedIds[id].checked = !newCheckedIds[id].checked;
    setCheckedIds(newCheckedIds);
  };
  const dels = () => {
    const newCheckedIds = checkedIds.filter((item) => item.checked);
    newCheckedIds.forEach((item) => {
      delete compBoards[item.id];
    });
    const filteredComp = compBoards.filter(Boolean);
    const fixedIdActive = filteredComp.map((item, index) => {
      console.log();
      return {
        ...item,
        id: index,
      };
    });
    localStorage.setItem('comp', JSON.stringify(fixedIdActive));
    setCompCount(compCount + 1);
  };
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
        id: activeBoards.length || 0,
        title: data.title,
        tasks: taskValues,
      };
      const newActive = [...activeBoards, { ...newBoard }];
      localStorage.setItem('active', JSON.stringify(newActive));
      reset();
      isTask = false;
    } else {
      setIsError(true);
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
        console.log(value);
        if (taskCount === 0) break;
        if (value === '') {
          reduceTask(index);
        }
        break;
      default:
        break;
    }
  };
  console.log(activeBoards);

  return (
    <>
      <section id='l-new' css={secNew}>
        <Container>
          <h2>作成</h2>
          <p>することを1つ以上は必ず入力してください</p>
          <Board cssName={boardNew}>
            <form css={form} onSubmit={handleSubmit(submitNew)}>
              <div>
                <label htmlFor='newTitle'>
                  <span css={fwBold}>タイトル</span>
                  <br />
                  <input {...register('title')} />
                  <br />
                </label>
                <label htmlFor='tasks'>
                  <span css={fwBold}>すること</span>
                  <br />
                  <span
                    css={[
                      isError ? dInline : dNone,
                      fwBold,
                      css`
                        color: #ff6c00;
                      `,
                    ]}
                  >
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
      </section>
      {activeBoards.length === 0 || (
        <section
          css={[
            sec,
            css`
              background: #fbfbab;
            `,
          ]}
        >
          <div id='a-active' />
          <Container>
            <h2>進行中</h2>
            <Wrapper>
              {activeBoards.map((obj) => (
                <Activeboard
                  boardId={obj.id}
                  title={obj.title}
                  key={obj.id}
                  handleBoard={handleActiveBoard}
                />
              ))}
            </Wrapper>
          </Container>
        </section>
      )}
      {compBoards.length === 0 || (
        <section
          css={[
            sec,
            css`
              background: #ffd9ec;
            `,
          ]}
        >
          <div id='a-comp' />
          <Container>
            <h2>完了済</h2>
            <Wrapper>
              {compBoards.map((obj) => (
                <Compboard
                  boardId={obj.id}
                  title={obj.title}
                  onToggle={() => handleToggle(obj.id)}
                  key={obj.id}
                  handleBoard={handleCompBoard}
                />
              ))}
            </Wrapper>
            <p>
              まとめて削除したい完了済黒板の
              <br />
              左上のチェックボックスを押してから
              <br />
              ↓下の
              <strong
                css={css`
                  color: #6fd1ff;
                `}
              >
                まとめて削除ボタン
              </strong>
              を押してください
            </p>
            <Button cssName={[size3, blue]} onClick={dels}>
              まとめて削除
            </Button>
          </Container>
        </section>
      )}
    </>
  );
}
export default New;
