import { Route, Routes } from 'react-router-dom';
import New from '../New';

function Router() {
  return (
    <Routes>
      <Route path='' element={<New />} />
    </Routes>
  );
}

export default Router;
