import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';

class TodoMakeInput extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    if (e.which === 13) { // Enter Key
      const { onSave, fields: { todoMakeInput } } = this.props;
      onSave(todoMakeInput.value.trim());
      todoMakeInput.onChange('');
    }
  }

  render() {
    const { placeholder, fields: { todoMakeInput } } = this.props;
    return (
        <input
          className={
            classnames({
              'new-todo': true
            })
          }
          type="text"
          placeholder={placeholder}
          autoFocus
          {...todoMakeInput}
          onKeyDown={this.handleSubmit}
        />
    );
  } //
}

TodoMakeInput.propTypes = {
  placeholder: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  fields: PropTypes.object,
  resetForm: PropTypes.func
};

TodoMakeInput = reduxForm({
  form: 'todoMake', // a unique name for this form
  fields: ['todoMakeInput'], // all the fields in your form
  // initialValues: {
  //   todoMakeInput: 'test..!!'
  // }
})(TodoMakeInput);

export default TodoMakeInput;
