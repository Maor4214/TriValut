import { Note } from './Note.jsx'
const { useNavigate, useParams } = ReactRouterDOM

export function AddNewNote() {
  const navigate = useNavigate()

  function onAddNewNote() {
    navigate('/notes/note/newnote')
  }

  return (
    <section className="new-notes">
      <i
        onClick={onAddNewNote}
        title="New text"
        className="fa-solid fa-file-lines"
      ></i>

      {/* <NavLink to="/notes/images"> */}
      <i title="New Image" className="fa-solid fa-image"></i>
      {/* </NavLink> */}

      {/* <NavLink to="/notes/paint"> */}
      <i title="New sketch" className="fa-solid fa-paintbrush"></i>
      {/* </NavLink> */}

      {/* <NavLink to="/notes/checklist"> */}
      <i title="New TODO" className="fa-solid fa-list-check"></i>
      {/* </NavLink> */}

      {/* <NavLink to="/notes/microphone"> */}
      <i title="New voice note" className="fa-solid fa-microphone"></i>

      {/* <NavLink to="/notes/video"> */}
      <i title="New video" className="fa-solid fa-video"></i>
      {/* </NavLink> */}

      {/* <NavLink to="/notes/map"> */}
      <i title="New location" className="fa-solid fa-map"></i>
      {/* </NavLink> */}
    </section>
  )
}
