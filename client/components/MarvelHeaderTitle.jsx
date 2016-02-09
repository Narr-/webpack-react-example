import './MarvelHeaderTitle.scss';

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MarvelHeaderTitle extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="todo-marvel-transition"
        transitionAppear transitionAppearTimeout={10000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <h1 className="header-todos">todos</h1>
        <div className="header-marvel">
          <div>
            <span className="sprite-icon-captain-america"></span>
            <span className="sprite-icon-hulk"></span>
            <span className="sprite-icon-ironman"></span>
            <span className="sprite-icon-thor"></span>
          </div>
          <div>
            <span className="sprite-icon-deadpool"></span>
            <span className="sprite-icon-ghost-rider"></span>
            <span className="sprite-icon-spiderman"></span>
            <span className="sprite-icon-wolverine"></span>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  } //
}

// type.name is set to "o" when minifiying components so set displayName
MarvelHeaderTitle.displayName = 'MarvelHeaderTitle';

export default MarvelHeaderTitle;
