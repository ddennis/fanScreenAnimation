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