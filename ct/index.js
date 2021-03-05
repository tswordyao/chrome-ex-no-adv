console.log('%c-------no-adv-iframe 2020 running......','padding:20px;background:aqua;');

var slice=Function.prototype.call.bind([].slice);
var isTropper =   location.host.includes('trooper-test')
var isStudy = location.host.includes('study.163')

//document.addEventListener('DOMContentLoaded',e=>{
    setTimeout(e=>console.log('\n-----DOMContentLoaded 2020\n'),2020);

    //setTimeout(function(){
        var style='';
        try{
            var selectorList = [   '.wgt-daily',
                '#passportbox.login-box',//blog.csdn
                '.login-mark',
                '#content_right.cr-offset',
                '#content_left [style*="visibility:visible !important"]',
                '#footer[role="contentinfo"]',
                'ec-ad',
                '.widget-sma',
                '.cms-scroll',
                '#mainBox>aside',
                '.main-content~.side-content',
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
            ]
            
            isStudy || selectorList.forEach(s=>{
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

    // trooper站特有的定时检测任务
  isTropper && setInterval(function intervalFn(){
        let ele = document.querySelector('#board_table_name')
        if(ele){
            document.title = ele.innerText
        }
    },5000)

    // 初始化study.163特有的定时轮询任务
    if(isStudy){
        var initItv = setInterval(()=>{
            (document.querySelectorAll('.interest-guide-dialog,.um-order-phone-bind-modal')||[]).forEach(it=>it.remove())
        },1500)
    
        // 15秒后取消初始定时轮询任务
        setTimeout(e=>{
            clearInterval(initItv)
        },15*1000)
    }


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


// 这里能收到插件pop页面的通知，然后在当前访问页面环境下执行
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
