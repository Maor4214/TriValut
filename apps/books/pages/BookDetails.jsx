import { bookService } from "../services/books.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";
const { useState, useEffect } = React;
const { useParams, Link } = ReactRouterDOM
export function BookDetails() {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  useEffect(() => {
    loadBook();
  }, []);

  function loadBook() {
    bookService.getBook(bookId).then((book) => setBook(book));
  }

  if (!book) return <p className="loading">Loading...</p>;

  return (
    <section className="book-details">
      <button className="back-btn" >
        <Link to="/books">← Back</Link>
      </button>
      <div className="book-header">
        <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />
        <div className="book-info">
          <h1>{book.title}</h1>
          <h2>{book.subtitle}</h2>
          <p className="book-authors">By {book.authors.join(", ")}</p>
          <p className="book-category">
            Category: {book.categories.join(", ")}
          </p>
          <p className="book-year">
            Published: {book.publishedDate}
            <span>
              {" "}
              -
              {new Date().getFullYear() - book.publishedDate > 10
                ? "Vintage"
                : new Date().getFullYear() - book.publishedDate < 1
                ? "New"
                : ""}
            </span>
          </p>
        </div>
      </div>
      <p className="book-pagecount">
        📖 {book.pageCount} pages{"  -  "}
        <span className="book-pagecount-desc">
          {book.pageCount > 500
            ? "Serious Reading"
            : book.pageCount > 200
            ? "Decent Reading"
            : "Light Reading"}
        </span>
      </p>
      <p className="book-language">
        🌎 Language: {book.language.toUpperCase()}
      </p>
      <p className="book-price">
        💰 Price:{" "}
        <span
          className={
            book.listPrice.amount > 150
              ? "red"
              : book.listPrice.amount < 20
              ? "green"
              : ""
          }
        >
          {" "}
          {book.listPrice.amount}{" "}
        </span>{" "}
        {book.listPrice.currencyCode}{" "}
        {book.listPrice.isOnSale && (
          <span className="on-sale">🔥 On Sale!</span>
        )}
      </p>
      <LongTxt className="book-description" txt={book.description}></LongTxt>
    </section>
  );
}
