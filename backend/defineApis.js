/**
 * Create by xiaofu.qin {2017/11/21}
 * description: 定义所有的API接口
 */
"use strict";
const utils = require("./utils");
const file = require("./file");
const path = require("path");
const HTTP_CODES = require("./HTTPJSON").HTTP_CODES;


module.exports.presetApi = [
    {
        name: "add",
        type: "POST",
        url: "/api/add",
        process (request, response, data, context) {
            // 添加，逻辑是将数据保存到本地的json文件里，然后把对应的文件名称保存进context的_storeMap里
            let uid = utils.Uid();

            context.setStoreData(uid, data);

            utils.sendJSONData2Client(response, HTTP_CODES.WRITE_TO_FILE_SUCCESS);
        }
    },
    {
        name: "delete",
        type: "POST",
        url: "/api/delete",
        process (request, response, data, context) {
            if (!data || !data.id) {
                utils.sendJSONData2Client(response, HTTP_CODES.MISSING_DATA);
                return false;
            }
            let id = data.id;
            delete data.id;

            context.deleteStoreId(id);
            utils.sendJSONData2Client(response, HTTP_CODES.WRITE_TO_FILE_SUCCESS);
        }
    },
    {
        name: "update",
        type: "POST",
        url: "/api/update",
        process (request, response, data, context) {
            if (!data || !data.id) {
                utils.sendJSONData2Client(response, HTTP_CODES.MISSING_DATA);
                return false;
            }
            let id = data.id;
            delete data.id;

            context.setStoreData(id, data);

            utils.sendJSONData2Client(response, HTTP_CODES.WRITE_TO_FILE_SUCCESS);
        }
    },
    {
        name: "get",
        type: "GET",
        // 如果没有指定id，则返回全部
        url: "/api/get",
        process (request, response, data, context) {
            data = context.getStoreData(data.id || data.range);

            utils.sendJSONData2Client(response, data);
        }
    }
];
 