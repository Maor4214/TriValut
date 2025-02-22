export function DynamicForm({ noteToEdit, onSaveNote, handleChange }) {
  console.log('note to edit:', noteToEdit)
  const { id } = noteToEdit
  console.log('noteId:', id)
  return (
    <div>
      <form onSubmit={onSaveNote}>
        {noteToEdit.type === 'noteTodos' && <div>video note form</div>}
        <input
          onChange={handleChange}
          id="title"
          name="title"
          type="text"
          value={noteToEdit.title ? noteToEdit.title : 'default title'}
        />
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          id="txt"
          name="txt"
          type="text"
          value={noteToEdit.info.txt}
        />
        <label htmlFor="txt">Content</label>

        <button> {id === 'newnote' ? 'Create' : 'Edit'} Note</button>
      </form>
    </div>
  )
}
