

function PixiCircle(radius, color ){
    'use strict';

    // Call prototype on super()
    PIXI.Graphics.call (this );

    this.radius = radius	|| 50
    this.color  = color		|| 0xFF0000
    this.beginFill(this.color, 1);
    this.drawCircle(0,0, this.radius)
}

//Copy over prototype --------------------------------------------------------------------------------------
PixiCircle.prototype = Object.create( PIXI.Graphics.prototype );
PixiCircle.prototype.constructor = PixiCircle;

//---------------------------------------------------------------------------------------

PixiCircle.prototype.redraw = function (radius, color) {
    this.clear ()
    this.beginFill(this.color, 1);
    this.drawCircle(0,0, this.radius)
};
