import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import compState from '../states/compState';

const useComp = () => {
  const [comp, setComp] = useRecoilState(compState);
  const setNewComp = useCallback(
    (newComp) => {
      localStorage.setItem('comp', JSON.stringify(newComp));
      setComp(newComp);
    },
    [setComp]
  );

  return { comp, setNewComp };
};

export default useComp;
