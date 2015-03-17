/**
 * @author ddennis.dk - aka fantastisk.dk/works aka meresukker.dk
 */

// VARS ------------------------------------------------------------
LoaderApi.COMPLETE = "complete";
LoaderApi.PROGRESS = "progress";


function LoaderApi () {
    "use strict";
    PIXI.EventTarget.call(this);
    this.loader = null;
    this.name = "dennis loader API"
};

//---------------------------------------------------------------------------------------
/*LoaderApi.prototype = Object.create(EventEmitter.prototype);
 LoaderApi.prototype.constructor = LoaderApi;*/
//---------------------------------------------------------------------------------------


LoaderApi.prototype.load = function (assetsArr) {
    //console.log (" loaderApi.js >  assetsArr " , assetsArr );
    this.assetAmountToLoad = assetsArr.length;

    this.loader = new PIXI.AssetLoader(assetsArr);
    var that = this;

    this.loader.addEventListener('onComplete', function (e) {
        that.onAssetLoaded(e)
    });

    this.loader.addEventListener('onProgress', function (e) {
        that.onProgress(e)
    });

    // Start loading
    this.loader.load()
};


LoaderApi.prototype.onProgress =  function (e) {
    var type = e.type;
    var assLdr = e.content; //AssetLoader
    var ImgLdr = e.loader; //imageLoader

    var current = this.assetAmountToLoad - assLdr.loadCount
    var progress = current / this.assetAmountToLoad
    //this.emit (LoaderApi.PROGRESS, progress)
    this.emit({ type: LoaderApi.PROGRESS, data:progress });
};


// WHEN ALL ASSETS IS LOADED
//---------------------------------------------------------------------------------------
LoaderApi.prototype.onAssetLoaded =  function (e) {
    var ldr = e.content;
    var type = e.type;
    //this.emit (LoaderApi.COMPLETE)
    this.emit(LoaderApi.COMPLETE);
    console.log ("onAssetLoaded  " )
};


