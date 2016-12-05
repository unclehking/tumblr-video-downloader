/*HKing 2016-12-5*/

browser.runtime.onMessage.addListener(
	f_nancy = (request, sender, sendResponse) =>{
		browser.downloads.download(
			{
				url: request.url
			},
			id=>{}
		);
		sendResponse({info:"downloading"});
	}
);

const  url="www.tumblr.com";
browser.browserAction.onClicked.addListener((tab) =>{
	function logTabs(tabs){
		for(tab of tabs){
			if(tab.url.match(url)){
				logTabs.bTab = true;
				browser.tabs.update(tab.id, {active: true});
				break;
			}
		}
		!logTabs.bTab && browser.tabs.create({url:`https://${url}`});
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	var querying = browser.tabs.query({currentWindow: true});
	querying.then(logTabs, onError);
});
