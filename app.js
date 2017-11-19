/**
 * Create by xiaofu.qin {2017/11/11}
 * description: 后台Node.js处理的文件入口
 */
"use strict";

const fs = require("fs");
const url = require("url");
const path = require("path");
const http = require("http");

const Restful = require("./backend/Restful");

// 从命令行参数获取root目录，默认是当前目录:
const root = path.resolve(process.argv[2] || ".");

// 几个404页面的名字，也是它们各自的文件夹名字
const pagePath = ["ah_nuts", "construction", "fog", "groceries", "lights_off", "spilled_milk", "wander"];
/**
 * 页面找不到的处理逻辑
 * @param request
 * @param response
 */
const notFoundPage = (request, response) => {
    console.log("Can not found " + request.url);

    const current404Page = pagePath[Math.floor(Math.random() * pagePath.length)];

    // 发送200响应:
    response.writeHead(200);
    // 将文件流导向response:
    fs.createReadStream(path.join(root, "/static/404/" + current404Page + "/404.html")).pipe(response);
};

const successRequest = (request, response, filePath) => {
    // 没有出错并且文件存在:
    console.log("200 " + request.url);
    // 发送200响应:
    response.writeHead(200);
    // 将文件流导向response:
    fs.createReadStream(filePath).pipe(response);
};

/**
 * 创建服务器
 * @param port
 */
const createServer = (port=9527) => {

    const restfulIns = new Restful.Restful();

    // 创建服务器:
    const server = http.createServer(function (request, response) {
        // 获得URL的path，类似 "/css/bootstrap.css":
        // 这个坑爹的属性pathname，竟然不是驼峰命名法写的
        let pathName = url.parse(request.url).pathname;

        // /api/……样式的url处理方法
        if (/api/.test(pathName)) {
            restfulIns.distribute(request, response);
            return false;
        }

        // 处理静态文件
        // 获得对应的本地文件路径，类似 "/srv/www/css/bootstrap.css":
        let filePath = path.join(root, pathName);

        // 获取文件状态:
        fs.stat(filePath, (err, stats) => {
            if (!err && (stats.isFile() || stats.isDirectory())) {
                stats.isDirectory() && (filePath = path.join(filePath, "index.html"));

                successRequest(request, response, filePath);
            } else {
                notFoundPage(request, response);
            }
        });
    });

    server.listen(port);

    console.log("Server is running at http://127.0.0.1:" + port);
};

createServer();
