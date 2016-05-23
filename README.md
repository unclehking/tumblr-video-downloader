# tumblrVideoDown
tumblr视频下载chrome插件（兼容各大“国产”浏览器急速版）

截图： <br />
![github](https://raw.githubusercontent.com/unclehking/tumblrVideoDown/master/s0.jpg "github")  

 <p>离线chrome插件（.crx文件）安装方式： </p>
 <p>1、打开chrome扩展程序页面 chrome://extensions/ 或者 菜单 > 更多工具> 扩展程序；</p>
 <p>2、把。crx文件拖进该页面。</p>

###2016-05-23
1、修复video控制条被隐藏的bug； <br />
2、新增“复制视频真实地址到剪贴板”。

截图： <br />
![github](https://raw.githubusercontent.com/unclehking/tumblrVideoDown/master/s1.png "github")  
![github](https://raw.githubusercontent.com/unclehking/tumblrVideoDown/master/s2.png "github")  

css：
```java  
video.vjs-tech{
	position: absolute !important;
	top: 0px !important;
	left: 0px !important;
	z-index: 998 !important;
}
.hkingWrap{
	position: absolute;
	right: 4px;
	top: 4px;
	padding: 0 6px;
	height: 28px;
	line-height: 28px;
	z-index: 999 !important;
	background-color: #ff0000;
	display: none;
	text-align: center;
	border-radius: 4px;
	cursor: pointer;
	overflow: hidden;
}
.hkingWrap > div{
	position: absolute;
	left: 0;
	top: 0;
	display: none;
	color: #ffffff;
	width: 100%;
	height: 100%;
	line-height: 28px;
	text-align: center;
	background-color: green;
}
.crt-video:hover .hkingWrap{
	display: block;
}
.hkingWrap input{
	position: absolute;
	top: -999px;
}
.crt-skin-default.vjs-has-started .vjs-control-bar{
	z-index: 1000 !important;
}
```

JavaScript：
```java
document.addEventListener('mouseover', function(e) {
	if(e.target.nodeName == "VIDEO"){
		var oUrl = e.target.querySelector("source").src;
		var rUrl = 'https://vt.tumblr.com/'+
				   /tumblr_.*/.exec(oUrl)[0].replace(/\//g,"_")+'.mp4'
		var hkingWrap = '<div class="hkingWrap"><input type="text" />复制真实视频地址<div>√ 已复制<div></div>';
		var $this = jQuery(e.target);
		if(!$this.next().hasClass('hkingWrap')){
			jQuery($this).after(hkingWrap);
			$this.next().find('input').val(rUrl);
			$this.next().click(function(e){
				var copyTextarea = jQuery(this).find("input");
				copyTextarea.select();
				document.execCommand('copy');
				jQuery(this).find('div').show().delay(2000).fadeOut();
			});
		}
	};
});
```
