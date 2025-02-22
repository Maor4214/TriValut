import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { DynamicForm } from './DyanmicForm.jsx'
const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React

export function CreateNote({ loadNotes }) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const { noteId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (noteId && noteId !== 'newnote') loadNote()
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
    <DynamicForm
      noteToEdit={noteToEdit}
      onSaveNote={onSaveNote}
      handleChange={handleChange}
    ></DynamicForm>
  )
}
