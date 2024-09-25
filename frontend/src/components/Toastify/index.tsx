import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const successAlert = (message: string) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const errorAlert = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  export const warningAlert = (message: string) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });

export const warningAlertWithHtmlContent = (jsxContent: JSX.Element) =>
  toast.warning(jsxContent, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const HtmlContent = ({ htmlContent }: { htmlContent: string }) => (
    <div>
      <br/>
      <h6>Warning:</h6>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
);

export const toastContainer = 
  <ToastContainer
    icon
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;