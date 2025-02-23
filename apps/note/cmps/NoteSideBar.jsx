const { Link, NavLink } = ReactRouterDOM
export function NoteSideBar() {
  return (
    <section className="note-sidebar">
      {/* <div className="burger-container">
        <label className="burger" htmlFor="burger">
          <input type="checkbox" id="burger" />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div> */}

      <button>
        <NavLink to="/notes" end>
          <i className="fa-solid fa-lightbulb"></i>Notes
        </NavLink>
      </button>

      <button>
        <NavLink to="/notes/memos">
          <i className="fa-solid fa-bell"></i>Memos
        </NavLink>
      </button>

      <button>
        <i className="fa-solid fa-pencil"></i>Edit labels
      </button>

      <button>
        <NavLink to="/notes/archive">
          <i className="fa-solid fa-box-archive"></i>Archive
        </NavLink>
      </button>

      <button>
        <NavLink to="/notes/trash">
          <i className="fa-solid fa-trash"></i>Trash
        </NavLink>
      </button>
    </section>
  )
}
