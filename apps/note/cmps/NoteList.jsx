import { NotePreview } from "./NotePreview.jsx"
const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function NoteList({notes, onRemoveNote}) {
 
    if(!notes) return <div>Loading...</div>
    return  <section className="note-list">
        { notes && notes.map(note => { 
            return <div key={note.id}>
                <NotePreview note={note} />      
                <button onClick={() => onRemoveNote(note.id)}>X</button>     
            </div>
        })}

    </section>
}
