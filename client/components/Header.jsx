import React, { PropTypes, Component } from 'react';
import TodoMakeInput from './TodoMakeInput';

class Header extends Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
  }

  shouldComponentUpdate() { // nextProps, nextState
    return false;
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoMakeInput
            onSave={this.handleSave}
            placeholder="What needs to be done?"
          />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
