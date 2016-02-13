/* eslint-disable no-console */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

function generator({ routes, store, targets, indexPath }) {
  targets.forEach((target) => {
    // console.log(target);
    match({ routes, location: target }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log(error.message);
      } else if (redirectLocation) {
        console.log(`redirection: ${redirectLocation.pathname + redirectLocation.search}`);
      } else if (renderProps) {
        // the leaf node (if the routing is nested, the innermost one)
        let innermostApp = renderProps.components[renderProps.components.length - 1];
        innermostApp = innermostApp.WrappedComponent ? innermostApp.WrappedComponent : innermostApp;
        // console.log(innermostApp);
        const finalStore = store();
        const htmlString = renderToString(
          <Provider store={finalStore}>
            {<RouterContext {...renderProps} />}
          </Provider>
        );
        // console.log(htmlString);
        const finalState = finalStore.getState();
        let chunks = [];
        if (innermostApp.getChunks) {
          chunks = innermostApp.getChunks();
        }

        const finalHtml = ejs.render(fs.readFileSync(`${indexPath}/index.tmpl`, 'utf8'), {
          reactDom: htmlString,
          reduxState: JSON.stringify(finalState),
          scriptTags: chunks
        });

        const targetPath = path.join(indexPath, target);
        // console.log(targetPath);
        try {
          fs.accessSync(targetPath);
        } catch (e) {
          fs.mkdirSync(targetPath);
        }
        fs.writeFileSync(`${targetPath}/index.html`, finalHtml);
      } else {
        console.log(`no match path: ${target}`);
      }
    });
  });
}

export default generator;
