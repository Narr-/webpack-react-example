import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../client/routes';
import { Provider } from 'react-redux';
// no need dev store for just rendering doms
import configureStore from '../../client/store/configureStore.prod';
import path from 'path';

export default function (req, res, next) {
  const reqUrl = req.url;
  // for /, /active, /completed, /marvel
  if (reqUrl.match(/(\/|\/(active|completed|marvel))$/) === null) {
    next();
  } else {
    match({ routes, location: reqUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // the leaf node (if the routing is nested, the innermost one)
        let innermostApp = renderProps.components[renderProps.components.length - 1];
        innermostApp = innermostApp.WrappedComponent ? innermostApp.WrappedComponent : innermostApp;
        // console.log(innermostApp);
        const serverUrl = `${req.protocol}://${req.get('host')}/`; // * The last slash(/) is important
        // console.log(serverUrl);
        innermostApp.fetchTodos(serverUrl).then(result => {
          // console.log(result);
          if (!result.error) {
            const store = configureStore({
              todos: result.todos
            });
            const htmlString = renderToString(
              <Provider store={store}>
                {<RouterContext {...renderProps} />}
              </Provider>
            );
            const finalState = store.getState();

            let chunks = [];
            if (innermostApp.getChunks) {
              chunks = innermostApp.getChunks();
            }

            const indexPath = path.join(__dirname, '../../static/index.html');
            res.render(indexPath, {
              baseTag: serverUrl,
              reactDom: htmlString,
              reduxState: JSON.stringify(finalState),
              scriptTags: chunks
            }, (err, html) => {
              // console.log(html);
              res.send(html);
            });
          } else if (reqUrl === '/') {
            const indexPath = path.join(__dirname, '../../static/index.html');
            res.render(indexPath, {
              baseTag: serverUrl,
              reactDom: '',
              reduxState: 'null',
              scriptTags: []
            }, (err, html) => {
              // console.log(html);
              res.send(html);
            });
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });
  }
}
