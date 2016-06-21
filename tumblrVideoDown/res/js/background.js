/*HKing 2016-04-29*/
const thunderDl =  chrome.i18n.getMessage("thunderDl");
const url = "www.tumblr.com";

chrome.contextMenus.create({
	"title": thunderDl,
	"contexts":["video"],
	"documentUrlPatterns":["*://*.tumblr.com/*"]
});

chrome.contextMenus.onClicked.addListener((info,tab)=>{
	let rUrl = `https://vt.tumblr.com/${/tumblr_.*/.exec(info.srcUrl)[0].replace(/\//g,"_")}.mp4`,
	thunderUrl = `thunder://${window.btoa(`AA${rUrl}ZZ`)}`;
	chrome.tabs.sendMessage(
		tab.id,
		{
			url:thunderUrl,
			oldUrl:info.srcUrl,
			rUrl:rUrl
		},
		response=>{}
	);
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
