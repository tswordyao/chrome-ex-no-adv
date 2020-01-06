const g = window;
function defered(){
    let bag;
    let pro=new Promise( (resolve,reject) => { 
        bag={resolve,reject}; 
    });
    return Object.assign(pro,bag);
}

function docReady(){
    let d=defered();
    document.addEventListener('DOMContentLoaded',e=>{
        console.log('DOMContentLoaded')
        d.resolve(e);
    })
    return d;
}

const handleObj={
    ext:chrome.extension,
    bg:chrome.extension.getBackgroundPage(),
    handleEvent(e){
        console.log(this, e, this.ext, this.bg)

        let ele = e.target
        let cmd = ele.id;
        let selector = ele.getAttribute('selector')

        //bg.testBg('try use bg object')
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest(tab.id, {cmd}, function(res) {
              console.log(res && res.feedback);
            });
          });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  
            chrome.tabs.sendMessage(tabs[0].id, {selector}, function(response) {
                response==null? alert("response为空") : console.log(response);
            });//end  sendMessage   
        }); //end query
        
        1||chrome.tabs.getSelected(null, function(tab) {
            console.warn(tab);
            [
                '.wgt-daily',
                'ec-ad',
                '.widget-sma',
                '.cms-scroll',
                '.result-op',
                '.fixRight_box',
                'iframe'
            ].forEach(s=>{
                document.addEventListener('DOMContentLoaded',e=>{
                    document.querySelectorAll(s).forEach(ele => {
                        ele.remove();
                    });
                })
        
            });
        });

    }
};
docReady().then(e=>{

    [].slice.call(document.querySelectorAll('#no-frame,#no-gif,#no-img')).forEach(ele => ele.addEventListener('click', handleObj, false));

    g['show-date'].addEventListener('click', function(){
        let val = g['show-date-input'].value
        let res;
        if(val.match(/^\d+$/)){
            let dt = new Date(+val)
            let month = dt.getMonth()+1
            let date = dt.getDate()
            month = month>9? month: ('0'+month)
            date = date>9? date: ('0'+date)
            res = `${dt.getFullYear()}-${month}-${date}`
        }else{
            res = new Date(val).getTime()
        }
        g['date-result'].value = res
        g['date-result'].select()
    });

    g['diy-title'].addEventListener('click', function(){
        let title = g['diy-title-input'].value
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            //active,audible,autoDiscardable,discarded,favIconUrl,height,highlighted,id,incognito,index,mutedInfo,pinned,selected,status,title,url,width,windowId
            chrome.tabs.sendMessage(tabs[0].id, {cmd:'diy-title',payload:title}, function(response) {
                response==null? alert("response为空...") : console.log(response);
            });//end  sendMessage   
        }); //end query
    });
})

