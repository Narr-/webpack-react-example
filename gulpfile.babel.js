import gulp from 'gulp';
import childProcess from 'child_process'; // https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
import del from 'del';
import webpackConfig from './webpack.config';
import webpack from 'webpack';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import webpackStream from 'webpack-stream';
import reactHtmlGenerator from './react-html-generator';
import replace from 'gulp-replace';

const spawn = childProcess.spawn;
const defaultDistPath = './static';
const hostname = 'localhost';
const PORT = process.env.PORT || 3000;
const publicPath = `//${hostname}:${PORT}/`;

function runServer(env) {
  if (env) {
    process.env.NODE_ENV = env;
  }
  spawn('node', ['./server'], {
    stdio: 'inherit'
  });
}

function prodBuild({ cb, distPath = defaultDistPath, indexHtmlName,
  rootUrl = publicPath, extraWork = f => f }) {
  del.sync(distPath);

  const config = webpackConfig({ distPath, indexHtmlName });
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      // show the file name where error occured
      console.log(err.module.resource); // eslint-disable-line
      if (err.module.errors.length > 0) {
        // show the error detail e.g. eslint loader
        console.log(err.module.errors[0].error); // eslint-disable-line
      }
      throw new gutil.PluginError('webpack:build', err);
      // process.exit(1);
    }
    gutil.log('[build:prod]', stats.toString({
      colors: true
    }));

    extraWork(rootUrl);
    if (indexHtmlName) {
      // @ copy 404.html
      gulp.src('./server/views/404.html')
      .pipe(replace(/href="\/"/g, `href="${rootUrl}"`))
      .pipe(gulp.dest(distPath));
      // copy 404.html @
      del.sync(`${distPath}/${indexHtmlName}`);
    }
    cb();
  });
}

function lint(src) {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(src)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
}


// //////////////////////
// run dev server
gulp.task('dev', () => {
  runServer();
});

gulp.task('default', ['dev']);

// //////////////////////
// dev build => to use watch mode without the dev server or dev middleware
gulp.task('build', () => {
  del.sync(defaultDistPath);
  const webpackConfigObj = {
    dev: true,
    // // add protocol for url in Blob CSS
    publicPath: `http:${publicPath}` // * The last slash(/) is important
  };
  const config = webpackConfig(webpackConfigObj);
  config.watch = true; // only for webpackStream
  config.verbose = true; // only for webpackStream
  return gulp.src('./client/index.js')
    .pipe(webpackStream(config))
    .on('error', (err) => { // dummy fn to handle error
      console.log(err); // eslint-disable-line no-console
       // as of now, if error occurs, the build process won't rewrite files
       // should check this later again, for now just exit
      process.exit(1);
    })
    .pipe(gulp.dest(defaultDistPath));
});

// //////////////////////
// production build
gulp.task('prod-build', cb => {
  prodBuild({ cb });
});

// //////////////////////
// start server in production mode
gulp.task('server', () => {
  runServer('production');
});

// //////////////////////
// production build and server
gulp.task('prod', cb => {
  runSequence('prod-build', 'server', cb);
});


// //////////////////////
// lint js files in project root folder and other folders
gulp.task('lint-root', () =>
  lint(['./*.js', './react-html-generator/*.js'])
);

// //////////////////////
// lint js files in server folder
gulp.task('lint-server', () =>
  lint(['./server/**/*.js'])
);

// //////////////////////
// lint all js files
gulp.task('lint', ['lint-root', 'lint-server']);


// //////////////////////
// generate static pages from react components
gulp.task('gh', cb => {
  prodBuild({
    cb,
    distPath: './gh-pages',
    indexHtmlName: 'index.tmpl',
    // * The last slash(/) is important and first // is to support both http and https
    rootUrl: '//narr.github.io/webpack-react-example/',
    extraWork: reactHtmlGenerator
  });
});

// //////////////////////
// start gh-server
gulp.task('gh-server', () => {
  runServer('gh-pages');
});

// //////////////////////
// generate static pages from react components
gulp.task('gh-all', cb => {
  runSequence('gh', 'gh-server', cb);
});
