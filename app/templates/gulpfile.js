// Gulp modules
var gulp = require('gulp')
var connect = require('gulp-connect')
// Webpack
var webpack = require('webpack')
var webpackOptions = require('./webpack.config')
var compiler = webpack(webpackOptions)

gulp.task('dev', function () {
  connect.server({
    host: '0.0.0.0',
    port: 6060,
    root: 'dist',
    livereload: true
  })

  gulp.src('./app/index.html').pipe(gulp.dest('dist/'))

  compiler.watch({}, function (err, stats) {
    var jsonStats = stats.toJson()
    if (err) {
      console.error(err)
    } else if (jsonStats.errors.length > 0) {
      console.error(jsonStats.errors)
    } else if (jsonStats.warnings.length > 0) {
      console.warn(jsonStats.warnings)
    } else {
      console.log(stats.toString({colors: true}))
    }
  })

  gulp.watch('./app/index.html', function (event) {
    gulp.src('./app/index.html').pipe(gulp.dest('dist/'))
  })
  gulp.watch('./dist/*', function (event) {
    gulp.src('./dist/*').pipe(connect.reload())
  })
})
