/*
  obj  Ԫ�أ�js dom
  type  �¼�����
  func  ��������	
  
  touchEvent(id,'tap',taps)
*/

//touchstart:  // ��ָ�ŵ���Ļ�ϵ�ʱ�򴥷� 
//touchmove:   // ��ָ����Ļ���ƶ���ʱ�򴥷� 
//touchend:    // ��ָ����Ļ�������ʱ�򴥷� 
//tap ��Ԫ��tap��ʱ�򴥷�-�൱�ڵ���¼�
//long �� ��һ��Ԫ�ر���ס����750ms����-�����¼���
//swipeLeft, swipeRight, swipeUp, swipeDown �� ��Ԫ�ر�����ʱ������//�󻬶��¼����һ����¼����ϻ����¼����»����¼�

//clientX / clientY��// �������������������ڵ�λ�� 
//pageX / pageY��    // �����������ҳ���λ�� --  ���ָ���λ�ã�����ָ������λ�� 
//screenX /screenY�� // �������������Ļ��λ��
//offsetLeft /offsetTop 
//scrollLeft /scrollTop



function touchEvent(obj,type,func) {
	//������Χ��5x5�������������s�ǿ�ʼ��e�ǽ���
	var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
	var sTime = 0, eTime = 0;	//��ʼʱ�䣬����ʱ��
	type = type.toLowerCase();	//�¼�����Сд
 
	//������ʼ
	obj.addEventListener("touchstart",function(){	
		sTime = new Date().getTime();
		init.sx = event.targetTouches[0].pageX;		//��ʼx�����
		init.sy = event.targetTouches[0].pageY;		//��ʼy�����
		init.ex = init.sx;	//����x�����
		init.ey = init.sy;  //����y�����
		if(type.indexOf("touchstart") != -1) func();		
	}, false);
	
	//��������
	obj.addEventListener("touchmove",function() {
		event.preventDefault();//��ֹ����ʱ����������š�����������
		init.ex = event.targetTouches[0].pageX;
		init.ey = event.targetTouches[0].pageY;
		if(type.indexOf("touchmove")!=-1) func();
	}, false);
 
	//��������
	obj.addEventListener("touchend",function() {
		var changeX = init.sx - init.ex;
		var changeY = init.sy - init.ey;
		if(Math.abs(changeX)>Math.abs(changeY) && Math.abs(changeY)>init.y) {  //changeX>changeY && changeY>init.y
			//���һ����¼�
			if(changeX > 0) {
				if(type.indexOf("swipeleft")!=-1) func();
			}else{
				if(type.indexOf("swiperight")!=-1) func();
			}
		}
		else if(Math.abs(changeY)>Math.abs(changeX) && Math.abs(changeX)>init.x){
			//���»����¼�
			if(changeY > 0) {
				if(type.indexOf("swipeup")!=-1) func();
			}else{
				if(type.indexOf("swipedown")!=-1) func();
			}
		}
		else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
			eTime = new Date().getTime();
			//����¼����˴�����ʱ���ϸ����
			if((eTime - sTime) >750) {
				if(type.indexOf("long")!=-1) func(); //����
			}
			else {
				if(type.indexOf("tap")!=-1) func(); //���������
			}
		}
		if(type.indexOf("touchend")!=-1) func();		//��������
	}, false);
};
