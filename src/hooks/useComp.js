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
  const delComp = useCallback(
    (id) => {
      const fillteredComp = comp.filter((item) => item !== comp[id]);
      const fixedIdComp = fillteredComp.map((item, index) => ({
        ...item,
        id: index,
      }));
      setNewComp(fixedIdComp);
    },
    [comp, setNewComp]
  );

  return { comp, setNewComp, delComp };
};

export default useComp;
