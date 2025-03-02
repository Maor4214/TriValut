import { ShortNoteForm } from './ShortNoteForm.jsx'
import { LongNoteForm } from './LongNoteForm.jsx'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { useNotes } from '../context/NoteContext.jsx'
const { useNavigate, useParams } = ReactRouterDOM

const { useEffect, useState } = React

export function NewNoteCmp() {
  const [isExpandForm, setIsExpandForm] = useState(false)
  const [noteToCreate, setNoteToCreate] = useState(noteService.getEmptyNote())
  const { loadNotes } = useNotes()
  const navigate = useNavigate()

  function onNoteFormClick() {
    setIsExpandForm((prevState) => !prevState)
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    noteService
      .save(noteToCreate)
      .then(() => {
        showSuccessMsg(`note saved successfully!`)
        loadNotes()
        setNoteToCreate(noteService.getEmptyNote())
        navigate('/notes')
      })
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ target }) {
    console.log('note to edit:', noteToCreate)

    const field = target.name
    let value = target.value

    console.log('field:', field)
    console.log('value:', value)
    switch (target.type) {
      case 'number':
      case 'range':
        // value = +value
        break

      case 'checkbox':
        value = target.checked
        break
      case 'color':
        value = value
      default:
        break
    }

    setNoteToCreate((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
      style: { ...prevNote.style, [field]: value },
    }))
  }
  return (
    <section className="new-note-container">
      {!isExpandForm && (
        <ShortNoteForm
          isExpandForm={isExpandForm}
          onNoteFormClick={onNoteFormClick}
        ></ShortNoteForm>
      )}

      {isExpandForm && (
        <LongNoteForm
          handleChange={handleChange}
          onSaveNote={onSaveNote}
          setIsExpandForm={setIsExpandForm}
          noteToEdit={noteToCreate}
        />
      )}
    </section>
  )
}
