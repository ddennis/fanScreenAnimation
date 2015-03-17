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


/**
 * @author ddennis.dk - aka fantastisk.dk/works aka meresukker.dk
 */



var CONFIG = {

	basePath: "",
	imgPath: "images/",
	
	init: function () {
		
	},

	
// easy access to images
//---------------------------------------------------------------------------------------
	images:{
		questionBarLogo: "questionBarLogo.png",
		logo: "logo.png",		
		videoStillFrame: "videoStillFrame.png"
	},



};

//---------------------------------------------------------------------------------------

/**
 * This will loop through all keys in the Object that is passed and set them as keys on the ASSETS object
 * passing [{txt1:"txt1.png"}, {txt2:"txt2.png"}] will be equeal to ASSETS.txt1 = txt1.png
 * And should be used to look up all assets
 *
 * The CONFIG path is also appended to the filename, for easy acces
 *
 *
 * @type {{toArray: Function}}
 */


var ASSETS = {

	toArray: function (aOBJ) {
		this.arr = []
		for (var obj in aOBJ) {
			var asset = aOBJ[obj];
			

			// check if there is an obj named video
			if (obj === "video") {
			
				this["video"] = {};	
				var videoObj = aOBJ["video"]

				// check if there is an local video path 
				var localVideoPath = ""
				if (aOBJ["video"]["localVideoPath"] !== undefined) {					 
					localVideoPath = aOBJ["video"]["localVideoPath"];
				};
								
				// append all the video paths to the video object, with the CONFIG.videoPath and localVideoPath 
				for (var videoPath in videoObj) {
					if (videoPath != "localVideoPath") {
						//this["video"][videoPath]  = CONFIG.basePath + CONFIG.videoPath + localVideoPath + videoObj[videoPath]
						this["video"][videoPath]  = videoObj[videoPath]
					};
				};
			};

			if(typeof (asset) === "string"  ){ // only retrun the images for loading
				this[obj]  = CONFIG.basePath + CONFIG.imgPath + asset
				this.arr.push ( this[obj]  )
			}
		}


		//console.log ("this = ", ASSETS ); 
		return this.arr

	}
}



angular.module("screenModule", [])
	.controller("screenController", ["$scope", "$http", function($scope, $http ){

		var vm = this
		// init banner
        vm.main = new Main ();
        vm.main.init();
        vm.main.setupTestBtns()


		window.setInterval(function(){
			$http.get("http://localhost:3000/onair/get_datastring").success(function(data){
				var datastring = data.Root.item[0];
				// console.log("datastring: " + JSON.stringify(datastring, null, 2));
				parseDatastring(datastring);
			});

		}, 3000);

		var active = null

		var parseDatastring = function(data){
			var question = data.question[0];
			var winnername = data.winnername[0];
			var avatar = data.avatar[0];
			var action = data.action[0];
			var result = data.result[0];
						

			if(action && !active){
				active = true
				switch(action){

					case "QUIZSTART":
						console.log("QUIZSTART");


						vm.main.showQuestion(question)
						break;

					case "QUIZEND":
						console.log("QUIZEND");
						vm.main.hideQuestion()
						break;

					case "RATINGEND":
						console.log("RATINGEND");
						break;

					case "GAMEEND":
						console.log("GAMEEND");
						break;
				}

			}

			if (!action && active ){
				console.log("NO ACTION");
				active = false
			}
		}

}]);
/**
 * @author ddennis.dk - aka fantastisk.dk/works aka meresukker.dk
 */

// VARS ------------------------------------------------------------
LoaderApi.COMPLETE = "complete";
LoaderApi.PROGRESS = "progress";


function LoaderApi () {
    "use strict";
    PIXI.EventTarget.call(this);
    this.loader = null;
    this.name = "dennis loader API"
};

//---------------------------------------------------------------------------------------
/*LoaderApi.prototype = Object.create(EventEmitter.prototype);
 LoaderApi.prototype.constructor = LoaderApi;*/
//---------------------------------------------------------------------------------------


LoaderApi.prototype.load = function (assetsArr) {
    //console.log (" loaderApi.js >  assetsArr " , assetsArr );
    this.assetAmountToLoad = assetsArr.length;

    this.loader = new PIXI.AssetLoader(assetsArr);
    var that = this;

    this.loader.addEventListener('onComplete', function (e) {
        that.onAssetLoaded(e)
    });

    this.loader.addEventListener('onProgress', function (e) {
        that.onProgress(e)
    });

    // Start loading
    this.loader.load()
};


LoaderApi.prototype.onProgress =  function (e) {
    var type = e.type;
    var assLdr = e.content; //AssetLoader
    var ImgLdr = e.loader; //imageLoader

    var current = this.assetAmountToLoad - assLdr.loadCount
    var progress = current / this.assetAmountToLoad
    //this.emit (LoaderApi.PROGRESS, progress)
    this.emit({ type: LoaderApi.PROGRESS, data:progress });
};


// WHEN ALL ASSETS IS LOADED
//---------------------------------------------------------------------------------------
LoaderApi.prototype.onAssetLoaded =  function (e) {
    var ldr = e.content;
    var type = e.type;
    //this.emit (LoaderApi.COMPLETE)
    this.emit(LoaderApi.COMPLETE);
    console.log ("onAssetLoaded  " )
};




// Since the console.log is not defind in IE 8/9
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };



var stageWidth  = 1024;
var stageHeight = 576;
var stage = new PIXI.Stage(0x66FF99);
stage.clickId = "stage"
stage.interactive = false;

var rendererOptions = {
    antialiasing:true,
    transparent:true,
    resolution:1
};


//var renderer = PIXI.autoDetectRecommendedRenderer(stageWidth, stageHeight, rendererOptions);
var renderer = new PIXI.CanvasRenderer(stageWidth, stageHeight, rendererOptions);



// add the renderer view element to the DOM
var id = document.getElementById("canvasContainer");
id.appendChild(renderer.view);



function animate() {
    requestAnimFrame(animate);
    try {
    	renderer.render(stage);
	}
	catch(err) {
	
	}    
}

requestAnimFrame(animate);


/**
 * @author ddennis.dk - aka fantastisk.dk/works aka meresukker.dk
 */


// VARS ------------------------------------------------------------

function Bar (theWidth, myColor) {
    "use strict";
    
    PIXI.Graphics.call (this );

    this.theWidth = theWidth || 500;
    this.myColor = myColor || 0xFFFFFF;
       
    
    this.angleOffset = 19;  
    this.redraw(theWidth)

 };


//---------------------------------------------------------------------------------------
	Bar.prototype = Object.create( PIXI.Graphics.prototype );
	Bar.prototype.constructor = Bar;
//---------------------------------------------------------------------------------------
	
    Bar.prototype.redraw = function (theWidth) {
     
        this.theWidth = theWidth 

        this.clear();
        this.beginFill( this.myColor);  
        this.moveTo(0,0);
        this.lineTo(this.angleOffset , 1 );
        this.lineTo(this.theWidth + this.angleOffset , 1);
        this.lineTo(this.theWidth, 27);
        this.lineTo(0, 27);        
        this.lineTo(this.angleOffset, 1);        
        this.endFill();
        

    }
/**
 * @author ddennis.dk - aka fantastisk.dk/works aka meresukker.dk
 */


// VARS ------------------------------------------------------------

function Questionbar (s) {
    "use strict";
    PIXI.DisplayObjectContainer.call(this);
    PIXI.EventTarget.call(this);

 	this.label = s || "Test tekst"

    this.label = this.label.toUpperCase();

    this.logo = new PIXI.Sprite (new PIXI.Texture.fromImage (ASSETS.questionBarLogo)) 
    this.logo.x = 0
    this.logo.y = 0
    this.logo.alpha = 0
    this.addChild(this.logo)

    this.text = new PIXI.Text(this.label, {fill:"black", font:"16px alright_sansultra_italic"});
    this.text.x = 0
    this.text.y = 8
    this.text.alpha = 0

    this.bar = new Bar(this.text.width + 50)
    this.addChild(this.bar)
    this.bar.x = -this.bar.width


    // make sure the text is on top
    this.addChild(this.text);

    this.endTextPos = 25

};


//---------------------------------------------------------------------------------------
	Questionbar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	Questionbar.prototype.constructor = Questionbar;
//---------------------------------------------------------------------------------------
	
	Questionbar.prototype.updateLabel = function(s){
		this.label = s 
		this.text.setText (s)
	}
	

	Questionbar.prototype.show = function(questionTxt){
		
        if (questionTxt != undefined ) {
            this.label = questionTxt.toUpperCase();
            this.text.setText(this.label)
            this.bar.redraw(this.text.width + 50)
        };

        TweenLite.to(this.bar , .6 , {x:0 , delay:0, ease:Strong.easeOut});
        TweenLite.to(this.text , .6 , {x:this.endTextPos , delay:0, ease:Strong.easeOut});
        TweenLite.to(this.text , .4 , {alpha:1, delay:.2, ease:Strong.easeOut});

        this.logo.x = this.bar.width - 58
        var d = .35
        TweenLite.to(this.logo , .5 , {x:this.bar.width - 21, delay:d, ease:Strong.easeOut});
        TweenLite.to(this.logo , .5 , {alpha:1, delay:d, ease:Strong.easeOut});

	};

	Questionbar.prototype.hide = function(){
    	
        TweenLite.to(this.logo , .4 , {x:this.bar.width - 80, delay:0, ease:Strong.easeOut});
        TweenLite.to(this.logo , .4 , {alpha:0, delay:0, ease:Strong.easeOut});

        var d = .2;
        TweenLite.to(this.bar , .6 , {x: -this.bar.width  , delay:d, ease:Strong.easeOut});
        TweenLite.to(this.text , .6 , {x:-50 , alpha:0, delay:d, ease:Strong.easeOut});        

    };


//---------------------------------------------------------------------------------------

	



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
    
    TweenLite.to(this.imageHolder , .6 , {alpha:1, x:-150 , delay:.4, ease:Expo.easeOut});    
    TweenLite.to(this.logoHolder , .5 , {alpha:0, x:-80 , delay:.25, ease:Expo.easeOut});
    TweenLite.to(this.winnerBar.scale , .3 , {x:0, delay:.18, ease:Expo.easeOut});
    TweenLite.to(this.winnerBar , .3 , {alpha:0, delay:.18, ease:Expo.easeOut});    
    TweenLite.to(this.fastTxt , .3 , {x:80, alpha:0, delay:.1, ease:Expo.easeOut});    
    TweenLite.to(this.winnerNameBar.scale , .4 , {x:0, delay:0, ease:Expo.easeOut});
    TweenLite.to(this.winnerNameBar , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
    TweenLite.to(this.winnerTxt , .4 , {alpha:0, delay:0, ease:Expo.easeOut});
}



function BoxRoundCorners(tex, color, wPadding, hPadding){

    // call super constructor
    PIXI.DisplayObjectContainer.call (this );
    //PIXI.EventTarget.call(this);    

    if (wPadding == undefined) {
        wPadding = 40
    }; 
    
    if (hPadding== undefined) {
        hPadding = 25
    };

    this.myWidth = tex.width + wPadding;
    this.myHeight = tex.height + hPadding ; 
    this.myColor = color || 0x01b0e9;

    this.background = new PIXI.Graphics()
    //background.clear();    
    this.background.beginFill( this.myColor , 1);
    this.background.drawRoundedRect(0 , 0 , this.myWidth, this.myHeight, 3)
    //this.background.drawRect(0 , 0 , this.myWidth, this.myHeight)
    
    this.background.pivot.x = this.background.width*.5
    this.background.pivot.y = this.background.height*.5
    
    this.addChild(this.background);
    

    var label = new PIXI.Sprite(tex);

    /*label.x = Math.round (this.myWidth  * .5 -  label.width  * .5   );
    label.y = Math.round( this.myHeight * .5 -  label.height * .5  );*/
    label.x = - Math.round (this.myWidth  * .5   ) + wPadding*.5;
    label.y =  - Math.round( this.myHeight * .5 ) + hPadding*.5;
    this.addChild(label);

};

//Copy over prototype --------------------------------------------------------------------------------------
BoxRoundCorners.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
BoxRoundCorners.prototype.constructor = BoxRoundCorners;

//---------------------------------------------------------------------------------------




''

function PixiBox(_w, _h, _c, _a){
    // call super constructor
    PIXI.Graphics.call (this );

    this._w = _w    || 50;
    this._h = _h    || 50;

    this._c = _c
    if (this._c == undefined) {
        this._c = 0xCC0000;
    };
    
    this._a = _a  || 1;
    this.redraw(this._w, this._h, this._c, this._a)
    
}

//Copy over prototype --------------------------------------------------------------------------------------
PixiBox.prototype = Object.create( PIXI.Graphics.prototype );
PixiBox.prototype.constructor = PixiBox;

//---------------------------------------------------------------------------------------

PixiBox.prototype.redraw = function (_w, _h, _c, _a) {
    this.clear();
    var color = _c || this._c
    var al = _a || this._a
    this.beginFill(color, al);
    this.drawRect(0,0,_w ,_h);
    this.endFill();
};




function TextBtn(label){
    "use strict";
    PIXI.DisplayObjectContainer.call(this);
    PIXI.EventTarget.call(this);

    this.interactive = true

    this.label = label || "test";

    this.text = new PIXI.Text(this.label, {fill:"black", font:"bold 25px Arial"});
    this.text.x = 0
    this.text.y = 0
    

    var box = new PixiBox(this.text.width , this.text.height )
    this.addChild (box)

    this.addChild(this.text)
    
}

//Copy over prototype --------------------------------------------------------------------------------------


TextBtn.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TextBtn.prototype.constructor = TextBtn;

//---------------------------------------------------------------------------------------



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1haW4uanMiLCJjb25maWcuanMiLCJuZ21haW4uanMiLCJjb3JlL0xvYWRlckFwaS5qcyIsImNvcmUvcG9seWZpbGxzLmpzIiwiY29yZS9zdGFnZS5qcyIsImRpc3BsYXkvQmFyLmpzIiwiZGlzcGxheS9RdWVzdGlvbmJhci5qcyIsImRpc3BsYXkvV2lubmVyQ29tcG9uZW50LmpzIiwidWkvQm94Um91bmRDb3JuZXJzLmpzIiwiY29yZS9tdmMvTW9kZWwuanMiLCJjb3JlL3NoYXBlcy9QaXhpQm94LmpzIiwiY29yZS9zaGFwZXMvVGV4dEJ0bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAYXV0aG9yIGRkZW5uaXMuZGsgLSBha2EgZmFudGFzdGlzay5kay93b3JrcyBha2EgbWVyZXN1a2tlci5ka1xyXG4gKi9cclxuXHJcblxyXG4vLyBWQVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gTWFpbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpO1xyXG4gICAgUElYSS5FdmVudFRhcmdldC5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0TWFpbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpO1xyXG5cdE1haW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpbjtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cdE1haW4ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxuXHRcdHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTsgXHRcdFxyXG5cdFx0cmVuZGVyZXIucmVzaXplKDEwMjQsNTc2KVxyXG5cdFx0XHRcdFxyXG5cdFx0dGhpcy5hc3NldElzTG9hZGVkID0gZmFsc2VcclxuXHJcblx0XHQvLyBMT0FEIEFTU0VUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0dmFyIGFzc2V0c1RvTG9hZCA9IEFTU0VUUy50b0FycmF5KENPTkZJRy5pbWFnZXMpO1xyXG5cdFx0dGhpcy5sb2FkQXBpID0gbmV3IExvYWRlckFwaSAoKTtcclxuXHJcblx0XHR0aGlzLl9fYXNzZXRzTG9hZGVkID0gdGhpcy5hc3NldHNMb2FkZWQuYmluZCAodGhpcylcclxuXHRcdHRoaXMubG9hZEFwaS5vbihMb2FkZXJBcGkuQ09NUExFVEUsIHRoaXMuX19hc3NldHNMb2FkZWQgKTtcclxuXHRcdHRoaXMubG9hZEFwaS5sb2FkIChhc3NldHNUb0xvYWQpO1xyXG5cclxuXHRcdC8vIG9ubHkgZm9yIHRlc3RpbmdcclxuXHRcdHRoaXMuc2V0dXBUZXN0QnRucygpXHJcblxyXG5cdH07XHJcblxyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFxyXG5cdFxyXG5cdFxyXG5cdE1haW4ucHJvdG90eXBlLmFzc2V0c0xvYWRlZCAgPSBmdW5jdGlvbigpe1xyXG5cclxuXHRcdHRoaXMuYXNzZXRJc0xvYWRlZCA9IHRydWVcclxuXHJcblx0XHR0aGlzLmxvYWRBcGkub2ZmKExvYWRlckFwaS5DT01QTEVURSwgdGhpcy5fX2Fzc2V0c0xvYWRlZCApO1xyXG4gXHRcdFxyXG4gXHRcdHZhciBsb2dvVGV4dHVyZSA9IG5ldyBQSVhJLlRleHR1cmUuZnJvbUltYWdlIChBU1NFVFMubG9nbykgXHJcblx0XHR2YXIgbG9nbyA9IG5ldyBQSVhJLlNwcml0ZShsb2dvVGV4dHVyZSlcclxuXHRcdGxvZ28ueCA9IDM1O1xyXG5cdFx0c3RhZ2UuYWRkQ2hpbGQobG9nbylcclxuXHJcblx0XHR0aGlzLmVsZW1lbnRZcG9zID0gNDA7XHJcblxyXG5cdFx0dmFyIG1hc2tCYXIgPSBuZXcgQmFyKDgwMCwgMHhDQzAwMDApXHJcblx0XHRtYXNrQmFyLnggPSAyMDA7XHJcblx0XHRtYXNrQmFyLnkgPSB0aGlzLmVsZW1lbnRZcG9zO1xyXG5cdFx0c3RhZ2UuYWRkQ2hpbGQobWFza0JhcilcclxuXHJcblx0XHR2YXIgcSA9IFwiV2hlcmUgZGlkIENlbnRlciBNaWNoYWVsIEpvcmRhbiBwbGF5IGNvbGxlZ2UgYmFza2V0YmFsbD9cIlxyXG5cdFx0dmFyIHF1ZXN0aW9uQmFyID0gbmV3IFF1ZXN0aW9uYmFyKHEpXHJcblx0XHRxdWVzdGlvbkJhci54ID0gMjAwO1xyXG5cdFx0cXVlc3Rpb25CYXIueSA9IHRoaXMuZWxlbWVudFlwb3M7XHJcblx0XHRzdGFnZS5hZGRDaGlsZChxdWVzdGlvbkJhcilcdFx0XHJcblx0XHR0aGlzLnF1ZXN0aW9uQmFyID0gcXVlc3Rpb25CYXJcclxuXHRcdHF1ZXN0aW9uQmFyLm1hc2sgPSBtYXNrQmFyXHJcblx0XHRcclxuXHRcdHZhciB3aW5uZXJDb21wb25lbnQgPSBuZXcgV2lubmVyQ29tcG9uZW50KHRoaXMubG9hZEFwaSlcclxuXHRcdHN0YWdlLmFkZENoaWxkKHdpbm5lckNvbXBvbmVudClcclxuXHRcdHdpbm5lckNvbXBvbmVudC54ID0gMzBcclxuXHRcdHdpbm5lckNvbXBvbmVudC55ID0gMTAwXHJcblx0XHR0aGlzLndpbm5lckNvbXBvbmVudCA9IHdpbm5lckNvbXBvbmVudFxyXG5cclxuXHRcdC8vd2lubmVyQ29tcG9uZW50Lm1hc2sgPSB3aW5uZXJNYXNrXHJcblxyXG5cdFx0Ly8gQXV0byBzaG93IHRoZSBmaXJzdCBxdWVzdGlvbiwgd2hpbGUgdGVzdGluZ1xyXG5cdFx0Ly9xdWVzdGlvbkJhci5zaG93ICgpXHJcblx0XHJcblx0XHQvLyBhdXRvIHNob3cgd2lubmVyXHJcblx0XHQvL3RoaXMuc2hvd1dpbm5lckNsaWNrKClcdFx0XHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxuLyoqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qXHJcbipcdE1haW4gZnVuY3Rpb24gZm9yIGRpc3BsYXlpbmcgYSBxdWVzdGlvbiwgY2FsaW5nIHNob3dRdWVzdGlvbiBcclxuKlx0d2l0aG91dCBjYWxsaW5nIGEgaGlkZVF1ZXN0aW9uIHdpbGwgbWFrZSBpdCBsb29rIHdpZXJkXHJcbipcclxuKi9cclxuXHJcblx0TWFpbi5wcm90b3R5cGUuc2hvd1F1ZXN0aW9uICA9IGZ1bmN0aW9uKHF1ZXN0aW9uVGV4dCl7XHJcblx0XHRjb25zb2xlLmxvZyhcInNob3dRdWVzdGlvbiA9IFwiKVxyXG5cdFx0dGhpcy5xdWVzdGlvbkJhci5zaG93KHF1ZXN0aW9uVGV4dClcclxuXHJcblx0fVxyXG5cclxuXHRNYWluLnByb3RvdHlwZS5oaWRlUXVlc3Rpb24gID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMucXVlc3Rpb25CYXIuaGlkZSgpXHJcblxyXG5cdH1cclxuXHJcblxyXG4gLyoqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKlxyXG4gKlx0TWFpbiBmdW5jdGlvbiBmb3IgZGlzcGxheWluZyBhIHdpbm5lci4gXHJcbiAqXHRUaGUgcHJvZmlsZSBpbWFnZSB3aWxsIGJlIHByZWxvYWRlZCBiZWZvcmUgdGhlIGdyYXBoaWNzIGlzIHNob3duLlxyXG4gKiBcclxuICovXHJcblxyXG5cdE1haW4ucHJvdG90eXBlLmhpZGVXaW5uZXIgID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMud2lubmVyQ29tcG9uZW50LmhpZGVXaW5uZXIoKVxyXG5cdH1cclxuXHJcblxyXG5cdE1haW4ucHJvdG90eXBlLnNob3dXaW5uZXIgID0gZnVuY3Rpb24oaW1hZ2VVUkwgLCBmdWxsbmFtZSl7XHRcdFxyXG5cdFx0dGhpcy53aW5uZXJDb21wb25lbnQuc2hvd1dpbm5lciAoaW1hZ2VVUkwsIGZ1bGxuYW1lKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gVEhFIFJFU1QgSVMgT05MWSBGT1IgVEVTVElORyBcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdE1haW4ucHJvdG90eXBlLnNldHVwVGVzdEJ0bnMgID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuX19oaWRlQ2xpY2sgPSB0aGlzLmhpZGVDbGljay5iaW5kKHRoaXMpXHJcblx0XHR0aGlzLl9fc2hvd0NsaWNrID0gdGhpcy5zaG93Q2xpY2suYmluZCh0aGlzKVxyXG5cdFx0dGhpcy5fX3Nob3dXaW5uZXJDbGljayA9IHRoaXMuc2hvd1dpbm5lckNsaWNrLmJpbmQodGhpcylcclxuXHRcdHRoaXMuX19oaWRlV2lubmVyQ2xpY2sgPSB0aGlzLmhpZGVXaW5uZXJDbGljay5iaW5kKHRoaXMpXHJcblxyXG5cclxuXHRcdHZhciBzaG93QnRuID0gbmV3IFRleHRCdG4oXCJTaG93IHF1ZXN0aW9uXCIpXHJcblx0XHRzaG93QnRuLmludGVyYWN0aXZlID0gdHJ1ZVxyXG5cdFx0c2hvd0J0bi54ID0gMjBcclxuXHRcdHNob3dCdG4ueSA9IDUwMFxyXG5cdFx0c3RhZ2UuYWRkQ2hpbGQoc2hvd0J0bilcclxuXHRcdHNob3dCdG4uY2xpY2sgPSB0aGlzLl9fc2hvd0NsaWNrXHJcblx0XHRcclxuXHRcdHZhciBoaWRlQnRuID0gbmV3IFRleHRCdG4oXCJIaWRlIHF1ZXN0aW9uXCIpO1xyXG5cdFx0aGlkZUJ0bi54ID0gMjBcclxuXHRcdGhpZGVCdG4ueSA9IDUzMFxyXG5cdFx0c3RhZ2UuYWRkQ2hpbGQoaGlkZUJ0bilcclxuXHRcdGhpZGVCdG4uY2xpY2sgPSB0aGlzLl9faGlkZUNsaWNrO1xyXG5cdFx0XHJcblxyXG5cclxuXHRcdHZhciBzaG93V2lubmVyID0gbmV3IFRleHRCdG4oXCJzaG93IFdpbm5lclwiKVxyXG5cdFx0c2hvd1dpbm5lci5pbnRlcmFjdGl2ZSA9IHRydWVcclxuXHRcdHNob3dXaW5uZXIueCA9IDMwMFxyXG5cdFx0c2hvd1dpbm5lci55ID0gNTAwXHJcblx0XHRzdGFnZS5hZGRDaGlsZChzaG93V2lubmVyKVxyXG5cdFx0c2hvd1dpbm5lci5jbGljayA9IHRoaXMuX19zaG93V2lubmVyQ2xpY2tcclxuXHJcblx0XHR2YXIgaGlkZVdpbm5lciA9IG5ldyBUZXh0QnRuKFwiSGlkZSBXaW5uZXJcIilcclxuXHRcdGhpZGVXaW5uZXIuaW50ZXJhY3RpdmUgPSB0cnVlXHJcblx0XHRoaWRlV2lubmVyLnggPSAzMDBcclxuXHRcdGhpZGVXaW5uZXIueSA9IDUzMFxyXG5cdFx0c3RhZ2UuYWRkQ2hpbGQoaGlkZVdpbm5lcilcclxuXHRcdGhpZGVXaW5uZXIuY2xpY2sgPSB0aGlzLl9faGlkZVdpbm5lckNsaWNrXHJcblx0XHRcclxuXHJcblx0fVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdE1haW4ucHJvdG90eXBlLnNob3dDbGljayAgPSBmdW5jdGlvbigpe1x0XHRcclxuXHRcdHZhciBxID0gXCJXaGVyZSBkaWQgTWljaGFlbCBKb3JkYW4gZ28gdG8gY29sbGVnZVwiXHJcblx0XHR0aGlzLnF1ZXN0aW9uQmFyLnNob3cocSlcclxuXHR9XHJcblxyXG5cdE1haW4ucHJvdG90eXBlLmhpZGVDbGljayAgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5xdWVzdGlvbkJhci5oaWRlKClcclxuXHJcblx0fVxyXG5cclxuXHRNYWluLnByb3RvdHlwZS5oaWRlV2lubmVyQ2xpY2sgID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMud2lubmVyQ29tcG9uZW50LmhpZGVXaW5uZXIoKVxyXG5cdH1cclxuXHJcblxyXG5cdE1haW4ucHJvdG90eXBlLnNob3dXaW5uZXJDbGljayAgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGltYWdlVVJMID0gXCJpbWFnZXMvcmFuZG9tUGVyc29uLmpwZ1wiXHJcblx0XHR0aGlzLndpbm5lckNvbXBvbmVudC5zaG93V2lubmVyIChpbWFnZVVSTCwgXCJEZW5uaXMgSGFsbHVuZCBDaHJpc3RvZmZlcnNlblwiKTtcclxuXHR9IiwiXHJcblxyXG4vKipcclxuICogQGF1dGhvciBkZGVubmlzLmRrIC0gYWthIGZhbnRhc3Rpc2suZGsvd29ya3MgYWthIG1lcmVzdWtrZXIuZGtcclxuICovXHJcblxyXG5cclxuXHJcbnZhciBDT05GSUcgPSB7XHJcblxyXG5cdGJhc2VQYXRoOiBcIlwiLFxyXG5cdGltZ1BhdGg6IFwiaW1hZ2VzL1wiLFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFxyXG5cdH0sXHJcblxyXG5cdFxyXG4vLyBlYXN5IGFjY2VzcyB0byBpbWFnZXNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRpbWFnZXM6e1xyXG5cdFx0cXVlc3Rpb25CYXJMb2dvOiBcInF1ZXN0aW9uQmFyTG9nby5wbmdcIixcclxuXHRcdGxvZ286IFwibG9nby5wbmdcIixcdFx0XHJcblx0XHR2aWRlb1N0aWxsRnJhbWU6IFwidmlkZW9TdGlsbEZyYW1lLnBuZ1wiXHJcblx0fSxcclxuXHJcblxyXG5cclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vKipcclxuICogVGhpcyB3aWxsIGxvb3AgdGhyb3VnaCBhbGwga2V5cyBpbiB0aGUgT2JqZWN0IHRoYXQgaXMgcGFzc2VkIGFuZCBzZXQgdGhlbSBhcyBrZXlzIG9uIHRoZSBBU1NFVFMgb2JqZWN0XHJcbiAqIHBhc3NpbmcgW3t0eHQxOlwidHh0MS5wbmdcIn0sIHt0eHQyOlwidHh0Mi5wbmdcIn1dIHdpbGwgYmUgZXF1ZWFsIHRvIEFTU0VUUy50eHQxID0gdHh0MS5wbmdcclxuICogQW5kIHNob3VsZCBiZSB1c2VkIHRvIGxvb2sgdXAgYWxsIGFzc2V0c1xyXG4gKlxyXG4gKiBUaGUgQ09ORklHIHBhdGggaXMgYWxzbyBhcHBlbmRlZCB0byB0aGUgZmlsZW5hbWUsIGZvciBlYXN5IGFjY2VzXHJcbiAqXHJcbiAqXHJcbiAqIEB0eXBlIHt7dG9BcnJheTogRnVuY3Rpb259fVxyXG4gKi9cclxuXHJcblxyXG52YXIgQVNTRVRTID0ge1xyXG5cclxuXHR0b0FycmF5OiBmdW5jdGlvbiAoYU9CSikge1xyXG5cdFx0dGhpcy5hcnIgPSBbXVxyXG5cdFx0Zm9yICh2YXIgb2JqIGluIGFPQkopIHtcclxuXHRcdFx0dmFyIGFzc2V0ID0gYU9CSltvYmpdO1xyXG5cdFx0XHRcclxuXHJcblx0XHRcdC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFuIG9iaiBuYW1lZCB2aWRlb1xyXG5cdFx0XHRpZiAob2JqID09PSBcInZpZGVvXCIpIHtcclxuXHRcdFx0XHJcblx0XHRcdFx0dGhpc1tcInZpZGVvXCJdID0ge307XHRcclxuXHRcdFx0XHR2YXIgdmlkZW9PYmogPSBhT0JKW1widmlkZW9cIl1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgdGhlcmUgaXMgYW4gbG9jYWwgdmlkZW8gcGF0aCBcclxuXHRcdFx0XHR2YXIgbG9jYWxWaWRlb1BhdGggPSBcIlwiXHJcblx0XHRcdFx0aWYgKGFPQkpbXCJ2aWRlb1wiXVtcImxvY2FsVmlkZW9QYXRoXCJdICE9PSB1bmRlZmluZWQpIHtcdFx0XHRcdFx0IFxyXG5cdFx0XHRcdFx0bG9jYWxWaWRlb1BhdGggPSBhT0JKW1widmlkZW9cIl1bXCJsb2NhbFZpZGVvUGF0aFwiXTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gYXBwZW5kIGFsbCB0aGUgdmlkZW8gcGF0aHMgdG8gdGhlIHZpZGVvIG9iamVjdCwgd2l0aCB0aGUgQ09ORklHLnZpZGVvUGF0aCBhbmQgbG9jYWxWaWRlb1BhdGggXHJcblx0XHRcdFx0Zm9yICh2YXIgdmlkZW9QYXRoIGluIHZpZGVvT2JqKSB7XHJcblx0XHRcdFx0XHRpZiAodmlkZW9QYXRoICE9IFwibG9jYWxWaWRlb1BhdGhcIikge1xyXG5cdFx0XHRcdFx0XHQvL3RoaXNbXCJ2aWRlb1wiXVt2aWRlb1BhdGhdICA9IENPTkZJRy5iYXNlUGF0aCArIENPTkZJRy52aWRlb1BhdGggKyBsb2NhbFZpZGVvUGF0aCArIHZpZGVvT2JqW3ZpZGVvUGF0aF1cclxuXHRcdFx0XHRcdFx0dGhpc1tcInZpZGVvXCJdW3ZpZGVvUGF0aF0gID0gdmlkZW9PYmpbdmlkZW9QYXRoXVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIChhc3NldCkgPT09IFwic3RyaW5nXCIgICl7IC8vIG9ubHkgcmV0cnVuIHRoZSBpbWFnZXMgZm9yIGxvYWRpbmdcclxuXHRcdFx0XHR0aGlzW29ial0gID0gQ09ORklHLmJhc2VQYXRoICsgQ09ORklHLmltZ1BhdGggKyBhc3NldFxyXG5cdFx0XHRcdHRoaXMuYXJyLnB1c2ggKCB0aGlzW29ial0gIClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvL2NvbnNvbGUubG9nIChcInRoaXMgPSBcIiwgQVNTRVRTICk7IFxyXG5cdFx0cmV0dXJuIHRoaXMuYXJyXHJcblxyXG5cdH1cclxufVxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKFwic2NyZWVuTW9kdWxlXCIsIFtdKVxyXG5cdC5jb250cm9sbGVyKFwic2NyZWVuQ29udHJvbGxlclwiLCBbXCIkc2NvcGVcIiwgXCIkaHR0cFwiLCBmdW5jdGlvbigkc2NvcGUsICRodHRwICl7XHJcblxyXG5cdFx0dmFyIHZtID0gdGhpc1xyXG5cdFx0Ly8gaW5pdCBiYW5uZXJcclxuICAgICAgICB2bS5tYWluID0gbmV3IE1haW4gKCk7XHJcbiAgICAgICAgdm0ubWFpbi5pbml0KCk7XHJcbiAgICAgICAgdm0ubWFpbi5zZXR1cFRlc3RCdG5zKClcclxuXHJcblxyXG5cdFx0d2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRodHRwLmdldChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vbmFpci9nZXRfZGF0YXN0cmluZ1wiKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdHZhciBkYXRhc3RyaW5nID0gZGF0YS5Sb290Lml0ZW1bMF07XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJkYXRhc3RyaW5nOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFzdHJpbmcsIG51bGwsIDIpKTtcclxuXHRcdFx0XHRwYXJzZURhdGFzdHJpbmcoZGF0YXN0cmluZyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0sIDMwMDApO1xyXG5cclxuXHRcdHZhciBhY3RpdmUgPSBudWxsXHJcblxyXG5cdFx0dmFyIHBhcnNlRGF0YXN0cmluZyA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHR2YXIgcXVlc3Rpb24gPSBkYXRhLnF1ZXN0aW9uWzBdO1xyXG5cdFx0XHR2YXIgd2lubmVybmFtZSA9IGRhdGEud2lubmVybmFtZVswXTtcclxuXHRcdFx0dmFyIGF2YXRhciA9IGRhdGEuYXZhdGFyWzBdO1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gZGF0YS5hY3Rpb25bMF07XHJcblx0XHRcdHZhciByZXN1bHQgPSBkYXRhLnJlc3VsdFswXTtcclxuXHRcdFx0XHRcdFx0XHJcblxyXG5cdFx0XHRpZihhY3Rpb24gJiYgIWFjdGl2ZSl7XHJcblx0XHRcdFx0YWN0aXZlID0gdHJ1ZVxyXG5cdFx0XHRcdHN3aXRjaChhY3Rpb24pe1xyXG5cclxuXHRcdFx0XHRcdGNhc2UgXCJRVUlaU1RBUlRcIjpcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJRVUlaU1RBUlRcIik7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0dm0ubWFpbi5zaG93UXVlc3Rpb24ocXVlc3Rpb24pXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdGNhc2UgXCJRVUlaRU5EXCI6XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiUVVJWkVORFwiKTtcclxuXHRcdFx0XHRcdFx0dm0ubWFpbi5oaWRlUXVlc3Rpb24oKVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlIFwiUkFUSU5HRU5EXCI6XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiUkFUSU5HRU5EXCIpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlIFwiR0FNRUVORFwiOlxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkdBTUVFTkRcIik7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghYWN0aW9uICYmIGFjdGl2ZSApe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTk8gQUNUSU9OXCIpO1xyXG5cdFx0XHRcdGFjdGl2ZSA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcbn1dKTsiLCIvKipcclxuICogQGF1dGhvciBkZGVubmlzLmRrIC0gYWthIGZhbnRhc3Rpc2suZGsvd29ya3MgYWthIG1lcmVzdWtrZXIuZGtcclxuICovXHJcblxyXG4vLyBWQVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5Mb2FkZXJBcGkuQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XHJcbkxvYWRlckFwaS5QUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIjtcclxuXHJcblxyXG5mdW5jdGlvbiBMb2FkZXJBcGkgKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBQSVhJLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLmxvYWRlciA9IG51bGw7XHJcbiAgICB0aGlzLm5hbWUgPSBcImRlbm5pcyBsb2FkZXIgQVBJXCJcclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8qTG9hZGVyQXBpLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XHJcbiBMb2FkZXJBcGkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9hZGVyQXBpOyovXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuTG9hZGVyQXBpLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGFzc2V0c0Fycikge1xyXG4gICAgLy9jb25zb2xlLmxvZyAoXCIgbG9hZGVyQXBpLmpzID4gIGFzc2V0c0FyciBcIiAsIGFzc2V0c0FyciApO1xyXG4gICAgdGhpcy5hc3NldEFtb3VudFRvTG9hZCA9IGFzc2V0c0Fyci5sZW5ndGg7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgUElYSS5Bc3NldExvYWRlcihhc3NldHNBcnIpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMubG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ29uQ29tcGxldGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoYXQub25Bc3NldExvYWRlZChlKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignb25Qcm9ncmVzcycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGhhdC5vblByb2dyZXNzKGUpXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdGFydCBsb2FkaW5nXHJcbiAgICB0aGlzLmxvYWRlci5sb2FkKClcclxufTtcclxuXHJcblxyXG5Mb2FkZXJBcGkucHJvdG90eXBlLm9uUHJvZ3Jlc3MgPSAgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciB0eXBlID0gZS50eXBlO1xyXG4gICAgdmFyIGFzc0xkciA9IGUuY29udGVudDsgLy9Bc3NldExvYWRlclxyXG4gICAgdmFyIEltZ0xkciA9IGUubG9hZGVyOyAvL2ltYWdlTG9hZGVyXHJcblxyXG4gICAgdmFyIGN1cnJlbnQgPSB0aGlzLmFzc2V0QW1vdW50VG9Mb2FkIC0gYXNzTGRyLmxvYWRDb3VudFxyXG4gICAgdmFyIHByb2dyZXNzID0gY3VycmVudCAvIHRoaXMuYXNzZXRBbW91bnRUb0xvYWRcclxuICAgIC8vdGhpcy5lbWl0IChMb2FkZXJBcGkuUFJPR1JFU1MsIHByb2dyZXNzKVxyXG4gICAgdGhpcy5lbWl0KHsgdHlwZTogTG9hZGVyQXBpLlBST0dSRVNTLCBkYXRhOnByb2dyZXNzIH0pO1xyXG59O1xyXG5cclxuXHJcbi8vIFdIRU4gQUxMIEFTU0VUUyBJUyBMT0FERURcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuTG9hZGVyQXBpLnByb3RvdHlwZS5vbkFzc2V0TG9hZGVkID0gIGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIgbGRyID0gZS5jb250ZW50O1xyXG4gICAgdmFyIHR5cGUgPSBlLnR5cGU7XHJcbiAgICAvL3RoaXMuZW1pdCAoTG9hZGVyQXBpLkNPTVBMRVRFKVxyXG4gICAgdGhpcy5lbWl0KExvYWRlckFwaS5DT01QTEVURSk7XHJcbiAgICBjb25zb2xlLmxvZyAoXCJvbkFzc2V0TG9hZGVkICBcIiApXHJcbn07XHJcblxyXG5cclxuIiwiXHJcbi8vIFNpbmNlIHRoZSBjb25zb2xlLmxvZyBpcyBub3QgZGVmaW5kIGluIElFIDgvOVxyXG5pZiAoIXdpbmRvdy5jb25zb2xlKSB3aW5kb3cuY29uc29sZSA9IHt9O1xyXG5pZiAoIXdpbmRvdy5jb25zb2xlLmxvZykgd2luZG93LmNvbnNvbGUubG9nID0gZnVuY3Rpb24gKCkgeyB9OyIsIlxyXG5cclxuXHJcbnZhciBzdGFnZVdpZHRoICA9IDEwMjQ7XHJcbnZhciBzdGFnZUhlaWdodCA9IDU3NjtcclxudmFyIHN0YWdlID0gbmV3IFBJWEkuU3RhZ2UoMHg2NkZGOTkpO1xyXG5zdGFnZS5jbGlja0lkID0gXCJzdGFnZVwiXHJcbnN0YWdlLmludGVyYWN0aXZlID0gZmFsc2U7XHJcblxyXG52YXIgcmVuZGVyZXJPcHRpb25zID0ge1xyXG4gICAgYW50aWFsaWFzaW5nOnRydWUsXHJcbiAgICB0cmFuc3BhcmVudDp0cnVlLFxyXG4gICAgcmVzb2x1dGlvbjoxXHJcbn07XHJcblxyXG5cclxuLy92YXIgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZWNvbW1lbmRlZFJlbmRlcmVyKHN0YWdlV2lkdGgsIHN0YWdlSGVpZ2h0LCByZW5kZXJlck9wdGlvbnMpO1xyXG52YXIgcmVuZGVyZXIgPSBuZXcgUElYSS5DYW52YXNSZW5kZXJlcihzdGFnZVdpZHRoLCBzdGFnZUhlaWdodCwgcmVuZGVyZXJPcHRpb25zKTtcclxuXHJcblxyXG5cclxuLy8gYWRkIHRoZSByZW5kZXJlciB2aWV3IGVsZW1lbnQgdG8gdGhlIERPTVxyXG52YXIgaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc0NvbnRhaW5lclwiKTtcclxuaWQuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICByZXF1ZXN0QW5pbUZyYW1lKGFuaW1hdGUpO1xyXG4gICAgdHJ5IHtcclxuICAgIFx0cmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcclxuXHR9XHJcblx0Y2F0Y2goZXJyKSB7XHJcblx0XHJcblx0fSAgICBcclxufVxyXG5cclxucmVxdWVzdEFuaW1GcmFtZShhbmltYXRlKTtcclxuXHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGRkZW5uaXMuZGsgLSBha2EgZmFudGFzdGlzay5kay93b3JrcyBha2EgbWVyZXN1a2tlci5ka1xyXG4gKi9cclxuXHJcblxyXG4vLyBWQVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gQmFyICh0aGVXaWR0aCwgbXlDb2xvcikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBcclxuICAgIFBJWEkuR3JhcGhpY3MuY2FsbCAodGhpcyApO1xyXG5cclxuICAgIHRoaXMudGhlV2lkdGggPSB0aGVXaWR0aCB8fCA1MDA7XHJcbiAgICB0aGlzLm15Q29sb3IgPSBteUNvbG9yIHx8IDB4RkZGRkZGO1xyXG4gICAgICAgXHJcbiAgICBcclxuICAgIHRoaXMuYW5nbGVPZmZzZXQgPSAxOTsgIFxyXG4gICAgdGhpcy5yZWRyYXcodGhlV2lkdGgpXHJcblxyXG4gfTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdEJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBQSVhJLkdyYXBoaWNzLnByb3RvdHlwZSApO1xyXG5cdEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHJcbiAgICBCYXIucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uICh0aGVXaWR0aCkge1xyXG4gICAgIFxyXG4gICAgICAgIHRoaXMudGhlV2lkdGggPSB0aGVXaWR0aCBcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuYmVnaW5GaWxsKCB0aGlzLm15Q29sb3IpOyAgXHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwwKTtcclxuICAgICAgICB0aGlzLmxpbmVUbyh0aGlzLmFuZ2xlT2Zmc2V0ICwgMSApO1xyXG4gICAgICAgIHRoaXMubGluZVRvKHRoaXMudGhlV2lkdGggKyB0aGlzLmFuZ2xlT2Zmc2V0ICwgMSk7XHJcbiAgICAgICAgdGhpcy5saW5lVG8odGhpcy50aGVXaWR0aCwgMjcpO1xyXG4gICAgICAgIHRoaXMubGluZVRvKDAsIDI3KTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMubGluZVRvKHRoaXMuYW5nbGVPZmZzZXQsIDEpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5lbmRGaWxsKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfSIsIi8qKlxyXG4gKiBAYXV0aG9yIGRkZW5uaXMuZGsgLSBha2EgZmFudGFzdGlzay5kay93b3JrcyBha2EgbWVyZXN1a2tlci5ka1xyXG4gKi9cclxuXHJcblxyXG4vLyBWQVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gUXVlc3Rpb25iYXIgKHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwodGhpcyk7XHJcbiAgICBQSVhJLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XHJcblxyXG4gXHR0aGlzLmxhYmVsID0gcyB8fCBcIlRlc3QgdGVrc3RcIlxyXG5cclxuICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgdGhpcy5sb2dvID0gbmV3IFBJWEkuU3ByaXRlIChuZXcgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAoQVNTRVRTLnF1ZXN0aW9uQmFyTG9nbykpIFxyXG4gICAgdGhpcy5sb2dvLnggPSAwXHJcbiAgICB0aGlzLmxvZ28ueSA9IDBcclxuICAgIHRoaXMubG9nby5hbHBoYSA9IDBcclxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sb2dvKVxyXG5cclxuICAgIHRoaXMudGV4dCA9IG5ldyBQSVhJLlRleHQodGhpcy5sYWJlbCwge2ZpbGw6XCJibGFja1wiLCBmb250OlwiMTZweCBhbHJpZ2h0X3NhbnN1bHRyYV9pdGFsaWNcIn0pO1xyXG4gICAgdGhpcy50ZXh0LnggPSAwXHJcbiAgICB0aGlzLnRleHQueSA9IDhcclxuICAgIHRoaXMudGV4dC5hbHBoYSA9IDBcclxuXHJcbiAgICB0aGlzLmJhciA9IG5ldyBCYXIodGhpcy50ZXh0LndpZHRoICsgNTApXHJcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmFyKVxyXG4gICAgdGhpcy5iYXIueCA9IC10aGlzLmJhci53aWR0aFxyXG5cclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgdGhlIHRleHQgaXMgb24gdG9wXHJcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMudGV4dCk7XHJcblxyXG4gICAgdGhpcy5lbmRUZXh0UG9zID0gMjVcclxuXHJcbn07XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRRdWVzdGlvbmJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpO1xyXG5cdFF1ZXN0aW9uYmFyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFF1ZXN0aW9uYmFyO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFxyXG5cdFF1ZXN0aW9uYmFyLnByb3RvdHlwZS51cGRhdGVMYWJlbCA9IGZ1bmN0aW9uKHMpe1xyXG5cdFx0dGhpcy5sYWJlbCA9IHMgXHJcblx0XHR0aGlzLnRleHQuc2V0VGV4dCAocylcclxuXHR9XHJcblx0XHJcblxyXG5cdFF1ZXN0aW9uYmFyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24ocXVlc3Rpb25UeHQpe1xyXG5cdFx0XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uVHh0ICE9IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHF1ZXN0aW9uVHh0LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dC5zZXRUZXh0KHRoaXMubGFiZWwpXHJcbiAgICAgICAgICAgIHRoaXMuYmFyLnJlZHJhdyh0aGlzLnRleHQud2lkdGggKyA1MClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy5iYXIgLCAuNiAsIHt4OjAgLCBkZWxheTowLCBlYXNlOlN0cm9uZy5lYXNlT3V0fSk7XHJcbiAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMudGV4dCAsIC42ICwge3g6dGhpcy5lbmRUZXh0UG9zICwgZGVsYXk6MCwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLnRleHQgLCAuNCAsIHthbHBoYToxLCBkZWxheTouMiwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ28ueCA9IHRoaXMuYmFyLndpZHRoIC0gNThcclxuICAgICAgICB2YXIgZCA9IC4zNVxyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmxvZ28gLCAuNSAsIHt4OnRoaXMuYmFyLndpZHRoIC0gMjEsIGRlbGF5OmQsIGVhc2U6U3Ryb25nLmVhc2VPdXR9KTtcclxuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy5sb2dvICwgLjUgLCB7YWxwaGE6MSwgZGVsYXk6ZCwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRRdWVzdGlvbmJhci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBcdFxyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmxvZ28gLCAuNCAsIHt4OnRoaXMuYmFyLndpZHRoIC0gODAsIGRlbGF5OjAsIGVhc2U6U3Ryb25nLmVhc2VPdXR9KTtcclxuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy5sb2dvICwgLjQgLCB7YWxwaGE6MCwgZGVsYXk6MCwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG5cclxuICAgICAgICB2YXIgZCA9IC4yO1xyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmJhciAsIC42ICwge3g6IC10aGlzLmJhci53aWR0aCAgLCBkZWxheTpkLCBlYXNlOlN0cm9uZy5lYXNlT3V0fSk7XHJcbiAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMudGV4dCAsIC42ICwge3g6LTUwICwgYWxwaGE6MCwgZGVsYXk6ZCwgZWFzZTpTdHJvbmcuZWFzZU91dH0pOyAgICAgICAgXHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcclxuIiwiXHJcblxyXG5mdW5jdGlvbiBXaW5uZXJDb21wb25lbnQobG9hZGVyQXBpKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwodGhpcyk7XHJcbiAgICBQSVhJLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXJBcGkgPSBsb2FkZXJBcGlcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUhvbGRlciA9IG5ldyBQSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIoKVxyXG5cclxuICAgIHZhciBibHVlSW1hZ2VCYWNrZ3JvdW5kID0gbmV3IFBpeGlCb3ggKDgxLDgxLCAweDE3YWNkNSlcclxuICAgIHRoaXMuaW1hZ2VIb2xkZXIuYWRkQ2hpbGQoYmx1ZUltYWdlQmFja2dyb3VuZClcclxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5pbWFnZUhvbGRlcilcclxuXHJcblxyXG4gICAgLy8gTG9nbyBob2xkZXIgd2l0aCBleHRyYSBibHVlIGJhY2tncm91bmQgXHJcbiAgICB0aGlzLmxvZ29Ib2xkZXIgPSBuZXcgUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyKClcclxuICAgIHRoaXMubG9nbyA9IG5ldyBQSVhJLlNwcml0ZSAobmV3IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgKEFTU0VUUy5xdWVzdGlvbkJhckxvZ28pKSBcclxuICAgIHRoaXMubG9nby54ID0gNTVcclxuICAgIHRoaXMubG9nby55ID0gMSAgICBcclxuICAgIHRoaXMuYmx1ZUJhciA9IG5ldyBCYXIgKDIwLCAweDE3YWNkNSlcclxuICAgIHRoaXMuYmx1ZUJhci54ID0gNTBcclxuXHJcbiAgICAvLyBhZGQgdG8gbG9nb0hvbGRlclxyXG4gICAgdGhpcy5sb2dvSG9sZGVyLmFkZENoaWxkKHRoaXMuYmx1ZUJhcilcclxuICAgIHRoaXMubG9nb0hvbGRlci5hZGRDaGlsZCh0aGlzLmxvZ28pICAgICAgICBcclxuICAgIHRoaXMuYWRkQ2hpbGRBdCh0aGlzLmxvZ29Ib2xkZXIsIDApXHJcblxyXG4gICAgdGhpcy5sb2dvSG9sZGVyLnggPSAxMFxyXG4gICAgdGhpcy5sb2dvSG9sZGVyLnkgPSAtMVxyXG5cclxuICAgIHRoaXMud2lubmVyQmFyID0gbmV3IEJhciAoMTcwLCAweDAwMDY0MylcclxuICAgIHRoaXMud2lubmVyQmFyLnggPSA1NlxyXG4gICAgdGhpcy53aW5uZXJCYXIueSA9IDI3XHJcbiAgICB0aGlzLmFkZENoaWxkQXQodGhpcy53aW5uZXJCYXIsIDApXHJcblxyXG4gICAgdGhpcy53aW5uZXJOYW1lQmFyID0gbmV3IEJhciAoMTAwKVxyXG4gICAgdGhpcy53aW5uZXJOYW1lQmFyLnggPSA1NlxyXG4gICAgdGhpcy53aW5uZXJOYW1lQmFyLnkgPSA1M1xyXG4gICAgdGhpcy5hZGRDaGlsZEF0KHRoaXMud2lubmVyTmFtZUJhciwgMClcclxuXHJcbiAgICB0aGlzLmZhc3RUeHQgPSBuZXcgUElYSS5UZXh0KFwiSFVSVElHU1RFIFNWQVJcIiwge2ZpbGw6XCIjZTNkYTAyXCIsIGZvbnQ6XCIxNHB4IGFscmlnaHRfc2Fuc3VsdHJhX2l0YWxpY1wifSk7XHJcbiAgICB0aGlzLmZhc3RUeHQueCA9IDkwXHJcbiAgICB0aGlzLmZhc3RUeHQueSA9IDM0XHJcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuZmFzdFR4dClcclxuICAgIFxyXG4gICAgdGhpcy53aW5uZXJUeHQgPSBuZXcgUElYSS5UZXh0KFwidGVzdFwiLCB7ZmlsbDpcIiMwMDAwMDBcIiwgZm9udDpcIjE2cHggYWxyaWdodF9zYW5zdWx0cmFfaXRhbGljXCJ9KTtcclxuICAgIHRoaXMud2lubmVyVHh0LnggPSA5MFxyXG4gICAgdGhpcy53aW5uZXJUeHQueSA9IDYyXHJcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMud2lubmVyVHh0KVxyXG5cclxuICAgIHRoaXMuaW1hZ2VIb2xkZXIuYWxwaGEgPSAwXHJcbiAgICB0aGlzLmxvZ29Ib2xkZXIuYWxwaGEgPSAwXHJcbiAgICB0aGlzLndpbm5lclR4dC5hbHBoYSA9IDBcclxuICAgIHRoaXMuZmFzdFR4dC5hbHBoYSA9IDBcclxuICAgIHRoaXMud2lubmVyTmFtZUJhci5hbHBoYSA9IDBcclxuICAgIHRoaXMud2lubmVyQmFyLmFscGhhID0gMFxyXG5cclxuXHJcbiAgICAvLyBWYXJzXHJcbiAgICB0aGlzLmltYWdlU3ByaXRlWXBvcyA9IDNcclxuICAgIC8vIGNhbGwgYmFjayBmdW5jdGlvbiBcclxuICAgIHRoaXMuX19pbWFnZUxvYWRlZCA9IHRoaXMuaW1hZ2VMb2FkZWQuYmluZCh0aGlzKVxyXG5cclxufVxyXG5cclxuXHJcbi8vQ29weSBvdmVyIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuV2lubmVyQ29tcG9uZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSk7XHJcbldpbm5lckNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBXaW5uZXJDb21wb25lbnQ7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbi8vIFByaXZhdGUgZnVuY3Rpb25cclxuV2lubmVyQ29tcG9uZW50LnByb3RvdHlwZS5pbWFnZUxvYWRlZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInNkZnNkZlwiIClcclxuXHJcbiAgICB0aGlzLmxvYWRlckFwaS5vZmYoTG9hZGVyQXBpLkNPTVBMRVRFICwgdGhpcy5fX2ltYWdlTG9hZGVkKVxyXG4gICAgXHJcbiAgICB2YXIgaW1hZ2VUZXh0dXJlID0gbmV3IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UodGhpcy5pbWFnZVVybCkgICAgXHJcbiAgICB0aGlzLmltYWdlU3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKGltYWdlVGV4dHVyZSlcclxuICAgIFxyXG4gICAgdGhpcy5pbWFnZVNwcml0ZS54ID0gdGhpcy5pbWFnZVNwcml0ZVlwb3NcclxuICAgIHRoaXMuaW1hZ2VTcHJpdGUueSA9IHRoaXMuaW1hZ2VTcHJpdGVZcG9zXHJcbiAgICB0aGlzLmltYWdlSG9sZGVyLmFkZENoaWxkKHRoaXMuaW1hZ2VTcHJpdGUpXHJcblxyXG5cclxuLy8gQW5pbWF0aW9uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICB0aGlzLmltYWdlSG9sZGVyLnggPSAtOTBcclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLmltYWdlSG9sZGVyICwgLjQgLCB7YWxwaGE6MSwgeDowICwgZGVsYXk6MCwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG4gICAgXHJcbiAgICB0aGlzLmxvZ29Ib2xkZXIueCA9IC05MFxyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMubG9nb0hvbGRlciAsIC40ICwge2FscGhhOjEsIHg6MTAgLCBkZWxheTouMiwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG5cclxuXHJcbiAgICB0aGlzLndpbm5lckJhci5zY2FsZS54ID0gMFxyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMud2lubmVyQmFyLnNjYWxlICwgLjMgLCB7eDoxLCBkZWxheTouNCwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMud2lubmVyQmFyICwgLjIgLCB7YWxwaGE6MSwgZGVsYXk6LjQsIGVhc2U6U3Ryb25nLmVhc2VPdXR9KTtcclxuXHJcbiAgICB0aGlzLmZhc3RUeHQueCA9IDcwO1xyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuZmFzdFR4dCAsIC4zICwge3g6OTAsIGFscGhhOjEsIGRlbGF5Oi41LCBlYXNlOlN0cm9uZy5lYXNlT3V0fSk7XHJcbiAgICBcclxuICAgIHRoaXMud2lubmVyTmFtZUJhci5zY2FsZS54ID0gMFxyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMud2lubmVyTmFtZUJhci5zY2FsZSAsIC40ICwge3g6MSwgZGVsYXk6LjYsIGVhc2U6U3Ryb25nLmVhc2VPdXR9KTtcclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLndpbm5lck5hbWVCYXIgLCAuNCAsIHthbHBoYToxLCBkZWxheTouNiwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG5cclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLndpbm5lclR4dCAsIC40ICwge2FscGhhOjEsIGRlbGF5Oi42NSwgZWFzZTpTdHJvbmcuZWFzZU91dH0pO1xyXG4gICAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcbldpbm5lckNvbXBvbmVudC5wcm90b3R5cGUuc2hvd1dpbm5lciA9IGZ1bmN0aW9uIChpbWFnZVVybCwgd2lubmVyRnVsbE5hbWUpIHtcclxuICAgIFxyXG4gICAgdGhpcy53aW5uZXJUeHQuc2V0VGV4dCAod2lubmVyRnVsbE5hbWUudG9VcHBlckNhc2UoKSk7XHJcbiAgICB0aGlzLndpbm5lck5hbWVCYXIucmVkcmF3KHRoaXMud2lubmVyVHh0LndpZHRoICs1MCk7XHJcblxyXG4gICAgdGhpcy5pbWFnZVVybCA9IGltYWdlVXJsXHJcbiAgICB2YXIgYXJyID0gW2ltYWdlVXJsXVxyXG4gICAgdGhpcy5sb2FkZXJBcGkub24oTG9hZGVyQXBpLkNPTVBMRVRFICwgdGhpcy5fX2ltYWdlTG9hZGVkIClcclxuICAgIHRoaXMubG9hZGVyQXBpLmxvYWQoYXJyKVxyXG5cclxufVxyXG5cclxuXHJcbldpbm5lckNvbXBvbmVudC5wcm90b3R5cGUuaGlkZVdpbm5lciA9IGZ1bmN0aW9uICgpIHsgICAgXHJcbiAgICBcclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLmltYWdlSG9sZGVyICwgLjYgLCB7YWxwaGE6MSwgeDotMTUwICwgZGVsYXk6LjQsIGVhc2U6RXhwby5lYXNlT3V0fSk7ICAgIFxyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMubG9nb0hvbGRlciAsIC41ICwge2FscGhhOjAsIHg6LTgwICwgZGVsYXk6LjI1LCBlYXNlOkV4cG8uZWFzZU91dH0pO1xyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMud2lubmVyQmFyLnNjYWxlICwgLjMgLCB7eDowLCBkZWxheTouMTgsIGVhc2U6RXhwby5lYXNlT3V0fSk7XHJcbiAgICBUd2VlbkxpdGUudG8odGhpcy53aW5uZXJCYXIgLCAuMyAsIHthbHBoYTowLCBkZWxheTouMTgsIGVhc2U6RXhwby5lYXNlT3V0fSk7ICAgIFxyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuZmFzdFR4dCAsIC4zICwge3g6ODAsIGFscGhhOjAsIGRlbGF5Oi4xLCBlYXNlOkV4cG8uZWFzZU91dH0pOyAgICBcclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLndpbm5lck5hbWVCYXIuc2NhbGUgLCAuNCAsIHt4OjAsIGRlbGF5OjAsIGVhc2U6RXhwby5lYXNlT3V0fSk7XHJcbiAgICBUd2VlbkxpdGUudG8odGhpcy53aW5uZXJOYW1lQmFyICwgLjQgLCB7YWxwaGE6MCwgZGVsYXk6MCwgZWFzZTpFeHBvLmVhc2VPdXR9KTtcclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLndpbm5lclR4dCAsIC40ICwge2FscGhhOjAsIGRlbGF5OjAsIGVhc2U6RXhwby5lYXNlT3V0fSk7XHJcbn1cclxuIiwiXHJcblxyXG5mdW5jdGlvbiBCb3hSb3VuZENvcm5lcnModGV4LCBjb2xvciwgd1BhZGRpbmcsIGhQYWRkaW5nKXtcclxuXHJcbiAgICAvLyBjYWxsIHN1cGVyIGNvbnN0cnVjdG9yXHJcbiAgICBQSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCAodGhpcyApO1xyXG4gICAgLy9QSVhJLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7ICAgIFxyXG5cclxuICAgIGlmICh3UGFkZGluZyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB3UGFkZGluZyA9IDQwXHJcbiAgICB9OyBcclxuICAgIFxyXG4gICAgaWYgKGhQYWRkaW5nPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaFBhZGRpbmcgPSAyNVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm15V2lkdGggPSB0ZXgud2lkdGggKyB3UGFkZGluZztcclxuICAgIHRoaXMubXlIZWlnaHQgPSB0ZXguaGVpZ2h0ICsgaFBhZGRpbmcgOyBcclxuICAgIHRoaXMubXlDb2xvciA9IGNvbG9yIHx8IDB4MDFiMGU5O1xyXG5cclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKClcclxuICAgIC8vYmFja2dyb3VuZC5jbGVhcigpOyAgICBcclxuICAgIHRoaXMuYmFja2dyb3VuZC5iZWdpbkZpbGwoIHRoaXMubXlDb2xvciAsIDEpO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kLmRyYXdSb3VuZGVkUmVjdCgwICwgMCAsIHRoaXMubXlXaWR0aCwgdGhpcy5teUhlaWdodCwgMylcclxuICAgIC8vdGhpcy5iYWNrZ3JvdW5kLmRyYXdSZWN0KDAgLCAwICwgdGhpcy5teVdpZHRoLCB0aGlzLm15SGVpZ2h0KVxyXG4gICAgXHJcbiAgICB0aGlzLmJhY2tncm91bmQucGl2b3QueCA9IHRoaXMuYmFja2dyb3VuZC53aWR0aCouNVxyXG4gICAgdGhpcy5iYWNrZ3JvdW5kLnBpdm90LnkgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0Ki41XHJcbiAgICBcclxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrZ3JvdW5kKTtcclxuICAgIFxyXG5cclxuICAgIHZhciBsYWJlbCA9IG5ldyBQSVhJLlNwcml0ZSh0ZXgpO1xyXG5cclxuICAgIC8qbGFiZWwueCA9IE1hdGgucm91bmQgKHRoaXMubXlXaWR0aCAgKiAuNSAtICBsYWJlbC53aWR0aCAgKiAuNSAgICk7XHJcbiAgICBsYWJlbC55ID0gTWF0aC5yb3VuZCggdGhpcy5teUhlaWdodCAqIC41IC0gIGxhYmVsLmhlaWdodCAqIC41ICApOyovXHJcbiAgICBsYWJlbC54ID0gLSBNYXRoLnJvdW5kICh0aGlzLm15V2lkdGggICogLjUgICApICsgd1BhZGRpbmcqLjU7XHJcbiAgICBsYWJlbC55ID0gIC0gTWF0aC5yb3VuZCggdGhpcy5teUhlaWdodCAqIC41ICkgKyBoUGFkZGluZyouNTtcclxuICAgIHRoaXMuYWRkQ2hpbGQobGFiZWwpO1xyXG5cclxufTtcclxuXHJcbi8vQ29weSBvdmVyIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5Cb3hSb3VuZENvcm5lcnMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSApO1xyXG5Cb3hSb3VuZENvcm5lcnMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQm94Um91bmRDb3JuZXJzO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4iLCIiLCInJ1xyXG5cclxuZnVuY3Rpb24gUGl4aUJveChfdywgX2gsIF9jLCBfYSl7XHJcbiAgICAvLyBjYWxsIHN1cGVyIGNvbnN0cnVjdG9yXHJcbiAgICBQSVhJLkdyYXBoaWNzLmNhbGwgKHRoaXMgKTtcclxuXHJcbiAgICB0aGlzLl93ID0gX3cgICAgfHwgNTA7XHJcbiAgICB0aGlzLl9oID0gX2ggICAgfHwgNTA7XHJcblxyXG4gICAgdGhpcy5fYyA9IF9jXHJcbiAgICBpZiAodGhpcy5fYyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9jID0gMHhDQzAwMDA7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB0aGlzLl9hID0gX2EgIHx8IDE7XHJcbiAgICB0aGlzLnJlZHJhdyh0aGlzLl93LCB0aGlzLl9oLCB0aGlzLl9jLCB0aGlzLl9hKVxyXG4gICAgXHJcbn1cclxuXHJcbi8vQ29weSBvdmVyIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5QaXhpQm94LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFBJWEkuR3JhcGhpY3MucHJvdG90eXBlICk7XHJcblBpeGlCb3gucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGl4aUJveDtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5QaXhpQm94LnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbiAoX3csIF9oLCBfYywgX2EpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHZhciBjb2xvciA9IF9jIHx8IHRoaXMuX2NcclxuICAgIHZhciBhbCA9IF9hIHx8IHRoaXMuX2FcclxuICAgIHRoaXMuYmVnaW5GaWxsKGNvbG9yLCBhbCk7XHJcbiAgICB0aGlzLmRyYXdSZWN0KDAsMCxfdyAsX2gpO1xyXG4gICAgdGhpcy5lbmRGaWxsKCk7XHJcbn07XHJcblxyXG4iLCJcclxuXHJcbmZ1bmN0aW9uIFRleHRCdG4obGFiZWwpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBQSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKTtcclxuICAgIFBJWEkuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZVxyXG5cclxuICAgIHRoaXMubGFiZWwgPSBsYWJlbCB8fCBcInRlc3RcIjtcclxuXHJcbiAgICB0aGlzLnRleHQgPSBuZXcgUElYSS5UZXh0KHRoaXMubGFiZWwsIHtmaWxsOlwiYmxhY2tcIiwgZm9udDpcImJvbGQgMjVweCBBcmlhbFwifSk7XHJcbiAgICB0aGlzLnRleHQueCA9IDBcclxuICAgIHRoaXMudGV4dC55ID0gMFxyXG4gICAgXHJcblxyXG4gICAgdmFyIGJveCA9IG5ldyBQaXhpQm94KHRoaXMudGV4dC53aWR0aCAsIHRoaXMudGV4dC5oZWlnaHQgKVxyXG4gICAgdGhpcy5hZGRDaGlsZCAoYm94KVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy50ZXh0KVxyXG4gICAgXHJcbn1cclxuXHJcbi8vQ29weSBvdmVyIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblRleHRCdG4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlKTtcclxuVGV4dEJ0bi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUZXh0QnRuO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=