/////////////////////////////////////////////////////////////////////////////////
//																																						 //
/////////////////////////////////////////////////////////////////////////////////
//																																						 //
//     					 H E A P   S O R T   V I S U A L I Z A T I O N   							 //
//								W I T H   S L A N T E D   H E A P   T R E E 								 //
//																																						 //
/////////////////////////////////////////////////////////////////////////////////
//																																						 //
//																																						 //
// This demo is created based on animation library by David Galles.
// Some non-trivial improvements include:
// 	- A heap tree with nodes vertically aligned to the array elements
// 	- Tree node sizes proportional to the nodes' values
// 	- An array of elements with heights proportional to the element values
// 	- Real-time display of comparison counts for array elements and for their total
// 	- Real-time display of swap counts for array elements and for their total
//																																						 //
// 															mji54 07/18/2018															 //
//																																						 //
/////////////////////////////////////////////////////////////////////////////////
//																																						 //
/////////////////////////////////////////////////////////////////////////////////
//
// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco

var HIGHLIGHT_DIFF_OFFSET = 3;

function AnimatedCounter(id, val, center, initialWidth)
{
	this.centering = center;
	this.counter = val;
	this.highlighted = false;
	this.objectID = id;
	this.alpha = 1.0;
	this.addedToScene = true;
	this.counterColor = "#00241B"; // changed color
	this.textWidth = 0;
  // added new variable
  this.reset = false;
  if (initialWidth != undefined)
	{
		this.textWidth = initialWidth;
	}

        this.leftWidth = -1;
        this.centerWidth = -1;
        this.highlightIndex = -1;
}

AnimatedCounter.prototype = new AnimatedObject();
AnimatedCounter.prototype.constructor = AnimatedCounter;

AnimatedCounter.prototype.alwaysOnTop = true;


AnimatedCounter.prototype.centered = function()
{
	return this.centering;
}


AnimatedCounter.prototype.draw = function(ctx)
{
	if (!this.addedToScene)
	{
		return;
	}

	ctx.globalAlpha = this.alpha;
	ctx.font = '12px Lato';

        var startingXForHighlight = this.x;

        if (this.highlightIndex >= this.counter.length)
        {
             this.highlightIndex = -1;
        }
        if (this.highlightIndexDirty && this.highlightIndex != -1)
        {
              this.leftWidth = ctx.measureText(this.counter.substring(0,this.highlightIndex)).width;
              this.centerWidth = ctx.measureText(this.counter.substring(this.highlightIndex, this.highlightIndex+1)).width;
	      this.highlightIndexDirty = false;
        }

	if (this.centering)
	{
                if (this.highlightIndex != -1)
                {
		    startingXForHighlight = this.x - this.width / 2;
                    ctx.textAlign = 'left';
                    ctx.textBaseline   = 'middle';
                }
                else
                {
      		    ctx.textAlign = 'center';
                    ctx.textBaseline   = 'middle';
                }
	}
	else
	{
		ctx.textAlign = 'left';
		ctx.textBaseline   = 'top';
	}
	if (this.highlighted)
	{
	    ctx.strokeStyle = "#93E5AB"; // changed red color
	    ctx.fillStyle = "#93E5AB"; // changed red color
		ctx.lineWidth = this.highlightDiff-HIGHLIGHT_DIFF_OFFSET;
    // console.log(ctx.lineWidth);
		ctx.strokeText(this.counter, this.x, this.y);
		//ctx.fillText(this.counter, this.x, this.y);
	}
	ctx.strokeStyle = this.counterColor;
	ctx.fillStyle = this.counterColor;
	ctx.lineWidth = 1;
	strList = this.counter.split("\n");
	if (strList.length == 1)
	{
                if (this.highlightIndex == -1)
                {
									// array index text
                    ctx.fillText(this.counter, this.x, this.y);
                }
                else
                {
									// console.log("else"); // not in
                    var leftStr = this.counter.substring(0, this.highlightIndex);
                    var highlightStr = this.counter.substring(this.highlightIndex, this.highlightIndex + 1)
                    var rightStr = this.counter.substring(this.highlightIndex + 1)
                    ctx.fillText(leftStr, startingXForHighlight, this.y)
 	            ctx.strokeStyle = "#93E5AB";
	            ctx.fillStyle = "#93E5AB";
                    ctx.fillText(highlightStr, startingXForHighlight + this.leftWidth, this.y)


	            ctx.strokeStyle = this.counterColor;
	            ctx.fillStyle = this.counterColor;
                    ctx.fillText(rightStr, startingXForHighlight + this.leftWidth + this.centerWidth, this.y)


                }
		//this.textWidth = ctx.measureText(this.counter).width;
	}
	else
	{
		// console.log("else 2"); // not in
		var offset = (this.centering)?  (1.0 - strList.length) / 2.0 : 0;
		for (var i = 0; i < strList.length; i++)
		{
			ctx.fillText(strList[i], this.x, this.y + offset + i * 12);
			//this.textWidth = Math.max(this.textWidth, ctx.measureText(strList[i]).width);
		}
	}
	ctx.closePath();
}


AnimatedCounter.prototype.getAlignLeftPos = function(otherObject)
{
    if (this.centering)
    {
	return [otherObject.left() - this.textWidth / 2, this.y = otherObject.centerY()];
    }
    else
    {
	return [otherObject.left() - this.textWidth, otherObject.centerY() - 5];
    }
}

AnimatedCounter.prototype.alignLeft = function(otherObject)
{
	if (this.centering)
	{
		this.y = otherObject.centerY();
		this.x = otherObject.left() - this.textWidth / 2;
	}
	else
	{
		this.y = otherObject.centerY() - 5;
		this.x = otherObject.left() - this.textWidth;
	}
}

AnimatedCounter.prototype.alignRight = function(otherObject)
{
	if (this.centering)
	{
		this.y = otherObject.centerY();
		this.x = otherObject.right() + this.textWidth / 2;
	}
	else
	{
		this.y = otherObject.centerY() - 5;
		this.x = otherObject.right();
	}
}
AnimatedCounter.prototype.getAlignRightPos = function(otherObject)
{
    if (this.centering)
    {
	return [otherObject.right() + this.textWidth / 2, otherObject.centerY()];
    }
    else
    {
	return [otherObject.right(), otherObject.centerY() - 5];
    }
}


AnimatedCounter.prototype.alignTop = function(otherObject)
{
	if (this.centering)
	{
		this.y = otherObject.top() - 5;
		this.x = otherObject.centerX();
	}
	else
	{
		this.y = otherObject.top() - 10;
		this.x = otherObject.centerX() -this.textWidth / 2;
	}
}


AnimatedCounter.prototype.getAlignTopPos = function(otherObject)
{
	if (this.centering)
	{
		return [otherObject.centerX(), otherObject.top() - 5];
	}
	else
	{
	    return [otherObject.centerX() -this.textWidth / 2, otherObject.top() - 10];
	}
}


AnimatedCounter.prototype.alignBottom = function(otherObject)
{
	if (this.centering)
	{
		this.y = otherObject.bottom() + 5;
		this.x = otherObject.centerX();
	}
	else
	{
		this.y = otherObject.bottom();
		this.x = otherObject.centerX() - this.textWidth / 2;
	}
}


AnimatedCounter.prototype.getAlignBottomPos = function(otherObject)
{
	if (this.centering)
	{
	    return [otherObject.centerX(),  otherObject.bottom() + 5];
	}
	else
	{
	    return [otherObject.centerX() - this.textWidth / 2,  otherObject.bottom()];
	}
}



AnimatedCounter.prototype.getWidth = function()
{
	return this.textWidth;
}

AnimatedCounter.prototype.getHeight = function()
{
	return 10;  // HACK!  HACK!  HACK!  HACK!
}


AnimatedCounter.prototype.setHighlight = function(value)
{
	this.highlighted = value;
}

AnimatedCounter.prototype.createUndoDelete = function()
{
	return new UndoDeletecounter(this.objectID, this.counter, this.x, this.y, this.centering, this.counterColor, this.layer, this.highlightIndex);
}


AnimatedCounter.prototype.centerX = function()
{
	if (this.centering)
	{
		return this.x;
	}
	else
	{
		return this.x + this.textWidth;
	}

}

AnimatedCounter.prototype.centerY = function()
{
	if (this.centering)
	{
		return this.y;
	}
	else
	{
		return this.y + 5; //
	}

}

AnimatedCounter.prototype.top = function()
{
	   if (this.centering)
	   {
		   return  this.y - 5; //TODO: Un-Hardwire
	   }
	   else
	   {
			return this.y;
	   }
}


AnimatedCounter.prototype.bottom = function()
{
   if (this.centering)
   {
	   return  this.y + 5; // TODO: + height / 2;
   }
   else
   {
	   return  this.y + 10; // TODO: + hieght;
   }
}


AnimatedCounter.prototype.right = function()
{
   if (this.centering)
   {
	   return  this.x + this.textWidth / 2; // TODO: + width / 2;
   }
   else
   {
	   return  this.x + this.textWidth; // TODO: + width;
   }
}


AnimatedCounter.prototype.left = function()
{
   if (this.centering)
   {
	   return this. x - this.textWidth / 2;
   }
   else
   {
	   return  this.x; // TODO:  - a little?
   }
}


AnimatedCounter.prototype.setHighlightIndex = function(hlIndex)
{
    // Only allow highlight index for counters that don't have End-Of-Line
    if (this.counter.indexOf("\n") == -1 && this.counter.length > hlIndex)
    {
         this.highlightIndex = hlIndex;
         this.highlightIndexDirty = true;
    }
    else
    {
         this.highlightIndex = -1;

    }
}


 AnimatedCounter.prototype.getTailPointerAttachPos = function(fromX, fromY, anchorPoint)
 {
	return this.getClosestCardinalPoint(fromX, fromY);
 }

AnimatedCounter.prototype.getHeadPointerAttachPos = function (fromX, fromY)
{
	return this.getClosestCardinalPoint(fromX, fromY);
}

AnimatedCounter.prototype.reset = function()
{
  // console.log("counter reset");
  this.reset = true;
}

AnimatedCounter.prototype.setText = function(newText, textIndex, initialWidth)
{
  // console.log("COUNTER: new text: " + newText);
  // if (newText === "0") {
  //   console.log("new text is 0");
  //   this.counter = 0;
  // }

  newText === "0" ? this.counter = "0" :
                    newText === "-1" ? this.counter = (parseInt(this.counter) - 1).toString() :
                                      this.counter = (parseInt(this.counter) + 1).toString();

	if (initialWidth != undefined)
	{
		this.textWidth = initialWidth;
	}
}



function UndoDeletecounter(id, lab, x, y, centered, color, l, hli)
{
	this.objectID = id;
	this.posX = x;
	this.posY = y;
	this.nodecounter = lab;
	this.labCentered = centered;
	this.counterColor = color;
	this.layer = l;
        this.highlightIndex = hli;
        this.dirty = true;
}

UndoDeletecounter.prototype = new UndoBlock();
UndoDeletecounter.prototype.constructor = UndoDeletecounter;

UndoDeletecounter.prototype.undoInitialStep = function(world)
{
	world.addCounterObject(this.objectID, this.nodecounter, this.labCentered);
	world.setNodePosition(this.objectID, this.posX, this.posY);
	world.setForegroundColor(this.objectID, this.counterColor);
	world.setLayer(this.objectID, this.layer);
}
