const { Link } = ReactRouterDOM
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteSideBar } from '../cmps/NoteSideBar.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

import { noteService } from '../services/note.service.js'
import { NoteProvider } from '../context/NoteContext.jsx'
import { DynamicNoteContent } from '../cmps/DynamicNoteContent.jsx'
import { NewNoteCmp } from '../cmps/NewNoteCmp.jsx'
import { PinnedNotes } from '../cmps/PinnedNotes.jsx'

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [pinnedNotes, setPinnedNotes] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    noteService.getFilterFromSearchParams(searchParams)
  )

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [content, setCurrNote] = useState('note')

  useEffect(() => {
    console.log('filter by: ', filterBy)
    setSearchParams(filterBy)
    loadNotes()
  }, [filterBy])

  function onTogglePin(noteId) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
      )
    )
    noteService.get(noteId).then((note) => {
      if (!note) return
      note.isPinned = !note.isPinned
      noteService.save(note).then(() => {
        console.log('updated pinned state of this note: ', note.isPinned)
        loadNotes()
      })
    })
  }

  function toggleSideBar() {
    setIsSideBarOpen((prev) => !prev)
  }

  function loadNotes() {
    noteService.query({ ...filterBy, isPinned: false }).then((notes) => {
      setNotes(notes)
      console.log('notes', notes)
    })
    noteService.query({ ...filterBy, isPinned: true }).then((pinnedNotes) => {
      setPinnedNotes(pinnedNotes)
      console.log('pinned notes: ', pinnedNotes)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onRemoveNote(noteId) {
    noteService.remove(noteId).then(() => {
      loadNotes()
      console.log('removed note')
    })
  }
  return (
    <NoteProvider loadNotes={loadNotes} onRemoveNote={onRemoveNote}>
      <section className="note-app-container">
        <NoteHeader
          toggleSideBar={toggleSideBar}
          onSetFilter={onSetFilter}
          filterBy={filterBy}
        />
        <section className="notes-container">
          <NoteSideBar isSideBarOpen={isSideBarOpen}></NoteSideBar>
          <div className="content">
            <NewNoteCmp />
            {pinnedNotes && (
              <React.Fragment>
                <div>Pinned Notes</div>
                <PinnedNotes
                  pinnedNotes={pinnedNotes}
                  filterBy={filterBy}
                  onRemoveNote={onRemoveNote}
                  onTogglePin={onTogglePin}
                ></PinnedNotes>
              </React.Fragment>
            )}

            {notes ? (
              <React.Fragment>
                {pinnedNotes && <div>Notes</div>}
                <DynamicNoteContent
                  notes={notes}
                  onRemoveNote={onRemoveNote}
                  onTogglePin={onTogglePin}
                />
              </React.Fragment>
            ) : (
              <div>Loading notes...</div>
            )}
          </div>
        </section>
      </section>
    </NoteProvider>
  )
}
