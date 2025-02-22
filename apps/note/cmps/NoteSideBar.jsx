const { Link, NavLink } = ReactRouterDOM

export function NoteSideBar() {
  return (
    <section className="note-sidebar">
      <button>
        <Link to="/notes">Notes</Link>
      </button>
      <button>
        <Link to="/notes/memos">Memos</Link>
      </button>

      <button>Edit labels</button>
      <button>
        <Link to="/notes/archive">Archive</Link>
      </button>

      <button>
        <Link to="/notes/trash">Trash</Link>
      </button>
    </section>
  )
}
