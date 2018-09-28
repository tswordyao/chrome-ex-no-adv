console.log('%c-------no-adv-iframe running......','padding:20px;background:aqua;');

var slice=Function.prototype.call.bind([].slice);
//document.addEventListener('DOMContentLoaded',e=>{
    console.log('\n-----DOMContentLoaded\n');
    //setTimeout(function(){
        var style='';
        try{
            [   '.wgt-daily',
                'ec-ad',
                '.widget-sma',
                '.cms-scroll',
                '#mainBox>aside',
                '.meau-list',
                'newsfeed',
                '.recommend-box',
                '.p4course_target',
                '.result-op',
                '.fixRight_box',
                'bdsharebuttonbox',
                'box_ad01',
                'blockR',
                '.pulllog-box',
                '.meau-gotop-box',
                '.recommend-right',
                'iframe'
            ].forEach(s=>{
                style+=`${s}{visibility:hidden!important;}`;
                //document.querySelectorAll(s).forEach( ele => ele.setAttribute('style',(ele.getAttribute('style')||'')+';visibility:hidden!important;') );
            });
            var styleEle = document.createElement('style');
            styleEle.innerText=style;
            document.documentElement.appendChild(styleEle);
        }catch(e){
            console.error(e);
        }
    //},0);

//});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        document.querySelectorAll('img').forEach(ele => {
            ele.remove();
        });
        alert("前端/后端/Popup收到");
        sendResponse("popup返回值");
    }
);

1||chrome.extension.onRequest.addListener( (request, sender, sendResponse) => {
      console.log( sender.tab ?
                   "from a content script:" + sender.tab.url :
                   "from the extension" );
                  
      if (request.cmd == "no-frame"){
        document.querySelectorAll('img').forEach(ele => {
            ele.remove();
        });
        sendResponse({feedback: "done"});
      }
      else{
        sendResponse({feedback: "false"});
      }
});



