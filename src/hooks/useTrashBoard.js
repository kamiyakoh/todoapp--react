import { useCallback } from 'react';
import customToast from '../utils/customToast';

const useTrashBoard = (distArr, trashArr, boardId, setDist, setTrash) => {
  const { toastDel, toastTakeOut } = customToast();
  const board = trashArr.find((b) => b.id === boardId);
  const { title } = board;
  // trashから破棄
  const del = useCallback(() => {
    const filteredTrash = trashArr.filter((item) => item !== board);
    const fixedIdTrash = filteredTrash.map((item, index) => ({
      ...item,
      id: index,
    }));
    setTrash(fixedIdTrash);
  }, [board, trashArr, setTrash]);
  const onClickDel = useCallback(() => {
    if (window.confirm('完全に破棄しますか？')) {
      del();
      toastDel('完全に破棄しました');
    }
  }, [del, toastDel]);
  // trashから戻す
  const takeOut = useCallback(() => {
    const distObj = { ...board, id: distArr.length };
    const newDist = [...distArr, distObj];
    setDist(newDist);
    del();
    toastTakeOut();
  }, [board, distArr, setDist, del, toastTakeOut]);

  return { board, title, onClickDel, takeOut };
};

export default useTrashBoard;
