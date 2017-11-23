/**
 * Create by xiaofu.qin {2017/11/22}
 * description: 后台处理逻辑的时候可能会出现很多的问题，
 * 为了让前端明白后端到底发生了什么事儿，需要顶一个code->message的映射表，
 * 前端获取对应的code之后就可以了解错误信息
 */

module.exports.HTTP_CODES = {
    WRITE_TO_FILE_SUCCESS: {
        code: 100,
        message: "Success saving data into file"
    },
    UN_RECOGNIZE_API: {
        code: 400,
        message: "Fail to recognize api interface"
    },
    MISSING_DATA: {
        code: 401,
        message: "The data you send to server is missing some field."
    },
    READ_FILE_FAIL: {
        code: 500,
        message: "Fail to read file"
    },
    WRITE_FILE_FAIL: {
        code: 501,
        message: "Fail to write to file"
    }
};
 