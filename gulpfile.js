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
    livereload = require('gulp-livereload'),
    gulpScss = require('gulp-sass'),
    stripCssComments = require('gulp-strip-css-comments'),
    autoprefixer = require('gulp-autoprefixer');
   
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
            .pipe(obfuscate())  //混淆
            .pipe(uglify())    //压缩
            .pipe(rename({suffix: '.min'}))
            //.pipe(rev())
            .pipe(gulp.dest('public/dist/javascripts'));
            //.pipe(rev.manifest())
            //.pipe(gulp.dest('public/dist/rev'));  //输出
    });

    //压缩图片
    gulp.task('images', function() {
        return gulp.src('public/images/**/*.{png,jpg,gif}')
        .pipe(cache(imagemin({ 
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）  
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片  
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染  
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化 
        })))
        .pipe(gulp.dest('public/dist/images/**/*.{png,jpg,gif}'));
    });

    //sass监控编译
    gulp.task('scss-monitor', function() {
        return gulp.src('sass/**/*.{scss,sass}')
        .pipe(gulpScss().on('error', gulpScss.logError))
        .pipe(stripCssComments())// 去掉css注释   
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))// auto prefix 
        .pipe(gulp.dest('public/stylesheets/**/*'));
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
        //gulp.start('scss-monitor'),
        gulp.start('minifyjs'),
        gulp.start('images'),
        gulp.start('cssmin'),
        gulp.start('watch')
　　});

    gulp.task('watch',['clean'],function(){
         gulp.watch('public/stylesheets/**/*.css',['cssmin']);
         gulp.watch('public/javascripts/**/*.js',['jshint','minifyjs']);
         gulp.watch('public/images/**/*.{png,jpg,gif}',['images']);
         //gulp.watch('sass/**/*.{scss,sass}',['scss-monitor']);
         
    });