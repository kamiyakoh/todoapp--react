import { useCallback } from 'react';
import toast from 'react-hot-toast';

const customToast = () => {
  const toastSuccess = useCallback(() => toast.success('作成しました'), []);
  const toastError = useCallback(
    () => toast.error('することを入力してください'),
    []
  );
  const toastTrash = useCallback(
    () => toast('ゴミ箱へ移動しました', { icon: '🚮' }),
    []
  );
  const toastSubmit = useCallback(() => toast.success('完了おめでとう'), []);
  const toastDel = useCallback((text) => toast(text, { icon: '💥' }), []);
  const toastTakeOut = useCallback(
    () => toast.success('ゴミ箱から戻しました'),
    []
  );

  return {
    toastSuccess,
    toastError,
    toastTrash,
    toastSubmit,
    toastDel,
    toastTakeOut,
  };
};

export default customToast;
