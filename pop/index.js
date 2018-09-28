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
        //bg.testBg('try use bg object')
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest(tab.id, {cmd: "no-frame"}, function(res) {
              console.log(res && res.feedback);
            });
          });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  
            chrome.tabs.sendMessage(tabs[0].id, {selector:"frame"}, function(response) {
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
    document.querySelector('#no-frame').addEventListener('click', handleObj, false);
})

