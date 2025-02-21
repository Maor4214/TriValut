import { NotePreview } from "./NotePreview.jsx"
const { useEffect, useState } = React
const { Link, Outlet,useSearchParams,useNavigate } = ReactRouterDOM

export function NoteList({notes, onRemoveNote}) {
 
    const navigate = useNavigate()

    function onNoteClick(noteId){
        navigate(`/notes/${noteId}`)
    }

    if(!notes) return <div>Loading...</div>
    return  <section className="note-list">
        
            <nav>
                <Link replace to="/notes/1">edit note</Link>
            </nav>


            <Outlet />
        { notes && notes.map(note => { 
            return <div  key={note.id}>
                <NotePreview className="note-preview" note={note} onNoteClick={onNoteClick}/>      
                <button onClick={() => onRemoveNote(note.id)}>X</button>     
            </div>
        })}

    </section>
}
