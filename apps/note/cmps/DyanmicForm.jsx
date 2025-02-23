export function DynamicForm({ noteToEdit, onSaveNote, handleChange }) {
  console.log('note to edit:', noteToEdit)
  const { id } = noteToEdit
  const { style } = noteToEdit
  console.log('noteId:', id)
  return (
    //const [formState,setFormState] = useState({startconfugartion1,...})
    <div>
      <form onSubmit={onSaveNote}>
        {/* {noteToEdit.type === 'imageNote' &&  <<div>video note form</div>>} */}
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

        <input
          value={style.backgroundColor}
          id="backgroundColor"
          name="backgroundColor"
          type="color"
          onChange={handleChange}
        ></input>

        <button> {id === 'newnote' ? 'Create' : 'Edit'} Note</button>
      </form>
    </div>
  )
}
