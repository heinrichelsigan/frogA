var currentFrog;
var currentFrogId;
var currentFrogName;
var fX;
var fY;
var loopTicks = 0;
var loopDelay = 1200;

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

	if (document.getElementById("frogaId") != null) {
		document.getElementById("frogaId").focus();
	}

}

function frogaLooper(ticks, delay) {
	
	moveCars();
	moveWalkers();
	moveWoods();

	loopTicks = ticks + 1;

	setTimeout(function () { frogaLooper(loopTicks) }, delay); // will call the function after 16 secs.
}


function frogMove(frX, frY, nrX, nrY, oldTd, newTd, rowColTag) {

	var lastFrog = document.getElementById(currentFrogId);
	document.getElementById(oldTd).removeChild(lastFrog);

	var additionalRemove;

	lastFrog.alt = newTd;
	lastFrog.id = currentFrogId;
	lastFrog.title = "ActiveFrog";
	lastFrog.border = "0";
	lastFrog.src = "img/frogactive.png";

	if (nrY == 1)
		lastFrog.src = "img/street3b.png";
	if (nrY == 2)
		lastFrog.src = "img/street2t.png";
	if (nrY == 3)
		lastFrog.src = "img/meadow2m.png";
	if (nrY == 4)
		lastFrog.src = "img/walk2m.png";

	if (nrY == 5) {
		if (nrX.charAt(0) == 'b')
			additionalRemove = document.getElementById("woodB0");
		if (nrX.charAt(0) == 'c')
			additionalRemove = document.getElementById("woodB1");
		if (nrX.charAt(0) == 'g')
			additionalRemove = document.getElementById("woodD0");
		if (nrX.charAt(0) == 'h')
			additionalRemove = document.getElementById("woodD1");

		if (additionalRemove != null)
			lastFrog.src = "img/wood1b.png";
	}

	if (nrY == 6) {
		if (nrX.charAt(0) == 'c')
			additionalRemove = document.getElementById("woodT0");
		if (nrX.charAt(0) == 'd')
			additionalRemove = document.getElementById("woodT1");
		if (nrX.charAt(0) == 'h')
			additionalRemove = document.getElementById("woodU0");
		if (nrX.charAt(0) == 'i')
			additionalRemove = document.getElementById("woodU1");

		if (additionalRemove != null)
			lastFrog.src = "img/wood1t.png";
	}

	if (nrY == 7) {
		if (nrX.charAt(0) == 'c')
			additionalRemove = document.getElementById("whole0");
		if (nrX.charAt(0) == 'g')
			additionalRemove = document.getElementById("whole1");

		if (additionalRemove != null) {
			let savedNr = parseInt(lastFrog.id.charAt(4));
			lastFrog.src = "img/frogend1.png";
			lastFrog.id = "frogSaved" + savedNr;
			lastFrog.title = "FrogInWhole";
		}
	}

	var tdCell = document.getElementById(newTd);
	if (additionalRemove != null)
		tdCell.removeChild(additionalRemove);

	tdCell.appendChild(lastFrog);
	// document.getElementById(oldTd).innerHTML = "";
}

function frogUP() {

	var frogU = getActiveFrog();
	var rowColTag = currentFrog.getAttribute("alt");

	var frX = columnByFrogTag(rowColTag);
	var frY = parseInt(rowByFrogTag(rowColTag));
	var oldTd = "td" + fY + fX;

	var nrX = frX;
	let nrY = frY + 1;
	if (nry > 7) nrY = 7;
	var newTd = "td" + nrY + fX;

	// document.getElementById(newTd).firstChild =
	frogMove(frX, frY, nrX, nrY, oldTd, newTd, rowColTag);

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

	frogMove(frX, frY, nrX, nrY, oldTd, newTd, rowColTag);
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

	frogMove(frX, frY, nrX, nrY, oldTd, newTd, rowColTag);
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

	frogMove(frX, frY, nrX, nrY, oldTd, newTd, rowColTag);
}


function getActiveFrog() {

	currentFrogId = "frog0";
	currentFrog = document.getElementById(currentFrogId);
	if (currentFrog != null && currentFrog.title == "ActiveFrog")
		return currentFrog;

	currentFrogId = "frog1";
	currentFrog = document.getElementById("frog1");
	if (currentFrog != null) {
		if (currentFrog.title != "ActiveFrog")
			currentFrog.title = "ActiveFrog";
		return currentFrog;
	}

	currentFrogId = "frog2";
	currentFrog = document.getElementById("frog2");
	if (currentFrog != null) {
		if (currentFrog.title != "ActiveFrog")
			currentFrog.title = "ActiveFrog";
		return currentFrog;
	}

	currentFrogId = "frog3";
	currentFrog = document.getElementById("frog3");
	if (currentFrog != null) {
		if (currentFrog.title != "ActiveFrog")
			currentFrog.title = "ActiveFrog";
		return currentFrog;
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