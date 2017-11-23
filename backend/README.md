## 后台请求接口介绍

所有的接口都应该使用ajax来请求，请求的接口当前总共有四个，三个POST、一个GET，下面具体说明。

#### 获取Bug详细信息

使用jQuery调用的方式：

```Javascript
$.get("/api/get", {
    id: "……" // 具体的Bug 的id
}, function (data) {
    // data是后台返回的数据
    console.log(data);
});
```

上面的方式是获取某一个具体的问题的调用方式，如果想获取很多个，那么可以使用类似数组的方式，例如要获取从第一个Bug开始数的6个Bug，可以这么写。

```Javascript
$.get("/api/get", {
    range: "0:6"
}, function (data) {
    // data是后台返回的数据
    console.log(data);
});
```

#### 添加Bug

```Javascript
$.post("/api/add", {
    content: content // content是想传给后台的数据
}, function (data) {
    // data是后台返回的数据
    console.log(data);
});
```

#### 更新Bug

```Javascript
$.post("/api/update", {
    id: id,
    content: content
}, function (data) {
    // data是后台返回的数据
    console.log(data);
});
```

#### 删除Bug

```Javascript
$.post("/api/delete", {
    id: id
}, function (data) {
    // data是后台返回的数据
    console.log(data);
});
```
