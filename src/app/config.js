

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


