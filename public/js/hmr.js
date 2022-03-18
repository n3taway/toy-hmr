const socketUrl = "http://127.0.0.1:3000";
const scriptId = "hash";

var socketClient = io(socketUrl);

socketClient.on("updateFile", (e) => {
  const hasScript = document.getElementById(`${scriptId}`);
  hasScript && hasScript.remove();

  const scriptTag = document.createElement("script");
  scriptTag.id = "hash";
  scriptTag.src = `${socketUrl}/js/index.js`;
  document.body.appendChild(scriptTag);
// window.location.reload();
});

window.onload = function () {
  setTimeout(() => {
    socketClient.emit("clientEntry", {
      socketId: socketClient.id,
      clientId: "browser",
    });
  }, 200);
};
