var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    obfuscate = require('gulp-obfuscate'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),    //压缩图片
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    revCollector = require('gulp-rev-collector'),
    livereload = require('gulp-livereload');
   
    gulp.task("clean", function(){
        return gulp.src(['public/dist/javascripts','public/dist/stylesheets','public/dist/images'])
        .pipe(clean());
    });
    // //语法检查
    gulp.task('jshint', function () {
        return gulp.src('public/javascripts/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    }); 
   
    //压缩 js
    gulp.task('minifyjs', function() {
        return gulp.src('public/javascripts/**/*.js')      //需要操作的文件
            .pipe(uglify())    //压缩
            .pipe(rename({suffix: '.min'}))
            //.pipe(rev())
            .pipe(gulp.dest('public/dist/javascripts'));
            //.pipe(rev.manifest())
            //.pipe(gulp.dest('public/dist/rev'));  //输出
    });

    gulp.task('obfuscate', function () {
        return gulp.src('public/javascripts/**/*.js')
        .pipe(obfuscate());
    });

    //压缩图片
    gulp.task('images', function() {
        return gulp.src('public/images/**/*.{png,jpg,gif}')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('public/dist/images/**/*.{png,jpg,gif}'));
    });

    //压缩CSS
    gulp.task('cssmin', function() {
        return gulp.src('public/stylesheets/**/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifycss())
        //.pipe(rev())
        .pipe(gulp.dest('public/dist/stylesheets'));
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('public/dist/rev'));
    });

    //通过hash来精确定位到html模板中需要更改的部分,然后将修改成功的文件生成到指定目录
    gulp.task('rev',function(){
        return gulp.src(['public/dist/rev/rev-manifest.json','views/index.html'])
        .pipe(revCollector({
            replaceReved:true
        }))
        .pipe(gulp.dest('views'));
    });

    　　//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
    gulp.task('default',['clean'],function() {
        gulp.start('minifyjs'),
        gulp.start('obfuscate'),
        gulp.start('images'),
        gulp.start('cssmin'),
        gulp.start('watch')
　　});

    gulp.task('watch',['clean'],function(){
         gulp.watch('public/stylesheets/**/*.css',['cssmin']);
         gulp.watch('public/javascripts/**/*.js',['jshint','minifyjs']);
         gulp.watch('public/images/**/*.{png,jpg,gif}',['images']);
    });