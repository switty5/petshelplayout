/**
 * Файл конфигурации для gulp
 * @url Установка и настройка https://webformyself.com/gulp-dlya-nachinayushhix
 * @type {*|Gulp}
 */

/**
 * Подключаем gulp
 * @type {*|Gulp}
 */
var gulp = require('gulp');

/**
 * Подключаем плагин sass
 * @type {gulpSass}
 */
var sass = require('gulp-sass');

gulp.task('sass', function() {
    // return gulp.src('src/scss/**/*.scss', ['sass']) // Указываем путь хранения исходных scss файлов (source)
    return gulp.src('src/scss/main.scss', ['sass']) // Указываем путь хранения исходного главного scss файлв (source)
        .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
        .pipe(gulp.dest('css/')) // Указываем путь конечного css файла (destination)
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
