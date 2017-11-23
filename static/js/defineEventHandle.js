/**
 * Create by xiaofu.qin {2017/11/11}
 * description:
 */
define(["require"], function (require) {

    // 先定义一个Bug标题的鼠标按下的事件
    function bugTitleKeyPress(event) {
        var target = event.target;
        return $(target).val().trim();
    }

    function dropDownChange(event) {
        return $(event.target).val();
    }

    // 拼接环境信息字符串
    function spliceEnvInfo(dom, system_content, version_content, version_branch_content,
                           time_content, browsers_content, specially_content, interactive_content) {
        var str = "【环境信息】" + "\r\n"
            + "\t操作系统：" + system_content + "\r\n"
            + "\tjar包版本：" + version_content + "  "
            + version_branch_content + "  "
            + time_content + "\r\n"
            + "	浏览器：" + browsers_content + "\r\n"
            + (!!specially_content ? "\t特别说明：" + specially_content + "\r\n" : "")
            + (!!interactive_content ? "\t交互文档：" + interactive_content  + "\r\n" : "");

        // 插入内容
        dom.val(str);
    }

    //bug标题字符串
    function bugTitleInfo(dom, title_content) {
        console.log(title_content)
        // 插入内容
        dom.val(title_content);
    }

    //bug内容字符串拼接
    function bugContentInfo(dom, replar_content ,expectation_content ,chart_content ,envinfo_content) {
        var str = 	"【现象步骤】"
            + replar_content+ "\r\n"
            +"【期望结果】" + expectation_content + "\r\n"
            +"【涉及图表】" + chart_content + "\r\n"
            + envinfo_content;
        // 插入内容
        dom.val(str);
    }

    function copyContent(dom){
        var Content = dom[0];
        Content.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
    }

    return {
        bugTitleKeyPress: bugTitleKeyPress,
        dropDownChange: dropDownChange,
        spliceEnvInfo: spliceEnvInfo,
        bugTitleInfo: bugTitleInfo,
        bugContentInfo:bugContentInfo,
        copyContent: copyContent
    };

});
 