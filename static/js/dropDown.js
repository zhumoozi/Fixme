/**
 * Create by xiaofu.qin {2017/11/11}
 * description: 所有下拉框的值添加
 */
define(["require", "jquery"], function (require, $) {

    // 缓存下所有需要的元素
    var $systems = $("#choose_systems"),
        $jarInfo = $("#choose_version"),
        $release = $("#choose_version_brance"),
        $browser = $("#choose_browsers");

    var systemsNames = ["Windows", "Linux", "Max", "Unix", "All systems"],
        jarNames = ["4.1", "4.0.2", "4.0", "5.0"],
        releaseNames = ["release", "stable", "refactor", "fineio"],
        browserNames = ["Chrome", "FireFox", "IE", "Edge", "Safari", "Opera", "360安全浏览器", "360急速浏览器", "搜狗浏览器", "QQ浏览器"];

    function addItems(dom, names) {
        var str = "";
        for (var i = 0, len = names.length; i < len; i++) {
            str += "<option value=\"" + names[i] + "\">" + names[i] + "</option>";
        }

        dom.html(str);
    }

    function addSystems () {
        return addItems($systems, systemsNames);
    }

    function addJarInfo () {
        return addItems($jarInfo, jarNames);
    }

    function addRelease () {
        return addItems($release, releaseNames);
    }

    function addBrowser() {
        return addItems($browser, browserNames);
    }

    function addAll() {
        addSystems();
        addJarInfo();
        addRelease();
        addBrowser();
    }

    return {
        addSystems: addSystems,
        addJarInfo: addJarInfo,
        addRelease: addRelease,
        addBrowser: addBrowser,
        addAll: addAll
    };

});
 