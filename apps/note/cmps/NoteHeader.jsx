import { NoteFilter } from './NoteFilter.jsx'

export function NoteHeader({ toggleSideBar }) {
  function onSideBarToggle() {
    toggleSideBar()
  }

  function onSetFilter() {
    console.log('setting filter')
  }

  return (
    <section className="notes-header">
      <div className="note-header-logos">
        <svg
          onClick={onSideBarToggle}
          className="side-bar-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          viewBox="0 -960 960 960"
          width="32px"
          fill="#5f6368"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>

        <div className="keep-logo">
          <svg
            width={'32px'}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 88"
          >
            <path
              d="M 42,22 54.065,24.28 64,22 42,0 38.965,10.43 Z"
              fill="#f29900"
            />
            <path
              d="M 42,22 V 0 H 6 C 2.685,0 0,2.685 0,6 v 76 c 0,3.315 2.685,6 6,6 h 52 c 3.315,0 6,-2.685 6,-6 V 22 Z"
              fill="#fbbc04"
            />
            <path
              d="M 39,64 H 25 V 59 H 39 Z M 38.92501,54 H 25.075 C 21.425,51.7 19,47.635 19,43 c 0,-7.18 5.82,-13 13,-13 7.18,0 13,5.82 13,13 0,4.635 -2.425,8.7 -6.075,11 z"
              fill="#fff"
            />
          </svg>

          <h2>Keep</h2>
        </div>
      </div>

      <NoteFilter onSetFilter={onSetFilter} />
      <div className="note-header-utils">
        <span>Extra buttons</span>
      </div>
    </section>
  )
}
//C:\Users\Tomer\OneDrive\Desktop\Tomer Almog\TriVault\TriValut\assets\icons\keep_icon.png
// btn to switch notes between clms and flex
// filter notes via txt
//TriValut/assets/icons/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png
