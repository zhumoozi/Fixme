/**
 * Create by xiaofu.qin {2017/11/14}
 * description: Node.js 文件处理
 */
"use strict";

const fs = require("fs");

const defaultFunc = () => {};

// 异步读取文件
const readFile = (fileName, success, fail) => {
    fail = fail || defaultFunc;

    let temp = new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            if (err) {
                reject && reject();
                return false;
            }
            resolve && resolve(data);
        });
    });

    temp.then(success).catch(fail);
};

// 同步读取文件
const readFileSync = (fileName) => {
    return fs.readFileSync(fileName);
};

// 写入文件
const writeFile = (fileName, data, success, fail) => {
    success = success || defaultFunc;
    fail = fail || defaultFunc;

    let temp = new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                reject && reject();
                return;
            }
            resolve && resolve();
        });
    });

    temp.then(success).catch(fail);
};

// 删除文件
const deleteFile = (filePath, success, fail) => {
    success = success || defaultFunc;
    fail = fail = defaultFunc;

    let temp = new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Unable to delete the file:" + filePath);
                reject && reject();
                return false;
            }
            resolve && resolve();
        });
    });

    temp.then(success).catch(fail);
};

// 将Buffer转化成JSON变量
const bufferToJSON = (bufferSteam) => {
    return JSON.parse(bufferSteam.toString("utf8"));
};

const fileExists = (filePath, success, fail) => {
    success = success || defaultFunc;
    fail = fail || defaultFunc;
    let temp = new Promise((resolve, reject) => {
        fs.exists(filePath, (exists) => {
            if (!exists) {
                reject && reject();
                return;
            }
            resolve();
        });
    });

    temp.then(success).catch(fail);
};

// 创建目录
const mkdir = (path) => {
    fs.mkdir(path);
};

// 删除目录
const rmdir= (path) => {
    fs.rmdir(path);
};




module.exports.readFile = readFile;
module.exports.readFileSync = readFileSync;
module.exports.writeFile = writeFile;
module.exports.deleteFile = deleteFile;
module.exports.bufferToJSON = bufferToJSON;
module.exports.exists = fileExists;
module.exports.mkdir = mkdir;
module.exports.rmdir = rmdir;

