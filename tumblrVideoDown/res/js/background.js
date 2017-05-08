/*HKing 2016-06-25*/
const url = "www.tumblr.com";
const lang = navigator.language;
chrome.runtime.onMessage.addListener(
	f_nancy = (request, sender, sendResponse) =>{
		chrome.downloads.download(
			{
				url: request.url
			},
			id=>{}
		);
		sendResponse({info:"downloading"});
	}
);
chrome.browserAction.onClicked.addListener( tab =>{
	chrome.tabs.getAllInWindow(null, f_nancy = tabs =>{
		for(let t of tabs){
			if (t.url && t.url.match(url)) {
				f_nancy.tTab = true;
				chrome.tabs.update(t.id, {selected:true});
				break;
			}
		}
		!f_nancy.tTab && chrome.tabs.create({"url":`https://${url}`, "selected":true});
	});

});

lang === "zh-CN"
&&
(function(){
	chrome.contextMenus.create({
		"title": "迅雷下载此视频",
		"contexts":["video"],
		"id":"thunderDownload",
		"documentUrlPatterns":["*://*.tumblr.com/*"]
	});
	chrome.contextMenus.onClicked.addListener((info,tab)=>{
		let rUrl = `https://vt.tumblr.com/${/tumblr_.*/.exec(info.srcUrl)[0].replace(/\//g,"_")}.mp4`,
		thunderUrl = `thunder://${window.btoa(`AA${rUrl}ZZ`)}`;
		if(info.menuItemId === "thunderDownload"){
			chrome.tabs.sendMessage(
				tab.id,
				{
					url:thunderUrl,
					oldUrl:info.srcUrl,
					rUrl:rUrl
				},
				response=>{}
			);
		}

	});
})();
