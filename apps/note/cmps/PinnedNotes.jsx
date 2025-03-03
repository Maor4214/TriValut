import { noteService } from '../services/note.service.js'
import { PinnedNoteList } from './PinnedNoteList.jsx'
const { useState, useEffect } = React

export function PinnedNotes({
  filterBy,
  onRemoveNote,
  onTogglePin,
  pinnedNotes,
}) {
  const [notes, setNotes] = useState(null)
  const pinnedFilterBy = { ...filterBy, isPinned: true }
  useEffect(() => {
    console.log('pinned filter: ', pinnedFilterBy)
    loadPinnedNotes()
  }, [])

  function loadPinnedNotes() {
    setNotes(pinnedNotes)
    console.log('set the pinned notes: ', notes)
  }

  if (!notes) return <div>Loading Pinned notes</div>
  return (
    <PinnedNoteList
      notes={pinnedNotes}
      onRemoveNote={onRemoveNote}
      onTogglePin={onTogglePin}
    ></PinnedNoteList>
  )
}
