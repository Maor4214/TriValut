const { useParams, useNavigate } = ReactRouterDOM
const { useEffect, useState } = React
const { useRef } = React
import { CreateNote } from './CreateNote.jsx'
import { noteService } from '../services/note.service.js'
import { useNotes } from '../context/NoteContext.jsx'
import { LongNoteForm } from './LongNoteForm.jsx'

export function Note() {
  const { noteId } = useParams()
  const dialogRef = useRef()
  const navigate = useNavigate()
  const { loadNotes } = useNotes()
  const [isDialogOpen, setIsDialogOpen] = useState(true)

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

  useEffect(() => {
    document.body.classList.add('dialog-open')
    document.addEventListener('mousedown', onClickOutside)
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
        <LongNoteForm />
      </dialog>
      <div className="modal-overlay" onClick={navigate('/notes')}></div>
    </React.Fragment>
  ) : null
}
