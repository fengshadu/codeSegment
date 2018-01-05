seajs.use('index');

define(function (require, exports, module) {
    var login = require('login');
    var util = require('lib/util');
    var zepto = require('lib/zepto.min');
});


define(function (require, exports, module) {
    // 对外提供接口
    module.exports = {
        name: 'xiaohong',
        calHim: function () {}
    };
});

define(function (require, exports, module) {
    // 通过return提供接口
    return {
        name: 'xiaohong',
        calHim: function (){}
    };
});

seajs.config({
    // url解析路径，不配置则和sea.js同路径
    base: 'http://qt.qq.com/act/seajs/modules'

    //设置别名，方便调用
    alisa:｛
        'zepto': 'http://ossweb-img.qq.com/images/js/zepto.js/'
    },

    // 映射配置，require('login')实际加载时login-debug.js
    map: [
        ['.js','-debgu.js']
    ]
})

// 无callback
seajs.use('login');

// 有callback
seajs.use('login', function (login) {
    login.doLogin();
})