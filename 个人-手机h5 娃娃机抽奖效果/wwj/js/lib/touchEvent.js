/*
  obj  元素，js dom
  type  事件名称
  func  函数名称	
  
  touchEvent(id,'tap',taps)
*/

//touchstart:  // 手指放到屏幕上的时候触发 
//touchmove:   // 手指在屏幕上移动的时候触发 
//touchend:    // 手指从屏幕上拿起的时候触发 
//tap —元素tap的时候触发-相当于点击事件
//long — 当一个元素被按住超过750ms触发-长按事件。
//swipeLeft, swipeRight, swipeUp, swipeDown — 当元素被划过时触发。//左滑动事件，右滑动事件，上滑动事件，下滑动事件

//clientX / clientY：// 触摸点相对于浏览器窗口的位置 
//pageX / pageY：    // 触摸点相对于页面的位置 --  鼠标指针的位置，或手指触摸的位置 
//screenX /screenY： // 触摸点相对于屏幕的位置
//offsetLeft /offsetTop 
//scrollLeft /scrollTop



function touchEvent(obj,type,func) {
	//滑动范围在5x5内则做点击处理，s是开始，e是结束
	var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
	var sTime = 0, eTime = 0;	//开始时间，结束时间
	type = type.toLowerCase();	//事件名字小写
 
	//触摸开始
	obj.addEventListener("touchstart",function(){	
		sTime = new Date().getTime();
		init.sx = event.targetTouches[0].pageX;		//开始x坐标点
		init.sy = event.targetTouches[0].pageY;		//开始y坐标点
		init.ex = init.sx;	//结束x坐标点
		init.ey = init.sy;  //结束y坐标点
		if(type.indexOf("touchstart") != -1) func();		
	}, false);
	
	//触摸经过
	obj.addEventListener("touchmove",function() {
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
		init.ex = event.targetTouches[0].pageX;
		init.ey = event.targetTouches[0].pageY;
		if(type.indexOf("touchmove")!=-1) func();
	}, false);
 
	//触摸结束
	obj.addEventListener("touchend",function() {
		var changeX = init.sx - init.ex;
		var changeY = init.sy - init.ey;
		if(Math.abs(changeX)>Math.abs(changeY) && Math.abs(changeY)>init.y) {  //changeX>changeY && changeY>init.y
			//左右划动事件
			if(changeX > 0) {
				if(type.indexOf("swipeleft")!=-1) func();
			}else{
				if(type.indexOf("swiperight")!=-1) func();
			}
		}
		else if(Math.abs(changeY)>Math.abs(changeX) && Math.abs(changeX)>init.x){
			//上下划动事件
			if(changeY > 0) {
				if(type.indexOf("swipeup")!=-1) func();
			}else{
				if(type.indexOf("swipedown")!=-1) func();
			}
		}
		else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
			eTime = new Date().getTime();
			//点击事件，此处根据时间差细分下
			if((eTime - sTime) >750) {
				if(type.indexOf("long")!=-1) func(); //长按
			}
			else {
				if(type.indexOf("tap")!=-1) func(); //当点击处理
			}
		}
		if(type.indexOf("touchend")!=-1) func();		//触摸结束
	}, false);
};
