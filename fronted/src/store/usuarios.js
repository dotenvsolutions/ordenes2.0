import create from "zustand";
import { persist } from "zustand/middleware";

export const usuarioVacio = {
  id: null,
  cedula: "",
  nombres: "",
  apellidos: "",
  usuario: "",
  correo: "",
  telefono: "",
  direccion: "",
  password: "",
  fecha_nacimiento: "",
  sexo: "",
};

export const useUsuariosStore = create(
  persist((set) => ({
    usuarios: [],
    selectedUsuario: usuarioVacio,
    getUsuarios: async () => {
      /* const res = await getNotesRequest();
        set({ notes: res.data }); */
    },
    setUsuarios: (usuarios) => set({ usuarios }),
    addUsuario: (usuario) =>
      set((state) => ({ usuarios: [...state.usuarios, usuario] })),
    updateUsuario: (usuario) =>
      set((state) => ({
        usuarios: state.usuarios.map((u) =>
          u.id === usuario.id ? usuario : u
        ),
      })),
    deleteUsuario: (id) =>
      set((state) => ({
        usuarios: state.usuarios.filter((u) => u.id !== id),
      })),
    setSelectedUsuario: (usuario) => set({ selectedUsuario: usuario }),
    resetSelectedUsuario: () => set({ selectedUsuario: null }),
  }))
);
