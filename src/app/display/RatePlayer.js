

function RatePlayer(loaderApi){
	"use strict";
	PIXI.DisplayObjectContainer.call(this);
	PIXI.EventTarget.call(this);

	this.loaderApi = loaderApi;

	this.imageHolder = new PIXI.DisplayObjectContainer()
	this.addChild(this.imageHolder)


    this.gamePlayer = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.kampenSpiller))
    this.gamePlayer.x = 47
    this.gamePlayer.y = 28
    this.addChildAt(this.gamePlayer, 0)

	this.winnerNameBar = new Bar (100 )
	this.winnerNameBar.x = 50
	this.winnerNameBar.y = 54
	this.addChildAt(this.winnerNameBar, 0)

	this.winnerTxt = new PIXI.Text("test", {fill:"#000000", font:"16px alright_sansultra_italic"});
	this.winnerTxt.x = this.winnerNameBar.x +70
	this.winnerTxt.y = 62
	this.addChild(this.winnerTxt)

    this.logo = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.questionBarLogo))
    this.logo.x = this.winnerNameBar.width
    this.logo.y = this.winnerNameBar.y
    this.addChildAt (this.logo,0)


	this.imageHolder.alpha = 0
	this.logo.alpha = 0
	this.gamePlayer.alpha = 0
	this.winnerTxt.alpha = 0
	this.winnerNameBar.alpha = 0


    this.testXpos = 10



	// call back function
	this.__imageLoaded = this.imageLoaded.bind(this)
    this.__imageRemove = this.imageRemove.bind(this)

}


//Copy over prototype --------------------------------------------------------------------------------------

RatePlayer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
RatePlayer.prototype.constructor = RatePlayer;

//---------------------------------------------------------------------------------------


// Private function
RatePlayer.prototype.imageLoaded = function (e) {
	console.log("sdfsdf" )

	this.loaderApi.off(LoaderApi.COMPLETE , this.__imageLoaded)

	var imageTexture = new PIXI.Texture.fromImage(this.imageUrl)
	this.imageSprite = new PIXI.Sprite(imageTexture)

    this.imageSprite.x = 0
	this.imageSprite.y = -2
    this.imageSprite.scale.x = .45
    this.imageSprite.scale.y = .45
	this.imageHolder.addChild(this.imageSprite)


// Animation
// -------------------------------------------------------------------------------------

	this.imageHolder.x = -90
	TweenLite.to(this.imageHolder , .4 , {alpha:1, x:0 , delay:0, ease:Strong.easeOut});

    this.gamePlayer.x = 150
    TweenLite.to(this.gamePlayer , .4 , {alpha:1, x:47, delay:.1, ease:Strong.easeOut});

    TweenLite.to(this.logo , .4 , {alpha:1, x:this.winnerNameBarEndWidth +50, delay:.5, ease:Strong.easeOut});

	this.winnerNameBar.scale.x = 0
	TweenLite.to(this.winnerNameBar.scale , .4 , {x:1, delay:.5, ease:Strong.easeOut});
	TweenLite.to(this.winnerNameBar , .4 , {alpha:1, delay:.5, ease:Strong.easeOut});
	TweenLite.to(this.winnerTxt ,.8 , {alpha:1, delay:.6, ease:Strong.easeOut});


}



RatePlayer.prototype.showPlayerRating = function (imageUrl, winnerFullName) {
    this.gamePlayer.scale.x = 1
    this.gamePlayer.alpha = 0
	this.winnerTxt.setText (winnerFullName.toUpperCase());
    this.winnerNameBarEndWidth =this.winnerTxt.width +90
	this.winnerNameBar.redraw(this.winnerNameBarEndWidth);
	this.imageUrl = imageUrl
	var arr = [imageUrl]
	this.loaderApi.on(LoaderApi.COMPLETE , this.__imageLoaded )
	this.loaderApi.load(arr)

}


RatePlayer.prototype.hidePlayerRating= function () {
	TweenLite.to(this.imageHolder , .3 , {alpha:0, x:-50 , delay:.4, ease:Expo.easeOut, onComplete:this.__imageRemove});

    TweenLite.to(this.winnerNameBar.scale , .4 , {x:0, delay:.1, ease:Expo.easeOut});

    TweenLite.to(this.logo, .2 , {alpha:0, x:20 , delay:.15, ease:Expo.easeOut});
	TweenLite.to(this.gamePlayer.scale, .2 , { x:0 , delay:.1, ease:Expo.easeOut});


	TweenLite.to(this.winnerTxt , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
}


RatePlayer.prototype.imageRemove = function () {
    this.imageHolder.removeChild(this.imageSprite)
    this.imageSprite = null
}
