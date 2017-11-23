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
const HTTP_CODES = require("./HTTPJSON").HTTP_CODES;

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

        let defaultJsonData = {
            length: 0,
            _idMap: []
        };

        file.exists(this._mapFile, () => {
                // 如果该文件存在，就读取该文件
                file.readFile(this._mapFile, (data) => {
                    this._storeMap = JSON.parse(data.toString("utf8"));
                });
            },
            // 文件不存在，那么就创建一个文件
            () => {
                file.writeFile(this._mapFile, JSON.stringify(defaultJsonData), () => {
                    this._storeMap = defaultJsonData;
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
                utils.sendJSONData2Client(response, HTTP_CODES.UN_RECOGNIZE_API);
            }

        });
    }

    getRest(type) {
        return this._restMap[type];
    }

    getMainStorePath(id) {
        return this._storeMap[id];
    }

    setStoreData (id, content) {
        // 遍历整个_storeMap查看是否已经存在过
        let result = Object.keys(this._storeMap).some((key) => {
            if (key === id) {
                return true;
            }
        });

        // 原来没有存在过相同的id，更新length和_idMap的值
        if (!result) {
            this._storeMap.length++;
            this._storeMap._idMap.push(id);
            this._storeMap[id] = {
                time: utils.now(),
                state: "alive",
                content: content,
                index: this._storeMap.length
            };
        }else {
            this._storeMap[id].content = content;
        }

        this.save();
    }

    /**
     * 删除
     * @param id
     * @returns {boolean}
     */
    deleteStoreId (id) {
        let index = this._storeMap._idMap.indexOf(id);
        if (index === -1) {
            return false;
        }

        // 将id从isMap数组中移除，然后将state的状态改成kill的状态
        this._storeMap._idMap.splice(index, 1);
        this._storeMap[id].state = "kill";
        this._storeMap.length--;

        this.save();
    }

    /**
     * 返回数据
     * @param idOrRange
     */
    getStoreData (idOrRange) {
        if (!/:/.test(idOrRange)) {
            return this._storeMap[idOrRange];
        }
        let arr = idOrRange.split(":");
        arr = arr.map((item) => {return parseInt(item)});
        let len = this._storeMap._idMap.length;
        arr[0] = arr[0] > (len - 1) ? len - 1 : arr[0];
        arr[1] = (arr[0] + arr[1]) >= len ? len - arr[0] : arr[1];

        arr = this._storeMap._idMap.slice(arr[0], arr[1]);

        let obj = {};

        arr.forEach((id) => {
            let temp = this._storeMap[id];
            obj[id] = {
                time: temp.time,
                content: temp.content
            };
        });

        return obj;
    }

    getStoreFolder () {
        return this._storeFolder;
    }

    /**
     * 将_storeMap的内容保存到文件中
     */
    save () {
        file.writeFile(this._mapFile, JSON.stringify(this._storeMap), () => {}, () => {});
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
        let urlPath = url.parse(request.url, true, true).path;

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
