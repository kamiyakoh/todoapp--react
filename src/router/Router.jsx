import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import New from '../New';
import Active from '../Active';
import EditActive from '../EditActive';
import Comp from '../Comp';
import Page404 from '../Page404';

function Router() {
  const lSActive = localStorage.getItem('active');
  const lSComp = localStorage.getItem('comp');

  // 進行中
  const [active, setActive] = useState(JSON.parse(lSActive) || []);
  const setNewActive = useCallback(
    (newActive) => {
      localStorage.setItem('active', JSON.stringify(newActive));
      setActive(newActive);
    },
    [active]
  );
  // 完了済
  const [comp, setComp] = useState(JSON.parse(lSComp) || []);
  const setNewComp = useCallback(
    (newComp) => {
      localStorage.setItem('comp', JSON.stringify(newComp));
      setComp(newComp);
    },
    [comp]
  );
  useEffect(() => {
    if (active.length === 0 && comp.length === 0) {
      if (
        window.confirm(
          '初期データとして、インターネットからデモデータを挿入しますか？'
        )
      ) {
        const phonetic = (num) => {
          const mod = num % 26;
          switch (mod) {
            case 1:
              return 'Apples';
            case 2:
              return 'Butter';
            case 3:
              return 'Charlie';
            case 4:
              return 'Duff';
            case 5:
              return 'Edward';
            case 6:
              return 'Freddy';
            case 7:
              return 'George';
            case 8:
              return 'Harry';
            case 9:
              return 'Ink';
            case 10:
              return 'Johnnie';
            case 11:
              return 'King';
            case 12:
              return 'London';
            case 13:
              return 'Monkey';
            case 14:
              return 'Nuts';
            case 15:
              return 'Orenge';
            case 16:
              return 'Pudding';
            case 17:
              return 'Queeenie';
            case 18:
              return 'Robert';
            case 19:
              return 'Sugger';
            case 20:
              return 'Tommy';
            case 21:
              return 'Uncle';
            case 22:
              return 'Vinegar';
            case 23:
              return 'Willie';
            case 24:
              return 'Xerxes';
            case 25:
              return 'Yellow';
            case 0:
              return 'Zebra';
            default:
              return '';
          }
        };
        const remakeArr = (arr, isComp) => {
          const sortArr = arr.reduce((acc, item) => {
            const { userId, title } = item;
            const exItem = acc.find((x) => x.userId === userId);
            if (exItem) {
              exItem.title.push(title);
            } else {
              acc.push({ userId, title: [title] });
            }
            return acc;
          }, []);
          const result = sortArr.map((item, index) => {
            const tasks = item.title.map((elm, num) => ({
              taskNum: num,
              value: elm,
              checked: isComp,
            }));
            return { id: index, title: phonetic(item.userId), tasks };
          });
          return result;
        };
        const get = async () => {
          try {
            const res = await axios.get(
              'https://jsonplaceholder.typicode.com/todos'
            );
            const remakeRes = (isComp) => {
              const filteredRes = res.data.filter(
                (item) => item.completed === isComp
              );
              console.log(filteredRes);
              const remakedRes = remakeArr(filteredRes, isComp);
              return remakedRes;
            };
            const remakedActive = remakeRes(false);
            localStorage.setItem('active', JSON.stringify(remakedActive));
            setActive(remakedActive);
            const remakedComp = remakeRes(true);
            localStorage.setItem('comp', JSON.stringify(remakedComp));
            setComp(remakedComp);
          } catch (error) {
            window.alert(error);
          }
        };
        get();
      }
    }
  }, []);

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
