

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


