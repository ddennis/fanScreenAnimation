

function GameWinner(loaderApi){
    "use strict";
    PIXI.DisplayObjectContainer.call(this);
    PIXI.EventTarget.call(this);

    this.loaderApi = loaderApi

    this.imageHolder = new PIXI.DisplayObjectContainer()
    this.imageHolder.y = 9
    this.addChild(this.imageHolder)

    this.winnerBar = new Bar (180, 0x000643)
    this.winnerBar.x = 56
    this.winnerBar.y = 27
    this.addChildAt(this.winnerBar, 0)

    this.winnerNameBar = new Bar (100)
    this.winnerNameBar.x = 56
    this.winnerNameBar.y = 53
    this.addChildAt(this.winnerNameBar, 0)

    this.fastTxt = new PIXI.Text("DAGENS FAN", {fill:"#e3da02", font:"14px alright_sansultra_italic"});
    this.fastTxt.x = 90
    this.fastTxt.y = 34
    this.addChild(this.fastTxt)

    this.winnerTxt = new PIXI.Text("test", {fill:"#000000", font:"16px alright_sansultra_italic"});
    this.winnerTxt.x = 90
    this.winnerTxt.y = 61
    this.addChild(this.winnerTxt)

    this.logo = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.questionBarLogo))
    this.logo.x = 10
    this.logo.y = 53
    this.logo.alpha = 0;
    this.addChildAt(this.logo, 0)


    this.imageHolder.alpha = 0

    this.winnerTxt.alpha = 0
    this.fastTxt.alpha = 0
    this.winnerNameBar.alpha = 0
    this.winnerBar.alpha = 0


    this.maskCircle = new PixiCircle(38)
    this.maskCircle.x = 81*.5
    this.maskCircle.y = 81*.5
    //this.maskCircle.alpha = 0
    this.imageHolder.addChild(this.maskCircle)

    this.outLine = new PIXI.Graphics ();
    this.outLine.x = this.maskCircle.x
    this.outLine.y = this.maskCircle.y
    this.outLine.color  = 0xFF0000
    this.outLine.lineStyle (4, 0x000643, 1)
    this.outLine.drawCircle(0,0, 38)
    this.imageHolder.addChild(this.outLine)






    // Vars
    this.imageSpriteYpos = 3;
    // call back function 
    this.__imageLoaded = this.imageLoaded.bind(this)
    this.__imageRemove = this.imageRemove.bind(this)

}


//Copy over prototype --------------------------------------------------------------------------------------

GameWinner.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameWinner.prototype.constructor = GameWinner;

//---------------------------------------------------------------------------------------


// Private function
GameWinner.prototype.imageLoaded = function (e) {
    console.log("sdfsdf" )

    this.loaderApi.off(LoaderApi.COMPLETE , this.__imageLoaded);

    var imageTexture = new PIXI.Texture.fromImage(this.imageUrl);
    this.imageSprite = new PIXI.Sprite(imageTexture);
    this.imageHolder.addChild(this.imageSprite);


    if(this.imageSprite.width >= 100 ){
        var k = 81/this.imageSprite.width
        var kk = 81/this.imageSprite.height
        this.imageSprite.width = 86
        this.imageSprite.scale.y = this.imageSprite.scale.x
        this.imageSprite.x = -10
        this.imageSprite.y = 0
    }else{
        this.imageSprite.x = 3
        this.imageSprite.y = 3
    }





    this.imageSprite.mask = this.maskCircle;
    this.imageHolder.addChild(this.outLine)

// Animation
// -------------------------------------------------------------------------------------

    this.imageHolder.x = -90
    TweenLite.to(this.imageHolder , .4 , {alpha:1, x:0 , delay:0, ease:Strong.easeOut});

    this.winnerBar.scale.x = 0
    TweenLite.to(this.winnerBar.scale , .3 , {x:1, delay:.4, ease:Strong.easeOut});
    TweenLite.to(this.winnerBar , .2 , {alpha:1, delay:.4, ease:Strong.easeOut});

    this.fastTxt.x = 70;
    TweenLite.to(this.fastTxt , .3 , {x:90, alpha:1, delay:.5, ease:Strong.easeOut});

    this.winnerNameBar.scale.x = 0
    TweenLite.to(this.winnerNameBar.scale , .4 , {x:1, delay:.6, ease:Strong.easeOut});
    TweenLite.to(this.winnerNameBar , .4 , {alpha:1, delay:.6, ease:Strong.easeOut});


    TweenLite.to(this.winnerTxt , .4 , {alpha:1, delay:.65, ease:Strong.easeOut});

    this.logo.x = this.winnerNameBarWidth
    TweenLite.to(this.logo,.4 , {x:this.winnerNameBarWidth + 55 , alpha:1, delay:.7, ease:Strong.easeOut});


}


GameWinner.prototype.show = function (imageUrl, winnerFullName) {
    this.winnerTxt.setText (winnerFullName.toUpperCase());
    this.winnerNameBarWidth = this.winnerTxt.width +50;
    this.winnerNameBar.redraw(this.winnerNameBarWidth );
    this.imageUrl = imageUrl
    var arr = [imageUrl]
    this.loaderApi.on(LoaderApi.COMPLETE , this.__imageLoaded )
    this.loaderApi.load(arr)
}


GameWinner.prototype.hide = function () {
    TweenLite.to(this.imageHolder , .2 , {alpha:0, x:-20 , delay:.5, ease:Expo.easeOut, onComplete:this.__imageRemove });

    TweenLite.to(this.logo , .3 , {alpha:0, x:-80 , delay:.1, ease:Expo.easeOut});
    TweenLite.to(this.winnerBar.scale , .3 , {x:0, delay:.18, ease:Expo.easeOut});
    TweenLite.to(this.winnerBar , .3 , {alpha:0, delay:.18, ease:Expo.easeOut});
    TweenLite.to(this.fastTxt , .3 , {x:80, alpha:0, delay:.1, ease:Expo.easeOut});
    TweenLite.to(this.winnerNameBar.scale , .4 , {x:0, delay:0, ease:Expo.easeOut});
    TweenLite.to(this.winnerNameBar , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
    TweenLite.to(this.winnerTxt , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
}




GameWinner.prototype.imageRemove = function () {
    this.imageHolder.removeChild(this.imageSprite)
    this.imageSprite = null
}
