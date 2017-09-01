var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");

gulp.task("browserSync", function() {
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});
});

gulp.task("sass", function() {
	return gulp
		.src("app/scss/**/*.scss") // Gets all files ending with .scss in app/scss
		.pipe(sass()) // Using gulp-sass
		.pipe(gulp.dest("app/css"))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task("watch", ["browserSync", "sass"], function() {
	gulp.watch("app/scss/**/*.scss", ["sass"]);
	gulp.watch("app/*.html", browserSync.reload);
	gulp.watch("app/js/**/*.js", browserSync.reload);
});

/* 

Gulp Task Template

gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
}) 

*/
