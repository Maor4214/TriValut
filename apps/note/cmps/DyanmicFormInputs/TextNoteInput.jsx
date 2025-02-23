export function TextNoteInput() {
  return (
    <div>
      {' '}
      <input
        onChange={handleChange}
        id="title"
        name="title"
        type="text"
        value={noteToEdit.info.title}
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
    </div>
  )
}
