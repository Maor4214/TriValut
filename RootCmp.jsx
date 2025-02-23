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
import { MailStarred } from './apps/mail/cmps/MailStarred.jsx'
import { MailSent } from './apps/mail/cmps/MailSent.jsx'
import { MailDraft } from './apps/mail/cmps/MailDraft.jsx'
import { MailTrash } from './apps/mail/cmps/MailTrash.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />}>
            <Route index element={<Navigate to="inbox" replace />} />
            <Route path="/mail/inbox" element={<MailInbox />} />
            <Route path="/mail/starred" element={<MailStarred />} />
            <Route path="/mail/sent" element={<MailSent />} />
            <Route path="/mail/draft" element={<MailDraft />} />
            <Route path="/mail/trash" element={<MailTrash />} />
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
