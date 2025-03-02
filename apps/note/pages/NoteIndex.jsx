const { Link } = ReactRouterDOM
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteSideBar } from '../cmps/NoteSideBar.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

import { noteService } from '../services/note.service.js'
import { NoteProvider } from '../context/NoteContext.jsx'
import { DynamicNoteContent } from '../cmps/DynamicNoteContent.jsx'
import { NewNoteCmp } from '../cmps/NewNoteCmp.jsx'

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

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

  function toggleSideBar() {
    setIsSideBarOpen((prev) => !prev)
  }

  function loadNotes() {
    noteService.query(filterBy).then((notes) => {
      setNotes(notes)
      console.log('notes', notes)
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
    <NoteProvider loadNotes={loadNotes}>
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
            <DynamicNoteContent notes={notes} onRemoveNote={onRemoveNote} />
          </div>
        </section>
      </section>
    </NoteProvider>
  )
}
