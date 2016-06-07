/*HKing 2016-04-29*/
var ifr;
const copyUrl = chrome.i18n.getMessage("copyUrl"),copied = chrome.i18n.getMessage("copied");
chrome.runtime.onMessage.addListener(
	f_nancy = (request, sender, sendResponse) =>{
		var v = document.querySelector("video").querySelector("source");
		if(v.src==request.oldUrl || self==top){
			ifr = ifr || (f_nancy.isFirst=true,document.createElement('iframe'));
			ifr.src = request.url;
			f_nancy.isFirst && document.body.appendChild(ifr);
		};
	    return false;
	}
);

document.addEventListener('mouseover', (e) =>{
	if(e.target.nodeName == "VIDEO"){
		let $t = jQuery(e.target);
		if(!$t.next().hasClass('hkingWrap')){
			let oUrl = e.target.querySelector("source").src,
			    rUrl = `https://vt.tumblr.com/${/tumblr_.*/.exec(oUrl)[0].replace(/\//g,"_")}.mp4`,
			    hkingWrap = `<div class="hkingWrap">
								<input type="text" value="${rUrl}" />${copyUrl}
								<div>${copied}</div>
							</div>`;
			jQuery($t).after(hkingWrap);
			$t.next().click( (event) =>{
				event.target.querySelector("input").select();
				document.execCommand('copy');
				$(event.target).find('div').show().delay(2000).fadeOut();
			});
		}

	};
});
