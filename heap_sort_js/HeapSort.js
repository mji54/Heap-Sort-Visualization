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

// function setEleHeight()

function HeapSort(am)
{
	console.log("init heap sort");
	this.init(am);

}

HeapSort.prototype = new Algorithm();
HeapSort.prototype.constructor = HeapSort;
HeapSort.superclass = Algorithm.prototype;

// var normalize = (val, max, min) => (val - min) / (max - min);

const ARRAY_SIZE  = 16;
var ARRAY_ELEM_WIDTH = 60;
var ARRAY_ELEM_HEIGHT = 25;
var ARRAY_INITIAL_X = 65;
const ARRAY_ELEM_MIN_HEIGHT = 25;
const ARRAY_ELEM_MAX_ADDITIONAL_HEIGHT = 60;

// var MAX_VALUE = 1000;
// var MIN_VALUE = 1;
//"top value": height/2

var ARRAY_Y_POS = 100;
var ARRAY_MARGIN = 20;
var ARRAY_LABEL_Y_POS = ARRAY_Y_POS + ARRAY_MARGIN;

var INITIAL_X_POSITION = 450;
var INITIAL_Y_POSITION = 200;

var ARRAY_SWAP_Y_POS = ARRAY_LABEL_Y_POS + ARRAY_MARGIN;
var ARRAY_COMPARE_Y_POS = ARRAY_SWAP_Y_POS + ARRAY_MARGIN;

var ARRAY_COUNTER_X_POS = ARRAY_INITIAL_X - ARRAY_MARGIN;

// var setHeapXPositions = function(n) {
// 	// if not
// }
//
// var setHeapYPositions = function(n) {
//
// }

var Y_POSITION_OFFSET = 110; // change this value to move the entire heap in y-direction
var X_POSITION_OFFSET = 0;

HeapSort.prototype.heapXYPositions = function(XPositions, YPositions)
{
	console.log("XYPOSITIONS");
	var level, offsetX, offsetY, baseX, baseY, node, size;

	level = 0;
	offsetX = ARRAY_ELEM_WIDTH;
	offsetY = 40;
	size = 1; // # of nodes in the current level
	node = 0; // # of nodes set

	// root
	baseX = ARRAY_INITIAL_X + offsetX;
	baseY = ARRAY_COMPARE_Y_POS + ARRAY_MARGIN + offsetY;

	for (var i = 0; i < ARRAY_SIZE; i++) {
		if (level === 0) { // root
			node++;
			XPositions.push(baseX);
			YPositions.push(baseY);
		} else {
			node++;

			XPositions.push(baseX + offsetX * i);
			YPositions.push(baseY + offsetY * (size - node));
		}
		if (node === size) {
			// all positions set
			level++; // increment level
			size *= 2; // double size
			node = 0; // reset # of nodes set
		}
	}
}


HeapSort.prototype.init = function(am)
{
	var sc = HeapSort.superclass;
	var fn = sc.init;
	fn.call(this,am);
	this.addControls();
	this.nextIndex = 0;
	this.HeapXPositions = [0];
	this.HeapYPositions = [0];
	this.heapXYPositions(this.HeapXPositions, this.HeapYPositions);
	// this.HeapXPositions = [0, 450, 250, 650, 150, 350, 550, 750, 100, 200, 300, 400, 500, 600,
	// 				  700, 800, 075, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575,
	// 				  625, 675, 725, 775, 825];
	// this.HeapXPositions.forEach((pos, i, arr) => arr[i] = pos+X_POSITION_OFFSET);
	// this.HeapYPositions = [0, 100, 170, 170, 240, 240, 240, 240, 310, 310, 310, 310, 310, 310,
	// 				  310, 310, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380,
	// 				  380, 380, 380, 380, 380];
	// this.HeapYPositions.forEach((pos, i, arr) => arr[i] = pos+Y_POSITION_OFFSET);
	// console.log(this.HeapYPositions);
	this.commands = [];
	this.createArray();


	/*this.nextIndex = 0;
	this.commands = [];
	this.cmd("CreateLabel", 0, "", 20, 50, 0);
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory(); */

}

HeapSort.prototype.setHeapXPositions = function(n)
{
	return;
	// if odd index, prevEle +
}

HeapSort.prototype.setArrayElemHeight = function(label)
{
	return ARRAY_ELEM_MIN_HEIGHT + Math.floor(ARRAY_ELEM_MAX_ADDITIONAL_HEIGHT * normalize(label, MAX_VALUE, MIN_VALUE));
}


HeapSort.prototype.addControls =  function()
{
	this.randomizeArrayButton = addControlToAlgorithmBar("Button", "Randomize Array");
	this.randomizeArrayButton.onclick = this.randomizeCallback.bind(this);
	this.randomizeArrayButton.className = "button";
	this.heapsortButton = addControlToAlgorithmBar("Button", "Heap Sort");
	this.heapsortButton.onclick = this.heapsortCallback.bind(this);
	this.heapsortButton.className = "button";
}


HeapSort.prototype.createArray = function()
{
	this.arrayData = new Array(ARRAY_SIZE);
	this.arrayLabels = new Array(ARRAY_SIZE);
	this.arrayRects = new Array(ARRAY_SIZE);
	this.circleObjs = new Array(ARRAY_SIZE);
	this.ArrayXPositions = new Array(ARRAY_SIZE);
	this.oldData = new Array(ARRAY_SIZE);
	this.currentHeapSize = 0;

	// arrays for counters
	this.arraySwaps = new Array(ARRAY_SIZE);
	this.arrayCompares = new Array(ARRAY_SIZE);

	// create labels
	this.cmd("CreateLabel", this.nextIndex++, "# of Swaps",  ARRAY_COUNTER_X_POS, ARRAY_SWAP_Y_POS);
	this.cmd("CreateLabel", this.nextIndex++, "# of Compares",  ARRAY_COUNTER_X_POS, ARRAY_COMPARE_Y_POS);
	this.cmd("CreateLabel", this.nextIndex++, "Total", ARRAY_INITIAL_X+(ARRAY_SIZE*ARRAY_ELEM_WIDTH), ARRAY_LABEL_Y_POS);
	this.swapIndex = this.nextIndex++;
	this.compareIndex = this.nextIndex++;
	this.cmd("CreateCounter", this.swapIndex, 0, ARRAY_INITIAL_X+(ARRAY_SIZE*ARRAY_ELEM_WIDTH), ARRAY_SWAP_Y_POS);
	this.cmd("CreateCounter", this.compareIndex, 0, ARRAY_INITIAL_X+(ARRAY_SIZE*ARRAY_ELEM_WIDTH), ARRAY_COMPARE_Y_POS);

	for (var i = 1; i < ARRAY_SIZE; i++)
	{

		this.arrayData[i] = Math.floor(1 + Math.random()*999); // change this

		// console.log("this.arrayData[ " + i + " ]: " + this.arrayData[i]);
		this.oldData[i] = this.arrayData[i];

		this.ArrayXPositions[i] = ARRAY_INITIAL_X + i *ARRAY_ELEM_WIDTH;
		this.arrayLabels[i] = this.nextIndex++;
		// console.log("this.arrayLabels[ " + i + " ]: " + this.arrayLabels[i]);
		this.arrayRects[i] = this.nextIndex++;
		this.circleObjs[i] = this.nextIndex++;

		// initate object
		this.arraySwaps[i] = this.nextIndex++;
		this.arrayCompares[i] = this.nextIndex++;

		// create swap counter
		this.cmd("CreateCounter", this.arraySwaps[i], 0, this.ArrayXPositions[i], ARRAY_SWAP_Y_POS);
		// create compare counters
		this.cmd("CreateCounter", this.arrayCompares[i], 0, this.ArrayXPositions[i], ARRAY_COMPARE_Y_POS);

		this.cmd("CreateRectangle", this.arrayRects[i], this.arrayData[i], ARRAY_ELEM_WIDTH, this.setArrayElemHeight(this.arrayData[i]), this.ArrayXPositions[i] , ARRAY_Y_POS)
		this.cmd("CreateLabel", this.arrayLabels[i], i - 1,  this.ArrayXPositions[i], ARRAY_LABEL_Y_POS);
		this.cmd("SetForegroundColor", this.arrayLabels[i], "#4BC670");
		// there should be a
		// this.cmd("CreateCounters")
	}
	this.swapLabel1 = this.nextIndex++;
	// console.log("this.swapLabel1 :" + this.swapLabel1);
	this.swapLabel2 = this.nextIndex++;
	this.swapLabel3 = this.nextIndex++;
	this.swapLabel4 = this.nextIndex++;
	this.descriptLabel1 = this.nextIndex++;
	this.descriptLabel2 = this.nextIndex++;
	this.cmd("CreateLabel", this.descriptLabel1, "", 20, 40,  0); // not really any use
	//this.cmd("CreateLabel", this.descriptLabel2, "", this.nextIndex, 40, 120, 0);
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
}



HeapSort.prototype.heapsortCallback = function(event)
{
	// console.log(this.commands);
	this.commands = this.buildHeap("");
	for (var i = ARRAY_SIZE - 1; i > 1; i--)
	{
		this.swap(i, 1);
		this.cmd("SetAlpha", this.arrayRects[i], 0.3);
		this.cmd("Delete", this.circleObjs[i]);
		this.currentHeapSize = i-1;
		this.pushDown(1);
	}
	for (i = 1; i < ARRAY_SIZE; i++)
	{
		this.cmd("SetAlpha", this.arrayRects[i], 1);
	}
	this.cmd("Delete", this.circleObjs[1]);

	// sum up Swaps
	// this.cmd("SumUp", this.)
	// this.sumCounter();
	this.animationManager.StartNewAnimation(this.commands);
}


HeapSort.prototype.randomizeCallback = function(ignored)
{
	this.randomizeArray();
}

HeapSort.prototype.randomizeArray = function()
{
	this.commands = new Array();
	for (var i = 1; i < ARRAY_SIZE; i++)
	{
		this.arrayData[i] = Math.floor(1 + Math.random()*999);
		// console.log("this.arrayRects[i]: " + this.arrayRects[i]);
		this.cmd("ResetCounter", this.arraySwaps[i], this.arrayData[i]);
		this.cmd("ResetCounter", this.arrayCompares[i], this.arrayData[i]);
		this.cmd("ResetCounter", this.swapIndex, this.arrayData[i]);
		this.cmd("ResetCounter", this.compareIndex, this.arrayData[i]);
		this.cmd("SetText", this.arrayRects[i], this.arrayData[i]);
		this.oldData[i] = this.arrayData[i];
		// this.cmd("CreateRectangle", this.arrayRects[i], this.arrayData[i], ARRAY_ELEM_WIDTH, this.setArrayElemHeight(this.arrayData[i]), this.ArrayXPositions[i] , ARRAY_Y_POS);
		// CODE HERE
	}
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
}



HeapSort.prototype.reset = function()
{
	// console.log("enter reset");
	// this.commands = new Array();
	// var commands = new Array();
	for (var i = 1; i < ARRAY_SIZE; i++)
	{

		this.arrayData[i]= this.oldData[i];
		// console.log("RESET: setText: this.arrayData[ " + i + " ]: " + this.arrayData[i]);
		this.cmd("SetText", this.arrayRects[i],this.arrayData[i]);

		// this.cmd("ResetCounter", this.arraySwaps[i], this.arrayData[i]);
		// this.cmd("ResetCounter", this.arrayCompares[i], this.arrayData[i]);
		// this.cmd("SetText", this.arraySwaps[i], this.arrayData[i]);
	}
	// console.log("RESET: this.commands: " + this.commands);
	// this.animationManager.startNextBlock();
	// this.animationManager.resetCounter(this.commands);
	this.commands = new Array();
}


HeapSort.prototype.swap = function(index1, index2)
{
	// this.arraySwaps[index1] += 1;
	// console.log("SWAP: " + index1 + ", " + index2);

	// console.log("SWAP org: this.arrayData[index1]: " + this.arrayData[index1]);
	this.cmd("SetText", this.arrayRects[index1], "");
	// console.log("SWAP org: this.arrayData[index2]: " + this.arrayData[index2]);
	this.cmd("SetText", this.arrayRects[index2], "");
	this.cmd("SetText", this.circleObjs[index1], "");
	this.cmd("SetText", this.circleObjs[index2], "");
	this.cmd("CreateLabel", this.swapLabel1, this.arrayData[index1], this.ArrayXPositions[index1],ARRAY_Y_POS);
	this.cmd("CreateLabel", this.swapLabel2, this.arrayData[index2], this.ArrayXPositions[index2],ARRAY_Y_POS);
	this.cmd("CreateLabel", this.swapLabel3, this.arrayData[index1], this.HeapXPositions[index1],this.HeapYPositions[index1]);
	this.cmd("CreateLabel", this.swapLabel4, this.arrayData[index2], this.HeapXPositions[index2],this.HeapYPositions[index2]);
	this.cmd("Move", this.swapLabel1, this.ArrayXPositions[index2],ARRAY_Y_POS)
	this.cmd("Move", this.swapLabel2, this.ArrayXPositions[index1],ARRAY_Y_POS)
	this.cmd("Move", this.swapLabel3, this.HeapXPositions[index2],this.HeapYPositions[index2])
	this.cmd("Move", this.swapLabel4, this.HeapXPositions[index1],this.HeapYPositions[index1])
	var tmp = this.arrayData[index1];
	this.arrayData[index1] = this.arrayData[index2];
	this.arrayData[index2] = tmp;
	this.cmd("Step")
	// console.log("SWAP: this.arrayData[index1]: " + this.arrayData[index1]);
	this.cmd("SetText", this.arrayRects[index1], this.arrayData[index1]);
	// console.log("SWAP: this.arrayData[index2]: " + this.arrayData[index2]);
	this.cmd("SetText", this.arrayRects[index2], this.arrayData[index2]);
	this.cmd("SetText", this.circleObjs[index1], this.arrayData[index1]);
	this.cmd("SetText", this.circleObjs[index2], this.arrayData[index2]);

	// console.log("SWAP: this.arraySwaps[index1]: " + this.arraySwaps[index1]);
	this.cmd("SetText", this.arraySwaps[index1], this.arrayData[index1], "SWAP");
	this.cmd("SetText", this.arraySwaps[index2], this.arrayData[index2], "SWAP");
	this.cmd("SetText", this.swapIndex, this.arrayData[index1], "SUM");

	this.cmd("Delete", this.swapLabel1);
	this.cmd("Delete", this.swapLabel2);
	this.cmd("Delete", this.swapLabel3);
	this.cmd("Delete", this.swapLabel4);


}


HeapSort.prototype.setIndexHighlight = function(index, highlightVal)
{
	// console.log("HIGHLIGHT");
	this.cmd("SetHighlight", this.circleObjs[index], highlightVal);
	this.cmd("SetHighlight", this.arrayRects[index], highlightVal);
	this.cmd("SetHighlight", this.arraySwaps[index], highlightVal); // CHANGE
	this.cmd("SetHighlight", this.arrayCompares[index], highlightVal);
	// this.cmd("SetText", this.arrayCompares[index], this.arrayData[index]);
}

HeapSort.prototype.pushDown = function(index)
{
	// console.log("PUSH DOWN: index: " + index);
	var smallestIndex;

	while(true)
	{
		if (index*2 > this.currentHeapSize)
		{
			return;
		}

		smallestIndex = 2*index;

		if (index*2 + 1 <= this.currentHeapSize)
		{
			this.setIndexHighlight(2*index, 1);
			this.setIndexHighlight(2*index + 1, 1);
			this.cmd("SetText", this.arrayCompares[2*index], this.arrayData[2*index], "Compare"); // change
			this.cmd("SetText", this.arrayCompares[2*index+1], this.arrayData[2*index+1], "Compare"); // change
			this.cmd("SetText", this.compareIndex, this.arrayData[2*index], "Sum");
			this.cmd("Step");
			this.setIndexHighlight(2*index, 0);
			this.setIndexHighlight(2*index + 1, 0);

			if (this.arrayData[2*index + 1] > this.arrayData[2*index])
			{
				smallestIndex = 2*index + 1;
			}
		}
		this.setIndexHighlight(index, 1);
		this.setIndexHighlight(smallestIndex, 1);
		this.cmd("SetText", this.arrayCompares[index], this.arrayData[index], "Compare"); // change
		this.cmd("SetText", this.arrayCompares[smallestIndex], this.arrayData[smallestIndex], "Compare"); // change
		this.cmd("SetText", this.compareIndex, this.arrayData[index], "Sum");
		this.cmd("Step");
		this.setIndexHighlight(index, 0);
		this.setIndexHighlight(smallestIndex, 0);
		// this.cmd("SetText", this.arrayCompares[index], this.arrayData[index]); // change

		if (this.arrayData[smallestIndex] > this.arrayData[index])
		{

			this.swap(smallestIndex, index);
			index = smallestIndex;
		}
		else
		{
			return;
		}



	}
}

HeapSort.prototype.buildHeap = function(ignored)
{
	this.commands = new Array();
	for (var i = 1; i < ARRAY_SIZE; i++)
	{
		// reset counter
		this.cmd("ResetCounter", this.arraySwaps[i], this.arrayData[i]);
		this.cmd("ResetCounter", this.arrayCompares[i], this.arrayData[i]);
		this.cmd("ResetCounter", this.swapIndex, this.arrayData[i]);
		this.cmd("ResetCounter", this.compareIndex, this.arrayData[i]);

		this.cmd("CreateCircle", this.circleObjs[i], this.arrayData[i], this.HeapXPositions[i], this.HeapYPositions[i]);
		// console.log("BUILD HEAP: settext: this.arrayData [ " + i + " ]");
		this.cmd("SetText", this.arrayRects[i], this.arrayData[i]);
		if (i > 1)
		{
			this.cmd("Connect", this.circleObjs[Math.floor(i/2)], this.circleObjs[i]);
		}

	}
	this.cmd("Step");
	this.currentHeapSize = ARRAY_SIZE - 1;
	var nextElem = this.currentHeapSize;
	while(nextElem > 0)
	{
		this.pushDown(nextElem);
		nextElem = nextElem - 1;
	}
	return this.commands;
}

// HeapSort.prototype.sumCounter = function()
// {
// 	for (var i = 1; i < ARRAY_SIZE; i++)
// 	{
// 		var index = parseInt(this.arraySwaps[i]);
// 		var value = this.cmd("GetText", index, this.arrayData[i]);
// 		console.log("SUM COUNTER: " + value);
// 		// var sumSwaps += parseInt(this.arraySwaps[i]);
// 	}
// }



HeapSort.prototype.disableUI = function(event)
{
	this.heapsortButton.disabled = true;
	this.randomizeArrayButton.disabled = true;
}

HeapSort.prototype.enableUI = function(event)
{
	this.heapsortButton.disabled = false;
	this.randomizeArrayButton.disabled = false;
}


var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new HeapSort(animManag, canvas.width, canvas.height);
}
