import { NotePreview } from './NotePreview.jsx'
const { useEffect, useState } = React
const { Link, Outlet, useSearchParams, useNavigate } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onTogglePin }) {
  const navigate = useNavigate()

  function onNoteClick(noteId) {
    navigate(`/notes/note/${noteId}`)
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-list">
      <Outlet />
      {notes &&
        notes.map((note) => {
          return (
            <NotePreview
              style={note.style}
              key={note.id}
              note={note}
              onNoteClick={onNoteClick}
              onRemoveNote={onRemoveNote}
              onTogglePin={onTogglePin}
            />
          )
        })}
    </section>
  )
}
