import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import New from '../New';
import Active from '../Active';

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
      <Route
        path='active'
        element={
          <Active
            active={active}
            comp={comp}
            setNewActive={setNewActive}
            setNewComp={setNewComp}
          />
        }
      />
    </Routes>
  );
}

export default Router;
