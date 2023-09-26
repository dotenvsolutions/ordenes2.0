import { Dialog } from "primereact/dialog";
import { NoButtonModal, YesButtonModal } from "../buttons";
import {
  CalendarInput,
  GeneralInputText,
  GeneralTextArea,
  InputPassword,
  SexoSelect,
} from "../inputs";

export const ConfirmDeleteDialog = ({
  visible,
  onHide,
  labelDelete,
  labelDeleteBold,
  footer,
}) => (
  <Dialog
    visible={visible}
    style={{ width: "32rem" }}
    breakpoints={{ "960px": "75vw", "641px": "90vw" }}
    header="Confirmación"
    modal
    footer={footer}
    onHide={onHide}
  >
    <div className="confirmation-content flex items-center gap-3">
      <i
        className="pi pi-exclamation-triangle"
        style={{ fontSize: "1.5rem" }}
      />
      <span>
        {labelDelete}
        {labelDeleteBold || (
          <span className="font-bold">{` ${labelDeleteBold}`}</span>
        )}
        ?
      </span>
    </div>
  </Dialog>
);

export const DeleteProductDialogFooter = ({ hideDialog, handleConfirm }) => (
  <>
    <NoButtonModal onClick={hideDialog} />
    <YesButtonModal onClick={handleConfirm} />
  </>
);

export const UserModal = ({
  visible,
  footer,
  onHide,
  state,
  setState,
  submitted,
}) => {
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _state = { ...state };

    _state[`${name}`] = val;

    setState(_state);
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: "60rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Detalles del usuario"
      modal
      className="p-fluid"
      footer={footer}
      onHide={onHide}
    >
      <div className="field flex flex-col gap-1">
        <div className="flex md:flex-row flex-col items-start justify-between gap-2">
          <div className="w-full">
            <label htmlFor="id" className="font-bold">
              ID
            </label>
            <GeneralInputText id="id" value={state.id} disabled />
          </div>
          <div className="w-full">
            <label htmlFor="cedula" className="font-bold">
              Cedula
            </label>
            <GeneralInputText
              id="cedula"
              value={state.cedula}
              onChange={(e) => onInputChange(e, "cedula")}
              required
              autoFocus
              error="Cedula es requerido."
              submitted={submitted}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start justify-between gap-2">
          <div className="w-full">
            <label htmlFor="name" className="font-bold">
              Nombres
            </label>
            <GeneralInputText
              id="nombres"
              value={state.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
              error="Nombres es requerido."
              submitted={submitted}
            />
          </div>
          <div className="w-full">
            <label htmlFor="apellidos" className="font-bold">
              Apellidos
            </label>
            <GeneralInputText
              id="apellidos"
              value={state.apellidos}
              onChange={(e) => onInputChange(e, "apellidos")}
              required
              error="Apellidos es requerido."
              submitted={submitted}
            />
          </div>
          <div className="w-full">
            <label htmlFor="usuario" className="font-bold">
              Usuario
            </label>
            <GeneralInputText
              id="usuario"
              value={state.usuario}
              onChange={(e) => onInputChange(e, "usuario")}
              required
              error="Usuario es requerido."
              submitted={submitted}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start justify-between gap-2">
          <div className="flex-[1] md:w-auto w-full">
            <label htmlFor="correo" className="font-bold">
              Correo
            </label>
            <GeneralInputText
              id="correo"
              value={state.correo}
              onChange={(e) => onInputChange(e, "correo")}
              required
              error="Correo es requerido."
              submitted={submitted}
            />
          </div>
          <div className="flex-[0.5] md:w-auto w-full">
            <label htmlFor="telefono" className="font-bold">
              Teléfono
            </label>
            <GeneralInputText
              id="telefono"
              value={state.telefono}
              onChange={(e) => onInputChange(e, "telefono")}
              required
              error="Teléfono es requerido."
              submitted={submitted}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start justify-between gap-2">
          <div className="w-full">
            <label htmlFor="fecha_nacimiento" className="font-bold">
              Fecha de nacimiento
            </label>
            <CalendarInput
              id="fecha_nacimiento"
              value={state.fecha_nacimiento}
              onChange={(e) => onInputChange(e, "fecha_nacimiento")}
              required
              error="Fecha de nacimiento es requerido."
              submitted={submitted}
            />
          </div>
          <div className="w-full">
            <label htmlFor="sexo" className="font-bold">
              Sexo
            </label>
            <SexoSelect
              id="sexo"
              value={state.sexo}
              onChange={(e) => onInputChange(e, "sexo")}
              required
              error="Sexo es requerido."
              submitted={submitted}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="font-bold">
              Contraseña
            </label>
            <InputPassword
              id="password"
              value={state.password}
              onChange={(e) => onInputChange(e, "password")}
              required
              error="Contraseña es requerido."
              submitted={submitted}
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="direccion" className="font-bold">
            Dirección
          </label>
          <GeneralTextArea
            id="direccion"
            value={state.direccion}
            onChange={(e) => onInputChange(e, "direccion")}
            required
            error="Dirección es requerido."
            submitted={submitted}
          />
        </div>
      </div>
    </Dialog>
  );
};
