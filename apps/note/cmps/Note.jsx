const { useParams, useNavigate } = ReactRouterDOM
const { useEffect, useState } = React
const { useRef } = React
import { CreateNote } from './CreateNote.jsx'
import { noteService } from '../services/note.service.js'
import { useNotes } from '../context/NoteContext.jsx'
import { LongNoteForm } from './LongNoteForm.jsx'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export function Note() {
  const { noteId } = useParams()
  const [noteToEdit, setNoteToEdit] = useState(null)
  const dialogRef = useRef()
  const navigate = useNavigate()
  const { loadNotes } = useNotes()
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  function onSaveNote(ev) {
    ev.preventDefault()
    noteService
      .save(noteToEdit)
      .then(() => {
        showSuccessMsg(`note edited successfully!`)
        loadNotes()
        setNoteToEdit(noteService.getEmptyNote())
        navigate('/notes')
      })
      .catch((err) => console.log('err:', err))
  }

  function loadNote(noteId) {
    noteService.get(noteId).then((note) => {
      setNoteToEdit(note)
      console.log('set note to edit:', note)
    })
  }

  function handleChange({ target }) {
    console.log('note to edit:', noteToEdit)

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

    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
      style: { ...prevNote.style, [field]: value },
    }))
  }

  useEffect(() => {
    document.body.classList.add('dialog-open')
    document.addEventListener('mousedown', onClickOutside)
    loadNote(noteId)
    return () => {
      document.body.classList.remove('dialog-open')
      document.removeEventListener('mousedown', onClickOutside)
      setIsDialogOpen(false)
    }
  }, [navigate])

  function onClickOutside(ev) {
    ev.stopPropagation()
    console.log(ev.target)

    if (!dialogRef.current.contains(ev.target)) {
      navigate('/notes')
    }
  }

  return isDialogOpen ? (
    <React.Fragment>
      <dialog className="edit-dialog" ref={dialogRef} open>
        <LongNoteForm
          noteToEdit={noteToEdit}
          handleChange={handleChange}
          noteToCreate={null}
          onSaveNote={onSaveNote}
          setIsExpandForm={() => {
            console.log('this should not be printed')
          }}
        />
      </dialog>
      <div className="modal-overlay" onClick={() => navigate('/notes')}></div>
    </React.Fragment>
  ) : null
}
