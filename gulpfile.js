const { src, dest, parallel, series, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

function buildHtml() {
  return src('app/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(dest('build'));
};

function buildCss() {
	return src(['app/scss/variables.scss', 'app/scss/general.scss', 'app/scss/header.scss', 'app/scss/footer.scss'])
  .pipe(sass())
  .pipe(concat('style.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(dest('build'))
}

function startWatch() {
	watch('app/**/*.pug', buildHtml);
  watch('app/scss/*.scss', buildCss);
};

exports.default = series(parallel(buildHtml, buildCss), startWatch);
