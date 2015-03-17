


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

