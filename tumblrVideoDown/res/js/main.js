/*HKing 2016-04-29*/

var ifr;
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
			    hkingWrap = `<div class="hkingWrap" data-url="${rUrl}" title="Download this video.">
								<div></div>
								<p></p>
							</div>`;
			jQuery($t).after(hkingWrap);
			$t.next().click( (event) =>{
				var target = event.target;
				chrome.runtime.sendMessage(
					{
						url:target.dataset.url
					},
					response=>{
						$(target).find("p").show().delay(2000).fadeOut(1000);
					}
				)
				return false;
			});
		}

	};
});
