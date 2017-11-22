function loading(){
	loadstorage();
	sub();
	gettimes();
}


function sub(){
	stinfor();
	var $title_content = $("#b_title");
	var $replar_content = $("#b_replay");
	var $expectation_content = $('#b_expectation');
	var $chart_content = $("#b_chart");
	var $envinfo_content = $('#b_envinfo');
	var $system_content = $("#choose_systems");
	var $version_content = $("#choose_version");
	var $version_brance_content = $("#choose_version_brance");
	var $time_content = $("#choose_time");
	var $browsers_content = $("#choose_browsers");
	var $specially_content = $("#specially");
	var $interactive_content = $("#interactive");

	if (specially_content.value == "") {
		var speciallyContent = "" ;
	}
	else {
		 var speciallyContent = "	特别说明：" + specially_content.value + "\r\n";
	}
	if (interactive_content.value == "") {
		var interactiveContent = "";
		var finalContent = speciallyContent + "\r\n";
	}
	else {
		var interactiveContent = "	交互文档：" + interactive_content.value;
		var finalContent = interactiveContent + "\r\n" + speciallyContent + "\r\n";
	}

    $envinfo_content.innerHTML = "【环境信息】" + "\r\n" +
"	操作系统：" + system_content.value + "\r\n" +
"	jar包版本：" + version_content.value + "  " + version_brance_content.value + "  " + time_content.value + "\r\n" +
"	浏览器：" + browsers_content.value + "\r\n" + finalContent;


	$("#bug_result_title").innerHTML = title_content.value;
	$("#bug_result_describle").innerHTML = 
	"【现象步骤】" + replar_content.value + "\r\n"+ 
	"【期望结果】" + expectation_content.value + "\r\n" + 
	"【涉及图表】" + chart_content.value + "\r\n" + envinfo_content.value;
}


function copyContent(){
    var Content = $("#bug_result_describle");
    Content.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
}

function copyContentTitle(){
	var Content = $("#bug_result_title");
	Content.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
}

/*调整浏览器缩放比例*/
function set() {  
	var size = 0.6;
	document.body.style.zoom = size;
	document.body.style.cssText += '; -moz-transform: scale(' + size + ');-moz-transform-origin: 0 0; ';     //
} 

/*创建窗口弹窗*/
function testwindow() {
	var url = 'http://www.finedevelop.com:2016/secure/CreateIssue!default.jspa';
	var name = '';
	var tWidth = 500;
	var theight = 600;
	var tTop = (window.screen.availHeight - 30 - theight) / 2;
	var tLeft  = (window.screen.availWidth - 10 -tWidth) / 2;

//	set();
	window.open(url,name,'height=500,width=600,top='+tTop+',left='+tLeft+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no,z-look=yes');
}

/*获取时间*/
function gettimes() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    $("#choose_time").value = currentdate;
}

/*页面信息存储*/
var idnum = new Array("b_title","b_replay","b_expectation","b_chart","choose_time","specially","interactive")
function stinfor() {
	for (var i = 0; i < idnum.length; i++) {	
		var cvalue = document.getElementById(idnum[i]).value;
    	if (typeof(Storage) !== "undefined") {
	        localStorage.setItem(idnum[i], cvalue);
	        document.getElementById(idnum[i]).innerHTML = localStorage.getItem(idnum[i]);
	    } 
	    else {
	        document.getElementById(idnum[i]).innerHTML = "抱歉！您的浏览器不支持 Web Storage ...";
	    }
	}
}
function loadstorage() {
    for (var i = 0; i < idnum.length; i++) {
        document.getElementById(idnum[i]).innerHTML = localStorage.getItem(idnum[i]);
    }
}




