const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setfilterByToEdit] = useState({ ...filterBy })
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    onSetFilterBy({ ...filterByToEdit, sortBy })
  }, [filterByToEdit, sortBy])

  function onHandleChange(ev) {
    let { value, name: field } = ev.target

    if (field === 'listPrice') {
      setfilterByToEdit((prevFilterBy) => ({
        ...prevFilterBy,
        listPrice: { ...prevFilterBy.listPrice, amount: +value },
      }))
    } else {
      setfilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }
  }

  function onSortChange(ev) {
    setSortBy(ev.target.value)
  }

  function onSubmitForm(ev) {
    ev.preventDefault()
    onSetFilterBy({ ...filterByToEdit, sortBy })
  }

  return (
    <section className="book-filter">
      <h2>Filter Books</h2>

      <form onSubmit={onSubmitForm}>
        <div className="filter-section">
          <label htmlFor="txt">Title:</label>
          <input
            name="title"
            value={filterByToEdit.title}
            onChange={onHandleChange}
            type="text"
            id="txt"
          />

          <label htmlFor="listPrice">Price:</label>
          <input
            name="listPrice"
            value={filterByToEdit.listPrice.amount || ''}
            onChange={onHandleChange}
            type="number"
            id="listPrice"
          />
        </div>

        <div className="spacer"></div>

        <div className="sort-section">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={onSortChange}>
            <option value="title">Title A-Z</option>
            <option value="titleDesc">Title Z-A</option>
            <option value="priceLow">Price Low-High</option>
            <option value="priceHigh">Price High-Low</option>
          </select>
        </div>
      </form>
    </section>
  )
}
