const { Link, NavLink } = ReactRouterDOM

export function MailSidebar() {
  return (
    <ul className="mail-side-bar">
      <li>
        <NavLink to="/mail/inbox">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/inbox_baseline_nv700_20dp.png"
            alt=""
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/mail/starred">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png"
            alt=""
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/mail/sent">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/send_baseline_nv700_20dp.png"
            alt=""
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/mail/draft">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/draft_baseline_nv700_20dp.png"
            alt=""
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/mail/trash">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"
            alt=""
          />
        </NavLink>
      </li>
    </ul>
  )
}
