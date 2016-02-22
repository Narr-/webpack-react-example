# webpack-react-example
An example of using Gulp, Webpack, React, and Redux
<br>[![Build Status](https://travis-ci.org/narr/webpack-react-example.svg?branch=master)](https://travis-ci.org/narr/webpack-react-example)
<br>Github page link: <https://narr.github.io/webpack-react-example/>
<br>Heroku site link: <https://webpack-react-example.herokuapp.com/>
<br>
<br>
<br>

## Install and Run in Production Mode
Delete npm-shrinkwrap.json and Install node modules for production and Run
```sh
rm -rf ./npm-shrinkwrap.json
cp ./npm-shrinkwrap.prod.json ./npm-shrinkwrap.json
npm install --production
npm start
```
<br>

## Install and Run in Development Mode
```sh
npm install -g gulp
npm install
gulp
```
<br>

## Generate static pages and Run the server
```sh
npm install -g gulp
npm install
gulp gh-all
```
<br>

## Docker
### Prerequisites
[Docker](http://docs.docker.com/mac/started)
```sh
docker-compose up -d
```
After that, open http://"docker-machine's IP" on a browser
<br>
