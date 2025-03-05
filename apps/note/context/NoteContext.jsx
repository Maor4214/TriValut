const { createContext, useContext } = React

const NoteContext = createContext()

export function NoteProvider({ children, loadNotes, onRemoveNote }) {
  return (
    <NoteContext.Provider value={{ loadNotes, onRemoveNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNotes() {
  return useContext(NoteContext)
}
