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

function copyTxt(str){
    var ta= document.createElement('textarea');
    ta.readOnly = true;
    ta.innerText=str;
    ta.style.opacity='0';
    ta.style.position='fixed';
    ta.left=-1000;
    ta.top=-1000;
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    return new Promise(resolve=>{
        try{
            resolve(!!document.execCommand("Copy"))
          }catch(e){
            resolve(false)
            console.warn(e)
          }finally{
            document.body.removeChild(ta);
          }
    })
  }

  function addZero(v){
    return v>9? v: ('0'+v)
  }

function showDate(){
    var val = g['show-date-input'].value
    var res;
    if(val.match(/^\d+$/)){
        var dt = new Date(+val)
        var month = dt.getMonth()+1
        var date = dt.getDate()
        var hour = dt.getHours()
        var minu = dt.getMinutes()
        
        month = addZero(month)
        date = addZero(date)
        hour = addZero(hour)
        minu = addZero(minu)

        res = `${dt.getFullYear()}-${month}-${date} ${hour}:${minu}`
    }else{
        res = new Date(val).getTime()
    }
    console.log(res)
    g['date-result'].value = res
    g['date-result'].select()
}
docReady().then(e=>{

    var noAdvBtns = [].slice.call(document.querySelectorAll('#no-frame,#no-gif,#no-img'));
    noAdvBtns.forEach(ele => {
        ele.removeEventListener('click',handleObj)
        ele.addEventListener('click', handleObj, false)
    });

    g['showdate'].onclick=showDate;

    g['diy-title'].onclick=function(){
        let title = g['diy-title-input'].value
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            //active,audible,autoDiscardable,discarded,favIconUrl,height,highlighted,id,incognito,index,mutedInfo,pinned,selected,status,title,url,width,windowId
            chrome.tabs.sendMessage(tabs[0].id, {cmd:'diy-title',payload:title}, function(response) {
                response==null? alert("response为空...") : console.log(response);
            });//end  sendMessage   
        }); //end query
    };
})

