/**
 * Create by xiaofu.qin {2017/11/18}
 * description: 不想使用querystring这个模块，我准备尽量在这个文件里建立一些简单的函数来代替。
 */
const fs = require("fs");
const path = require("path");

const isLikeNumber = (str) => {
    "use strict";
    return /^[\d\.]+$/.test(str);
};

const parse = (data) => {
    data = data.toString();

    let postData = {
        length: 0
    };
    let arr;

    // { length: 1, data: 'name=xiaofu.qin&age=34' }
    if (!/[=\?&]/.test(data)) {
        postData.data = data;
        postData.length = 1;
        return postData;
    }

    arr = data.split("&");
    arr.forEach((item, index) => {
        let a = item.split("=");
        a[1] = !isLikeNumber(a[1]) ? a[1] : parseFloat(a[1]);
        postData[a[0]] = a[1];
        postData.length++;
    });

    return postData;
};

module.exports.parse = parse;
 