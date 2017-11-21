/**
 * Create by xiaofu.qin {2017/11/21}
 * description: 定义所有的API接口
 */
"use strict";
const utils = require("./utils");
const file = require("./file");


module.exports.presetApi = [
    {
        name: "add",
        type: "POST",
        url: "/api/add",
        process (request, response, data, context) {
            // 添加，需要的数据有
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
 