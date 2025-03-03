import { mailService } from '../services/mail.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailSidebar } from '../cmps/MailSidebar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

const { useEffect, useState } = React
const { Link, Outlet, useSearchParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
  const [notes, setNotes] = useState(null)
  const [isCompose, setIsCompose] = useState(false)

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  function toggleSideBar() {
    setIsSideBarOpen((prevIsOpen) => {
      return !prevIsOpen
    })
  }

  function openCompose(ev) {
    ev.preventDefault()
    setIsCompose((prevIsCompose) => !prevIsCompose)
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )

  return (
    <section className="mail-container">
      <MailHeader toggleSideBar={toggleSideBar} />
      <section className="main-layout">
        <MailSidebar isSideBarOpen={isSideBarOpen} openCompose={openCompose} />
        {isCompose && <MailCompose />}
        <Outlet />
      </section>
    </section>
  )
}
