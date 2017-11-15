/**
 * Create by xiaofu.qin {2017/11/14}
 * description: 后台Restful接口设计
 */
"use strict";

const file = require("./file");
const path = require("path");

const storeFolder = "../store/";
const root = path.resolve(process.argv[2] || ".");
let storeMapFileName = "main.json";

storeMapFileName = path.join(root, storeFolder, storeMapFileName);

class Restful {
    constructor(storeFolder, storeMapFileName) {
        this._restMap = {
            "add": {
                type: "POST",
                url: "/api/add"
            },
            "delete": {
                type: "DELETE",
                url: "/api/delete:id"
            },
            "update": {
                type: "UPDATE",
                url: "/api/update:id"
            },
            "get": {
                type: "GET",
                // 如果没有指定id，则返回全部
                url: "/api/get:id"
            }
        };

        this._storeMap = null;

        this._storeFolder = storeFolder;

        file.exists(storeMapFileName,
            // 如果该文件存在，就读取该文件
            () => {
                file.readFile(storeMapFileName, (data) => {
                    this._storeMap = JSON.parse(data.toString("utf8"));
                });
            },
            // 文件不存在，那么就创建一个文件
            () => {
                file.writeFile(storeMapFileName, "{}", () => {
                    this._storeMap = {};
                });
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

    get (id) {

    }

    update(id) {

    }

    getRest(type) {
        return this._restMap;
    }

    getStorePath(id) {
        return this._storeMap[id];
    }
}
