import { useNotes } from '../context/NoteContext.jsx'
import { noteService } from '../services/note.service.js'

export function NoteOptions({
  isOptionsOpen,
  note,
  onRemoveNote,
  duplicateNote,
}) {
  const { loadNotes } = useNotes()

  function handleOnRemoveNote(ev) {
    ev.stopPropagation()
    onRemoveNote(note.id)
  }
  function handleOnClick(ev) {
    ev.stopPropagation()
  }

  function handleOnDuplicateNote(ev, note) {
    ev.stopPropagation()
    const duplicatedNote = duplicateNote(note)
    noteService.save(duplicatedNote).then(() => {
      loadNotes()
    })
    console.log('ducpliated note: ', duplicatedNote)
  }

  return (
    <div
      className={
        isOptionsOpen
          ? `note-options-container active`
          : `note-options-container closed`
      }
    >
      <ul className="clean-list">
        <li onClick={(ev) => handleOnRemoveNote(ev, note.id)}>Delete note</li>
        <li onClick={(ev) => handleOnClick(ev)}>Add label</li>
        <li onClick={(ev) => handleOnClick(ev)}>Add drawing</li>
        <li onClick={(ev) => handleOnDuplicateNote(ev, note)}>Make a copy</li>
        <li onClick={(ev) => handleOnClick(ev)}>Show checkboxes</li>
        <li onClick={(ev) => handleOnClick(ev)}>Grab image text</li>
        <li onClick={(ev) => handleOnClick(ev)}>Copy to Gmail</li>
        <li onClick={(ev) => handleOnClick(ev)}>Version history</li>
      </ul>
    </div>
  )
}
