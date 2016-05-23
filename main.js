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

document.addEventListener('mouseover', function(e) {
	if(e.target.nodeName == "VIDEO"){
		var oUrl = e.target.querySelector("source").src;
		var rUrl = 'https://vt.tumblr.com/'+
				   /tumblr_.*/.exec(oUrl)[0].replace(/\//g,"_")+'.mp4'
		var hkingWrap = '<div class="hkingWrap"><input type="text" />复制真实视频地址<div>√ 已复制<div></div>';
		var $this = jQuery(e.target);
		if(!$this.next().hasClass('hkingWrap')){
			jQuery($this).after(hkingWrap);
			$this.next().find('input').val(rUrl);
			$this.next().click(function(e){
				var copyTextarea = jQuery(this).find("input");
				copyTextarea.select();
				document.execCommand('copy');
				jQuery(this).find('div').show().delay(2000).fadeOut();
			});
		}

	};
});
