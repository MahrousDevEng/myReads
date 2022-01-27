// Main Imports
import React, { Component } from "react";
import PropTypes from "prop-types";

class BookShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
  };

  state = {
    selectedShelf: this.props.book.shelf ? this.props.book.shelf : "none", // Default value for any book not in the shelfs
  };
  // Change | Add book shelf
  handleChange = (e) => {
    const newShelf = e.target.value;
    this.props.changeBookShelf(this.props.book, newShelf);
    // Change state property with user inputs
    this.setState({ selectedShelf: newShelf });
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.selectedShelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
