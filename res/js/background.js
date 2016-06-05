/*HKing 2016-04-29*/
var thunderDl =  chrome.i18n.getMessage("thunderDl");
chrome.contextMenus.create({
	"title": thunderDl,
	"contexts":["video"],
	"documentUrlPatterns":["*://*.tumblr.com/*"]
});
chrome.contextMenus.onClicked.addListener(function(info,tab){
	var rUrl = 'https://vt.tumblr.com/'+
			   /tumblr_.*/.exec(info.srcUrl)[0].replace(/\//g,"_")+'.mp4',
	thunderUrl = 'thunder://'+window.btoa('AA'+rUrl+'ZZ');
	chrome.tabs.sendMessage(
		tab.id,
		{
			url:thunderUrl,
			oldUrl:info.srcUrl,
			rUrl:rUrl
		},
		function(response){}
	);
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.getAllInWindow(null, function(tabs) {
		var tTab,url = "www.tumblr.com";
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url && tabs[i].url.match(url)) {
				tTab = 1;
				chrome.tabs.update(tabs[i].id, {selected:true});
				break;
			}
		}
		if(!tTab) chrome.tabs.create({"url":"https://"+url, "selected":true});
	});

});
