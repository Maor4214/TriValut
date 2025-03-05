import { mailService } from '../services/mail.service.js'
import { MailContext } from '../cmps/MailContext.jsx'

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

const markAsRead = (
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

const unMarkAsRead = (
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
    calculateUnreadCount,
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
      console.log('mail', mailList)
    })
  }

  function toggleStarredStatus(mailObj, statusType) {
    const statusKey = `is${statusType}`

    const updatedMail = {
      ...mailObj,
      [statusKey]: !mailObj[statusKey],
    }

    mailService.save(updatedMail).then(() => {
      setMails((prevMails) =>
        prevMails.map((mail) =>
          mail.id === updatedMail.id ? updatedMail : mail
        )
      )
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
          calculateUnreadCount()
          navigate(`/mail/info/${id}`)
        })
      }
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
                onClick={(ev) => {
                  ev.stopPropagation()
                  toggleStarredStatus(mail, 'Starred')
                }}
              >
                {mail.isStarred ? markStar : unMarkStar}
              </div>
              <div
                onClick={(ev) => {
                  ev.stopPropagation()
                  toggleStarredStatus(mail, 'Importent')
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
                onClick={(ev) => {
                  ev.stopPropagation()
                  // Function to move to archive
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#787b7b"
                >
                  <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z" />
                </svg>
              </div>

              <div
                onClick={(ev) => {
                  ev.stopPropagation()
                  // Function to move to trash
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
                onClick={(ev) => {
                  ev.stopPropagation()
                  toggleStarredStatus(mail, 'Read')
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
