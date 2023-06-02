/** @jsxImportSource @emotion/react */
import { btn } from '../../styles/const';

function Button({ isSubmit, btnId, cssName, onClick, children }) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      id={btnId}
      css={[btn, cssName]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
