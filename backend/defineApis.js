/**
 * Create by xiaofu.qin {2017/11/21}
 * description: 定义所有的API接口
 */
"use strict";
const utils = require("./utils");
const file = require("./file");
const path = require("path");


module.exports.presetApi = [
    {
        name: "add",
        type: "POST",
        url: "/api/add",
        process (request, response, data, context) {
            // 添加，逻辑是将数据保存到本地的json文件里，然后把对应的文件名称保存进context的_storeMap里
            let uid = utils.Uid();
            let content = data;
            let dataStorePath = path.json(context.getStoreFolder(), uid + ".json");
            context.setStorePath(uid, content);
            file.writeFile(dataStorePath, content, () => {
                utils.sendJSONData2Client(response, {
                    code: 100,
                    message: "Success saving data into file"
                });
            });
        }
    },
    {
        name: "delete",
        type: "POST",
        url: "/api/delete",
        process (request, response, data, context) {

        }
    },
    {
        name: "update",
        type: "POST",
        url: "/api/update",
        process (request, response, data, context) {

        }
    },
    {
        name: "get",
        type: "GET",
        // 如果没有指定id，则返回全部
        url: "/api/get",
        process (request, response, data, context) {

        }
    }
];
 