/**
 * Create by xiaofu.qin {2017/11/14}
 * description: 后台Restful接口设计
 */
"use strict";

const file = require("./file");
const path = require("path");
const url = require("url");
const parseUrl = require("./parseUrl");
const utils = require("./utils");

const storeFolder = "../store/";
const root = path.resolve(process.argv[2] || ".");

const presetApi = require("./defineApis").presetApi;

class Restful {
    constructor(storeFolder="", storeMapFileName="main.json") {
        this._restMap = {};

        // 默认的几个API
        presetApi.forEach((item) => {
            this.registerRestApi(item);
        });

        this._storeMap = null;

        this._storeFolder = storeFolder;

        // 保存映射的文件
        this._mapFile = path.join(storeFolder, storeMapFileName);

        console.log(this._mapFile);

        file.exists(this._mapFile, () => {
                // 如果该文件存在，就读取该文件
                file.readFile(this._mapFile, (data) => {
                    this._storeMap = JSON.parse(data.toString("utf8"));
                });
            },
            // 文件不存在，那么就创建一个文件
            () => {
                file.writeFile(this._mapFile, "{}", () => {
                    this._storeMap = {};
                });
            });
    }

    distribute (request, response) {
        if (request.method === "GET") {
            return this._dealGet(request, response);
        } else if (request.method === "POST") {
            return this._dealPost(request, response);
        }
    }

    /**
     * Register the restful API from outside.
     * @param options {object} name、type、process、url
     */
    registerRestApi (options) {
        options = utils.clone(options);
        let temp = options.name;
        this._restMap[temp] = null;
        delete options.name;
        this._restMap[temp] = options;
    }

    /**
     *
     * @param request
     * @param response
     * @private
     */
    _dealGet (request, response) {
        //
        let type = Restful._judgeRequestType(url.parse(request.url).pathname);
        let data = Restful._handleHttpGetData(request, response);

        let result = Object.keys(this._restMap).some((name, index) => {
            if (type === name) {
                this._restMap[name].process(request, response, data, this);
                return true;
            }
        });

        // 没有遇到对应的api接口，返回一串儿错误的json
        if (!result) {
            utils.sendJSONData2Client(response, {
                code: 400,
                message: "Fail to recognize api interface."
            });
        }
    }

    _dealPost (request, response) {
        Restful._handleHttPostData(request, response).then((data) => {
            let type = Restful._judgeRequestType(url.parse(request.url).pathname);

            let result = Object.keys(this._restMap).some((name, index) => {
                if (type === name) {
                    this._restMap[name].process(request, response, data, this);
                    return true;
                }
            });

            // 没有遇到对应的api接口，返回一串儿错误的json
            if (!result) {
                // 没有遇到对应的api接口，返回一串儿错误的json
                utils.sendJSONData2Client(response, {
                    code: 400,
                    message: "Fail to recognize api interface."
                });
            }

        });
    }

    getRest(type) {
        return this._restMap[type];
    }

    getMainStorePath(id) {
        return this._storeMap[id];
    }

    setStorePath (id, content) {
        this._storeMap[id] = content;
    }

    getStoreFolder () {
        return this._storeFolder;
    }

    // 处理http通过POST方法传递过来的数据,返回的Promise对象
    static _handleHttPostData (request, response) {
        return new Promise((resolve, reject) => {
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
    static _handleHttpGetData (request, response) {
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

    static _judgeRequestType (requestUrl) {
        let result = requestUrl.match(/api\/([^\?]*)/);
        return result ? result[1].trim() : null;
    }
}

module.exports.Restful = Restful;
