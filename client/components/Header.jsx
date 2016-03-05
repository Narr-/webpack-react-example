import React, { PropTypes, Component } from 'react';
import TodoMakeInput from './TodoMakeInput';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import Spinner from './Spinner';
import ReactTransitionGroup from 'react-addons-transition-group';

class Header extends Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      loadingMarvel: false
    };
  }

  // shouldComponentUpdate() { // nextProps, nextState
  //   return false;
  // }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  renderTitle(marvelHeaderTitle) {
    let dom;
    if (marvelHeaderTitle) {
      dom = (
        <ReactTransitionGroup>
          {marvelHeaderTitle}
        </ReactTransitionGroup>
      ); //
    } else {
      dom = (
        <h1>todos</h1>
      ); //
    }
    return dom;
  }

  renderMarvelLink(isFromMarvel) {
    let dom; // eslint-disable-line
    const that = this;
    if (!that.state.loadingMarvel) {
      dom = (
        <a
          onClick={function onClickHandler() {
            if (!isFromMarvel) {
              that.setState({ loadingMarvel: true });
              // @ test code
              // setTimeout(() => {
              //   browserHistory.push('/marvel');
              // }, 2000);
              // test code @

              // @ for unit-test
              // if (typeof KARMA_TEST !== 'undefined') {
                // can't mock require.ensure. If tried it, require's cotext would change and
                // load unrequired scss files in the components folder
                // if (!require.ensure) {
                  // require.ensure = rewireVar;
                // }
              // }
              // for unit-test @

              if (typeof KARMA_TEST === 'undefined') {
                require.ensure(['../containers/Marvel'], () => { // eslint-disable-line
                  browserHistory.push('/marvel/');
                }, () => { // error callback
                  that.setState({ loadingMarvel: false });
                }, 'marvel');
              }
            }
          }}
        />
      ); //
    } else {
      dom = (
        <Spinner />
      );
    }
    return (
      <span className="icon-marvel-logo">{dom}</span>
    );
  } //

  render() {
    const { isFromMarvel } = this.props;
    let marvelHeaderTitle;

    if (isFromMarvel) {
      // https://facebook.github.io/react/docs/top-level-api.html#react.children
      React.Children.map(this.props.children, (child) => {
        // type.name is set to "o" when minifiying components so set displayName
        // console.log(child.type.displayName);
        if (child.type.displayName === 'MarvelHeaderTitle') {
          marvelHeaderTitle = child;
        }
      });
    }

    return (
      <header
        className={
          classnames({
            header: !isFromMarvel,
            'marvel-header': isFromMarvel
          })
        }
      >
        {this.renderTitle(marvelHeaderTitle)}
        {this.renderMarvelLink(isFromMarvel)}
        <TodoMakeInput
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
  isFromMarvel: PropTypes.bool,
  children: PropTypes.element
};

export default Header;
