
const { useParams, useNavigate } = ReactRouterDOM
const {useEffect, useState} = React
const {useRef} = React
import { CreateNote } from "./CreateNote.jsx"
import { noteService } from "../services/note.service.js"
import { useNotes } from "../context/NoteContext.jsx";

export function Note() {

    const { noteId} = useParams()
    const dialogRef = useRef()
    const navigate = useNavigate()
    const { loadNotes } = useNotes();
    

    useEffect(()=>{
        document.body.classList.add('dialog-open')
        document.addEventListener('mousedown',onClickOutside)
         return () =>{
            document.body.classList.remove('dialog-open')
            document.removeEventListener("mousedown", onClickOutside);
         }
    },[navigate])


     function onClickOutside(ev){

         ev.stopPropagation()
        console.log(ev.target)
       
        if (!dialogRef.current.contains(ev.target)){
            navigate('/notes')
        }
     }
    

    return <dialog 
    
    className="note-dialog"
     ref={dialogRef}
      open>
        <CreateNote loadNotes={loadNotes}></CreateNote>
        Note {noteId}
        </dialog>
}


