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

const MIN_RADIUS = 10;
const ADDITIONAL_MAX_RADIUS = 20;
const MAX_VALUE = 1000;
const MIN_VALUE = 1

const normalize = (val, max, min) => (val - min) / (max - min);

// var setRadius = (label) => MIN_RADIUS + ADDITIONAL_MAX_RADIUS * normalize(label, MAX_VALUE, MIN_VALUE);

var AnimatedCircle = function(objectID, objectLabel)
{
	this.objectID = objectID;
	this.label = objectLabel;
	// this.radius = 20; // size of circle
	this.setRadius(this.label); // initialized correctly
	//this.thickness = 3; // not used
	this.x = 0;
	this.y = 0;
	this.alpha = 1.0; // opacity of balls
	this.addedToScene = true;
  this.highlightIndex = -1;
}

AnimatedCircle.prototype = new AnimatedObject();
AnimatedCircle.prototype.constructor = AnimatedCircle;

AnimatedCircle.prototype.getTailPointerAttachPos = function(fromX, fromY, anchorPoint)
{
	return this.getHeadPointerAttachPos(fromX, fromY);
}

AnimatedCircle.prototype.getWidth = function()
{
	return this.radius * 2;
}

AnimatedObject.prototype.setWidth = function(newWidth)
{
	this.radius = newWidth / 2;
}

AnimatedObject.prototype.setRadius = function(newLabel)
{
	this.radius = MIN_RADIUS + Math.floor(ADDITIONAL_MAX_RADIUS * normalize(newLabel, MAX_VALUE, MIN_VALUE));
}

AnimatedObject.prototype.getRadius = function()
{
	return this.radius;
}





AnimatedCircle.prototype.getHeadPointerAttachPos = function(fromX, fromY)
{
	var xVec = fromX - this.x;
	var yVec = fromY - this.y;
	// console.log("this.x: " + this.x);
	// console.log("this.y: " + this.y);
	// console.log("xVec: " + xVec);
	// console.log("yVec: " + yVec);
	var len  = Math.sqrt(xVec * xVec + yVec*yVec);
	if (len == 0)
	{
		return [this.x, this.y];
	}
	return [this.x+(xVec/len)*(this.radius), this.y +(yVec/len)*(this.radius)];
}


AnimatedCircle.prototype.setHighlightIndex = function(hlIndex)
{
    this.highlightIndex = hlIndex;
    this.highlightIndexDirty = true;

}

AnimatedCircle.prototype.draw = function(ctx)
{
	ctx.globalAlpha = this.alpha;

	if (this.highlighted)
	{
		// this is for drawing red highlighting circles
		// ctx.fillStyle = "#93E5AB"; // changed red
		ctx.fillStyle = "#4E878C";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius + this.highlightDiff,0,Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}


	ctx.fillStyle = this.backgroundColor;
	ctx.strokeStyle = "#4E878C";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.radius,0,Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.textAlign = 'center';
	ctx.font         = '11px Lato';
	ctx.textBaseline   = 'middle';
	ctx.lineWidth = 1;
	ctx.fillStyle = this.foregroundColor;

	// console.log("this.label: " + this.label);
	var strList = this.label.split("\n");
	// console.log("ANIMATED CIRCLE: strList: " + strList);
	if (strList.length == 1)
	{

		// draw STATIC text; need to find when drawing TRANSITION text
		// this.setRadius(this.label); // reset radius
		// ctx.fillText(this.label, this.x, this.y);

             if (this.highlightIndexDirty && this.highlightIndex != -1)
             {
							 // never entered
							 // console.log("first if");
                  this.leftWidth = ctx.measureText(this.label.substring(0,this.highlightIndex)).width;
                  this.centerWidth = ctx.measureText(this.label.substring(this.highlightIndex, this.highlightIndex+1)).width;
                  this.textWidth = ctx.measureText(this.label).width;
                  this.highlightIndexDirty = false;
             }
             if (this.highlightIndex != -1 && this.highlightIndex < this.label.length) //this.highlghtIndex < this.label.length)
             {

								// never entered
							 // console.log("second if");
                     var  startingXForHighlight = this.x - this.textWidth / 2;
    	             ctx.textAlign = 'left';
                    var leftStr = this.label.substring(0, this.highlightIndex);
                    var highlightStr = this.label.substring(this.highlightIndex, this.highlightIndex + 1)
                    var rightStr = this.label.substring(this.highlightIndex + 1)
                    ctx.fillText(leftStr, startingXForHighlight, this.y)
 	            ctx.strokeStyle = "#FF0000";
	            ctx.fillStyle = "#FF0000";
                    ctx.fillText(highlightStr, startingXForHighlight + this.leftWidth, this.y)


	            ctx.strokeStyle = this.labelColor;
	            ctx.fillStyle = this.labelColor;
                    ctx.fillText(rightStr, startingXForHighlight + this.leftWidth + this.centerWidth, this.y)

              }
              else
              {
								// draw the text within each ball
								// console.log("this.label: " + this.label);
								// console.log("this.x: " + this.x);
								// console.log("this.y: " + this.y);
						this.setRadius(this.label); // reset radius
	    	   ctx.fillText(this.label, this.x, this.y);
              }
	}
	else if (strList.length % 2 == 0)
	{
		// never entered here
		// console.log("else if strList.length % 2 == 0");
		var i;
		var mid = strList.length / 2;
		for (i = 0; i < strList.length / 2; i++)
		{
			ctx.fillText(strList[mid - i - 1], this.x, this.y - (i + 0.5) * 12);
			ctx.fillText(strList[mid + i], this.x, this.y + (i + 0.5) * 12);

		}
	}
	else
	{
		// never entered here
		// console.log("else");
		var mid = (strList.length - 1) / 2;
		var i;
		ctx.fillText(strList[mid], this.x, this.y);
		for (i = 0; i < mid; i++)
		{
			ctx.fillText(strList[mid - (i + 1)], this.x, this.y - (i + 1) * 12);
			ctx.fillText(strList[mid + (i + 1)], this.x, this.y + (i + 1) * 12);
		}

	}

}


AnimatedCircle.prototype.createUndoDelete = function()
{
	return new UndoDeleteCircle(this.objectID, this.label, this.x, this.y, this.foregroundColor, this.backgroundColor, this.layer, this.radius);
}

// called when element has been sorted
function UndoDeleteCircle(id, lab, x, y, foregroundColor, backgroundColor, l, radius)
{
	this.objectID = id;
	this.posX = x;
	this.posY = y;
	this.nodeLabel = lab;
	this.fgColor = foregroundColor;
	this.bgColor = backgroundColor;
	this.layer = l;
        this.radius = radius;
	// console.log("UNDO DELETE CIRCLE: this.nodeLabel: " + this.nodeLabel);
}

UndoDeleteCircle.prototype = new UndoBlock();
UndoDeleteCircle.prototype.constructor = UndoDeleteCircle;

UndoDeleteCircle.prototype.undoInitialStep = function(world)
{
	world.addCircleObject(this.objectID, this.nodeLabel);
        world.setWidth(this.objectID, this.radius * 2);
	world.setNodePosition(this.objectID, this.posX, this.posY);
	world.setForegroundColor(this.objectID, this.fgColor);
	world.setBackgroundColor(this.objectID, this.bgColor);
	world.setLayer(this.objectID, this.layer);
}
