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
  const delActive = useCallback(
    (id) => {
      const filteredActive = active.filter((item) => item !== active[id]);
      const fixedIdActive = filteredActive.map((item, index) => ({
        ...item,
        id: index,
      }));
      setNewActive(fixedIdActive);
    },
    [active, setNewActive]
  );

  return { active, setNewActive, delActive };
};

export default useActive;
