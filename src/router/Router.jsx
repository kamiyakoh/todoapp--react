import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
import useActive from '../hooks/useActive';
import useComp from '../hooks/useComp';
import useDemoData from '../hooks/useDemoData';
import New from '../New';
import Active from '../Active';
import EditActive from '../EditActive';
import Comp from '../Comp';
import Page404 from '../Page404';

function Router() {
  const { active, setNewActive } = useActive();
  const { comp, setNewComp } = useComp();
  const { fetch } = useDemoData();

  useEffect(() => {
    if (active.length !== 0 && comp.length !== 0) return;
    if (
      window.confirm(
        '初期データとして、インターネットからデモデータを挿入しますか？'
      )
    )
      fetch();
  }, [active, comp, fetch]);

  return (
    <Routes>
      <Route
        path=''
        element={
          <New active={active} comp={comp} setNewActive={setNewActive} />
        }
      />
      <Route path='active'>
        <Route
          path=''
          element={
            <Active
              active={active}
              comp={comp}
              setNewActive={setNewActive}
              setNewComp={setNewComp}
            />
          }
        />
        <Route
          path=':id'
          element={<EditActive active={active} setNewActive={setNewActive} />}
        />
        <Route path='*' element={<Page404 active={active} comp={comp} />} />
      </Route>
      <Route
        path='comp'
        element={<Comp active={active} comp={comp} setNewComp={setNewComp} />}
      />
      <Route path='*' element={<Page404 active={active} comp={comp} />} />
    </Routes>
  );
}

export default Router;
