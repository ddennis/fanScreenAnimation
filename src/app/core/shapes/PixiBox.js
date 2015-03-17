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

