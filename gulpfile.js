let gulp = require('gulp')
let run = require('gulp-run')
let browserSync = require('browser-sync')

gulp.task('transpile', function () {
  return gulp.src(['./src']).pipe(run('webpack'))
})

gulp.task('copy:data', function () {
  return gulp.src([
      './src/*.html', 
      './src/*.css', 
      './src/img/**', 
      './src/views/**'
  ],  { 
    base: './src/'
  }).pipe(gulp.dest('dist'))
})

gulp.task('run', function () {
  browserSync({
    server: {
      baseDir: 'dist/',
      index: 'index.html'
    }
  })

  gulp.watch(['./src/*.html', './src/*.ts', './src/*.css']).on('change', () => {
    gulp.src(['.']).pipe(run('gulp build'))
  })

  gulp.watch('dist').on('change', browserSync.reload)
})

gulp.task('build', gulp.series('transpile', 'copy:data'))
gulp.task('default', gulp.series('build', 'run'))