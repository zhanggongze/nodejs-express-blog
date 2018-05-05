# nodejs-express-blog

启动环境的两种方式：

#1#第一中启动两个命令(可是实时的看到日志)==

$npm run build--监控ts变化->自动编译
执行npm run build时，则只会编译ts文件并监控ts的改变。

$npm run dev --监控js变化->自动重启服务器
全局安装supervisor模块npm install -g supervisor，之后就可以在终端中使用supervior ./build/server.js启动服务器，并在服务器端代码改变之后，自动重启服务器。

#2#第二中启动一个命令(不能实时的看到日志)==

$gulp



#新增 token认证

#新增密码加密处理

#https

#七牛图片oss云存储
