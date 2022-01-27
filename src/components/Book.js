// Main Imports
import PropTypes from "prop-types";
// Components
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, changeBookShelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                // Handle books with no imgs
                Object.keys(book).includes("imageLinks") &&
                `url("${book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <BookShelfChanger book={book} changeBookShelf={changeBookShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {/* Handle book with no authors */}
          {book.authors?.length
            ? book.authors.map((author) => <span key={author}>{author}</span>)
            : "No Authors"}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookShelf: PropTypes.func.isRequired,
};

export default Book;
