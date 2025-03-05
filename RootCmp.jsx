const { Route, Routes, Navigate } = ReactRouterDOM
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
import { MailInbox } from './apps/mail/cmps/MailInbox.jsx'
import { MailInfo } from './apps/mail/cmps/MailInfo.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/books" element={<BookIndex />} /> */}
          <Route path="/mail" element={<MailIndex />}>
            <Route index element={<Navigate to="inbox" replace />} />
            <Route
              path="/mail/inbox"
              element={<MailInbox filter={'inbox'} />}
            />
            <Route
              path="/mail/starred"
              element={<MailInbox filter={'starred'} />}
            />
            <Route path="/mail/sent" element={<MailInbox filter={'sent'} />} />
            <Route
              path="/mail/draft"
              element={<MailInbox filter={'draft'} />}
            />
            <Route
              path="/mail/trash"
              element={<MailInbox filter={'trash'} />}
            />
            <Route path="/mail/info/:mailId" element={<MailInfo />} />
          </Route>
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
