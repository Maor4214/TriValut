import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React

export function CreateNote({ loadNotes }) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const { noteId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (noteId) loadNote()
  }, [])
  function loadNote() {
    noteService
      .get(noteId)
      .then((note) => setNoteToEdit(note))
      .catch((err) => console.log('err:', err))
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    noteService
      .save(noteToEdit)
      .then(() => {
        showSuccessMsg(`note saved successfully!`)
        loadNotes()
        navigate('/notes')
      })
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    console.log('field:', field)
    console.log('value:', value)
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
    }))
  }
  const { type, info } = noteToEdit
  return (
    <div>
      <form onSubmit={onSaveNote}>
        <input
          onChange={handleChange}
          id="title"
          name="title"
          type="text"
          value={info.title}
        />
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          id="txt"
          name="txt"
          type="text"
          value={info.txt}
        />
        <label htmlFor="txt">Content</label>

        <button> {noteId ? 'Edit' : 'Create'} Note</button>
      </form>
    </div>
  )
}
