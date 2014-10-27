	connect_livereload = require 'connect-livereload'
	express = require 'express'
	gulp = require 'gulp'
	gulp_coffeeify = require 'gulp-coffeeify'
	gulp_mocha = require 'gulp-mocha'
	gulp_open = require 'gulp-open'
	path = require 'path'
	tiny_lr = require 'tiny-lr'

	EXPRESS_PORT = 1337
	EXPRESS_ROOT = './public/'
	LIVERELOAD_PORT = 35729

	gulp.task 'default', ['watchCoffee','server'], ->
		options =
			url: 'http://localhost:' + EXPRESS_PORT

		gulp.src('./public/index.html').pipe(gulp_open('', options))
		console.log 'Watching...'


	gulp.task 'watchCoffee', ->
	   gulp.watch 'src/**/*.coffee', ['coffee2app']


	gulp.task 'coffee2app', ->
		gulp.src('src/**/*.coffee')
			.pipe(gulp_coffeeify())
			.pipe(gulp.dest('./public/src_js'))


	gulp.task 'server', ['coffee2app'], ->
		app = express()
		app.use(connect_livereload())
		app.use(express.static(EXPRESS_ROOT))
		app.listen(EXPRESS_PORT)
		lr = tiny_lr()
		lr.listen(LIVERELOAD_PORT)

		gulp.watch './public/src_js/index.js', (event) ->
			fileName = path.relative(EXPRESS_ROOT, event.path)
			lr.changed
				body:
					files: [fileName]

	gulp.task 'test', ->
		gulp.src('test/**/*.coffee', {read: false})
			.pipe(gulp_mocha({
				reporter: 'spec',
				globals: {
					should: require('should')
				}
			}))



