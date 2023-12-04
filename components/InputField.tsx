// InputField.tsx
import React, { ChangeEventHandler } from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
