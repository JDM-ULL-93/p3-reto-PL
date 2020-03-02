
"use strict";

const loadScripts = async function(scripts, onComplete){

    let loadScript = function(src, success, error){
        let script = document.createElement('script');
        script.src = src;
        console.log("Cargando script : "+ src);
        script.onload = function(){
            success(script);
        };
        script.onerror = function(event){
            event.preventDefault();
            error(new Error(`No se ha podido cargar el script '${this.src}'`));
        };
        document.head.append(script);
    };
    let promises = [];
    const aleatorio = (min,max) => { return Math.random()*(min+max); };
    for(let i = 0; i < scripts.length;i++){
        let src = scripts[i];
        promises.push( new Promise(
            function(resolve,reject){
                setTimeout(function(){loadScript(src, resolve, reject)},aleatorio(5000,10000));
            }
        ));
    }
    Promise.all(promises).then(function(resolve,reject){onComplete(null,scripts)});
};

loadScripts(["3.js","1.js","2.js"], function(error,scripts){
    console.log("Entrando en onComplete");
    if(error){
        console.log("OnComplete -> error");
        console.log(error);
    }
    else{
        alert(casa());
    }
});

