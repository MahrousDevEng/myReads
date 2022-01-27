// Main Imports
import PropTypes from "prop-types";
// Components
import Book from "./Book";

const BooksShelf = ({ shelf, books, changeBookShelf }) => {
  // Put each book in its shelf
  const shelfBooks = books.filter((book) => book.shelf === shelf.name);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.length ? (
            shelfBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                changeBookShelf={changeBookShelf}
              />
            ))
          ) : (
            <li style={{ color: "red" }}>There Is No Books Here...</li>
          )}
        </ol>
      </div>
    </div>
  );
};

BooksShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired,
};

export default BooksShelf;
