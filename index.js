
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
    let timeOutsId = [];
    const aleatorio = (min,max) => { return Math.random()*(min+max); };
    for(let i = 0; i < scripts.length;i++){
        let src = scripts[i];
        promises.push( new Promise(
            function(resolve,reject){
                timeOutsId.push(setTimeout(function(){loadScript(src, resolve, reject)},aleatorio(5000,10000)));
            }
        ));
    }
    Promise.all(promises).then(
        function(result){onComplete(null,result)}, //1ºarg == funcion llamada en exito
        function(error){
            timeOutsId.forEach(id => {clearTimeout(id)});
            onComplete(error.message,null)
        } ); //2ºarg == función llamada en error
};

loadScripts(["error,js","3.js","1.js","2.js"], function(error,scripts){
    if(error){
        console.error(error);
    }
    else{
        alert(casa());
    }
});

