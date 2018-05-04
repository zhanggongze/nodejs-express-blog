//gulpfile.js
let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json'); //使用tsconfig.json文件配置tsc
let exec = require('child_process').exec;

let tsChild,        //监视ts文件修改子进程
      serverChild;    //重启服务器子进程
//编译ts文件
gulp.task('build-ts', function () {

      tsChild = exec('tsc', function(error, stdout, stderr) {
            console.log(`tsc====>stdout: ${stdout}`);
            console.log(`tsc====>stderr: ${stderr}`);
            if (error !== null) {
                  console.log(`exec error: ${error}`);
            }
      });
      
});
//自动重启服务器
gulp.task('restart', function () {

      serverChild = exec('supervisor -w build ./build/bin/www.js', function(error, stdout, stderr){
            console.log(`restart=====>stdout: ${stdout}`);
            console.log(`restart=====>stderr: ${stderr}`);
            if (error !== null) {
                  console.log(`exec error: ${error}`);
            }
      });
});
//开发任务
gulp.task('default', ['build-ts', 'restart']);