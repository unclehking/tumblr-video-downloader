/*HKing 2016-04-29*/
chrome.contextMenus.create({
	"title": "迅雷下载",
	"contexts":["video"],
	"documentUrlPatterns":["*://*.tumblr.com/*"]
});
chrome.contextMenus.onClicked.addListener(function(info,tab){
	console.log(window.copy);
	var rUrl = 'https://vt.tumblr.com/'+
			   /tumblr_.*/.exec(info.srcUrl)[0].replace(/\//g,"_")+'.mp4',
	thunderUrl = 'thunder://'+window.btoa('AA'+rUrl+'ZZ');
	chrome.tabs.sendMessage(
		tab.id,
		{
			url:thunderUrl,
			oldUrl:info.srcUrl
		},
		function(response){}
	);
});
