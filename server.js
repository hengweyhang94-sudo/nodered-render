const http = require("http");
const express = require("express");
const RED = require("node-red");

const app = express();
const server = http.createServer(app);

// ✅ 静态资源支持 (public 文件夹)
app.use("/public", express.static("public"));

const settings = {
    httpAdminRoot: "/",
    httpNodeRoot: "/api",
    userDir: "./data",
    functionGlobalContext: {}
};

RED.init(server, settings);
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(process.env.PORT || 1880, () => {
    console.log("Node-RED is running on port", process.env.PORT || 1880);
});

RED.start();
