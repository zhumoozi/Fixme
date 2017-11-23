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

const urlEncode = (url) => {
    // url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&");

    return url;
};

const Uid = () => {
    return (new Date().getTime() + Math.random() * 1000) + "";
};

const now = () => {
    return new Date().getTime();
};

module.exports.clone = cloneVar;
module.exports.sendJSONData2Client = sendJSONData2Client;
module.exports.urlEncode = urlEncode;
module.exports.Uid = Uid;
module.exports.now = now;
 