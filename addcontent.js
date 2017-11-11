/*生成元素*/
function creatElement() {
	var name = prompt("请输入","everything");
	if (name!=null && name!=""){
		var element = document.getElementById("bug_example");
		var cr_button = document.createElement("button");
		var cr_button_node = document.createTextNode(name);

		cr_button.appendChild(cr_button_node);

		cr_button.type = "button";
		cr_button.value = name;
		cr_button.id = "try";
		cr_button.style.background = 'blue';
		element.appendChild(cr_button);

		var tryfun = document.getElementById("try");
		tryfun.onclick = function (){
			var tryfun123 = document.getElementById("ttttt");
			document.getElementById("ttttt").innerHTML = tryfun123.value + tryfun.value;
		}
	}
}
