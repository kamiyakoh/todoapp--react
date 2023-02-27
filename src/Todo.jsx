import { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { blue, size3 } from './const';
import Container from './Container';
import Button from './Button';
import Wrapper from './Wrapper';
import Activeboard from './Activeboard';
import Compboard from './Compboard';

function Todo() {
  const alink = css`
    padding-top: 96px;
    margin-top: -96px;
  `;

  const sec = css`
    padding: 32px 0;
  `;

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
  console.log(activeBoards);

  return (
    <>
      {activeBoards.length === 0 || (
        <section
          css={[
            sec,
            css`
              background: #fbfbab;
            `,
          ]}
        >
          <div id='a-active' css={alink} />
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
          <div id='a-comp' css={alink} />
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

export default Todo;
