const gulp = require('gulp');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const postcssPresetEnv = require('postcss-preset-env');
const postcssShort = require('postcss-short');
const nested = require('postcss-nested');
const assets = require('postcss-assets');
const cssnano = require('gulp-cssnano');
const nunjucks = require("gulp-nunjucks");
const data = require('gulp-data');

const path = {
	src: {
		dir: 'src/index.html',
		templates: 'src/**/*.html',
		script: 'src/scripts/*.js',
		style: 'src/styles/**/*.pcss',
		images: 'src/images/*',
		fonts: 'src/fonts/*'
	},
	buildFolder: {
		dir: 'build',
		script: 'build/js',
		style: 'build/css',
		images: 'build/images',
		fonts: 'build/fonts'
	},
	buildName: {
		script: 'index.min.js',
		style: 'index.min.css'
	}
}

gulp.task('buildCss', () => {
	const plugins = [
		postcssPresetEnv,
		nested,
		postcssShort({ skip: '-' }),
		],
	processors = [			
		assets({
			loadPaths: ['../images/', 'src/images/']
		})]
	return gulp.src([path.src.style])
		.pipe(postcss(processors))
		.pipe(postcss(plugins))
		.pipe(concat(path.buildName.style))
		.pipe(cssnano())
		.pipe(gulp.dest(path.buildFolder.style));
});
gulp.task('buildJs', () => {
	return gulp.src([path.src.script])
	    .pipe(concat(path.buildName.script))
	    // .pipe(uglify())
		.pipe(gulp.dest(path.buildFolder.script))
});

gulp.task('buildImgs', () => {
	return gulp.src([path.src.images])
		.pipe(gulp.dest(path.buildFolder.images))
});
gulp.task('buildFonts', () => {
	return gulp.src([path.src.fonts])
		.pipe(gulp.dest(path.buildFolder.fonts))
});
gulp.task('buildHtml', () => {
	return gulp.src(path.src.dir)
		.pipe(data(() => ({})))
		.pipe(nunjucks.compile())
		.pipe(gulp.dest(path.buildFolder.dir))
});

gulp.task('buildCss-watch', gulp.series('buildCss', (done) => {
	browserSync.reload();
	done();
}));

gulp.task('buildHtml-watch', gulp.series('buildHtml', (done) => {
	browserSync.reload();
	done();
}));

gulp.task('buildJs-watch', gulp.series('buildJs', (done) => {
	browserSync.reload();
	done();
}));

gulp.task('buildImgs-watch', gulp.series('buildImgs', (done) => {
	browserSync.reload();
	done();
}));

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
	gulp.watch(path.src.style, gulp.series('buildCss-watch'));
	gulp.watch(path.src.images, gulp.series('buildImgs-watch'));
	gulp.watch(path.src.templates, gulp.series('buildHtml-watch'));
	gulp.watch(path.src.script, gulp.series('buildJs-watch'));	
});



gulp.task('dev', gulp.series('buildCss','buildHtml', 'buildImgs','buildJs','browser-sync'));
gulp.task('prod', gulp.series('buildCss','buildHtml', 'buildImgs','buildJs'));
