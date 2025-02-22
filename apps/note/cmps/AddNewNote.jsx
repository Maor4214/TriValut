import { Note } from './Note.jsx'
const { useNavigate, useParams } = ReactRouterDOM

export function AddNewNote() {
  const navigate = useNavigate()

  function onAddNewNote() {
    navigate('/notes/note/newnote')
  }

  return (
    <section className="notes-header">
      <button onClick={onAddNewNote}>New Note</button>
      <button>New Img</button>
      <button>New Voice</button>
    </section>
  )
}
