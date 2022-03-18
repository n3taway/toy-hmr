启动 express 服务 public 为 html 目录，在入口 html 文件中注入 hmr 逻辑。

hmr 逻辑：服务端 socket 通知回调，重新请求文件。

express 通过 chokidar 监听 public 目录下的所有文件，文件有变动就通知客户端。
