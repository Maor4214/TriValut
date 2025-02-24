import { mailService } from '../services/mail.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailSidebar } from '../cmps/MailSidebar.jsx'

const { useEffect, useState } = React
const { Link, Outlet, useSearchParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
  const [notes, setNotes] = useState(null)

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  function toggleSideBar() {
    setIsSideBarOpen((prevIsOpen) => {
      return !prevIsOpen
    })
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )

  return (
    <section className="mail-container">
      <MailHeader toggleSideBar={toggleSideBar} />
      <section className="main-layout">
        <MailSidebar isSideBarOpen={isSideBarOpen} />
        <Outlet />
      </section>
    </section>
  )
}
