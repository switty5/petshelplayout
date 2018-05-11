/**
 * Файл конфигурации для gulp
 * @url Установка и настройка https://webformyself.com/gulp-dlya-nachinayushhix
 * @type {*|Gulp}
 * Проект запускать консольной командой gulp
 */

/**
 * Подключаем gulp и плагины
 * @type {*|Gulp}
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    rigger = require('gulp-rigger');

/**
 * Живая перезагрузка
 * @type {initSingleton}
 */
var browserSync = require('browser-sync'),
    reload = browserSync.reload;

var buildDir = './build';

/**
 * Пути
 */
var path = {
    build: {
        layout: buildDir,
        js: buildDir + '/static/js/',
        css: buildDir + '/static/css/',
        images: buildDir + '/static/images/',
        fonts: buildDir + '/static/fonts/'
    },
    src: {
        layout: './src/**/*.html',
        js: './src/js/**/*.js',
        scss: './src/scss/main.scss',
        images: './src/images/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    watch: {
        layout: './src/**/*.html',
        js: './src/js/**/*.js',
        scss: './src/scss/**/*.scss',
        images: './src/images/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    clean: buildDir
};

/**
 * Задать корневую директорию
 */
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        }
    })
});

/**
 * Задача для sass
 */
gulp.task('scss', function() {
    return gulp.src(path.src.scss, ['scss']) // Указываем путь хранения исходного главного scss файлв (source)
        .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
        .pipe(gulp.dest(path.build.css)) // Указываем путь конечного css файла (destination)
        .pipe(browserSync.reload({ // для живой перезагрузки страницы браузера
            stream: true
        }));
});

/**
 * Задача для js
 */
gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

/**
 * Задача для fonts
 */
gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

/**
 * Задача для html
 */
gulp.task('layout', function() {
    gulp.src(path.src.layout)
        .pipe(gulp.dest(path.build.layout))
});

/**
 * Задача для изображений
 */
gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({stream: true}));
});

/**
 * Очищаем все сгенерированные директории/файлы
 */
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb)
});

/**
 * Задача для генерирования файлов и директорий
 */
gulp.task('build', ['layout', 'scss', 'js', 'images', 'fonts']);

/**
 * Задача для отслеживания изменений
 */
gulp.task('watch', function(){
    watch([path.watch.layout], function(event, cb) {
        gulp.start('layout');
    });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('scss');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('images');
    });
});

/**
 * Задача для запуска dev-server
 */
gulp.task('dev-server', ['watch'], function() {
    browserSync({
        server: {
            baseDir: buildDir
        },
        tunnel: true,
        host: 'localhost',
        port: 3000,
        logPrefix: 'Developer server'
    });
});

/**
 * Запускаем основные задачи
 */
gulp.task('default', ['build', 'dev-server', 'watch']);
