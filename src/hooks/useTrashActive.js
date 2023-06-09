import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import trashActiveState from '../states/trashActiveState';

const useTrashActive = () => {
  const [trashActive, setTrashActive] = useRecoilState(trashActiveState);
  const setNewTrashActive = useCallback(
    (newTrashActive) => {
      localStorage.setItem('trashActive', JSON.stringify(newTrashActive));
      setTrashActive(newTrashActive);
    },
    [setTrashActive]
  );

  return { trashActive, setNewTrashActive };
};

export default useTrashActive;
