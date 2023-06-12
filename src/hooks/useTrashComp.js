import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import trashCompState from '../states/trashCompState';

const useTrashComp = () => {
  const [trashComp, setTrashComp] = useRecoilState(trashCompState);
  const setNewTrashComp = useCallback(
    (newTrashComp) => {
      localStorage.setItem('trashComp', JSON.stringify(newTrashComp));
      setTrashComp(newTrashComp);
    },
    [setTrashComp]
  );

  return { trashComp, setNewTrashComp };
};

export default useTrashComp;
