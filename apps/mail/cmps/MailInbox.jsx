import { mailService } from '../services/mail.service.js'

const { useEffect, useState } = React
const { useSearchParams, useNavigate, useParams } = ReactRouterDOM

export function MailInbox() {
  const [mail, setMail] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )
  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams(filterBy)
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService.query(filterBy).then((mail) => {
      setMail(mail)
      console.log('mail', mail)
    })
  }

  function onOpenMailInfo(id) {
    console.log('id', id)
    navigate(`/mail/info/${id}`)
  }

  if (!mail) return 'Loading...'
  return (
    <div className="main-mail-layout">
      {mail.map((mail) => {
        return (
          <div
            key={mail.id}
            className="mail-item"
            onClick={() => onOpenMailInfo(mail.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#787b7b"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#787b7b"
            >
              <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#787b7b"
            >
              <path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z" />
            </svg>

            <div className="sent-by">{mail.from}</div>
            <div className="mail-title">{mail.subject}</div>
            <div className="mail-body">{mail.body}</div>
          </div>
        )
      })}
    </div>
  )
}
