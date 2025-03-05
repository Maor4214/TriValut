export function NoteOptions({ isOptionsOpen, note, onRemoveNote }) {
  function handleOnRemoveNote(ev) {
    ev.stopPropagation()
    onRemoveNote(note.id)
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
        <li>Add label</li>
        <li>Add drawing</li>
        <li>Make a copy</li>
        <li>Show checkboxes</li>
        <li>Grab image text</li>
        <li>Copy to Gmail</li>
        <li>Version history</li>
      </ul>
    </div>
  )
}
