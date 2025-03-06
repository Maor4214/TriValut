import { mailService } from '../services/mail.service.js'

const { useSearchParams, useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React

export function MailInfo() {
  const [mail, setMail] = useState(null)
  const navigate = useNavigate()
  const { mailId } = useParams()
  useEffect(() => {
    loadMail()
  }, [mailId])

  function onGoBack() {
    navigate(-1)
  }

  function onSendArchive() {
    console.log('sending to archive..')
  }
  function onReportSpam() {
    console.log('mail reported as a spam..')
  }

  function onSendDelete() {
    console.log('sending this mail to trash folder')
  }

  function onMarkUnread() {
    console.log('mail now Unread..')
  }

  function loadMail() {
    mailService
      .get(mailId)
      .then((mail) => setMail(mail))

      .catch((err) => console.log('err:', err))
  }
  console.log('your mail info', mail)
  if (!mail) return 'loading....'
  return (
    <section className="view-mail">
      <nav className="mail-nav">
        <svg
          onClick={onGoBack}
          className="go-back"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <svg
          onClick={onSendArchive}
          className="send-archive"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z" />
        </svg>

        <svg
          onClick={onReportSpam}
          className="report-spam"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
        </svg>
        <svg
          onClick={onSendDelete}
          className="delete-mail"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>

        <svg
          onClick={onMarkUnread}
          className="mark-unread"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h404q-4 20-4 40t4 40H160l320 200 146-91q14 13 30.5 22.5T691-572L480-440 160-640v400h640v-324q23-5 43-14t37-22v360q0 33-23.5 56.5T800-160H160Zm0-560v480-480Zm600 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" />
        </svg>
        <svg
          onClick={() => onChangeMail(-1)}
          className="older-mail"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>

        <svg
          onClick={() => onChangeMail(1)}
          className="newer-mail"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#787b7b"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </nav>
      <div className="mail-info-header">
        <h2>{mail.subject}</h2>
      </div>

      <div className="mail-meta">
        <div>
          <div className="mail-from">{mail.from}</div>
          <div className="mail-to">to me</div>
        </div>
        <div className="mail-date">{mail.createdAt}</div>
      </div>

      <p className="mail-body">{mail.body}</p>
    </section>
  )
}
