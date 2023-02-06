import React from 'react';
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
      button + button {
        margin-top: 24px;
      }
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

  const addTask = () => {
    const taskInputs = document.getElementById('taskInputs');
    const addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.name = 'task';

    taskInputs.appendChild(addInput);
  };
  const reduceTask = () => {
    const taskInputs = document.getElementById('taskInputs');
    const taskLength = document.getElementsByName('task').length;
    if (taskLength > 1) {
      const lastInput = taskInputs.lastElementChild;
      lastInput.remove();
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const newTitle = document.getElementById('newTitle').value;
    const newTasks = document.getElementsByName('task');
    const newTasksValue = [];
    newTasks.forEach((item) => {
      if (item.value) {
        newTasksValue.push(item.value);
      }
    });
    console.log(newTitle);
    console.log(newTasksValue);
  };
  return (
    <section id='l-new' css={secNew}>
      <Container>
        <h2>作成</h2>
        <p>することの入力欄の1番上は必ず入力してください</p>
        <Board cssName={boardNew}>
          <form action='' method='GET' name='new' css={form}>
            <div>
              <label htmlFor='newTitle'>
                <span css={fwBold}>タイトル</span>
                <br />
                <input type='text' id='newTitle' />
                <br />
              </label>
              <label htmlFor='task'>
                <span css={fwBold}>すること</span>
                <br />
                <div id='taskInputs'>
                  <input type='text' name='task' id='taskInput0' required />
                </div>
              </label>
              <Button cssName={pink} onClick={addTask}>
                追加する
              </Button>
              <Button
                cssName={[
                  blue,
                  css`
                    margin-left: 24px;
                  `,
                ]}
                onClick={reduceTask}
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
              onClick={submit}
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
