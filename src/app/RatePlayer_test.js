/**
 * User: Fathead
 *//*


1*/
/**
 * User: Fathead
 *//*



function RatePlayer_test(loaderApi){
	"use strict";
	PIXI.DisplayObjectContainer.call(this);
	PIXI.EventTarget.call(this);

	this.loaderApi = loaderApi

	this.starPadding = 10;
	this.starContainer = new PIXI.DisplayObjectContainer()
	this.starContainer.x = 200;
	this.starContainer.y = 50;

	this.fastTxt = new PIXI.Text("KAMPENS VINDER", {fill:"#e3da02", font:"14px alright_sansultra_italic"});
	this.fastTxt.x = 90
	this.fastTxt.y = 34
	this.addChild(this.fastTxt)

	this.winnerTxt = new PIXI.Text("test", {fill:"#000000", font:"16px alright_sansultra_italic"});
	this.winnerTxt.x = 90
	this.winnerTxt.y = 62
	this.addChild(this.winnerTxt)

	this.__imageLoaded = this.imageLoaded.bind(this)

}


//Copy over prototype --------------------------------------------------------------------------------------

RatePlayer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
RatePlayer.prototype.constructor = RatePlayer;


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

	*/
/*this.logoHolder.x = -90
	TweenLite.to(this.logoHolder , .4 , {alpha:1, x:10 , delay:.2, ease:Strong.easeOut});*//*



	this.winnerBar.scale.x = 0
	TweenLite.to(this.winnerBar.scale , .3 , {x:1, delay:.4, ease:Strong.easeOut});
	TweenLite.to(this.winnerBar , .2 , {alpha:1, delay:.4, ease:Strong.easeOut});

	this.fastTxt.x = 70;
	TweenLite.to(this.fastTxt , .3 , {x:90, alpha:1, delay:.5, ease:Strong.easeOut});

	*/
/*this.winnerNameBar.scale.x = 0*//*

	TweenLite.to(this.winnerNameBar.scale , .4 , {x:1, delay:.6, ease:Strong.easeOut});
	TweenLite.to(this.winnerNameBar , .4 , {alpha:1, delay:.6, ease:Strong.easeOut});

	TweenLite.to(this.winnerTxt , .4 , {alpha:1, delay:.65, ease:Strong.easeOut});


}





RatePlayer.prototype.showPlayerRating  = function (imageUrl, playerName) {
	this.winnerTxt.setText (winnerFullName.toUpperCase());
	//this.winnerNameBar.redraw(this.winnerTxt.width +50);

	this.imageUrl = imageUrl
	var arr = [imageUrl]
	this.loaderApi.on(LoaderApi.COMPLETE , this.__imageLoaded )
	this.loaderApi.load(arr)

}




RatePlayer.prototype.hidePlayerRating = function () {



}

*/
