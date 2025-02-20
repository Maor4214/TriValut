
const {Link} = ReactRouterDOM
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteSideBar } from "../cmps/NoteSideBar.jsx"
import { CreateNote } from "../cmps/CreateNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const {useEffect, useState} = React
const {useSearchParams} = ReactRouterDOM


export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    const [searchParams,setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(()=>{
        setSearchParams(filterBy)
        loadNotes()
    },[filterBy])

    function loadNotes(){
        noteService.query(filterBy)
        .then(notes =>{
            setNotes(notes)
            console.log("notes",notes)
        } )
        
    }

    function onRemoveNote(noteId){
        noteService.remove(noteId)
        .then(()=>{
            loadNotes()
        })
    }
    return <section className="container">

        <NoteHeader></NoteHeader>
        {/* <NoteSideBar></NoteSideBar> */}
        <CreateNote loadNotes={loadNotes}></CreateNote>
        <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
        </section>
}
