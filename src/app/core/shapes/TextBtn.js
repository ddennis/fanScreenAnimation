

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


