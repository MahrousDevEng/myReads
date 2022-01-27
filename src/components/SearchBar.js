// Main Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

class SearchBar extends Component {
  static propTypes = {
    showQueryResults: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  componentWillUnmount() {
    this.handleDebounce.cancel();
  }

  handleDebounce = debounce((query) => this.props.showQueryResults(query), 300);

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
    this.handleDebounce(query);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
