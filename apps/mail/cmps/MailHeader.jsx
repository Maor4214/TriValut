export function MailHeader({ toggleSideBar }) {
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
          <input type="text" placeholder="Search mail" />
          <div className="search-optins-icon">
            <i className="material-icons">tune</i>
          </div>
        </div>
      </div>

      <div>more stuff</div>
    </section>
  )
}
