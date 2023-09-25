import { Menubar } from "primereact/menubar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useAuthStore } from "../store/auth";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    confirmDialog({
      message: "¿Estás seguro que deseas cerrar sesión?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      accept: () => logout(),
    });
  };
  const items = [
    /* {
      label: "File",
      icon: "pi pi-fw pi-file",
    }, */
    {
      label: "Clientes",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Lista de usuarios",
          icon: "pi pi-fw pi-users",
          url: "/usuarios",
        },
        {
          label: "Nuevo usuario",
          icon: "pi pi-fw pi-user-plus",
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archive",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      width={60}
      className="mr-2"
    ></img>
  );
  const end = (
    <button
      className="flex items-center justify-between gap-2 mr-3 opacity-70 hover:opacity-100"
      onClick={() => handleLogout()}
    >
      <li className="pi pi-fw pi-power-off" />
      <span>Cerrar sesión</span>
    </button>
  );

  return (
    <>
      <ConfirmDialog />

      <Menubar model={items} start={start} end={end} />

      <Outlet />
    </>
  );
}
