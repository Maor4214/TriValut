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

  function setFilter(newFilterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilterBy }))
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
