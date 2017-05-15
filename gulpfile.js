var gulp = require('gulp');
	var svgSymbols = require('gulp-svg-symbols');
	var connect = require('gulp-connect');
	var runSequence = require('run-sequence');
	var server = require('gulp-express');
	var Proxy = require('gulp-connect-proxy');
	var svgstore = require('./index');
	var inject = require('gulp-inject');
	var svgSprite = require('gulp-svg-sprite');

	gulp.task('server', function() {

	   var options = {
	   };
	   server.run(['app.js'], options);
	});

	gulp.task('build',function(done){
		runSequence(
			'sprites',
			'symbols',
			'inline',
			'server',
	      done);
	});
	//方式1：使用gulp-svg-sprite
	gulp.task('sprites', function () {
		config = {
		    mode : {
		        css : {     // Activate the «css» mode
		            render : {
		                css : true  // Activate CSS output (with default options)
		            }
		        }
		    }
		};
  		return gulp.src('assets/svg/*.svg')
	    .pipe(svgSprite(config))
	    .pipe(gulp.dest('public/style'));
	});
	//方式2：使用gulp-svg-symbols
	gulp.task('symbols', function () {
  		return gulp.src('assets/svg/*.svg')
	    .pipe(svgSymbols())
	    .pipe(gulp.dest('public/style/symbols'));
	});

	//方式3：gulp-inject，生成的svg添加到页面中
	gulp.task('inline', function () {

	  function fileContents (filePath, file) {
	    return file.contents.toString('utf8')
	  }

	  var svgs = gulp
	    .src('assets/svg/*.svg')
	    .pipe(svgstore({ inlineSvg: true }))

	  return gulp
	    .src('views/indexstore.html')
	    .pipe(inject(svgs, { transform: fileContents }))
	    .pipe(gulp.dest('views/dest'))

	})


