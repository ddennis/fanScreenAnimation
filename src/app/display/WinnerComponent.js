

function WinnerComponent(loaderApi){
    "use strict";
    PIXI.DisplayObjectContainer.call(this);
    PIXI.EventTarget.call(this);

    this.loaderApi = loaderApi


    this.imageHolder = new PIXI.DisplayObjectContainer()

    var blueImageBackground = new PixiBox (81,81, 0x17acd5)
    this.imageHolder.addChild(blueImageBackground)
    this.addChild(this.imageHolder)


    // Logo holder with extra blue background 
    this.logoHolder = new PIXI.DisplayObjectContainer()
    this.logo = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.questionBarLogo)) 
    this.logo.x = 55
    this.logo.y = 1    
    this.blueBar = new Bar (20, 0x17acd5)
    this.blueBar.x = 50

    // add to logoHolder
    this.logoHolder.addChild(this.blueBar)
    this.logoHolder.addChild(this.logo)        
    this.addChildAt(this.logoHolder, 0)

    this.logoHolder.x = 10
    this.logoHolder.y = -1

    this.winnerBar = new Bar (170, 0x000643)
    this.winnerBar.x = 56
    this.winnerBar.y = 27
    this.addChildAt(this.winnerBar, 0)

    this.winnerNameBar = new Bar (100)
    this.winnerNameBar.x = 56
    this.winnerNameBar.y = 53
    this.addChildAt(this.winnerNameBar, 0)

    this.fastTxt = new PIXI.Text("HURTIGSTE SVAR", {fill:"#e3da02", font:"14px alright_sansultra_italic"});
    this.fastTxt.x = 90
    this.fastTxt.y = 34
    this.addChild(this.fastTxt)
    
    this.winnerTxt = new PIXI.Text("test", {fill:"#000000", font:"16px alright_sansultra_italic"});
    this.winnerTxt.x = 90
    this.winnerTxt.y = 62
    this.addChild(this.winnerTxt)

    this.imageHolder.alpha = 0
    this.logoHolder.alpha = 0
    this.winnerTxt.alpha = 0
    this.fastTxt.alpha = 0
    this.winnerNameBar.alpha = 0
    this.winnerBar.alpha = 0


    // Vars
    this.imageSpriteYpos = 3
    // call back function 
    this.__imageLoaded = this.imageLoaded.bind(this)

}


//Copy over prototype --------------------------------------------------------------------------------------

WinnerComponent.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
WinnerComponent.prototype.constructor = WinnerComponent;

//---------------------------------------------------------------------------------------


// Private function
WinnerComponent.prototype.imageLoaded = function (e) {
    console.log("sdfsdf" )

    this.loaderApi.off(LoaderApi.COMPLETE , this.__imageLoaded)
    
    var imageTexture = new PIXI.Texture.fromImage(this.imageUrl)    
    this.imageSprite = new PIXI.Sprite(imageTexture)
    
    this.imageSprite.x = this.imageSpriteYpos
    this.imageSprite.y = this.imageSpriteYpos
    this.imageHolder.addChild(this.imageSprite)


// Animation
// -------------------------------------------------------------------------------------

    this.imageHolder.x = -90
    TweenLite.to(this.imageHolder , .4 , {alpha:1, x:0 , delay:0, ease:Strong.easeOut});
    
    this.logoHolder.x = -90
    TweenLite.to(this.logoHolder , .4 , {alpha:1, x:10 , delay:.2, ease:Strong.easeOut});


    this.winnerBar.scale.x = 0
    TweenLite.to(this.winnerBar.scale , .3 , {x:1, delay:.4, ease:Strong.easeOut});
    TweenLite.to(this.winnerBar , .2 , {alpha:1, delay:.4, ease:Strong.easeOut});

    this.fastTxt.x = 70;
    TweenLite.to(this.fastTxt , .3 , {x:90, alpha:1, delay:.5, ease:Strong.easeOut});
    
    this.winnerNameBar.scale.x = 0
    TweenLite.to(this.winnerNameBar.scale , .4 , {x:1, delay:.6, ease:Strong.easeOut});
    TweenLite.to(this.winnerNameBar , .4 , {alpha:1, delay:.6, ease:Strong.easeOut});

    TweenLite.to(this.winnerTxt , .4 , {alpha:1, delay:.65, ease:Strong.easeOut});
    

}



WinnerComponent.prototype.showWinner = function (imageUrl, winnerFullName) {
    
    this.winnerTxt.setText (winnerFullName.toUpperCase());
    this.winnerNameBar.redraw(this.winnerTxt.width +50);
    this.imageUrl = imageUrl
    var arr = [imageUrl]
    this.loaderApi.on(LoaderApi.COMPLETE , this.__imageLoaded )
    this.loaderApi.load(arr)

}


WinnerComponent.prototype.hideWinner = function () {    
    
    TweenLite.to(this.imageHolder , .6 , {alpha:0, x:-150 , delay:.4, ease:Expo.easeOut});
    TweenLite.to(this.logoHolder , .5 , {alpha:0, x:-80 , delay:.25, ease:Expo.easeOut});
    TweenLite.to(this.winnerBar.scale , .3 , {x:0, delay:.18, ease:Expo.easeOut});
    TweenLite.to(this.winnerBar , .3 , {alpha:0, delay:.18, ease:Expo.easeOut});    
    TweenLite.to(this.fastTxt , .3 , {x:80, alpha:0, delay:.1, ease:Expo.easeOut});    
    TweenLite.to(this.winnerNameBar.scale , .4 , {x:0, delay:0, ease:Expo.easeOut});
    TweenLite.to(this.winnerNameBar , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
    TweenLite.to(this.winnerTxt , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
}
