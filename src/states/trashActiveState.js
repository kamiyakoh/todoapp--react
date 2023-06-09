import { atom } from 'recoil';

const trashActiveState = atom({
  key: 'TRASH_ACTIVE_STATE',
  default: JSON.parse(localStorage.getItem('trashActive')) || [],
});

export default trashActiveState;
