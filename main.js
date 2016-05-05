/*HKing 2016-04-29*/
var ifr;
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		var v = document.querySelector("video").querySelector("source");
		if(v.src==request.oldUrl || self==top){
			var isFirst;
			ifr = ifr || (isFirst=true,document.createElement('iframe'));
			ifr.src = request.url;
			isFirst && document.body.appendChild(ifr);
		};
	    return false;
	}
);
