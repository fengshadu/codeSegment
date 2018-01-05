requirejs.config({
    "baseUrl": "js/lib/",			  //base路径
	
	//相对base路径 ，查找文件
	"paths": {
	  "jquery": "jquery" ,  //别名：文件名字    链接不依赖其它库的js文件
	  "jweixin":"jweixin",
	  "touchEvent": "touchEvent" , 
	  "iscroll-zoom": "iscroll-zoom" 
	},
	"shim": {
        "eraser": ["jquery"],    //插件：依赖文件   eraser.js 依赖 jquery.js 
    }
});
//执行效果的文件
requirejs(["../mod/main"],function(obj){
	obj.init();
}); 
