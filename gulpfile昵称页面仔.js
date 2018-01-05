var gulp = require('gulp');
// 引入组件
var sass = require('gulp-sass-china');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var clean = require('gulp-clean');

//编译sass
gulp.task('sass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'))
})

//css处理
gulp.task('styles', function () {
    gulp.src('./src/styles/*.css')    //引入所有CSS
        .pipe(concat('main.css'))           //合并CSS文件
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./dist/styles'))      //完整版输出
        .pipe(rename({ suffix: '.min' }))   //重命名
        .pipe(minifycss())                  //CSS压缩
        .pipe(gulp.dest('./dist/styles'))      //压缩版输出
        .pipe(notify({ message: '样式文件处理完成' }));
});

// 合并，压缩js文件
gulp.task('scripts', function () {
    gulp.src('./src/scripts/*.js')
        .pipe(concat('entry.js'))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(rename('entry.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
});

// 图片处理任务
gulp.task('images', function () {
    gulp.src('./src/images/*')        //引入所有需处理的JS
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))      //压缩图片
        // 如果想对变动过的文件进行压缩，则使用下面一句代码
        // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) 
        .pipe(gulp.dest('./dist/images'))
        .pipe(notify({ message: '图片处理完成' }));
});

//html压缩
gulp.task('minify', function () {
    gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
});

// 目标目录清理
gulp.task('clean', function () {
    return gulp.src(['./dist/styles', './dist/scripts', './dist/images', './dist/*.html'], { read: false })
        .pipe(clean());
});

// 预设任务，执行清理后，
gulp.task('default', ['clean'], function () {
    gulp.start('sass', 'styles', 'scripts', 'images', 'minify');
});

// 文档临听
gulp.task('watch', function () {

    // 监听所有.scss文档
    gulp.watch('./src/styles/*.scss', ['styles']);

    // 监听所有css文档
    gulp.watch('./src/styles/*.css', ['styles']);

    // 监听所有.js档
    gulp.watch('./src/scripts/*.js', ['scripts']);

    // 监听所有图片档
    gulp.watch('./src/images/*', ['images']);

    // 监听所有html文档
    gulp.watch('./src/*.html');

});

