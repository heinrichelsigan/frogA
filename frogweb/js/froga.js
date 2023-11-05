var currentFrog;
var currentFrogId;
var currentFrogName;
var fX;
var fY;
var loopTicks = 0;
var loopDelay = 1200;
var frogDied = -1;
var frogsInWhole = 0;

function frogInit() {

	window.onkeydown = function (e) {
		if (e.which == 37) {
			frogLEFT();
		}
		if (e.which == 39) {
			frogRIGHT();
		}
		if (e.which == 38) {
			frogUP();
		}
		if (e.which == 40) {
			frogDOWN();
		}
	};
}


function frogaLooper(ticks, delay) {

	moveCars();
	moveWalkers();
	moveWoods();

	loopTicks = ticks + 1;

	setTimeout(function () { frogaLooper(loopTicks) }, delay); // will call the function after 16 secs.
}

function frogMove(frX, frY, oldTd, nrX, nrY, newTd, rowColTag) {

	var additionalRemove;
	var imgDisApear;
	var imgReApear;

	frogDied = -1;
	var currentInWhole = 0;
	var oldFrog = null;
	var newFrog = document.getElementById(currentFrogId);
	newFrog.id = currentFrogId;
	newFrog.title = "ActiveFrog";
	newFrog.border = "0";
	newFrog.src = "img/frogactive.png";

	if (nrY == 1)
		newFrog.src = "img/street3b.png";
	if (nrY == 2)
		newFrog.src = "img/street2t.png";
	if (nrY == 3)
		newFrog.src = "img/meadow2m.png";
	if (nrY == 4)
		newFrog.src = "img/street2m.png";
	if (nrY == 5)
		newFrog.src = "img/meadow2t.png";

	let woodIt = 0;
	if (frY == 6 && (nrY == 5 || nrY == 7)) {
		var t4cell = document.getElementById(oldTd);
		imgReApear = null;
		// imgReApear = t4cell.getElementsByClassName("frogaIMGWood");
		while (imgReApear == null && woodIt < 4) {

			imgReApear = t4cell.children["woodB" + woodIt];
			if (imgReApear != null) {
				woodIt = 4;
				if (imgReApear.visibility == "hidden" || imgReApear.style.visibility == "hidden" || imgReApear.clientWidth == "0") {
					break;
				}
			}			
			else
				imgReApear = null;

			woodIt++;
		}
	}
	
	if (nrY == 6) {
		woodIt = 0;		
		var tmpCell = document.getElementById(newTd);
		imgDisApear = null;
		// imgDisApear = tmpCell.getElementsByClassName("frogaIMGWood");
		while (imgDisApear == null && woodIt < 4) {						

			imgDisApear = tmpCell.children["woodB" + woodIt];
			// imgDisApear = tmpCell.childNodes.getElementById("woodB" + woodIt);		
			// imgDisApear = tmpCell.getElementById("woodB" + woodIt);
			if (imgDisApear != null) {
				woodIt = 4;
				break;
			}
			else
				imgDisApear = null;

			woodIt++;
		}

		if (imgDisApear != null) {
			newFrog.src = "img/wood1b.png";
		}
		else {
			newFrog.src = "img/wood4b.gif";
			newFrog.title = "FrogDied";
			let dieNr = parseInt(newFrog.id.charAt(4));
			newFrog.id = "frogDied" + dieNr;
			frogDied = currentFrogId;
		}			
	}
	
	if (frY == 7 && (nrY == 6 || nrY == 8)) {
		woodIt = 0;
		var tempCell = document.getElementById(oldTd);
		imgReApear = null; // tempCell.getElementsByClassName("frogaIMGWood") //  tempCell.getElementById("woodT" + woodIt);
		while (imgReApear == null && woodIt < 4) {			
			imgReApear = tempCell.children["woodT" + woodIt];
			if (imgReApear != null) {
				woodIt = 4;
				if (imgReApear.visibility == "hidden" || imgReApear.style.visibility == "hidden" || imgReApear.clientWidth == "0") {
					break;
				}
			}
			else 
				imgReApear = null;

			woodIt++;
		}
	}
	
	if (nrY == 7) {
		woodIt = 0;
		var ttcell = document.getElementById(newTd);
		imgDisApear = null;
		// imgDisApear = ttcell.getElementsByClassName("frogaIMGWood");
		while (imgDisApear == null && woodIt < 4) {

			imgDisApear = ttcell.children["woodT" + woodIt];
			// imgDisApear = tmpCell.childNodes.getElementById("woodT" + woodIt);		
			// imgDisApear = tmpCell.getElementById("woodT" + woodIt);
			if (imgDisApear != null) {
				woodIt = 4;
				break;
			}
			else
				imgDisApear = null;

			woodIt++;
		}
		if (imgDisApear != null)
			newFrog.src = "img/wood1t.png";
		else {
			newFrog.src = "img/wood4t.gif";		
			newFrog.title = "FrogDied";
			let dieNr = parseInt(newFrog.id.charAt(4));
			newFrog.id = "frogDied" + dieNr;
			// TODO: add sound
			frogDied = currentFrogId;
		}	
	}

	if (nrY == 8)
		newFrog.src = "img/meadow2b.png";

	if (nrY == 9) {
		woodIt = 0;
		var t9cell = document.getElementById(newTd);
		// imgDisApear = ttcell.getElementsByClassName("frogaIMGWood");
		imgDisApear = null;		
		while (imgDisApear == null && woodIt < 3) {

			imgDisApear = t9cell.children["whole" + woodIt];
			// imgDisApear = tmpCell.childNodes.getElementById("whole" + woodIt);
			// imgDisApear =  t9cell.getElementsByClassName("frogaIMGWhole");
			if (imgDisApear != null) {
				woodIt = 4;
				break;
			}
			else
				imgDisApear = null;

			woodIt++;
		}
		if (imgDisApear == null) {
			if (nrX.charAt(0) == 'c')
				imgDisApear = document.getElementById("whole0");
			if (nrX.charAt(0) == 'g')
				imgDisApear = document.getElementById("whole1");
		}

		if (imgDisApear != null) {			
			currentInWhole++;
			frogsInWhole++;
			let savedNr = parseInt(newFrog.id.charAt(4));
			newFrog.src = "img/frogend1.png";
			newFrog.id = "frogSaved" + savedNr;
			newFrog.title = "FrogInWhole";			
		}
	}

	var oldCell = document.getElementById(oldTd); 
	if (oldCell != null) {
		// oldFrog = oldCell.getElementById(currentFrogId);
		oldFrog = oldCell.getElementsByClassName("frogaIMG");
	}
	if (oldFrog == null)
		oldFrog = document.getElementById(currentFrogId);	

	var tdCell = document.getElementById(newTd);	

	newFrog.alt = newTd;
	if (imgDisApear != null) {
		if (currentInWhole > 0) {
			tdCell.removeChild(imgDisApear);
		}
		else {
			imgDisApear.style.visibility = "hidden";
			imgDisApear.visibility = "hidden";
			imgDisApear.clientWidth = "0";
		}
	}

	tdCell.appendChild(newFrog);


	if (imgReApear != null) {
		imgReApear.clientWidth = "36";
		imgReApear.visibility = "visible";
		imgDisApear.style.visibility = "visible";		

	}
		
	
}

function frogUP() {

	var frogU = getActiveFrog();
	var rowColTag = currentFrog.getAttribute("alt");

	var frX = columnByFrogTag(rowColTag);
	var frY = parseInt(rowByFrogTag(rowColTag));
	var oldTd = "td" + fY + fX;

	var nrX = frX;
	let nrY = frY + 1;
	if (nrY > 9) nrY = 9;
	var newTd = "td" + nrY + fX;

	// document.getElementById(newTd).firstChild =
	frogMove(frX, frY, oldTd, nrX, nrY,  newTd, rowColTag);

	// Sample for creating an image beyond document
	//			var newImage = document.createElement("img");
	//			newImage.src = "img/frogactive.png";
	//			newImage.alt = newTd;
	//			newImage.title = "ActiveFrog";
	//			newImage.id = currentFrogId;
	//			newImage.border = "0";
	//
	//			var tdCell = document.getElementById(newTd);
	//			tdCell.appendChild(newImage);

}

function frogDOWN() {

	var frogU = getActiveFrog();
	var rowColTag = currentFrog.getAttribute("alt");

	var frX = columnByFrogTag(rowColTag);
	var frY = parseInt(rowByFrogTag(rowColTag));
	var oldTd = "td" + fY + fX;

	var nrX = fX;
	var nrY = parseInt(fY);
	if (nrY > 0) nrY--;
	var newTd = "td" + nrY + fX;

	frogMove(frX, frY, oldTd, nrX, nrY, newTd, rowColTag);
}

function frogLEFT() {

	var frogU = getActiveFrog();
	var rowColTag = currentFrog.getAttribute("alt");

	var frX = columnByFrogTag(rowColTag);
	var frY = parseInt(rowByFrogTag(rowColTag));
	var oldTd = "td" + fY + fX;

	var nrY = parseInt(fY);
	var nrX = previousChar(frX.charAt(0));
	if (frX.charAt(0) == 'a' || fX.charAt(0) == 'a')
		nrX = 'a';
	var newTd = "td" + fY + nrX;

	frogMove(frX, frY, oldTd, nrX, nrY, newTd, rowColTag);

}

function frogRIGHT() {

	var frogU = getActiveFrog();
	var rowColTag = currentFrog.getAttribute("alt");

	var frX = columnByFrogTag(rowColTag);
	var frY = parseInt(rowByFrogTag(rowColTag));
	var oldTd = "td" + fY + fX;

	var nrY = parseInt(fY);
	var nrX = nextChar(frX.charAt(0));
	if (frX.charAt(0) == 'j' || fX.charAt(0) == 'j')
		nrX = 'j';
	var newTd = "td" + fY + nrX;

	frogMove(frX, frY, oldTd, nrX, nrY, newTd, rowColTag);
}


function getActiveFrog() {

	let currentFrogIt = 0;
	currentFrog = null;	

	while (currentFrog == null && currentFrogIt < 4) {
		currentFrogId = "frog" + currentFrogIt;
		currentFrog = document.getElementById(currentFrogId);

		if (currentFrog != null) {
			if (currentFrog.title != "ActiveFrog")
				currentFrog.title = "ActiveFrog";
			currentFrog.src = "img/frogactive.png";
			return currentFrog;
		}
		currentFrogIt++;
	}
	
	return currentFrog;
}

function rowByFrogTag(frogTag) {
	if (frogTag != null) //  && frogTag.length > 2)
	{
		fY = parseInt(frogTag.charAt(2));
		return fY;
	}
}

function columnByFrogTag(frogTag) {
	if (frogTag != null) // && frogTag.length > 2)
	{
		fX = frogTag.charAt(3);
		return fX;
	}
}


function nextChar(c) {
	switch (c.charAt(0)) {
		case 'a': return 'b';
		case 'b': return 'c';
		case 'c': return 'd';
		case 'd': return 'e';
		case 'e': return 'f';
		case 'f': return 'g';
		case 'g': return 'h';
		case 'h': return 'i';
		case 'i': return 'j';
		case 'j': return 'j';
		default: break;
	}
	return (c.charAt(0));
}

function previousChar(c) {
	switch (c.charAt(0)) {
		case 'a': return 'a';
		case 'b': return 'a';
		case 'c': return 'b';
		case 'd': return 'c';
		case 'e': return 'd';
		case 'f': return 'e';
		case 'g': return 'f';
		case 'h': return 'g';
		case 'i': return 'h';
		case 'j': return 'i';
		default: break;
	}
	return (c.charAt(0));
}
