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


gulp.task('watch', function(){
    return gulp.watch('src/scss/**/*.scss', ['sass']) // Указываем путь хранения scss файлов(source)
        .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
        .pipe(gulp.dest('app/css')) // Указываем путь css файла(destination)
});