const { createContext, useContext } = React

const NoteContext = createContext();

export function NoteProvider({ children, loadNotes }) {
  return (
    <NoteContext.Provider value={{ loadNotes }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  return useContext(NoteContext);
}
