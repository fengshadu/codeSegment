//微信分享
var shareTitle = "“刷”脸抽洁面神器";		//【微信分享朋友圈的标题
var shareTitle2 = "“刷”脸抽洁面神器";		//【微信分享好友的标题
var shareWord ="“刷脸”成功，正在抽洁面神器！快来和TA比拼人品吧~";		//【微信分享好友的描述
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
				if(String(document.body.dataset.share).match('true')){
					page_switchover("share-path","lottery-path");
					delete document.body.dataset.share;
				}
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
				if(String(document.body.dataset.share).match('true')){
					page_switchover("share-path","lottery-path");
					delete document.body.dataset.share;
				}
				//分享成功后执行
				ajaxPost('./web/api.php/index/shview',{},function(){},true);
			}
		});
	});
	wx.error(function (res) {
		//alert(JSON.stringify(res))
	});
}

ajaxPost('./web/api.php/index/getWxConfig',{},function(config){
	  config=JSON.parse(config);
	  config.debug = false; // 调试
	  config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','chooseImage','uploadImage'];
	  wx.config(config);
	  initShareFunc();
},true);