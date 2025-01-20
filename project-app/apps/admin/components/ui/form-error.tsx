import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className=" bg-destructive p-3 mb-4 rounded-md flex items-center text-sm text-white ">
      <FaExclamationTriangle className="h-4 w-4 mr-2" />
      {message}
    </div>
  );
};

export default FormError;
