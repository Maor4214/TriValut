import { mailService } from '../services/mail.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailSidebar } from '../cmps/MailSidebar.jsx'

const { useEffect, useState } = React
const { Link, Outlet, useSearchParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
  const [notes, setNotes] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )

  //   useEffect(() => {
  //     setSearchParams(filterBy)
  //     loadNotes()
  //   }, [filterBy, notes])

  //   function loadNotes() {
  //     mailService.query(filterBy).then((notes) => {
  //       setNotes(notes)
  //       console.log('notes', notes)
  //     })
  //   }

  //   function onRemoveNote(noteId) {
  //     mailService.remove(noteId).then(() => {
  //       loadNotes()
  //     })
  //   }
  return (
    <section className="mail-container">
      <MailHeader />
      <MailSidebar />
      <Outlet />

      <div>testing to see maor didnt break anything</div>
    </section>
  )
}
