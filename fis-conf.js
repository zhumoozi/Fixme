/**
 * Create by xiaofu.qin {2017/11/11}
 * description:
 */
// npm install [-g] fis3-hook-amd
// fis.hook('amd');

// 举个例子，发布的时候会将所有的js文件放置在static/js/文件夹下，其他的相互对应
fis.match('static/*.{png,js,css,less}', {
    release: '/$0'
});

// 对所有的静态文件使用文件指纹的方法，防止浏览器缓存
fis.match('static/js/*.js', {
    // useHash: true
});
fis.match('static/**/*.{png,css,less}', {
    useHash: true
});

// Fuck 工程化配起来真难，不用了！
// fis.match('static/js/*.js', {
//     // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
//     isMod: true
//     // release: '/static/js/$0'
// });

// fis.match('::package', {
//     // npm install [-g] fis3-postpackager-loader
//     // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
//     postpackager: fis.plugin('loader', {
//         resourceType: 'amd',
//         useInlineMap: true // 资源映射表内嵌
//     })
// });

// fis3 release prod 产品发布，进行合并
fis.media('prod')
    .match('*.js', {
        packTo: '/static/aio.js'
    });
