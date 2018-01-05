define(["jweixin","jquery","iscroll-zoom","touchEvent","eraser"], function(wx,$,IScroll) {
	var Jiu={
		//页面切换
		page:function(_this){
			//提示
			var js_tipPath=Dan(".js_tipPath")[0];
			//头像上传
			var js_uploadBox=Dan(".js_uploadBox")[0];
			var js_headImage=Dan(".js_headImage")[0];
			var js_uploadNext=Dan(".js_uploadNext")[0];
			//分享
			var js_photo=Dan(".js_photo");
			//抽奖
			var js_lotteryBtn=Dan(".js_lotteryBtn")[0];
			//表单
			var js_prizeTitle=Dan(".js_prizeTitle")[0];
			var js_prizeProduct=Dan(".js_prizeProduct")[0];
			var js_result=Dan(".js_result");
			var js_id=Dan(".js_id")[0];
			var js_name=Dan(".js_name")[0];
			var js_phone=Dan(".js_phone")[0];
			var js_address=Dan(".js_address")[0];
			var js_submitBtn=Dan(".js_submitBtn")[0];
			//抽奖失败
			var js_windowClose=Dan(".js_windowClose")[0];
			var js_resetBtn=Dan(".js_resetBtn")[0];

			//提示页
			touchEvent(js_tipPath,'swipeup',function(){
			   page_switchover("tip-path","index-path");
			});
			
			//上传头像页
			touchEvent(js_uploadNext,'tap',function(){	
				if(String(js_uploadBox.dataset.succeed).match("true")){
					page_switchover("upload-path","eraser-path");
					//得到用户缩放的值
					var x=_this.myScroll.x;	
					var y=_this.myScroll.y;
					var scale=_this.myScroll.scale*100;	
					for(var p=0;p<js_photo.length;p++){
						if(p==1){
							x=x/1.6854;
							y=y/1.6854;
						}
						js_photo[p].style.background="url("+js_headImage.src+") no-repeat";
						js_photo[p].style.backgroundPosition=x+"px "+y+"px";
						js_photo[p].style.backgroundSize=scale+"%";
					}
				}else{
					alertDialog("请上传您的头像");	
				}
			})
			
			//抽奖页
			touchEvent(js_lotteryBtn,'tap',function(){	
				ajaxPost('./web/api.php/index/getresult',{},function(msg){
					msg=JSON.parse(msg);
					if(Number(msg.data)!=4){
						js_prizeTitle.dataset.bg=msg.data;	
						js_prizeProduct.dataset.bg=msg.data;
						js_id.value=msg.data;
						js_result[0].dataset.hide=false;
						js_result[1].dataset.hide=true;
					}else{
						js_result[0].dataset.hide=true;
						js_result[1].dataset.hide=false;
					}
					alertDialog("正在抽奖中",2000)
					setTimeout(function(){
						page_switchover("lottery-path","form-path");
					},2000)
				},true)
			})
			
			//表单页
			touchEvent(js_submitBtn,'tap',function(){	
				if(String(document.body.dataset.share).match('true')){
					var name_val=js_name.value;
					var phone_val=js_phone.value;
					var address_val=js_address.value;
					var _id=js_id.value;
					if(name_val.length<2){
						alertDialog("请填写您的姓名");
						return false;
					}else if(phone_val.length!=11){
						alertDialog("请填写您的手机号码");
						return false;
					}else if(address_val.length<2){
						alertDialog("请填写您的具体地址");
						return false;
					}
					ajaxPost('./web/api.php/index/add',{name:name_val,phone:phone_val,addr:address_val,prize_id:_id},function(msg){
						msg=JSON.parse(msg);
						alertDialog(msg.data);
						if(msg.status==1){
							setTimeout(function(){
								WeixinJSBridge.invoke('closeWindow',{},function(res){});	
							},1000)
							//Dan(".js_sharePop2")[0].dataset.show=false;
						}
					})	
				}else{
					alertDialog("您还未分享");	
				}
			});
			
			//关闭网页
			touchEvent(js_windowClose,'tap',function(){	
				WeixinJSBridge.invoke('closeWindow',{},function(res){});
			});
			//再抽一次
			touchEvent(js_resetBtn,'tap',function(){
				page_switchover("form-path","index-path");
				delete js_uploadBox.dataset.succeed	;
				$("#js_canvas").eraser('reset');
				for(var p=0;p<js_photo.length;p++){
					js_photo[p].style.cssText="";
				}
				js_headImage.src=js_headImage.dataset.src;
				Dan(".js_sharePop")[0].dataset.show=false;
			});
			
		},
		//微信分享
		share:function(){
			var shareTitle = "“刷”脸抽洁面神器";		//【微信分享朋友圈的标题
			var shareTitle2 = "“刷”脸抽洁面神器";		//【微信分享好友的标题
			var shareWord ="雾霾躲不掉，就要会洗脸！快来和ta比拼人品~免费抽取“洁面神器”享优乐洁面仪！";		//【微信分享好友的描述
			var link = "http://wx.maildu.com/h5/Infinitus/face/";			//【微信分享出去的链接地址
			var imgUrl = "http://wx.maildu.com/h5/Infinitus/face/images/icon-share.png";		//【微信分享图标路径
			function initShareFunc() {
				wx.ready(function () {
					//监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
					wx.onMenuShareTimeline({
						title: shareTitle, 
						desc: shareWord,
						link: link,
						imgUrl: imgUrl,
						success: function (res) {
							page_switchover("share-path","lottery-path");
							document.body.dataset.share=true;
							//分享成功后执行
							ajaxPost('./web/api.php/index/shview',{},function(){},true);
						}
					});
					//监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
					wx.onMenuShareAppMessage({
						title: shareTitle2,
						desc: shareWord,
						link: link,
						imgUrl: imgUrl,
						success: function (res) {
							page_switchover("share-path","lottery-path");
							document.body.dataset.share=true;
							//分享成功后执行
							ajaxPost('./web/api.php/index/shview',{},function(){},true);
						}
					});
				});
				wx.error(function (res) {
					//alert(JSON.stringify(res))
				});
			}
			ajaxPost('./web/api.php/index/getwxconfig',{},function(config){
				  config=JSON.parse(config);
				  config.debug = false; // 调试
				  config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','chooseImage','uploadImage'];
				  wx.config(config);
				  initShareFunc();
			},true);
		},
		//头像上传-微信相册
		upload:function(_this){
			var js_headImage=Dan(".js_headImage")[0];
			var js_uploadBox=Dan(".js_uploadBox")[0];
			//调用微信接口选择或拍摄图片
			//用于保存图片本地地址
			var localIds ;
			
			//调用微信上传图片接口
			function upWxImg (){
				wx.uploadImage({
					localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						var serverId = res.serverId; // 返回图片的服务器端ID
						js_headImage.src=e.target.result;
						js_uploadBox.dataset.succeed=true;
						
						_this.myScroll.refresh();
						ajaxPost('./web/api.php/index/upload',{photo_mid:serverId},function(msg){
							console.log(msg);	
						},true);
						
					}	
		
				});
			}
			
			//使用微信选择图片接口
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					localIds = res.localIds;
					//显示图片
					js_headImage.src=localIds[0];
					js_uploadBox.dataset.succeed=true;
					alertDialog("照片可上下移动、双指缩放",3000);
					upWxImg();
				}
			});
			
			/*
			//普通浏览器 图像上传
			function previewImage(file) {
	 			//标准浏览器,FF、谷歌
				if (file["files"] && file["files"][0]) {
					
					var file_type=file["files"][0].type;
					if(file_type.indexOf("jpg")>1 || file_type.indexOf("bmp")>1 || file_type.indexOf("jpeg")>1 || file_type.indexOf("png")>1){
						var reader = new FileReader();
						reader.onload = function (e) {
							var img = new Image();
							img.src = e.target.result;
							img.onload = function(){
							  js_headImage.src=e.target.result;
							  js_uploadBox.dataset.succeed=true;
							  myScroll.refresh()
							};
						}
						reader.onloadend=function(){
							
						}
						reader.readAsDataURL(file.files[0]);
					}else{
						  alert("上传的图片文件不是.bmp，.jpeg，.png格式");  
					}	
				}else{
					  console.log("上传图片错误")
				  
				}
			}
			js_uploadBtn.onclick=function(){
				js_fileImage.click();
			}*/
		},
		//头像缩放
		zoom:function(_this){
			_this.myScroll = new IScroll('#zoom-iscroll', {
				zoom: true,
				scrollX: true,
				scrollY: true,
				mouseWheel: true,
				wheelAction: 'zoom',
				startZoom:2
			});
			//myScroll.on('zoomEnd', function () { console.log(this.scale); }); 
		},
		//头像刮刮卡
		eraser:function(){
			var js_eraserBox=Dan(".js_eraserBox")[0]
			var js_cleaner=Dan(".js_cleaner")[0];
			
			var showResetButton=function(){
				setTimeout(function(){
					page_switchover("eraser-path","share-path");
				},500);
				$("#js_canvas").eraser('clear');
			}
			//加载画布
			$("#js_canvas").eraser({
				size:80,
				completeRatio: .6,
				completeFunction: showResetButton
			});	
			
			js_eraserBox.addEventListener('touchend',function(){
				js_cleaner.style.cssText="";
				delete js_eraserBox.dataset.eraser;	
			});
			js_eraserBox.addEventListener('touchmove',function(){
				var x = event.targetTouches[0].pageX-40;
				var y = event.targetTouches[0].pageY-20;
				js_cleaner.style.webkitTransform="translate3d("+x+"px,"+y+"px, 0)";
				js_cleaner.style.transform="translate3d("+x+"px,"+y+"px, 0)";
			});		
		},
		init:function(){
			var _this=this;
			_this.page(_this);
			_this.share();		
			_this.eraser();
			_this.zoom(_this);
			//图像上传
			var js_uploadBtn=Dan(".js_uploadBtn")[0];
			var js_uploadAfresh=Dan(".js_uploadAfresh")[0];
			touchEvent(js_uploadBtn,'tap',function(){	
				_this.upload(_this);
			});
			touchEvent(js_uploadAfresh,'tap',function(){	
				_this.upload(_this);
			});
			//禁止默认触摸
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			//统计流量
			ajaxPost('./web/api.php/index/sview',{},function(){},true);
		}	
	}
	return Jiu;
});
