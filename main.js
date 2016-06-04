/*HKing 2016-04-29*/
var ifr, copyUrl = chrome.i18n.getMessage("copyUrl"),
copyed = chrome.i18n.getMessage("copyed");
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

document.addEventListener('mouseover', (e) =>{
	if(e.target.nodeName == "VIDEO"){
		let $t = jQuery(e.target);
		if(!$t.next().hasClass('hkingWrap')){
			let oUrl = e.target.querySelector("source").src,
			    rUrl = `https://vt.tumblr.com/${/tumblr_.*/.exec(oUrl)[0].replace(/\//g,"_")}.mp4`,
			    hkingWrap = `<div class="hkingWrap">
								<input type="text" value="${rUrl}" />${copyUrl}
								<div>${copyed}</div>
							</div>`;
			jQuery($t).after(hkingWrap);
			$t.next().click( (e)=>{
				let copyTextarea = jQuery(this).find("input");
				copyTextarea.select();
				document.execCommand('copy');
				jQuery(this).find('div').show().delay(2000).fadeOut();
			});
		}

	};
});
