/*HKing 2016-06-25*/
// const thunderDl =  chrome.i18n.getMessage("thunderDl");
// const download = chrome.i18n.getMessage("download");
// const url = "www.tumblr.com";
// console.log(thunderDl);
// chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT = 5;
// chrome.contextMenus.create({
// 	"title": thunderDl,
// 	"contexts":["video"],
// 	"id":"thunderDownload",
// 	"documentUrlPatterns":["*://*.tumblr.com/*"]
// });
// chrome.contextMenus.create({
// 	"title": download,
// 	"contexts":["video"],
// 	"id":"chromeDownload",
// 	"documentUrlPatterns":["*://*.tumblr.com/*"]
// });
//
// chrome.contextMenus.onClicked.addListener((info,tab)=>{
// 	let rUrl = `https://vt.tumblr.com/${/tumblr_.*/.exec(info.srcUrl)[0].replace(/\//g,"_")}.mp4`,
// 	thunderUrl = `thunder://${window.btoa(`AA${rUrl}ZZ`)}`;
// 	if(info.menuItemId === "thunderDownload"){
// 		chrome.tabs.sendMessage(
// 			tab.id,
// 			{
// 				url:thunderUrl,
// 				oldUrl:info.srcUrl,
// 				rUrl:rUrl
// 			},
// 			response=>{}
// 		);
// 	}else{
// 		chrome.downloads.download(
// 			{
// 				url:rUrl
// 			},
// 			id=>{}
// 		);
// 	}
//
// });

const  url="d3d3LnR1bWJsci5jb20=";
browser.browserAction.onClicked.addListener((tab) =>{
	function logTabs(tabs){
		for(tab of tabs){
			if(tab.url.match(atob(url))){
				logTabs.bTab = true;
				browser.tabs.update(tab.id, {active: true});
				break;
			}
		}
		!logTabs.bTab && browser.tabs.create({url:`https://${atob(url)}`});
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	var querying = browser.tabs.query({currentWindow: true});
	querying.then(logTabs, onError);

});
