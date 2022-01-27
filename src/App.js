// Main Imports
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
// Components
import ListBooks from "./routes/ListBooks";
import SearchBooks from "./routes/SearchBooks";
// Styles
import "./App.css";

class App extends Component {
  state = {
    books: [],
    isMount: true,
  };

  componentDidMount() {
    this.setState({ isMount: true });
    // Get All Books In Shelfs
    BooksAPI.getAll().then((data) => {
      this.state.isMount && this.setState({ books: data });
    });
  }
  // Clear Up function to stop async
  componentWillUnmount() {
    this.setState({ isMount: false });
  }

  changeBookShelf = (book, newShelf) => {
    // Clone of books in state
    const books = this.state.books;
    // Get specific book depending on its id
    const isExist = books.filter((checkBook) => checkBook.id === book.id);
    // Makesure the book already exist to handle change in shelf
    if (isExist.length) {
      // As id is unique the array will have only one element
      isExist[0].shelf = newShelf;
      // Update books in state
      this.setState({ books });
      // Update books in serveer side
      this.state.isMount && BooksAPI.update(book, newShelf);
    }
    // Add new book to shelfs
    else {
      // Set book shelf property
      const bookObject = { ...book, shelf: newShelf };
      // Add book to state
      this.setState((prevState) => {
        // Makesure the book shelf is not "none"
        if (newShelf !== "none") {
          return {
            books: [...prevState.books, bookObject],
          };
        }
      });
      // Add book to server side
      this.state.isMount && BooksAPI.update(bookObject, newShelf);
    }
  };

  render() {
    const books = this.state.books;
    return (
      <div className="app">
        {/* Show only one component at path */}
        <Switch>
          <Route
            exact // Take what after "/"
            path="/"
            render={() => (
              <ListBooks books={books} changeBookShelf={this.changeBookShelf} />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                changeBookShelf={this.changeBookShelf}
                shelfBooks={this.state.books}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
