import { utilService } from '../../../services/util.service.js'
const { useEffect, useState, useRef } = React

export function NoteFilter({ onSetFilter, handleSearch, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter, 500))

  useEffect(() => {
    onSetFilterDebounced.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === 'number') value = +value
    // if(type === 'checkbox') value = target.checked

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    console.log('filter by to edit: ', filterByToEdit)
  }
  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }
  const { title, txt } = filterByToEdit

  return (
    <form className="note-filter-form" onSubmit={onSubmitFilter}>
      <button className="note-search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
        </svg>
      </button>
      <div className="note-filter">
        <input
          type="text"
          placeholder="Search notes..."
          name="txt"
          value={txt}
          onChange={handleChange}
        />
      </div>
      <button className="note-clear-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
        </svg>
      </button>
    </form>
  )
}
