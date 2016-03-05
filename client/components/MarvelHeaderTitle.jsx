// In order for it to apply transitions to its children,
// ReactTransitionGroup and the ReactCSSTransitionGroup must already be mounted in the DOM

// use webpack require for dynamic loading because of server rendering
// import './MarvelHeaderTitle.scss';
if (typeof WEBPACK_VAR !== 'undefined') {
  require('./MarvelHeaderTitle.scss');
}

import React, { Component } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import d3 from 'd3';

class MarvelHeaderTitle extends Component {
  /*
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
  */

  /* eslint-disable no-unused-vars */
  componentDidMount() {
    if (typeof console !== 'undefined') {
      console.log('MarvelHeaderTitle componentDidMount'); // eslint-disable-line no-console
    }
    d3.select(this.headerMarvel).transition().style('opacity', 1).duration(5000);
    d3.select(this.headerTodos).transition().style('opacity', 0).duration(5000);
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }

  componentWillAppear(didAppearCallback) {
    // console.log('componentWillAppear');
    // didAppearCallback(); // call componentDidAppear
  }

  componentDidAppear() {
    // console.log('componentDidAppear');
  }

  componentWillEnter(didEnterCallback) {
    // console.log('componentWillEnter');
    // didEnterCallback();
  }

  componentDidEnter() {
    // console.log('componentDidEnter');
  }

  componentWillLeave(didLeaveCallback) {
    // console.log('componentWillLeave');
    // didLeaveCallback();
  }

  componentDidLeave() {
    // console.log('componentDidLeave');
  }
  /* eslint-enable */

  render() {
    const that = this;
    return (
      <div>
        <h1 className="header-todos" ref={function refCallback(ref) {
          that.headerTodos = ref;
        }}
        >
          todos
        </h1>
        {
          /* // for highlighting problem in Sublime Text */
        }
        <div className="header-marvel" ref={function refCallback(ref) {
          that.headerMarvel = ref;
        }}
        >
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
      </div>
    );
  } //
}

// type.name is set to "o" when minifiying components so set displayName
MarvelHeaderTitle.displayName = 'MarvelHeaderTitle';

export default MarvelHeaderTitle;
