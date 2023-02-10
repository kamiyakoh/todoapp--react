import React, { useLayoutEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Container from './Container';
import Board from './Board';
import Button from './Button';

function New() {
  const breakpoints = [600, 960];
  const mq = breakpoints.map((bp) => `@media (width < ${bp}px)`);

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

    ${mq[0]} {
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

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: '',
      tasks: '',
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });
  const [isError, setIsError] = useState(false);
  const onSubmit = (data) => {
    const dataTask = data.tasks;
    const taskValues = [];
    dataTask.forEach((item) => {
      if (item.task) {
        taskValues.push(item.task);
      }
    });
    if (taskValues === []) {
      setIsError(true);
    } else {
      setIsError(false);
      console.log(data.title, taskValues);
      reset();
    }
  };
  const [isInline, setIsInline] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const addTaskCount = () => {
    setTaskCount(taskCount + 1);
    if (taskCount > -1) {
      setIsInline(true);
    }
    console.log(taskCount);
  };
  const reduceTaskCount = () => {
    setTaskCount(taskCount - 1);
    if (taskCount < 2) {
      setIsInline(false);
    }
    console.log(taskCount);
  };
  useLayoutEffect(() => {
    append();
  }, []);

  return (
    <section id='l-new' css={secNew}>
      <Container>
        <h2>作成</h2>
        <p>することを1つ以上は必ず入力してください</p>
        <Board cssName={boardNew}>
          <form
            action=''
            method='GET'
            name='new'
            css={form}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    />
                  ))}
                </div>
              </label>
              <Button
                cssName={pink}
                onClick={() => [(append({ task: '' }), addTaskCount())]}
              >
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
                onClick={() => [remove({ task: '' }), reduceTaskCount()]}
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
  );
}
export default New;
