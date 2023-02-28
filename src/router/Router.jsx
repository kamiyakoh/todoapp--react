import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import New from '../New';

function Router() {
  // 進行中
  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem('active')) || []
  );
  const setNewActive = (newActive) => setActive(newActive);
  // 完了済
  const [comp, setComp] = useState([]);
  useEffect(() => setComp(JSON.parse(localStorage.getItem('comp')) || []), []);

  return (
    <Routes>
      <Route
        path=''
        element={
          <New active={active} setNewActive={setNewActive} comp={comp} />
        }
      />
    </Routes>
  );
}

export default Router;
