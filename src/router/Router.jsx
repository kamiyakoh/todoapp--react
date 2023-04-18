import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import New from '../New';
import Active from '../Active';
import EditActive from '../EditActive';
import Comp from '../Comp';
import Page404 from '../Page404';

function Router() {
  // 進行中
  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem('active')) || []
  );
  const setNewActive = (newActive) => {
    localStorage.setItem('active', JSON.stringify(newActive));
    setActive(newActive);
  };
  // 完了済
  const [comp, setComp] = useState(
    JSON.parse(localStorage.getItem('comp')) || []
  );
  const setNewComp = (newComp) => {
    localStorage.setItem('comp', JSON.stringify(newComp));
    setComp(newComp);
  };

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
        element={<Comp comp={comp} setNewComp={setNewComp} />}
      />
      <Route path='*' element={<Page404 active={active} comp={comp} />} />
    </Routes>
  );
}

export default Router;
