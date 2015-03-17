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

		this.assetIsLoaded = true

		this.loadApi.off(LoaderApi.COMPLETE, this.__assetsLoaded );
 		
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
		winnerComponent.x = 30
		winnerComponent.y = 100
		this.winnerComponent = winnerComponent

		//winnerComponent.mask = winnerMask

		// Auto show the first question, while testing
		//questionBar.show ()
	
		// auto show winner
		//this.showWinnerClick()		

	}



/** ---------------------------------------------------------------
*
*	Main function for displaying a question, caling showQuestion 
*	without calling a hideQuestion will make it look wierd
*
*/

	Main.prototype.showQuestion  = function(questionText){
		console.log("showQuestion = ")
		this.questionBar.show(questionText)

	}

	Main.prototype.hideQuestion  = function(){
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
	}


	Main.prototype.showWinner  = function(imageURL , fullname){		
		this.winnerComponent.showWinner (imageURL, fullname);
	}




//-------------------------------------------------------------------
// THE REST IS ONLY FOR TESTING 
//-------------------------------------------------------------------

	Main.prototype.setupTestBtns  = function(){
		this.__hideClick = this.hideClick.bind(this)
		this.__showClick = this.showClick.bind(this)
		this.__showWinnerClick = this.showWinnerClick.bind(this)
		this.__hideWinnerClick = this.hideWinnerClick.bind(this)


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
		


		var showWinner = new TextBtn("show Winner")
		showWinner.interactive = true
		showWinner.x = 300
		showWinner.y = 500
		stage.addChild(showWinner)
		showWinner.click = this.__showWinnerClick

		var hideWinner = new TextBtn("Hide Winner")
		hideWinner.interactive = true
		hideWinner.x = 300
		hideWinner.y = 530
		stage.addChild(hideWinner)
		hideWinner.click = this.__hideWinnerClick
		

	}

//-------------------------------------------------------

	Main.prototype.showClick  = function(){		
		var q = "Where did Michael Jordan go to college"
		this.questionBar.show(q)
	}

	Main.prototype.hideClick  = function(){
		this.questionBar.hide()

	}

	Main.prototype.hideWinnerClick  = function(){
		this.winnerComponent.hideWinner()
	}


	Main.prototype.showWinnerClick  = function(){
		var imageURL = "images/randomPerson.jpg"
		this.winnerComponent.showWinner (imageURL, "Dennis Hallund Christoffersen");
	}