1/**
 * User: Fathead
 */


function RateMomentComponent(){
	"use strict";
	PIXI.DisplayObjectContainer.call(this);
	PIXI.EventTarget.call(this);

    this.fantasBar = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.fantastiskBar))
    this.fantasBar.x = 0
    this.fantasBar.y = 0
    this.fantasBar.alpha = 0
    this.addChild(this.fantasBar)

    this.bar = new Bar(170, 0x000643)
    this.bar.x = this.fantasBar.width + this.fantasBar.x -20
    this.bar.alpha = 0
    this.addChild(this.bar)

    this.logo = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.questionBarLogo))
    this.logo.x = this.bar.x + this.bar.width - 20
    this.logo.y = 0
    this.logo.alpha = 0;
    this.addChild(this.logo)

    this.blackStarContainer = new PIXI.DisplayObjectContainer();
    this.blackStarContainer.x = this.bar.x +40;
    this.blackStarContainer.y = 13;

    this.starPadding = 10;
	this.starContainer = new PIXI.DisplayObjectContainer();
	this.starContainer.x = this.blackStarContainer.x;
	this.starContainer.y = this.blackStarContainer.y;

	var scale = 1;
	var xpos = 0;
	this.starArr = [];
    this.blackStarArr = [];
    var len = 5;
    for (var i=0;i<len;i++){
        var item = new PIXI.Sprite.fromImage(ASSETS.star)
        item.x = xpos;
        item.scale.x = scale;
        item.scale.y = scale;
        item.orgXpos = Math.round(xpos);
        xpos = Math.round (xpos + item.width + this.starPadding);
        item.alpha = 0;
        item.anchor.x = .5;
        item.anchor.y = .5;
        this.blackStarContainer.addChild(item)
        this.blackStarArr.push(item)
    }

    var xpos = 0;
	for (var i=0;i<len;i++){
		var item = new PIXI.Sprite.fromImage(ASSETS.star)
		item.x = xpos;
		item.scale.x = scale;
		item.scale.y = scale;
		item.orgXpos = xpos;
		xpos =Math.round(xpos + item.width + this.starPadding);
		item.alpha = 0;
		item.anchor.x = .5;
		item.anchor.y = .5;
		this.starContainer.addChild(item)
		this.starArr.push(item)
	}


	this.starWidth = this.starArr[0].width;

	//this.theMask = new PixiBox (300 ,81, 0x17acd5)
	this.theMask = new Bar(170, 0xFFCC00)
	this.theMask.alpha = .8;
	this.theMask.x = 600// this.starContainer.x - this.starWidth
	this.addChild(this.theMask);

	this.starContainer.mask = this.theMask

    this.addChild(this.blackStarContainer);
    this.addChild(this.starContainer);


	/*this.addChild(this.starContainer);
	// Logo holder with extra blue background
	this.blueBar = new Bar (20, 0x17acd5)
	this.blueBar.x = 50
	this.blueBar.y = 200*/

}


//Copy over prototype --------------------------------------------------------------------------------------

RateMomentComponent.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
RateMomentComponent.prototype.constructor = RateMomentComponent;



RateMomentComponent.prototype.showMomentRating  = function (v) {

	var value = v || 5;
	var scale = 4
	var len = this.blackStarArr.length
	for (var i=0;i<len;i++){
		var star = this.blackStarArr[i]
        star.scale.x = scale;
		star.scale.y = scale;
		TweenMax.to(star ,.5, {x:star.orgXpos, alpha:1 , delay: i/20, ease:"Expo.easeOut"});
		TweenMax.to(star.scale ,1, {x:1, y:1, delay: i/20, ease:"Expo.easeOut"});
        TweenMax.to(star ,1, {x:star.orgXpos, alpha:.5 , delay:.5+ i/20, ease:"Expo.easeOut"});
	}


    var scale = 1
    for (var i=0;i<len;i++){
        var star = this.starArr[i]

        TweenMax.to(star,.5, { alpha:1 ,repeat:-1, yoyo:true, delay:1.5+ i/10, ease:"Expo.easeOut"});
    //    TweenMax.to(star.scale ,1, {x:1, y:1, delay: i/20, ease:"Expo.easeOut"});
      //  TweenMax.to(star ,1, {x:star.orgXpos, alpha:.5 , delay:.5+ i/20, ease:"Expo.easeOut"});

    }

     TweenLite.to(this.bar ,.5, {alpha:1, ease:"Expo.easeOut"});
     TweenLite.to(this.fantasBar ,.5, {alpha:1, ease:"Expo.easeOut"});
     TweenLite.to(this.logo ,.5, {alpha:1, ease:"Expo.easeOut"});


	var starpos = (value/2) * (this.starWidth  + this.starPadding);
	var maskx = (this.starContainer.x - this.theMask.width - this.starWidth) + starpos +13
	//this.theMask.x = maskx
    this.theMask.x = -200
	TweenMax.to(this.theMask ,1, {x:maskx, delay:1, ease:"Expo.easeOut"});
}



RateMomentComponent.prototype.hideMomentRating = function () {
	var len = this.starArr.length
	for (var i=0;i<len;i++){
		var star = this.starArr[i];
        var blackStar =this.blackStarArr[i]

        TweenMax.killTweensOf(star)
		TweenMax.to(star ,.5, {alpha:0 , delay:i/20, ease:"Expo.easeOut"});
    // ----
        TweenMax.killTweensOf(blackStar)
		TweenMax.to(blackStar ,.5, {alpha:0 , delay:i/30, ease:"Expo.easeOut"});
	}


    TweenLite.to(this.bar ,.5, {alpha:0, ease:"Expo.easeOut"});
    TweenLite.to(this.fantasBar ,.5, {alpha:0, ease:"Expo.easeOut"});
    TweenLite.to(this.logo ,.5, {alpha:0, ease:"Expo.easeOut"});

}

