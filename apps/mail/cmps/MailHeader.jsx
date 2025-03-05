const { useContext, useState } = React
import { MailContext } from '../cmps/MailContext.jsx'

export function MailHeader({ toggleSideBar, unreadCount }) {
  const { setFilter } = useContext(MailContext)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (ev) => {
    const value = ev.target.value
    setSearchTerm(value)

    // פשוט קורא לפונקציה setFilter מהקונטקסט
    setFilter({ txt: value })
  }

  return (
    <section className="mail-header">
      <div onClick={toggleSideBar}>
        <i className="material-icons humburger">menu</i>
        <img
          src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png"
          alt=""
        />
      </div>

      <div className="search-mail">
        <div className="search-input">
          <div className="search-icon">
            <i className="material-icons">search</i>
          </div>
          <input
            type="text"
            placeholder="Search mail"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search-optins-icon">
            <i className="material-icons">tune</i>
          </div>
        </div>
      </div>

      {unreadCount > 0 && (
        <div className="unread-count">
          <span>{unreadCount}</span>
          <span> Unread {unreadCount === 1 ? 'Mail' : 'Mails'}</span>
        </div>
      )}

      <div>more stuff</div>
    </section>
  )
}
