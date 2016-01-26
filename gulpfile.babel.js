import gulp from 'gulp';
import childProcess from 'child_process'; // https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
import del from 'del';
import webpackConfig from './webpack.config';
import webpack from 'webpack';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';

const spawn = childProcess.spawn;

function runServer(env) {
  if (env === 'prod') {
    process.env.NODE_ENV = 'production';
  }
  spawn('node', ['./server'], {
    stdio: 'inherit'
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
// production build
gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  del.sync('./static');

  const config = webpackConfig({});
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
    cb();
  });
});

// //////////////////////
// start server in production mode
gulp.task('server', () => {
  runServer('prod');
});

// //////////////////////
// production build and server
gulp.task('prod', cb => {
  runSequence('build', 'server', cb);
});


// //////////////////////
// lint js files in project root folder
gulp.task('lint-root', () =>
  lint(['./*.js'])
);

// //////////////////////
// lint js files in server folder
gulp.task('lint-server', () =>
  lint(['./server/**/*.js', '!./server/**/*.spec.js'])
);

// //////////////////////
// lint all js files
gulp.task('lint', ['lint-root', 'lint-server']);
