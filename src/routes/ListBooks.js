// Main Imports
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Components
import BooksShelf from "../components/BooksShelf";

const ListBooks = ({ books, changeBookShelf }) => {
  // Static data
  const shelfs = [
    {
      id: 1,
      title: "Currently Reading",
      name: "currentlyReading",
    },
    {
      id: 2,
      title: "Want to Read",
      name: "wantToRead",
    },
    {
      id: 3,
      title: "Read",
      name: "read",
    },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.length !== 0 &&
            shelfs.map((shelf) => (
              <BooksShelf
                key={shelf.id}
                shelf={shelf}
                books={books}
                changeBookShelf={changeBookShelf}
              />
            ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button style={{ cursor: "pointer" }}>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired,
};

export default ListBooks;
