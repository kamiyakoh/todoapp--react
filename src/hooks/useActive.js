import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import activeState from '../states/activeState';

const useActive = () => {
  const [active, setActive] = useRecoilState(activeState);
  const setNewActive = useCallback(
    (newActive) => {
      localStorage.setItem('active', JSON.stringify(newActive));
      setActive(newActive);
    },
    [setActive]
  );

  return { active, setNewActive };
};

export default useActive;
