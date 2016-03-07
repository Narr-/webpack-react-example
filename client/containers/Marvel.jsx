import React, { Component, PropTypes } from 'react';
import App from './App';
import MarvelHeaderTitle from '../components/MarvelHeaderTitle';

class Marvel extends Component {
  static getChunks() {
    return [
      'marvel.chunk.js'
    ];
  }

  static fetchTodos(uri, userIp) {
    return App.WrappedComponent ? App.WrappedComponent.fetchTodos(uri, userIp)
     : App.fetchTodos(uri, userIp);
  }

  render() {
    const { params, route } = this.props;
    return (
      <div>
        <App params={params} route={route}>
          <MarvelHeaderTitle />
        </App>
      </div>
    );
  } //
}

Marvel.propTypes = {
  params: PropTypes.object.isRequired, // from react-router
  route: PropTypes.object.isRequired // from react-router
};

export default Marvel;
