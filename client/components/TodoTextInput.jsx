import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoTextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      const text = e.target.value.trim();
      this.props.onSave(text);
    }
  }

  handleSubmit(e) {
    if (e.which === 13) {
      const text = e.target.value.trim();
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  render() {
    return (
      <input
        className={
          classnames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
          })
        }
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text} // https://facebook.github.io/react/docs/forms.html#why-controlled-components
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      /> //
    );
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
};

export default TodoTextInput;
