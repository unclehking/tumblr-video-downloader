	﻿/*HKing 2016-06-25*/
	const url = "www.tumblr.com";
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

	const lang = navigator.language;
	(lang === "zh-CN")
	&&
	(function(){
		console.log(111);
	})();
