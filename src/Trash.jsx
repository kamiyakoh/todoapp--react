import { memo, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import trashbox from './trashbox.png';
import { mq, pink, blue, dBlock, dNone } from './const';
import Container from './Container';
import Wrapper from './Wrapper';
import Button from './Button';
import TrashBoard from './TrashBoard';

const Trash = memo(
  ({
    isActive,
    distArr,
    setDist,
    trashArr,
    setTrash,
    toastDel,
    toastTakeOut,
  }) => {
    const bgColor = '#eee';
    const container = css`
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 20;
      width: 100vw;
      height: 100vh;
    `;
    const wrapper = css`
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      height: 90vh;
      max-width: 1280px;
      margin: 5vh auto 0;
    `;
    const btnTrash = css`
      pointer-events: auto;
      background: ${bgColor};
      border-radius: 5%;
      width: 64px;
      height: 64px;
    `;
    const btnImg = css`
    display; inline-block;
    width: 48px;
    height: 48px;
    margin: auto;
  `;
    const overlay = css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 30;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.6);
    `;
    const inner = css`
      position: relative;
      height: 100%;
      max-width: 1280px;
      margin: 0 auto;
    `;
    const base = css`
      position: absolute;
      right: 0;
      bottom: 5%;
      background: ${bgColor};
      width: 1%;
      height: 1%;
      border-radius: 1%;
      transform-origin: bottom right;
      transition: all 0.3s ease-in-out;
      ${mq('ex')} {
        margin-right: 5%;
      }
    `;
    const scale = css`
      transform: scale(100, 90);
      ${mq('ex')} {
        transform: scale(90, 90);
      }
    `;
    const contents = css`
      position: absolute;
      top: 15%;
      left: 6.5%;
      z-index: 40;
      width: 87%;
      height: 70%;
      overflow-y: auto;
    `;
    const sizeResp = css`
      --size: 2;
      ${mq('sp')} {
        --size: 1.5;
      }
    `;
    const btnAllDel = css`
      position: absolute;
      top: 6.5%;
      margin-left: 6.5%;
    `;
    const btnDels = css`
      position: absolute;
      bottom: 6.5%;
      margin-left: 6.5%;
    `;
    const label = css`
      display: flex;
      width: calc(50% - 1em);
      padding: 16px 16px 16px 0;
      ${mq('tab')} {
        width: 100%;
      }
    `;
    const bgColorChecked = css`
      background: skyblue;
    `;
    const checkbox = css`
      vertical-align: middle;
      margin: 0 8px !important;
    `;
    const btnClose = css`
      position: absolute;
      background: transparent;
      right: 0;
      bottom: 5%;
      ${mq('ex')} {
        right: 5%;
      }
    `;
    const iconClose = css`
      display: block;
      position: relative;
      width: 64px;
      height: 64px;
      border-radius: 5%;
      :before,
      :after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        background: #000;
        width: 8px;
        height: 48px;
        border-radius: 28px;
      }
      :before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      :after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    `;

    const wait = (seconds) =>
      new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    const [isOpen, setIsOpen] = useState(false);
    const [isScale, setIsScale] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const openModal = async () => {
      document.body.style.overflow = 'hidden';
      setIsOpen(true);
      await wait(0.1);
      setIsScale(true);
      await wait(0.25);
      setIsShow(true);
    };
    const closeModal = async () => {
      document.body.style.overflow = 'auto';
      setIsShow(false);
      setIsScale(false);
      await wait(0.35);
      setIsOpen(false);
    };
    const trashBoards = trashArr;
    const [trashCount, setTrashCount] = useState(0);
    // trashから全破棄
    const allDel = () => {
      if (window.confirm('ゴミ箱内を全て破棄しますか？')) {
        trashBoards.splice(0);
        setTrash(trashBoards);
        setTrashCount(0);
        toastDel('ゴミ箱内を全て破棄しました');
      }
    };
    // trashからまとめて破棄
    const checkedIdsInit = [];
    trashBoards.map((item) =>
      checkedIdsInit.push({ id: item.id, checked: false })
    );
    const [checkedIds, setCheckedIds] = useState(checkedIdsInit);
    useEffect(() => {
      const ids = [];
      trashBoards.map((item) => ids.push({ id: item.id, checked: false }));
      setCheckedIds(ids);
    }, [trashBoards]);
    const handleToggle = (id) => {
      const newCheckedIds = [...checkedIds];
      newCheckedIds[id].checked = !newCheckedIds[id].checked;
      setCheckedIds(newCheckedIds);
      if (newCheckedIds[id].checked) {
        setTrashCount(trashCount + 1);
      } else {
        setTrashCount(trashCount - 1);
      }
    };
    const dels = (count) => {
      if (trashCount > 0) {
        if (window.confirm(`ゴミ箱から${count}件を完全に破棄しますか？`)) {
          const newCheckedIds = checkedIds.filter((item) => item.checked);
          const trashIdsToDelete = newCheckedIds.map((item) => item.id);
          const filteredTrash = trashBoards.filter(
            (item) => !trashIdsToDelete.includes(item.id)
          );
          const fixedIdTrash = filteredTrash.map((item, index) => ({
            ...item,
            id: index,
          }));

          localStorage.setItem('trashComp', JSON.stringify(fixedIdTrash));
          setTrash(fixedIdTrash);
          toastDel(`ゴミ箱から${count}件を完全破棄しました`);
        }
      } else {
        window.alert('まとめて破棄する黒板を選択してボタンを押してください');
      }
    };

    return (
      <div
        css={[
          container,
          isOpen
            ? css`
                pointer-events: auto;
              `
            : css`
                pointer-events: none;
              `,
        ]}
      >
        <Container cssName={wrapper}>
          {isOpen || (
            <button type='button' css={btnTrash} onClick={openModal}>
              <img src={trashbox} alt='trashbox' css={btnImg} />
            </button>
          )}
          {isOpen && (
            <div css={overlay}>
              <div css={inner}>
                <div css={[base, isScale ? scale : '']} />
                {isShow && (
                  <Button
                    cssName={[pink, sizeResp, btnAllDel]}
                    onClick={allDel}
                  >
                    ゴミ箱を空にする
                  </Button>
                )}
                <div css={[contents, isShow ? dBlock : dNone]}>
                  <Wrapper
                    cssName={css`
                      padding: 0;
                    `}
                  >
                    {trashBoards.map((obj) => (
                      <label
                        htmlFor={obj.id}
                        key={obj.id}
                        css={[
                          label,
                          checkedIds[obj.id].checked ? bgColorChecked : '',
                        ]}
                      >
                        <input
                          type='checkbox'
                          id={obj.id}
                          css={checkbox}
                          checked={checkedIds[obj.id].checked}
                          onChange={() => handleToggle(obj.id)}
                        />
                        <TrashBoard
                          isActive={isActive}
                          distArr={distArr}
                          trashArr={trashArr}
                          boardId={obj.id}
                          title={obj.title}
                          setDist={setDist}
                          setTrash={setTrash}
                          toastDel={toastDel}
                          toastTakeOut={toastTakeOut}
                        />
                      </label>
                    ))}
                  </Wrapper>
                </div>
                {isShow && (
                  <Button
                    cssName={[blue, sizeResp, btnDels]}
                    onClick={() => dels(trashCount)}
                  >
                    まとめて破棄
                  </Button>
                )}
                {isShow && (
                  <button
                    type='button'
                    css={[btnTrash, btnClose]}
                    onClick={closeModal}
                  >
                    <span css={iconClose} />
                  </button>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    );
  }
);

export default Trash;
