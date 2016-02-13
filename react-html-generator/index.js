require('babel-core/register')({
  // when executed by gulp.bable.js, the default extension is just .js so add .jsx
  extensions: ['.jsx', '.js']
});

export default function starter() {
  require('./runner').default();
}
