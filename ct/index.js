console.info('\n\n-------no-adv-iframe running......\n\n');

var slice=Function.prototype.call.bind([].slice);
document.addEventListener('DOMContentLoaded',e=>{
    console.log('\n-----DOMContentLoaded\n');
    setTimeout(function(){
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
                '.div_body #main_right',
                'iframe'
            ].forEach(s=>{
                document.querySelectorAll(s).forEach( ele => ele.setAttribute('style',(ele.getAttribute('style')||'')+';visibility:hidden!important;') );
            });
        }catch(e){
            console.error(e);
        }
    },200);


    chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse) {
            document.querySelectorAll(request.selector).forEach(ele => {
                ele.remove();
            });
            console.log("onMessage.addListener, 前端/后端/Popup收到:",request, sender);
            sendResponse("ct手动消息并给出popup返回值：ok");
            console.log(document.querySelector('.div_body #main_right'))
        }
    );
});

chrome.extension.onRequest.addListener( (request, sender, sendResponse) => {
      console.log( sender.tab ?
                   "onRequest.addListener, from a content script:" + sender.tab.url :
                   "onRequest.addListener, from the extension" );
                  
      if (request.cmd == "no-frame"){
        document.querySelectorAll('iframe').forEach(ele => {
            ele.remove();
        });
        sendResponse({feedback: "done"});
      }
      else{
        sendResponse({feedback: "false"});
      }
});



