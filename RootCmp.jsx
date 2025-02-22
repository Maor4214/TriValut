const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { Note } from './apps/note/cmps/Note.jsx'
import { NoteArchive } from './apps/note/pages/NoteArchive.jsx'
import { NoteMemos } from './apps/note/pages/NoteMemos.jsx'
import { NoteTrash } from './apps/note/pages/NoteTrash.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/notes" element={<NoteIndex />}>
            <Route path="/notes/note/:noteId" element={<Note />} />
            <Route path="/notes/:content" element={<NoteMemos />} />
            <Route path="/notes/:content" element={<NoteArchive />} />
            <Route path="/notes/:content" element={<NoteTrash />} />
          </Route>
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
