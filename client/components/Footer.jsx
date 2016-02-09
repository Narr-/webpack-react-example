import React, { PropTypes, Component } from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import { Link } from 'react-router';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

const FILTER_LINKS = {
  [SHOW_ALL]: '',
  [SHOW_ACTIVE]: 'active',
  [SHOW_COMPLETED]: 'completed'
};

class Footer extends Component {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';
    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} &nbsp;left
      </span>
    );
  }

  renderFilterLink(filter) {
    // Destructuring Assignment in ECMAScript 6 => http://fitzgeraldnick.com/weblog/50/
    const { filter: selectedFilter } = this.props;
    const title = FILTER_TITLES[filter];
    const path = FILTER_LINKS[filter];

    return (
      <Link
        activeClassName="selected"
        to={`/${path}`}
        onClick={function onClickHandler(e) {
          if (selectedFilter === path) {
            e.preventDefault(); // to prevent re-rendering
          }
        }}
      >
        {title}
      </Link>
    );
  } //

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={ onClearCompleted }
        >
          Clear completed
        </button>
      );
    }
  } //

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  } //
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired
};

export default Footer;
