import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { sexoOptions } from "../../constants/global";

export const InputPassword = ({
  id,
  value,
  onChange,
  label,
  error,
  disabled,
  submitted,
}) => {
  const [showPassword] = useState(false);
  return (
    <div className="relative w-full">
      {label && (
        <div className="mb-2">
          <label className="font-bold">{label}</label>
        </div>
      )}
      <InputText
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${classNames({ "p-invalid": submitted && !value })} ${
          disabled ? "cursor-not-allowed" : null
        }}`}
        style={{
          width: "100%",
          height: 40,
        }}
      />
      {/*  <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={`absolute right-2 ${error ? 'bottom-3' : 'bottom-9'}`}
      >
        {showPassword ? "🙈" : "👁️"}
      </button> */}
      {submitted && !value && <small className="p-error">{error}</small>}
    </div>
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

export const GeneralInputText = ({
  id,
  value,
  onChange,
  submitted,
  error,
  disabled,
  ...props
}) => (
  <>
    <InputText
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${classNames({ "p-invalid": submitted && !value })} ${
        disabled ? "cursor-not-allowed" : null
      }}`}
      style={{
        width: "100%",
        height: 40,
      }}
      {...props}
    />
    {submitted && !value && <small className="p-error">{error}</small>}
  </>
);

export const GeneralTextArea = ({
  id,
  value,
  onChange,
  submitted,
  error,
  disabled,
  ...props
}) => (
  <>
    <InputTextarea
      id={id}
      value={value}
      onChange={onChange}
      className={`${classNames({ "p-invalid": submitted && !value })} ${
        disabled ? "cursor-not-allowed" : null
      }}`}
      rows={3}
      cols={20}
      {...props}
    />
    {submitted && !value && <small className="p-error">{error}</small>}
  </>
);

export const CalendarInput = ({
  id,
  value,
  onChange,
  submitted,
  error,
  disabled,
  ...props
}) => (
  <>
    <Calendar
      id={id}
      value={value}
      locale="es"
      onChange={onChange}
      dateFormat="dd/mm/yy"
      className={`${classNames({ "p-invalid": submitted && !value })} ${
        disabled ? "cursor-not-allowed" : null
      }}`}
      style={{
        width: "100%",
        height: 40,
      }}
      {...props}
    />
    {submitted && !value && <small className="p-error">{error}</small>}
  </>
);

export const SexoSelect = ({ value, onChange, submitted, error }) => (
  <>
    <Dropdown
      value={value}
      options={sexoOptions}
      onChange={onChange}
      placeholder="Seleccione"
      className={`${classNames({ "p-invalid": submitted && !value })}`}
      style={{
        width: "100%",
        height: 40,
        alignItems: "center",
      }}
    />
    {submitted && !value && <small className="p-error">{error}</small>}
  </>
);
