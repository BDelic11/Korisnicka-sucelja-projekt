import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className=" bg-green-400 p-3 mb-4 rounded-md flex items-center text-sm text-white ">
      <FaCheckCircle className="h-4 w-4 mr-2" />
      {message}
    </div>
  );
};

export default FormSuccess;
