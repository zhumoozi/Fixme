/**
 * Create by xiaofu.qin {2017/11/20}
 * description:
 */
"use strict";

const objectToString = Object.prototype.toString;

const cloneVar = (item) => {
    if (/object\]$/i.test(objectToString.call(item))) {
        return item;
    }
    // do more things
};

const sendJSONData2Client = (response, json={}) => {
    response.writeHead(200, {"Content-Type": "application/json"});
    // 这样是允许跨域请求的设置
    // response.writeHead(200, {
    //     "Content-Type":'application/json',
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'
    // });

    json = JSON.stringify(json);

    response.write(json);
    response.end();
};

const Uid = () => {
    return new Date().getTime() + Math.random() * 1000;
};

module.exports.clone = cloneVar;
module.exports.sendJSONData2Client = sendJSONData2Client;
module.exports.Uid = Uid;
 