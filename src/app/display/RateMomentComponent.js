1/**
 * User: Fathead
 */


function RateMomentComponent(){
	"use strict";
	PIXI.DisplayObjectContainer.call(this);
	PIXI.EventTarget.call(this);

	this.starPadding = 10
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
		xpos = xpos + item.width + this.starPadding;
		item.alpha = 0;
		item.anchor.x = .5;
		item.anchor.y = .5;
		this.starContainer.addChild(item)
		this.starArr.push(item)
	}

	this.starWidth = this.starArr[0].width

	this.theMask = new PixiBox (300 ,81, 0x17acd5)
	console.log (" RateMomentComponent.js > this.theMask  " , this.theMask.width )
	this.theMask.alpha = .8
	this.theMask.x = this.starContainer.x - this.starWidth
	this.addChild(this.theMask);

	this.starContainer.mask = this.theMask


	this.addChild(this.starContainer);
	// Logo holder with extra blue background
	this.blueBar = new Bar (20, 0x17acd5)
	this.blueBar.x = 50


}


//Copy over prototype --------------------------------------------------------------------------------------

RateMomentComponent.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
RateMomentComponent.prototype.constructor = RateMomentComponent;



RateMomentComponent.prototype.showMomentRating  = function (v) {

	var value = v || 5;
	var scale = 2
	var len = this.starArr.length
	for (var i=0;i<len;i++){
		var star = this.starArr[i]
		star.scale.x = scale;
		star.scale.y = scale;
		TweenMax.to(star ,.5, {x:star.orgXpos, alpha:1 , delay:1 +i/20, ease:"Expo.easeOut"});
		TweenMax.to(star.scale ,1, {x:.8, y:.8, delay:1 + i/20, ease:"Expo.easeOut"});
	}

	var starpos = (value/2) * (this.starWidth  + this.starPadding);
	var maskx = (this.starContainer.x - this.theMask.width - this.starWidth) + starpos + 13
	this.theMask.x = maskx
	//TweenMax.to(this.theMask ,0, {x:maskx, delay:1, ease:"Expo.easeOut"});
}


RateMomentComponent.prototype.hideMomentRating = function () {
	console.log (" RateMomentComponent.js > HIDE TRATING ")
	var len = this.starArr.length
	for (var i=0;i<len;i++){
		var star = this.starArr[i]
		TweenMax.to(star ,.5, {alpha:0 , delay:i/20, ease:"Expo.easeOut"});
	}

}

