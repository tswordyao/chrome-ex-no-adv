console.log('%c-------no-adv-iframe 2020 running......','padding:20px;background:aqua;');

var slice=Function.prototype.call.bind([].slice);
//document.addEventListener('DOMContentLoaded',e=>{
    setTimeout(e=>console.log('\n-----DOMContentLoaded 2020\n'),2020);

    setInterval(intervalFn,9000)

    //setTimeout(function(){
        var style='';
        try{
            [   '.wgt-daily',
                '#content_right.cr-offset',
                '#content_left [style*="visibility:visible !important"]',
                '#footer[role="contentinfo"]',
                'ec-ad',
                '.widget-sma',
                '.cms-scroll',
                '#mainBox>aside',
                '.meau-list',
                'newsfeed',
                '.recommend-box',
                '.p4course_target',
                // '.result-op',
                '.fixRight_box',
                'bdsharebuttonbox',
                'box_ad01',
                'blockR',
                '.indexSuperise',
                '#note-fixed-ad-container',
                '#csdn-toolbar',
                '.pulllog-box',
                '.meau-gotop-box',
                '.recommend-right',
                '.main.mb10.clearfix',//51jb
                '.w350.fr',//'.article-right', //51jb
                '.div_body #main_right',
                'iframe'
            ].forEach(s=>{
                style+=`${s}{visibility:hidden!important;}`;
                //document.querySelectorAll(s).forEach( ele => ele.setAttribute('style',(ele.getAttribute('style')||'')+';visibility:hidden!important;') );
            });
            var styleEle = document.createElement('style');
            styleEle.innerText=style+=` 
            #full-height-container #splitter,#full-height-container #splitter-content{height:calc(100% - 15px)!important;}
            #_YNoteContentFrame{visibility:visible!important;}
            `.trim();
            document.documentElement.appendChild(styleEle);
        }catch(e){
            console.error(e);
        }
    //},0);

//});

    chrome.extension.onMessage.addListener( (request, sender, sendResponse) =>{
        extensionHandle(request, sender, sendResponse)
    });
//});


chrome.extension.onRequest.addListener( (request, sender, sendResponse) => {

      console.log( sender.tab ?  "onRequest.addListener, from a content script:" + sender.tab.url :
                                 "onRequest.addListener, from the extension" );

      extensionHandle(request, sender, sendResponse)
});


function extensionHandle(request, sender, sendResponse){
        // remove adv
        request.selector && document.querySelectorAll(request.selector).forEach(ele => {
            ele.remove();
        });

        // cmd:diy-title
        if (request.cmd == "diy-title"){
            console.log('request.cmd == "diy-title"')
            document.title = request.payload
            sendResponse({feedback: "done"});
        }

        console.log("onMessage.addListener, 前端/后端/Popup收到:",request, sender);
        sendResponse("ct手动消息并给出popup返回值：ok");
        // console.log(document.querySelector('.div_body #main_right'))
}

function intervalFn(){
    let ele = document.querySelector('#board_table_name')
    if(ele){
        document.title = ele.innerText
    }
}
