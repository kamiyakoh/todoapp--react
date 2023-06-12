import { atom } from 'recoil';

const trashCompState = atom({
  key: 'TRASH_COMP_STATE',
  default: JSON.parse(localStorage.getItem('trashComp')) || [],
});

export default trashCompState;
