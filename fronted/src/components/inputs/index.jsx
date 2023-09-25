import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  keyfilter,
  error,
  label,
  loading,
  disabled,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className="mb-2">
          <label className="font-bold">{label}</label>
        </div>
      )}
      <InputText
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={loading ? () => {} : onChange}
        keyfilter={keyfilter}
        className={`border border-gray-300 bg-gray-100 rounded-md w-full py-2 outline-none focus:border-primary p-inputtext-sm ${
          error && !loading ? "p-invalid" : ""
        }`}
        disabled={loading || disabled}
        {...props}
      />
      {error && !loading && (
        <small className="text-red-500 self-start">{error}</small>
      )}
    </div>
  );
};

export const InputPassword = ({
  name,
  placeholder,
  value,
  onChange,
  label,
  error,
  loading,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      {label && (
        <div className="mb-2">
          <label className="font-bold">{label}</label>
        </div>
      )}
      <InputText
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 bg-gray-100 rounded-md w-full py-2 outline-none focus:border-blue-500"
        disabled={loading || disabled}
      />
     {/*  <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={`absolute right-2 ${error ? 'bottom-3' : 'bottom-9'}`}
      >
        {showPassword ? "🙈" : "👁️"}
      </button> */}
      {error && !loading && (
        <small className="text-red-500 self-start">{error}</small>
      )}
    </div>
  );
};

export const CalendarImput = () => {
  return (
    <Calendar
      locale="es"
      placeholder="Fecha de nacimiento"
      className="border border-gray-300 bg-gray-100 rounded-md w-full outline-none focus:border-blue-500 p-inputtext-sm"
    />
  );
};

export const Select = ({ placeholder, value, onChange, options }) => {
  return (
    <Dropdown
      placeholder={placeholder}
      className="border border-gray-300 bg-gray-100 rounded-md w-full outline-none focus:border-blue-500 p-inputtext-sm"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
