1/**
 * User: Fathead
 */


function RateMomentComponent(){
	"use strict";
	PIXI.DisplayObjectContainer.call(this);
	PIXI.EventTarget.call(this);


	this.starContainer = new PIXI.DisplayObjectContainer()
	this.starContainer.x = 200
	this.starContainer.y = 50
	var scale = .8
	var xpos = 0
	this.starArr = []
	var len = 5;
	for (var i=0;i<len;i++){
		var item = new PIXI.Sprite.fromImage(ASSETS.star)
		item.x = xpos;
		item.scale.x = scale;
		item.scale.y = scale;
		item.orgXpos = xpos;
		xpos = xpos + item.width + 10;
		item.alpha = 0;
		item.anchor.x = .5;
		item.anchor.y = .5;
		this.starContainer.addChild(item)
		this.starArr.push(item)
	}

	this.startWidth = this.starArr[0].width * .5

	this.theMask = new PixiBox (300 ,81, 0x17acd5)
	console.log (" RateMomentComponent.js > this.theMask  " , this.theMask.width )
	this.theMask.alpha = .8
	this.theMask.x = this.starContainer.x
	this.addChild(this.theMask);



	this.addChild(this.starContainer);
	// Logo holder with extra blue background
	this.blueBar = new Bar (20, 0x17acd5)
	this.blueBar.x = 50


}


//Copy over prototype --------------------------------------------------------------------------------------

RateMomentComponent.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
RateMomentComponent.prototype.constructor = RateMomentComponent;



RateMomentComponent.prototype.showMomentRating  = function (value) {

	value = 1

	var scale = 1.5
	var len = this.starArr.length
	for (var i=0;i<len;i++){
		var star = this.starArr[i]
		//star.x = star.orgXpos - 50
		//TweenMax.to(star ,.5, {x:star.orgXpos, alpha:1 , delay:i/20, ease:"Expo.easeOut"});
		star.scale.x = scale;
		star.scale.y = scale;
		//star.tint = 0x000000
		TweenMax.to(star ,.5, {alpha:1 , delay:i/20, ease:"Expo.easeOut"});
		TweenMax.to(star.scale ,.5, {x:.8, y:.8, delay:i/20, ease:"Expo.easeOut"});

		TweenMax.to(star ,.5, {alpha:.2 , delay:1 +i/20, ease:"Expo.easeOut"});
		//TweenMax.to(star ,.5, { tint:0x000000, delay:.5, ease:"Expo.easeOut"});
	}


	//var starIndex = Math.floor(value/2)


	var starpos = value/2 * this.startWidth
	var maskx = (this.starContainer.x + starpos -8 ) - 300

	TweenMax.to(this.theMask ,.5, {x:maskx, delay:2, ease:"Expo.easeOut"});


}


RateMomentComponent.prototype.hideMomentRating = function () {

	TweenLite.to(this.imageHolder , .6 , {alpha:1, x:-150 , delay:.4, ease:Expo.easeOut});
	TweenLite.to(this.logoHolder , .5 , {alpha:0, x:-80 , delay:.25, ease:Expo.easeOut});
	TweenLite.to(this.winnerBar.scale , .3 , {x:0, delay:.18, ease:Expo.easeOut});
	TweenLite.to(this.winnerBar , .3 , {alpha:0, delay:.18, ease:Expo.easeOut});
	TweenLite.to(this.fastTxt , .3 , {x:80, alpha:0, delay:.1, ease:Expo.easeOut});
	TweenLite.to(this.winnerNameBar.scale , .4 , {x:0, delay:0, ease:Expo.easeOut});
	TweenLite.to(this.winnerNameBar , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
	TweenLite.to(this.winnerTxt , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
}

