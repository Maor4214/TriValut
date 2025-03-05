const { createContext, useState, useEffect } = React
import { mailService } from '../services/mail.service.js'

export const MailContext = createContext()

export function MailProvider({ children }) {
  const [mails, setMails] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isCompose, setIsCompose] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [filterBy, setFilterBy] = useState({
    status: 'inbox',
    txt: '',
    isRead: null,
    isStarred: null,
    labels: [],
  })

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    return mailService.query(filterBy).then((mails) => {
      setMails(mails)
      calculateUnreadCount()
      return mails
    })
  }

  function calculateUnreadCount() {
    mailService.getUnreadCount().then((count) => {
      setUnreadCount(count)
    })
  }

  function toggleCompose(ev) {
    if (ev) ev.preventDefault()
    setIsCompose((prevIsCompose) => !prevIsCompose)
  }

  function toggleSideBar() {
    setIsSideBarOpen((prevIsOpen) => !prevIsOpen)
  }

  function updateMail(updatedMail) {
    return mailService.save(updatedMail).then(() => {
      setMails((prevMails) =>
        prevMails.map((mail) =>
          mail.id === updatedMail.id ? updatedMail : mail
        )
      )
      calculateUnreadCount()
      return updatedMail
    })
  }

  function removeMail(mailId) {
    return mailService.remove(mailId).then(() => {
      setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
      calculateUnreadCount()
    })
  }

  function setFilter(newFilterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilterBy }))
  }

  function markMailAs(mailId, property, value) {
    return mailService.get(mailId).then((mail) => {
      const updatedMail = { ...mail, [property]: value }
      return updateMail(updatedMail)
    })
  }

  function markMailAsRead(mailId) {
    return markMailAs(mailId, 'isRead', true)
  }

  function markMailAsUnread(mailId) {
    return markMailAs(mailId, 'isRead', false)
  }

  function toggleStarred(mailId) {
    return mailService.get(mailId).then((mail) => {
      const updatedMail = { ...mail, isStarred: !mail.isStarred }
      return updateMail(updatedMail)
    })
  }

  return (
    <MailContext.Provider
      value={{
        mails,
        unreadCount,
        loadMails,
        updateMail,
        setFilter,
      }}
    >
      {children}
    </MailContext.Provider>
  )
}
