// Main Imports
import React, { Component } from "react";
import { search } from "../BooksAPI";
import PropTypes from "prop-types";
// Components
import SearchBar from "../components/SearchBar";
import Book from "../components/Book";

class SearchBooks extends Component {
  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
  };

  state = {
    searchResults: [],
  };

  showQueryResults = (query) => {
    if (query) {
      search(query.trim().toLowerCase()).then((data) => {
        const { shelfBooks } = this.props;
        const searchResults = data;

        for (let book in shelfBooks) {
          for (let result in searchResults) {
            if (shelfBooks[book].id === searchResults[result].id) {
              searchResults[result].shelf = shelfBooks[book].shelf;
            }
          }
        }

        this.setState({ searchResults });
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    return (
      <div style={{ paddingTop: "60px" }}>
        <SearchBar showQueryResults={this.showQueryResults} />
        <div className="list-books-content">
          <ol className="books-grid">
            {this.state.searchResults.length ? (
              this.state.searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  changeBookShelf={this.props.changeBookShelf}
                />
              ))
            ) : (
              <li style={{ color: "red" }}>There Is No Books To Show...</li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
