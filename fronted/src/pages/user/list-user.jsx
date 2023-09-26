import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import themes from "../../constants/themes";
import {
  CancelarButtonModal,
  DeleteButtonIcon,
  EditButtonIcon,
  SaveButtonModal,
} from "../../components/buttons";
import {
  ConfirmDeleteDialog,
  DeleteProductDialogFooter,
  UserModal,
} from "../../components/dialogs";
import { FilterTableHeader } from "../../components/tableHeader";
import { ToolbarTable } from "../../components/toolbar";
import { useUsuariosStore, usuarioVacio } from "../../store/usuarios";

export default function PaginaUsuarios() {
  const addUsuario = useUsuariosStore((state) => state.addUsuario);
  const setUsuarios = useUsuariosStore((state) => state.setUsuarios);
  const usuarios = useUsuariosStore((state) => state.usuarios);
  const selectedUsuario = useUsuariosStore((state) => state.selectedUsuario);
  const setSelectedUsuario = useUsuariosStore(
    (state) => state.setSelectedUsuario
  );

  const [usuarioDialogo, setUsuarioDialogo] = useState(false);
  const [eliminacionUsuarioDialogo, setEliminacionUsuarioDialogo] =
    useState(false);
  const [eliminacionUsuariosDialogo, setEliminacionUsuariosDialogo] =
    useState(false);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const openNew = () => {
    setSubmitted(false);
    setUsuarioDialogo(true);
  };

  const ocultarDialogo = () => {
    setSubmitted(false);
    setUsuarioDialogo(false);
  };

  const ocultarEliminacionUsuarioDialogo = () => {
    setEliminacionUsuarioDialogo(false);
  };

  const ocultarEliminacionUsuariosDialogo = () => {
    setEliminacionUsuariosDialogo(false);
  };

  const guardarUsuario = () => {
    setSubmitted(true);

    if (selectedUsuario.nombre.trim()) {
      let _usuarios = [...usuarios];
      let _usuario = { ...selectedUsuario };

      if (selectedUsuario.id) {
        const index = findIndexById(selectedUsuario.id);

        _usuarios[index] = _usuario;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "usuario Updated",
          life: 3000,
        });
      } else {
        _usuario.id = createId();
        _usuario.image = "Usuario-placeholder.svg";
        _usuarios.push(_usuario);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "usuario Created",
          life: 3000,
        });
      }

      setUsuarios(_usuarios);
      setUsuarioDialogo(false);
      setSelectedUsuario(usuarioVacio);
    }
  };

  const editarUsuario = (usuario) => {
    setSelectedUsuario({ ...usuario });
    setUsuarioDialogo(true);
  };

  const confirmarEliminacionUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    setEliminacionUsuarioDialogo(true);
  };

  const eliminarUsuario = () => {
    let _usuarios = usuarios.filter((val) => val.id !== selectedUsuario.id);

    setUsuarios(_usuarios);
    setEliminacionUsuarioDialogo(false);
    setSelectedUsuario(usuarioVacio);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmarEliminacionSeleccionada = () => {
    setEliminacionUsuariosDialogo(true);
  };

  const eliminarUsariosSeleccionados = () => {
    let _usuarios = usuarios.filter(
      (val) => !usuariosSeleccionados.includes(val)
    );

    setUsuarios(_usuarios);
    setEliminacionUsuariosDialogo(false);
    setUsuariosSeleccionados(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nuevo cliente"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
          style={{
            backgroundColor: themes.primary.main,
            borderColor: themes.primary.main,
            height: 40,
            padding: "0 1.2rem",
          }}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmarEliminacionSeleccionada}
          disabled={!usuariosSeleccionados || !usuariosSeleccionados.length}
          style={{
            backgroundColor: themes.error.main,
            borderColor: themes.error.main,
            height: 40,
            padding: "0 1.2rem",
          }}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
        style={{
          backgroundColor: themes.warning.main,
          borderColor: themes.warning.main,
          height: 40,
        }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-3">
        <EditButtonIcon onClick={() => editarUsuario(rowData)} />
        <DeleteButtonIcon
          onClick={() => confirmarEliminacionUsuario(rowData)}
        />
      </div>
    );
  };

  const header = (
    <FilterTableHeader
      label="Administrar usuarios"
      onInput={(e) => setGlobalFilter(e.target.value)}
      placeholder="Buscar..."
    />
  );
  const productDialogFooter = (
    <React.Fragment>
      <CancelarButtonModal onClick={ocultarDialogo} />
      <SaveButtonModal onClick={guardarUsuario} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <DeleteProductDialogFooter
      handleConfirm={eliminarUsuario}
      hideDialog={ocultarEliminacionUsuarioDialogo}
    />
  );
  const deleteProductsDialogFooter = (
    <DeleteProductDialogFooter
      handleConfirm={eliminarUsariosSeleccionados}
      hideDialog={ocultarEliminacionUsuariosDialogo}
    />
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <ToolbarTable
          leftToolbarTemplate={leftToolbarTemplate}
          rightToolbarTemplate={rightToolbarTemplate}
        />

        <DataTable
          ref={dt}
          value={usuarios}
          selection={usuariosSeleccionados}
          onSelectionChange={(e) => setUsuariosSeleccionados(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="cedula"
            header="Cédula"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="nombre_completo"
            header="Nombre completo"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="correo"
            header="Correo electrónico"
            sortable
            style={{ minWidth: "13rem" }}
          ></Column>
          <Column
            field="telefono"
            header="Teléfono"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="usuario"
            header="Usuario"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <UserModal
        footer={productDialogFooter}
        onHide={ocultarDialogo}
        submitted={submitted}
        state={selectedUsuario}
        visible={usuarioDialogo}
        setState={setSelectedUsuario}
      />

      <ConfirmDeleteDialog
        visible={eliminacionUsuariosDialogo}
        footer={deleteProductsDialogFooter}
        onHide={ocultarEliminacionUsuariosDialogo}
        labelDelete="Estás seguro de eliminar los productos seleccionados"
      />
      <ConfirmDeleteDialog
        visible={eliminacionUsuarioDialogo}
        footer={deleteProductDialogFooter}
        onHide={ocultarEliminacionUsuarioDialogo}
        labelDelete="Estás seguro de eliminar el producto seleccionado "
        labelDeleteBold={selectedUsuario.nombre}
      />
    </div>
  );
}
