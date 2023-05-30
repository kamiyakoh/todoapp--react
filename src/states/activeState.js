import { atom } from 'recoil';

const activeState = atom({
  key: 'ACTIVE_STATE',
  default: JSON.parse(localStorage.getItem('active')) || [],
});

export default activeState;
