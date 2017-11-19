/**
 * Create by xiaofu.qin {2017/11/14}
 * description: 后台Restful接口设计
 */
"use strict";

const file = require("./file");
const path = require("path");
const url = require("url");
const parseUrl = require("./parseUrl");

const storeFolder = "../store/";
const root = path.resolve(process.argv[2] || ".");
let storeMapFileName = "main.json";

storeMapFileName = path.join(root, storeFolder, storeMapFileName);

class Restful {
    constructor(storeFolder="", storeMapFileName="main.json") {
        this._restMap = {
            "add": {
                type: "POST",
                url: "/api/add"
            },
            "delete": {
                type: "POST",
                url: "/api/delete"
            },
            "update": {
                type: "POST",
                url: "/api/update"
            },
            "get": {
                type: "GET",
                // 如果没有指定id，则返回全部
                url: "/api/get"
            }
        };

        this._storeMap = null;

        this._storeFolder = storeFolder;

        // file.exists(storeMapFileName, () => {
        //         // 如果该文件存在，就读取该文件
        //         file.readFile(storeMapFileName, (data) => {
        //             this._storeMap = JSON.parse(data.toString("utf8"));
        //         });
        //     },
        //     // 文件不存在，那么就创建一个文件
        //     () => {
        //         file.writeFile(storeMapFileName, "{}", () => {
        //             this._storeMap = {};
        //         });
        //     });
    }

    distribute (request, response) {
        if (request.method === "GET") {
            return this.get(request, response);
        }

        this._handleHttPostData(request, response).then((data) => {
            let type = this._judgeRequestType(url.parse(request.url).pathname);

            switch (type) {

            }
        });
    }

    /**
     *
     * @param id {String}
     * @param content {JSON}
     */
    add(id, content) {
        // 添加一个content
        file.writeFile(path.json(this._storeFolder, id + ".json"), content, () => {
            this._storeMap[id] = id;
        }, () => {
            console.log("can not write content into file");
        });

        // 这个时候应该向前端发送一个信号，告诉前端js已经完成写入文件
    }

    remove(id) {

    }

    get (request, response) {

    }

    update(id) {

    }

    getRest(type) {
        return this._restMap;
    }

    getStorePath(id) {
        return this._storeMap[id];
    }

    // 处理http通过POST方法传递过来的数据,返回的Promise对象
    _handleHttPostData (request, response) {
        return new Promise((resolve) => {
            // POST 方法传参
            let _postData = "";
            request.on("data", (chunk) => {
                _postData += chunk;
            });

            request.on("end", () => {
                _postData = _postData.toString();
                // 将字符串改变成对象的格式
                _postData = parseUrl.parse(_postData);

                resolve && resolve(_postData);
            });
        });
    }

    // 处理Get方法传递进来的方法
    _handleHttpGetData (request, response) {
        let urlPath = url.parse(request.url).pathname;
        let _getData = {
            length: 0
        };
        urlPath = urlPath.split("?");

        if (urlPath.length < 2) {
            return _getData;
        }

        _getData = parseUrl.parse(urlPath[1]);

        return _getData;
    }

    _judgeRequestType (requestUrl) {
        let result = requestUrl.match(/app\/(.*)/);
        return result ? result[1] : null;
    }
}

module.exports.Restful = Restful;
