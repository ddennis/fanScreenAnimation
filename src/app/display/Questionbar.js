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

	
