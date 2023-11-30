import { toast } from 'react-toastify/dist/react-toastify';

export const displayMsg = (msg, status = 'success') => {
  const style = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (status) {
    case 'success':
      toast.success(msg, style);
      break;
    case 'error':
      toast.error(msg, style);
      break;
  }
}