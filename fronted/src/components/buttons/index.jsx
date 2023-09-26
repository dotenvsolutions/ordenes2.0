import { Button } from "primereact/button";
import themes from "../../constants/themes";

export const EditButtonIcon = ({ onClick }) => (
  <Button
    icon="pi pi-pencil"
    onClick={onClick}
    style={{
      backgroundColor: themes.primary.main,
      borderColor: themes.primary.main,
      height: 40,
      width: 40,
    }}
  />
);

export const DeleteButtonIcon = ({ onClick }) => (
  <Button
    icon="pi pi-trash"
    severity="danger"
    onClick={onClick}
    style={{
      backgroundColor: themes.error.main,
      borderColor: themes.error.main,
      height: 40,
      width: 40,
    }}
  />
);

export const CancelarButtonModal = ({ onClick }) => (
  <Button
    label="Cancelar"
    icon="pi pi-times"
    outlined
    onClick={onClick}
    style={{
      borderColor: themes.warning.main,
      height: 40,
      color: themes.warning.main,
      outline: "none",
    }}
  />
);

export const SaveButtonModal = ({ onClick }) => (
  <Button
    label="Guardar"
    icon="pi pi-check"
    onClick={onClick}
    style={{
      backgroundColor: themes.success.main,
      borderColor: themes.success.main,
      height: 40,
    }}
  />
);

export const NoButtonModal = ({ onClick }) => (
  <Button
    label="No"
    icon="pi pi-times"
    outlined
    onClick={onClick}
    style={{
      borderColor: themes.warning.main,
      height: 40,
      color: themes.warning.main,
    }}
  />
);

export const YesButtonModal = ({ onClick }) => (
  <Button
    label="Si"
    icon="pi pi-check"
    severity="danger"
    onClick={onClick}
    style={{
      backgroundColor: themes.error.main,
      borderColor: themes.error.main,
      height: 40,
    }}
  />
);
