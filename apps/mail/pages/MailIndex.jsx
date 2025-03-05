import { mailService } from '../services/mail.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailSidebar } from '../cmps/MailSidebar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailContext } from '../cmps/MailContext.jsx'
const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

export function MailIndex() {
  const [isCompose, setIsCompose] = useState(false)
  const [mails, setMails] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [filterBy, setFilterBy] = useState({
    status: 'inbox',
    txt: '',
    isRead: null,
    isStarred: null,
    labels: [],
  })

  useEffect(() => {
    changeMails()
  }, [filterBy])

  function toggleSideBar() {
    setIsSideBarOpen((prevIsOpen) => !prevIsOpen)
  }

  function changeMails() {
    mailService.query(filterBy).then((mails) => {
      setMails(mails)
      setUnreadCount(mails.filter((mail) => !mail.isRead).length)
    })
  }

  function updateUnreadCount() {
    mailService.query().then((mails) => {
      setUnreadCount(mails.filter((mail) => !mail.isRead).length)
    })
  }

  function toggleCompose(ev) {
    if (ev) ev.preventDefault()
    setIsCompose((prevIsCompose) => !prevIsCompose)
  }

  function setFilter(newFilterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilterBy }))
  }

  const contextValue = {
    mails,
    unreadCount,
    updateUnreadCount,
    toggleCompose,
    isCompose,
    setFilter,
    filterBy,
    setMails,
  }

  return (
    <MailContext.Provider value={contextValue}>
      <section className="mail-container">
        <MailHeader toggleSideBar={toggleSideBar} unreadCount={unreadCount} />
        <section className="main-layout">
          <MailSidebar
            isSideBarOpen={isSideBarOpen}
            openCompose={toggleCompose}
          />
          {isCompose && <MailCompose toggleCompose={toggleCompose} />}
          <Outlet />
        </section>
      </section>
    </MailContext.Provider>
  )
}
