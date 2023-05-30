import { atom } from 'recoil';

const compState = atom({
  key: 'COMP_STATE',
  default: JSON.parse(localStorage.getItem('comp')) || [],
});

export default compState;
