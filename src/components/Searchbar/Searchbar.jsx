import { Component } from "react";
import s from "./Searchbar.module.scss";
import { BiSearchAlt } from "react-icons/bi";
import PropTypes from "prop-types";

class Searchbar extends Component {
  state = {
    inputText: "",
  };

  onSearchInput = ({ target }) => {
    this.setState({ inputText: target.value.toLowerCase() });
  };

  onSubmitForm = (e) => {
    const { inputText } = this.state;
    e.preventDefault();
    if (!inputText.trim()) {
      return alert("Input some text");
    }
    this.props.onSubmit(inputText);
    this.setState({ inputText: "" });
  };

  render() {
    const { inputText } = this.state;
    const { onSearchInput, onSubmitForm } = this;
    return (
      <header className={s.SearchBar}>
        <form onSubmit={onSubmitForm} className={s.SearchForm}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>
              <BiSearchAlt />
            </span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            value={inputText}
            placeholder="Search images and photos"
            onChange={onSearchInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  inputText: PropTypes.string.isRequired,
};
