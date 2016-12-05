/*HKing 2016-12-5*/

const download = browser.i18n.getMessage("download"), downloading = browser.i18n.getMessage("downloading");
document.addEventListener('mouseover', (e) =>{
	if(e.target.nodeName == "VIDEO"){
		let $t = jQuery(e.target);
		if(!$t.next().hasClass('hkingWrap')){
			let oUrl = e.target.querySelector("source").src;
			let rUrl = `https://vt.tumblr.com/${/tumblr_.*/.exec(oUrl)[0].replace(/\//g,"_")}.mp4`;
			let hkingWrap = `<div class="hkingWrap">
								<input type="text" value="${rUrl}" />${download}
								<div>${downloading}</div>
							</div>`;
			jQuery($t).after(hkingWrap);
			$t.next().click( (event) =>{
				var _target = event.target;
				browser.runtime.sendMessage(
					{
						url:rUrl
					},
					response=>{
						$(_target).find('div').show().delay(2000).fadeOut();
					}
				)
				return false;
			});
		};
	};
});
