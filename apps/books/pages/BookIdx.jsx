const { useEffect, useState } = React

import { bookService } from '../services/books.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIdx() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      setBooks(books)
    })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy({ ...filterBy })
    console.log('new filter is ', filterBy)
  }

  function onRemoveBook(bookId) {
    bookService.removeBook(bookId).then(() => {
      loadBooks()
    })
  }

  if (!books) return <div>Loading....</div>

  return (
    <section className="book-index">
      <React.Fragment>
        <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <BookList onRemoveBook={onRemoveBook} books={books} />
      </React.Fragment>
    </section>
  )
}
