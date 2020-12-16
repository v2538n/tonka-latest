// VARIABLES & PATHS

let preprocessor = 'scss', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    baseDir      = 'app', // Base directory path without «/» at the end
    online       = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [

			'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
			'node_modules/vue/dist/vue.js',
			'node_modules/vue2-scrollspy/dist/index.js',
			baseDir + '/js/vue-item.js',
			baseDir + '/js/inc/*',
			baseDir + '/js/slick.min.js',
			baseDir + '/js/placeholder.js',
			baseDir + '/js/app.js' // app.js. Always at the end

		],
		dest: baseDir + '/js',
	},

	styles: {
		src:  baseDir + '/' + preprocessor + '/main.*',
		dest: baseDir + '/css',
	},

	images: {
		src:  baseDir + '/images/src/**/*',
		dest: baseDir + '/images/dest',
	},

	cssOutputName: 'app.min.css',
	jsOutputName:  'app.min.js',

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');
const rename       = require('gulp-rename');
const env 		   = require('gulp-env'); // Для переменной среды разработки
const babel 	   = require('gulp-babel');

env(".env.default.json"); 	// Дефолтные значения, в индексе гита
env(".env.local.json");		// Файл локальных значений, в игноре гита !!!!!!!!!!!!!!!!
// ФАЙЛ НУЖНО СОЗДАТЬ. СКОПИРОВАТЬ .env.default.json в .env.local.json И НАЗНАЧИТЬ СВОИ ПЕРЕМЕННЫЕ
// Если не создать работать будет .env.default.json

function browsersync() {
	browserSync.init({
		proxy: process.env.PHP_SERVER_PROXY
	})
}

function scripts() {
	return src(paths.scripts.src)
		.pipe(concat(paths.jsOutputName))
		.pipe(babel({
			presets: ["@babel/preset-env"]
		}))
		//.pipe(uglify())
		.pipe(dest(paths.scripts.dest))
		.pipe(browserSync.stream())
}

function styles() {
	return src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(rename(paths.cssOutputName))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.styles.dest))
		.pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin())
	.pipe(dest(paths.images.dest))
}

function cleanimg() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function startwatch() {
	watch(baseDir  + '/**/' + preprocessor + '/**/*', styles);
	watch(baseDir  + '/**/*.{' + imageswatch + '}', images);
	watch(baseDir  + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
	watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js', baseDir + '/js/inc/*.js',], scripts);
}

exports.browsersync = browsersync;
exports.assets      = series(cleanimg, styles, scripts, images);
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.default     = parallel(images, styles, scripts, browsersync, startwatch);
