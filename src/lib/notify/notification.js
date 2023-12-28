import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (_message, _duration) => {
  toast.success(_message, {
    position: "top-right",
    autoClose: _duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const notifywarning = (_message, _duration) => {
  toast.warn(_message, {
    position: "top-right",
    autoClose: _duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const notifyinfo = (_message, _duration) => {
  toast.info(_message, {
    position: "top-right",
    autoClose: _duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const notifydefault = (_message, _duration) => {
  toast(_message, {
    position: "top-right",
    autoClose: _duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const notifyerror = (_message, _duration) => {
  toast.error(_message, {
    position: "top-right",
    autoClose: _duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { notifySuccess, notifydefault, notifyerror, notifyinfo, notifywarning };
