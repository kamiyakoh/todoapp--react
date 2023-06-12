import { useCallback } from 'react';
import useComp from './useComp';
import useTrashComp from './useTrashComp';
import customToast from '../utils/customToast';

const useCompBoard = (boardId) => {
  const { comp, delComp } = useComp();
  const { trashComp, setNewTrashComp } = useTrashComp();
  const { toastTrash } = customToast();
  const board = comp.find((b) => b.id === boardId);
  // compからゴミ箱へ
  const trash = useCallback(() => {
    const trashArr = trashComp;
    const newTrashBoard = { ...board, id: trashArr.length };
    const newTrash = [...trashArr, newTrashBoard];
    setNewTrashComp(newTrash);
    delComp(boardId);
    toastTrash();
  }, [trashComp, board, boardId, setNewTrashComp, delComp, toastTrash]);

  return { board, trash };
};

export default useCompBoard;
