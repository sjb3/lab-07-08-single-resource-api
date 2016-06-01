'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
var paths = ['**/*.js', 'lib/*.js', 'model/*.js', 'test/*.js', 'route/*.js' ];

gulp.task('mocha', () => {
  return gulp.src(paths)
  .pipe(mocha());
});

gulp.task('eslint', () => {
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src('test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('default', ['eslint', 'mocha', 'test']);

// gulp.task('default', () => {
//   return gulp.src('test.js')
//     .pipe(mocha())
//     .once('error', () => {
//       process.exit(1);
//     })
//     .once('end', () => {
//       process.exit();
//     });
// });
