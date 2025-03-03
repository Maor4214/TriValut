import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

const { useState, useEffect } = React
const debounceSave = utilService.debounce(mailService.save, 1500)

export function MailCompose() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mailToCreate, setMailToCreate] = useState(mailService.getEmptymail())

  useEffect(() => {
    mailService.save(mailToCreate).then((mail) => setMailToCreate(mail))
  }, [])
  const handleSend = () => {
    console.log('Sending email...')
  }

  const closeCompose = () => {
    setIsOpen(!isOpen)
    mailService.save(mailToCreate)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setMailToCreate((prevInfo) => ({ ...prevInfo, [field]: value }))
    debounceSave(mailToCreate)
  }

  const { to, subject, body } = mailToCreate

  return (
    <React.Fragment>
      <div className={`compose-wrapper ${isOpen ? 'open' : ''}`}>
        <div className={`compose-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="compose-header">
            <button className="minimize-btn" onClick={handleMinimize}>
              _
            </button>
            <h2>New Message</h2>
            <button className="close-btn" onClick={closeCompose}>
              X
            </button>
          </div>
          <form>
            <div className="email-field">
              <label htmlFor="to">To</label>
              <input
                onChange={handleChange}
                id="to"
                name="to"
                type="email"
                placeholder="Recipient"
                value={to}
              />
            </div>
            <div className="email-field">
              <label htmlFor="subject">Subject</label>
              <input
                onChange={handleChange}
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject"
                value={subject}
              />
            </div>
            <textarea
              name="body"
              value={body}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows="10"
            />
            <div className="compose-actions">
              <button className="cancel-button" onClick={closeCompose}>
                Cancel
              </button>
              <button className="send-button" onClick={handleSend}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
