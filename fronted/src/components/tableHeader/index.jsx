import { InputText } from "primereact/inputtext";

export const FilterTableHeader = ({ label, onInput, placeholder }) => (
  <div className="flex flex-wrap gap-2 items-center justify-start">
    {label && <h4 className="m-0">{label}</h4>}
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText
        type="search"
        onInput={onInput}
        placeholder={placeholder}
        style={{ height: 40 }}
      />
    </span>
  </div>
);
