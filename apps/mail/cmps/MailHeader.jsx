const { useContext, useState } = React
import { MailContext } from '../cmps/MailContext.jsx'

export function MailHeader({ toggleSideBar, unreadCount, account }) {
  const { setFilter } = useContext(MailContext)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (ev) => {
    const value = ev.target.value
    setSearchTerm(value)

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
      <div className="mail-utils-btns">
        <button className="clean-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z" />
          </svg>
        </button>
        <button
          title={`TriValut account
            ${account.fullname}
            ${account.email}`}
          className="clean-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="42px"
            viewBox="0 -960 960 960"
            width="42px"
            fill="#5f6368"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
        </button>
      </div>
    </section>
  )
}
