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



    Main.prototype.cacheBust = function(imageUrl){
        return imageUrl + "?" + Math.random()
    }



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
		winnerComponent.x = 175;
		winnerComponent.y = this.elementYpos - 40
		this.winnerComponent = winnerComponent

		this.rateMoment = new RateMomentComponent()
        this.rateMoment.x = 180
        this.rateMoment.y = 35
        stage.addChild (this.rateMoment)

		this.ratePlayer = new RatePlayer(this.loadApi)
		this.ratePlayer.x = 180
		this.ratePlayer.y = 10
		stage.addChild (this.ratePlayer )

		this.gameWinner = new GameWinner(this.loadApi)
		this.gameWinner.x = 180
		this.gameWinner.y = 10
		stage.addChild (this.gameWinner )

        this.testCount = 0

		//winnerComponent.mask = winnerMask

		// Auto show the first question, while testing
		//questionBar.show ()
	
		// auto show winner
		//this.showWinnerClick()
		// var imageURL = "images/randomPerson.jpg"
		// this.showGameWinner(imageURL, "POUL BUNDGAARD")

        //this.showMomentRating(6)
        var imageURL = "images/tarik_black.png"
        //this.showWinner( imageURL, "Anders AØNDERGAARD" )
        this.showRatePlayer(imageURL,"RGAARD" )

	}



/** ---------------------------------------------------------------
 *
 *	Main function for displaying a Moment rating
 *
 */

Main.prototype.showMomentRating = function(value){
	this.showBackground()
	this.rateMoment.showMomentRating(value)
}

Main.prototype.hideMomentRating  = function(){
	this.hideBackground()
	this.rateMoment.hideMomentRating()
}


/** ---------------------------------------------------------------
 *	GAME WINNER
 */

Main.prototype.showGameWinner = function(imageUrl, name){
	this.showBackground()
	this.gameWinner.show(this.cacheBust(imageUrl) , name)
}

Main.prototype.hideGameWinner = function(){
	this.hideBackground();
	this.gameWinner.hide()
}



/** ---------------------------------------------------------------
 *	Main function for displaying a PLAYER rating
 */

Main.prototype.showRatePlayer= function( imageUrl, playerName){
	this.showBackground()
	this.ratePlayer.showPlayerRating(this.cacheBust(imageUrl), playerName)
}

Main.prototype.hideRatePlayer  = function(){
	this.hideBackground();
	this.ratePlayer.hidePlayerRating();
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


	Main.prototype.showWinner  = function(imageUrl , fullname){
		this.showBackground()
		this.winnerComponent.showWinner (this.cacheBust(imageUrl), fullname);
	}

// BACKGROUND
//---------------------------------------------------------------------------------------

	Main.prototype.showBackground  = function(questionText){
		//TweenMax.to(this.background, 1, {alpha:1, ease:"Expo.easeOut"});
	}

	Main.prototype.hideBackground  = function(questionText){
		//TweenMax.to(this.background,2, {alpha:0,delay:.2,  ease:"Expo.easeOut"});

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
		this.__showRatePlayerClick = this.showRatePlayerClick.bind(this)
		this.__hideRatePlayerClick = this.hideRatePlayerClick.bind(this)

		this.__hideGameWinnerClick= this.hideGameWinnerClick.bind(this)
		this.__showGameWinnerClick = this.showGameWinnerClick.bind(this)


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
		showRating.x = 510
		showRating.y = 500
		stage.addChild(showRating)
		showRating.click = this.__showRatingClick

		var hideRating = new TextBtn("hide moment rating")
		hideRating.interactive = true
		hideRating.x = 510
		hideRating.y = 530
		stage.addChild(hideRating)
		hideRating.click = this.__hideRatingClick

		var showPlayerRating = new TextBtn("show player Rating")
		showPlayerRating.interactive = true
		showPlayerRating.x = 800
		showPlayerRating.y = 200
		stage.addChild(showPlayerRating)
		showPlayerRating.click = this.__showRatePlayerClick


		var hidePlayerRating = new TextBtn("hide player Rating")
		hidePlayerRating.interactive = true
		hidePlayerRating.x = 800
		hidePlayerRating.y = 230
		stage.addChild(hidePlayerRating )
		hidePlayerRating.click = this.__hideRatePlayerClick


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


		var showGameWinner = new TextBtn("show game Winner")
		showGameWinner.interactive = true
		showGameWinner.x = 300
		showGameWinner.y = 400
		stage.addChild(showGameWinner)
		showGameWinner.click = this.__showGameWinnerClick

		var hideGameWinner = new TextBtn("Hide game Winner")
		hideGameWinner.interactive = true
		hideGameWinner.x = 300;
		hideGameWinner.y = 430;
		stage.addChild(hideGameWinner)
		hideGameWinner.click = this.__hideGameWinnerClick


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
		this.showMomentRating (3)
	}

	Main.prototype.hideRatingClick= function(){
		this.hideMomentRating()
	}

	Main.prototype.showRatePlayerClick = function(){
    var p = ""
        if(this.testCount == 0 ){
            p = "images/randomPerson.jpg?"+Math.random()
            this.testCount++
        }else{
            p = "images/winner.jpg?"+Math.random()
            this.testCount = 0
        }
        console.log (" Main.js > p = " , p);
		this.showRatePlayer(p, "James Bond")
	}

	Main.prototype.hideRatePlayerClick = function(){

		this.hideRatePlayer()
	}

//---------------------------------------------------------------------------------------


	Main.prototype.showGameWinnerClick = function(){
		var p = "images/randomPerson.jpg"
		this.showGameWinner(p, "Egon Olsen")
	}

	Main.prototype.hideGameWinnerClick = function(){

		this.hideGameWinner()
	}
