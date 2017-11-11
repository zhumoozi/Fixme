/**
 * Create by xiaofu.qin {2017/11/11}
 * description:
 */
define(["require", "defineEventHandle", "event"], function (require) {

    var $bugTitle = $("#b_title");
    var $bugReplay = $("#b_replay");
    var $bugExcept = $("#b_expectation");
    var $relateChart = $("#b_chart");

    var eventHandles = require("defineEventHandle");
    var Event = require("event");

    var EventInstance = new Event();


    var systemsText = "Windows";
    var versionText = "4.1";
    var branchText = "release";
    var browserText = "Chrome";
    var timesText = "";
    var especiallyText = "";
    var interactiveText = "";
    var titleContent = "";
    var bugReplayText = "";
    var bugExceptText = "";
    var bugRelateText = "";

    var $spliceInfo = $("#b_envinfo");
    var $bugTitleInfo = $("#bug_result_title");
    var $bugContentInfo = $("#bug_result_describle");

    EventInstance.on("contentChange", function() {
        eventHandles.spliceEnvInfo($spliceInfo, systemsText, versionText, branchText, timesText, browserText, especiallyText, interactiveText);
        eventHandles.bugTitleInfo($bugTitleInfo, titleContent);
        eventHandles.bugContentInfo($bugContentInfo ,bugReplayText ,bugExceptText ,bugRelateText, $spliceInfo.val());
    });

    // 给Bu个标题添加键盘放开的事件
    $bugTitle.on("keyup", function (event) {
        titleContent = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });

    // 还原步骤添加键盘松开的事件
    $bugReplay.on("keyup", function (event) {
        bugReplayText = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });

    // 期望结果
    $bugExcept.on("keyup", function (event) {
        bugExceptText = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });

    // 涉及图表
    $relateChart.on("keyup", function (event) {
        bugRelateText = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });


    // 环境信息拼接
    var $systems = $("#choose_systems");
    var $jarVersion = $("#choose_version");
    var $jarBranch = $("#choose_version_brance");
    var $browser = $("#choose_browsers");


    EventInstance.fire("contentChange");

    //返回当前操作系统选择
    $systems.on("change", function (event) {
        systemsText = eventHandles.dropDownChange(event);
        EventInstance.fire("contentChange");
    });
    //返回当前版本选择
    $jarVersion.on("change", function (event) {
        versionText = eventHandles.dropDownChange(event);
        EventInstance.fire("contentChange");
    });
    //返回当前分支信息
    $jarBranch.on("change", function (event) {
        branchText = eventHandles.dropDownChange(event);
        EventInstance.fire("contentChange");
    });
    //返回当前浏览器选择
    $browser.on("change", function (event) {
        browserText = eventHandles.dropDownChange(event);
        EventInstance.fire("contentChange");
    });

    var $times = $("#choose_time");
    var $especially = $("#especially");
    var $interactive = $("#interactive");

    // 时间添加键盘松开的事件
    $times.on("keyup", function (event) {
        timesText = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });

    // 特别说明添加键盘松开的事件
    $especially.on("keyup", function (event) {
        especiallyText = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });

    // 交互文档添加键盘松开的事件
    $interactive.on("keyup", function (event) {
        interactiveText = eventHandles.bugTitleKeyPress(event);
        EventInstance.fire("contentChange");
    });

});
 