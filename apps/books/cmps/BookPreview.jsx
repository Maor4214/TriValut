export function BookPreview({ book }) {
  return (
    <div className="book-preview" key={book.id}>
      <div className="book-title">{book.title}</div>
      <div className="book-price">Price ${book.listPrice.amount}</div>
      <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />
    </div>
  );
}
