import create from "zustand";

export const useNotesStore =
  create <
  Store >
  ((set) => ({
    notes: [],
    getNotes: async () => {
      /* const res = await getNotesRequest();
      set({ notes: res.data }); */
    },
  }));
