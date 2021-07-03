const express = require("express");
const socketIO = require("socket.io");
const chokidar = require("chokidar");
const path = require("path");

const app = express();

app.use(express.static("public"));

const server = app.listen(3000);

console.log("http://127.0.0.1:3000");

const io = new socketIO.Server(server);

// 仅与一个客户端通信
// const socketIdStore = (() => {
//   let socketId = undefined;
//   return {
//     setSocketId: (id) => {
//         console.log('id: ', id);
//         socketId = id;
//     },
//     getSocketId: () => socketId,
//   };
// })();

// 仅与一个客户端通信
let socketId = undefined;

// client进入长连接，回调中包含client信息
io.on("connection", (socket) => {
  // console.log('a user connected');

  // client触发自定义事件
  socket.on("clientInfo", (info) => {
    console.log("clientInfo 被调用 ");
    socketId = info.socketId;
  });

  // client断开长连接
  socket.on("disconnect", () => {
    console.warn("user disconnected");
  });
});

const watcher = chokidar.watch(path.join(__dirname, "./public/js/index.js"));


watcher.on("change", (path) => {
  // 向指定客户端推送消息
  io.sockets.to(socketId).emit("receive_message", {
    info: "info",
  });
});
