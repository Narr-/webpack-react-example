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
  // for /, /index.html, /active, /active/, /active/index.html,
  // /completed, /completed/, /completed/index.html /marvel, /marvel/, /marvel/index.html
  if (reqUrl.match(/^(\/(index\.html)?|\/(active|completed|marvel)(\/|\/index\.html)?)$/)
    === null) {
    next();
  } else {
    match({ routes, location: reqUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        console.log('match..!! match..!! match..!! match..!! match..!! match..!!');
        // the leaf node (if the routing is nested, the innermost one)
        let innermostApp = renderProps.components[renderProps.components.length - 1];
        innermostApp = innermostApp.WrappedComponent ? innermostApp.WrappedComponent : innermostApp;
        // to support both http and https removes req.protocol
        const serverUrl = `//${req.get('host')}/`; // * The last slash(/) is important
        // console.log(renderProps);
        // if req.protocol is not specified, fetch api changes // to https://
        // innermostApp.fetchTodos(`${req.protocol}:${serverUrl}`, req.ip).then(result => {
        //   console.log('match2..!! match2..!! match2..!! match2..!! match2..!! match2..!!');
        //   // console.log(result);
        //   let initStore;
        //   if (!result.error) {
        //     initStore = {
        //       todos: result.todos
        //     };
        //   }
        //   const store = configureStore(initStore);
        //   const htmlString = renderToString(
        //     <Provider store={store}>
        //       {<RouterContext {...renderProps} />}
        //     </Provider>
        //   );
        //   const finalState = store.getState();

        //   let chunks = [];
        //   if (innermostApp.getChunks) {
        //     chunks = innermostApp.getChunks();
        //   }

        //   const indexPath = path.join(__dirname, '../../static/index.html');
        //   res.render(indexPath, {
        //     baseUrl: `'${serverUrl}'`,
        //     reactDom: htmlString,
        //     reduxState: JSON.stringify(finalState),
        //     scriptTags: chunks
        //   }, (err, html) => {
        //     // console.log(html);
        //     res.send(html);
        //   });
        // });

        const store = configureStore();
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
          baseUrl: `'${serverUrl}'`,
          reactDom: htmlString,
          reduxState: JSON.stringify(finalState),
          scriptTags: chunks
        }, (err, html) => {
          console.log('match2..!! match2..!! match2..!! match2..!! match2..!! match2..!!');
          res.send(html);
        });
      } else {
        next();
      }
    });
  }
}
