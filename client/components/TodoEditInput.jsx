import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';

class TodoEditInput extends Component {
  constructor() {
    super();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlur() {
    const { onSave, fields: { todoEditInput } } = this.props;
    onSave(todoEditInput.value.trim());
  }

  handleSubmit(e) {
    if (e.which === 13) { // Enter Key
      const { onSave, fields: { todoEditInput } } = this.props;
      onSave(todoEditInput.value.trim());
    }
  }

  render() {
    const { todoEditInput } = this.props.fields;
    return (
        <input
          className={
            classnames({
              edit: true
            })
          }
          type="text"
          autoFocus
          value={todoEditInput.value}
          onChange={todoEditInput.onChange}
          onBlur={this.handleBlur} // override todoEditInput's onBlur method
          onKeyDown={this.handleSubmit}
        />
    );
  } //
}

TodoEditInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  fields: PropTypes.object,
  resetForm: PropTypes.func,
  initialValues: PropTypes.object
};

TodoEditInput = reduxForm({
  form: 'todoEdit', // a unique name for this form
  fields: ['todoEditInput'], // all the fields in your form
  // initialValues: {
  //   todoEditInput: 'test..!!'
  // }
})(TodoEditInput);

export default TodoEditInput;
