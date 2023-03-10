import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import trashbox from './trashbox.png';
import { mq, dBlock, dNone } from './const';
import Container from './Container';

function Trash() {
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
    text-align: center;
    top: 10%;
    left: 10%;
    z-index: 40;
    width: 80%;
    height: 80%;
    overflow-y: auto;
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

  const wait = (seconds) => {
    console.log();
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    wait(0.1)
      .then(() => {
        setIsScale(true);
        return wait(0.25);
      })
      .then(() => setIsShow(true));
  };
  const closeModal = () => {
    setIsShow(false);
    setIsScale(false);
    setTimeout(() => setIsOpen(false), 350);
  };

  return (
    <div css={container}>
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
              <div css={[contents, isShow ? dBlock : dNone]}>
                <h2>Modal Title</h2>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
                <p>Modal content goes here...</p>
              </div>{' '}
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

export default Trash;
