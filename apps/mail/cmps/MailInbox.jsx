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
            <label htmlFor="checkbox"></label>
            <button>importent</button>
            <div className="sent-by">{mail.from}</div>
            <div className="mail-title">{mail.subject}</div>
            <div className="mail-body">{mail.body}</div>
          </div>
        )
      })}
    </div>
  )
}
