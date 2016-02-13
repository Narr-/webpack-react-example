/* eslint-disable no-console */

import express from 'express';
import compression from 'compression';
import path from 'path';
import http from 'http';

const PORT = 3000;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../gh-pages')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../gh-pages/404.html'));
});

const server = http.createServer(app);
server
  .listen(PORT, () => {
    console.log(`==> 🌎  Listening on port ${PORT}.` +
      ` Open up http:\/\/localhost:${PORT} in your browser.`);
  })
  .on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.log('The port is already in use..!!');
    }
  });
