import { Toast, ToastBody } from "reactstrap";

interface Props {
  isOpen: boolean;
  color: string;
  message: string;
}

// Usado para dar mensagens de erro e sucesso no register e login

const ToastComponent = ({ isOpen, color, message }: Props) => {
  return (
    <>
      <Toast
        className={`${color} text-white fixed-top ms-auto mt-3`}
        isOpen={isOpen}
      >
        <ToastBody className="text-center">{message}</ToastBody>
      </Toast>
    </>
  );
};
export default ToastComponent;
