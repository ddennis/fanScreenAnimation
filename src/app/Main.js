/**
 * @author ddennis.dk - aka fantastisk.dk/works aka meresukker.dk
 */


// VARS ------------------------------------------------------------

function Main () {
    "use strict";
    PIXI.DisplayObjectContainer.call(this);
    PIXI.EventTarget.call(this);
};


//---------------------------------------------------------------------------------------
	Main.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	Main.prototype.constructor = Main;
//---------------------------------------------------------------------------------------


	Main.prototype.init = function(){

		stage.interactive = true; 		
		renderer.resize(1024,576)
				
		this.assetIsLoaded = false

		// LOAD ASSETS --------------------------------------------------------
		var assetsToLoad = ASSETS.toArray(CONFIG.images);
		this.loadApi = new LoaderApi ();

		this.__assetsLoaded = this.assetsLoaded.bind (this)
		this.loadApi.on(LoaderApi.COMPLETE, this.__assetsLoaded );
		this.loadApi.load (assetsToLoad);

		// only for testing
		this.setupTestBtns()

	};



//---------------------------------------------------------------------------------------

	
	
	
	Main.prototype.assetsLoaded  = function(){
		this.assetIsLoaded = true;

		this.loadApi.off(LoaderApi.COMPLETE, this.__assetsLoaded );

		var backgroundTex = new PIXI.Texture.fromImage (ASSETS.background)
		this.background = new PIXI.Sprite(backgroundTex)
		this.background.alpha = 0;
		stage.addChild(this.background)

 		var logoTexture = new PIXI.Texture.fromImage (ASSETS.logo) 
		var logo = new PIXI.Sprite(logoTexture)
		logo.x = 35;
		stage.addChild(logo)

		this.elementYpos = 40;

		var maskBar = new Bar(800, 0xCC0000)
		maskBar.x = 200;
		maskBar.y = this.elementYpos;
		stage.addChild(maskBar)

		var q = "Where did Center Michael Jordan play college basketball?"
		var questionBar = new Questionbar(q)
		questionBar.x = 200;
		questionBar.y = this.elementYpos;
		stage.addChild(questionBar)		
		this.questionBar = questionBar
		questionBar.mask = maskBar
		
		var winnerComponent = new WinnerComponent(this.loadApi)
		stage.addChild(winnerComponent)
		winnerComponent.x = 180
		winnerComponent.y = this.elementYpos - 20
		this.winnerComponent = winnerComponent

		this.rateMoment = new RateMomentComponent()
		stage.addChild (this.rateMoment)

		//winnerComponent.mask = winnerMask

		// Auto show the first question, while testing
		//questionBar.show ()
	
		// auto show winner
		//this.showWinnerClick()		

	}


/** ---------------------------------------------------------------
 *
 *	Main function for displaying a Moment rating
 *
 */

Main.prototype.showPlayerRating = function(value){
	console.log (" Main.js > show MOEMNT " )


}

Main.prototype.hidePlayerRating   = function(){
	console.log (" Main.js > HIDE MOMENT " )

}




/** ---------------------------------------------------------------
 *
 *	Main function for displaying a Moment rating
 *
 */

Main.prototype.showMomentRating = function(value){
	console.log (" Main.js > show MOEMNT " )


}

Main.prototype.hideMomentRating  = function(){
	console.log (" Main.js > HIDE MOMENT " )

}




/** ---------------------------------------------------------------
*
*	Main function for displaying a question, caling showQuestion 
*	without calling a hideQuestion will make it look wierd
*
*/

	Main.prototype.showQuestion  = function(questionText){
		this.showBackground()
		this.questionBar.show(questionText)
	}


	Main.prototype.hideQuestion  = function(){
		this.hideBackground()
		this.questionBar.hide()

	}


 /** ---------------------------------------------------------------
 *
 *	Main function for displaying a winner. 
 *	The profile image will be preloaded before the graphics is shown.
 * 
 */

	Main.prototype.hideWinner  = function(){
		this.winnerComponent.hideWinner()
		this.hideBackground()
	}


	Main.prototype.showWinner  = function(imageURL , fullname){
		this.showBackground()

		this.winnerComponent.showWinner (imageURL, fullname);
	}

// BACKGROUND
//---------------------------------------------------------------------------------------

	Main.prototype.showBackground  = function(questionText){
		TweenMax.to(this.background, .3, {alpha:1, ease:"Expo.easeOut"});
	}

	Main.prototype.hideBackground  = function(questionText){
		TweenMax.to(this.background,2, {alpha:0,delay:.2,  ease:"Expo.easeOut"});

	}

//-------------------------------------------------------------------
// THE REST IS ONLY FOR TESTING 
//-------------------------------------------------------------------

	Main.prototype.setupTestBtns  = function(){
		this.__hideClick = this.hideClick.bind(this)
		this.__showClick = this.showClick.bind(this)
		this.__showWinnerClick = this.showWinnerClick.bind(this)
		this.__hideWinnerClick = this.hideWinnerClick.bind(this)
		this.__showRatingClick = this.showRatingClick.bind(this)
		this.__hideRatingClick = this.hideRatingClick.bind(this)


		var showBtn = new TextBtn("Show question")
		showBtn.interactive = true
		showBtn.x = 20
		showBtn.y = 500
		stage.addChild(showBtn)
		showBtn.click = this.__showClick
		
		var hideBtn = new TextBtn("Hide question");
		hideBtn.x = 20
		hideBtn.y = 530
		stage.addChild(hideBtn)
		hideBtn.click = this.__hideClick;

		var showRating = new TextBtn("show moment rating")
		showRating.interactive = true
		showRating.x = 550
		showRating.y = 500
		stage.addChild(showRating)
		showRating.click = this.__showRatingClick

		var hideRating = new TextBtn("hide moment rating")
		hideRating.interactive = true
		hideRating.x = 550
		hideRating.y = 530
		stage.addChild(hideRating)
		hideRating.click = this.__hideRatingClick

		var showWinner = new TextBtn("show Winner")
		showWinner.interactive = true
		showWinner.x = 300
		showWinner.y = 500
		stage.addChild(showWinner)
		showWinner.click = this.__showWinnerClick

		var hideWinner = new TextBtn("Hide Winner")
		hideWinner.interactive = true
		hideWinner.x = 300;
		hideWinner.y = 530;
		stage.addChild(hideWinner)
		hideWinner.click = this.__hideWinnerClick
		

	}

//-------------------------------------------------------

	Main.prototype.showClick  = function(){		
		var q = "Where did Michael Jordan go to college"
		this.showQuestion(q)
	}

	Main.prototype.hideClick  = function(){
		this.hideQuestion()

	}

	Main.prototype.hideWinnerClick  = function(){
		this.hideWinner()
	}


	Main.prototype.showWinnerClick  = function(){
		var imageURL = "images/randomPerson.jpg"
		this.showWinner (imageURL, "Dennis Hallund Christoffersen");
	}

	Main.prototype.showRatingClick  = function(){
		this.rateMoment.showMomentRating ()
	}

	Main.prototype.hideRatingClick= function(){
		console.log (" Main.js > hideRatingClick ")
		this.rateMoment.hideMomentRating ()
	}