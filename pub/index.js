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

const selectors=[   
    '.wgt-daily',
    'ec-ad',
    '.widget-sma',
    '.cms-scroll',
    '.result-op',
    '.fixRight_box',
    'iframe'
];