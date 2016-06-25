/*HKing 2016-06-25*/
const thunderDl =  chrome.i18n.getMessage("thunderDl");
const download = chrome.i18n.getMessage("download");
const url = "www.tumblr.com";
chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT = 5;
chrome.contextMenus.create({
	"title": thunderDl,
	"contexts":["video"],
	"id":"thunderDownload",
	"documentUrlPatterns":["*://*.tumblr.com/*"]
});
chrome.contextMenus.create({
	"title": download,
	"contexts":["video"],
	"id":"chromeDownload",
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
	}else{
		chrome.downloads.download(
			{
				url:rUrl
			},
			id=>{}
		);
	}

});

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
