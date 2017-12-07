/**
 * Create by xiaofu.qin {2017/11/11}
 * description:
 */
define(["require", "defineEventHandle", "event"], function (require) {

    var domIds = ["#b_title", "#b_replay", "#b_expectation", "#b_chart", "#choose_time", "#specially", "#interactive", "#choose_systems",
        "#choose_browsers", "#choose_version", "#choose_version", "#choose_version_brance", "#choose_time", "#interactive", "#especially"];
    var $bugTitle = $("#b_title");
    var $bugReplay = $("#b_replay");
    var $bugExcept = $("#b_expectation");
    var $relateChart = $("#b_chart");

    var eventHandles = require("defineEventHandle");
    var Event = require("event");

    var EventInstance = new Event();


    var systemsText = Cookies.get("#choose_systems");
    var versionText = Cookies.get("#choose_version");
    var branchText = Cookies.get("#choose_version_brance");
    var browserText = Cookies.get("#choose_browsers");
    var timesText = Cookies.get("#choose_time");
    var especiallyText = Cookies.get("#especially");
    var interactiveText = Cookies.get("#interactive");
    var titleContent = Cookies.get("#b_title");
    var bugReplayText = Cookies.get("#b_replay");
    var bugExceptText = Cookies.get("#b_expectation");
    var bugRelateText = Cookies.get("#b_chart");

//    var $spliceInfo = $("#b_envinfo");
    var $bugTitleInfo = $("#bug_result_title");
    var $bugContentInfo = $("#bug_result_describle");

    EventInstance.on("contentChange", function () {
        //    eventHandles.spliceEnvInfo($spliceInfo, systemsText, versionText, branchText, timesText, browserText, especiallyText, interactiveText);
        eventHandles.bugTitleInfo($bugTitleInfo, titleContent);
        eventHandles.bugContentInfo($bugContentInfo, bugReplayText, bugExceptText, bugRelateText, systemsText, versionText, branchText, timesText, browserText, especiallyText, interactiveText);
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

    var $copyTheme = $("#copy_theme");
    var $copyDescribe = $("#copy_describe");
    var $createBug = $("#createbug");

    //copy主题
    $copyTheme.on("click", function (event) {
        eventHandles.copyThemeDescribe($bugTitleInfo);
    });

    //copy内容
    $copyDescribe.on("click", function (event) {
        eventHandles.copyThemeDescribe($bugContentInfo);
    });

    //创建bug
    $createBug.on("click", function (event) {
        eventHandles.createBugs();
    });


    EventInstance.on("contentChange", function () {
        eventHandles.stInform(domIds);
    })

    //   var domIds = ["#b_title","#b_replay","#b_expectation","#b_chart","#choose_time","#specially","#interactive","#choose_systems",
    //       "#choose_browsers","#choose_version","#choose_version","#choose_version_brance","#choose_time","#interactive","#especially"];
    domIds.forEach(function (id, i) {
        // console.log(Cookies.get(id), i);
        $(id).val(Cookies.get(id));
    });

    eventHandles.bugTitleInfo($bugTitleInfo, titleContent);
    eventHandles.bugContentInfo($bugContentInfo, bugReplayText, bugExceptText, bugRelateText,
    systemsText, versionText, branchText, timesText, browserText, especiallyText, interactiveText);


});
 