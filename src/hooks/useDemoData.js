import { useCallback } from 'react';
import axios from 'axios';
import useActive from './useActive';
import useComp from './useComp';
import phonetic from '../utils/phonetic';

const useDemoData = () => {
  const { setNewActive } = useActive();
  const { setNewComp } = useComp();

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

  const fetch = useCallback(async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const remakeRes = (isComp) => {
        const filteredRes = res.data.filter(
          (item) => item.completed === isComp
        );
        const remakedRes = remakeArr(filteredRes, isComp);
        return remakedRes;
      };
      const remakedActive = remakeRes(false);
      localStorage.setItem('active', JSON.stringify(remakedActive));
      setNewActive(remakedActive);
      const remakedComp = remakeRes(true);
      localStorage.setItem('comp', JSON.stringify(remakedComp));
      setNewComp(remakedComp);
    } catch (error) {
      window.alert('インターネットからのデモデータ取得に失敗しました');
    }
  }, [setNewActive, setNewComp]);
  return { fetch };
};

export default useDemoData;
