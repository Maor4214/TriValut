import { bookService } from '../services/books.service.js'
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

  const { bookId } = useParams()
  console.log('bookId', bookId)

  useEffect(() => {
    if (bookId) {
      loadBook()
    }
  }, [bookId])

  function loadBook() {
    bookService
      .getBook(bookId)
      .then(setBookToEdit)
      .catch((err) => {
        console.log('err', err)
      })
  }

  const navigate = useNavigate()

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    console.log('field', field)
    console.log('value', value)
    console.log('target', target.type)
    // value += ','
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
      case 'text':
        value = target.value
        break
    }

    setBookToEdit((prevBookToEdit) => {
      if (field === 'listPrice') {
        return {
          ...prevBookToEdit,
          listPrice: { ...prevBookToEdit.listPrice, amount: value },
        }
      }
      return {
        ...prevBookToEdit,
        [field]: value,
      }
    })
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .updateBook(bookToEdit)
      .then((book) => {
        showSuccessMsg('Book has successfully saved!')
        console.log('book', 'edited book')
      })
      .catch((err) => {
        showErrorMsg(`couldn't save book`)
      })
      .finally(() => navigate('/books'))
  }

  const {
    title,
    listPrice,
    description,
    pageCount,
    publishedDate,
    thumbnail,
    authors,
    categories,
  } = bookToEdit
  console.log('bookToEdit', bookToEdit)

  return (
    <section className="book-edit">
      <h1>{bookId ? 'Edit Book' : 'Add Book'}</h1>

      <form className="book-edit-form" onSubmit={onSaveBook}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleChange}
          name="title"
        />

        <label htmlFor="listPrice">Listed Price:</label>
        <input
          type="number"
          id="listPrice"
          value={listPrice.amount || ''}
          onChange={handleChange}
          name="listPrice"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
          name="description"
        />

        <label htmlFor="pageCount">Page Count:</label>
        <input
          type="number"
          id="pageCount"
          value={pageCount}
          onChange={handleChange}
          name="pageCount"
        />

        <label htmlFor="publishedDate">Published Date:</label>
        <input
          type="date"
          id="publishedDate"
          value={publishedDate}
          onChange={handleChange}
          name="publishedDate"
        />

        <button onClick={onSaveBook}>{bookId ? 'Save' : 'Add'}</button>
        <button onClick={() => navigate('/books')}>Cancel</button>
      </form>
    </section>
  )
}
