import { mailService } from '../services/mail.service.js'
import { MailContext } from '../cmps/MailContext.jsx'
import { noteService } from '../../note/services/note.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'

const { useEffect, useState, useContext } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

const unMarkStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#787b7b"
  >
    <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
  </svg>
)

const markStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#ffcc00"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

const unMarkImportent = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#787b7b"
  >
    <path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z" />
  </svg>
)

const markImportent = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#FFCC00"
  >
    <path d="M80-160 320-480 80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Z" />
    <path
      d="M240-240h360l180-240-180-240H240l180 240-180 240Z"
      fill="#FFCC00"
    />
  </svg>
)

const unMarkAsRead = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#787b7b"
  >
    <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
  </svg>
)

const markAsRead = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="787b7b"
  >
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h404q-4 20-4 40t4 40H160l320 200 146-91q14 13 30.5 22.5T691-572L480-440 160-640v400h640v-324q23-5 43-14t37-22v360q0 33-23.5 56.5T800-160H160Zm0-560v480-480Zm600 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" />
  </svg>
)

export function MailInbox({ filter }) {
  const {
    filterBy: contextFilterBy,
    setMails: setContextMails,
    loadMails: contextLoadMails,
    updateUnreadCount, // הוספנו את updateUnreadCount מהקונטקסט
  } = useContext(MailContext)

  const [mails, setMails] = useState(null)
  const [mail, setMail] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )

  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams()
    loadMails()
  }, [filter, contextFilterBy])

  function loadMails() {
    mailService.query(contextFilterBy, filter).then((mailList) => {
      setMails(mailList)
      setContextMails(mailList)
    })
  }

  function toggleStatus(mailObj, statusType) {
    const statusKey = `is${statusType}`

    const updatedMail = {
      ...mailObj,
      [statusKey]: !mailObj[statusKey],
    }

    mailService.save(updatedMail).then(() => {
      loadMails()
      updateUnreadCount() // קריאה לפונקציה מהקונטקסט

      if (contextLoadMails) {
        contextLoadMails()
      }
    })
  }

  function onOpenMailInfo(id) {
    mailService.get(id).then((mail) => {
      if (mail.isRead) {
        navigate(`/mail/info/${id}`)
        return
      } else {
        const updatedMail = {
          ...mail,
          isRead: true,
        }
        setMail(updatedMail)
        mailService.save(updatedMail).then(() => {
          if (contextLoadMails) {
            contextLoadMails()
          }
          loadMails()
          updateUnreadCount() // עדכון מספר ההודעות שלא נקראו
          navigate(`/mail/info/${id}`)
        })
      }
    })
  }

  function onSaveAsNote(id) {
    mailService.get(id).then((mail) => {
      const newNote = {
        createdAt: Date.now(),
        info: { txt: mail.body, title: mail.subject },
        isPinned: false,
        style: { backgroundColor: '#fff' },
        todos: [],
        type: 'noteTxt',
      }

      noteService.save(newNote).then(() => {
        showSuccessMsg('Mail has been saved as note successfully')
      })
    })
  }

  function onDeleteMail(id) {
    mailService
      .get(id)
      .then((mail) => {
        if (mail.isDeleted) {
          return mailService.remove(id).then(() => {
            loadMails()

            if (contextLoadMails) {
              contextLoadMails()
            }

            updateUnreadCount()
            showSuccessMsg('Mail permanently deleted')
          })
        } else {
          const updatedMail = {
            ...mail,
            isDeleted: true,
            deletedAt: Date.now(),
          }

          return mailService.save(updatedMail).then(() => {
            loadMails()

            if (contextLoadMails) {
              contextLoadMails()
            }

            updateUnreadCount()
            showSuccessMsg('Mail moved to trash')
          })
        }
      })
      .catch((err) => {
        console.error('Error processing mail deletion:', err)
        showErrorMsg('Failed to delete mail')
      })
  }

  if (!mails) return 'Loading...'
  return (
    <div className="main-mail-layout">
      {mails.map((mail) => {
        return (
          <div
            key={mail.id}
            className={`mail-item ${mail.isRead ? 'read' : ''}`}
            onClick={() => onOpenMailInfo(mail.id)}
          >
            <section className="mail-shortcut">
              <div
                title={mail.isStarred ? 'Starred' : 'Not starred'}
                onClick={(ev) => {
                  ev.stopPropagation()
                  toggleStatus(mail, 'Starred')
                }}
              >
                {mail.isStarred ? markStar : unMarkStar}
              </div>
              <div
                onClick={(ev) => {
                  ev.stopPropagation()
                  toggleStatus(mail, 'Importent')
                }}
              >
                {mail.isImportent ? markImportent : unMarkImportent}
              </div>
            </section>

            <div className="mail-sent-content">
              <div className="sent-by">{mail.from}</div>
              <div className="mail-title">{mail.subject}</div>
              <div className="mail-body">{mail.body}</div>
            </div>

            <section className="mail-actions">
              <div
                title="Save as note"
                onClick={(ev) => {
                  ev.stopPropagation()
                  onSaveAsNote(mail.id)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#787b7b"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160v212q-19-8-39.5-10.5t-40.5.5v-169L647-760H200v560h240v80H200Zm0-640v560-560ZM520-40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-260L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM240-560h360v-160H240v160Zm240 320h4l116-115v-5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
                </svg>
              </div>

              <div
                title="Delete"
                onClick={(ev) => {
                  ev.stopPropagation()
                  onDeleteMail(mail.id)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#787b7b"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </div>
              <div
                title={mail.isRead ? 'Mark as unread' : 'Mark as read'}
                onClick={(ev) => {
                  ev.stopPropagation()
                  toggleStatus(mail, 'Read')
                }}
              >
                {mail.isRead ? markAsRead : unMarkAsRead}
              </div>
            </section>
          </div>
        )
      })}
    </div>
  )
}
