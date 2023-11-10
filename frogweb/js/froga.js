/*
	2023-11-05 froga.js by Heinrich Elsigan
*/
var currentFrog;
var currentFrogId;
var currentFrogName;
var fX;
var fY;
var loopTicks = 0;
var loopDelay = 1200;
var frogDied = -1;
var frogsInWhole = 0;
var imgSavedWoodB;
var imgSavedWoodT;

function frogInit() {

	window.onkeydown = function (e) { // TODO: pressing two arrow keys at same time
		if (e.which == 37) {
			frogMove("left");
		}
		if (e.which == 39) {
			frogMove("right");
		}
		if (e.which == 38) {
			frogMove("up");
		}
		if (e.which == 40) {
			frogMove("down");
		}
	};

	// frogaLooper(loopTicks, loopDelay);
	setTimeout(function () { frogaLooper(loopTicks, loopDelay) }, loopDelay); // will call the function after 16 secs.
}


function frogaLooper(ticks, delay) {

	moveCars();
	moveWalkers();
	moveWoods();

	loopTicks = ticks + 1;

	setTimeout(function () { frogaLooper(loopTicks, delay) }, delay); // will call the function after 16 secs.
}


function moveCars() {
	var carId = "car00";
	var car = document.getElementById(carId);
	var oldTd = car00.getAttribute("alt");
	var car_Y = rowByTag(car);
	var car_X = rrighter(columnByTag(car));
	var newTd = "td" + car_Y + car_X;
	car.alt = newTd;

	var oldTdCell = document.getElementById(oldTd);
	var newTdCell = document.getElementById(newTd);

	oldTdCell.removeChild(car);
	newTdCell.appendChild(car);	

	carId = "car01";
	car = document.getElementById(carId);
	oldTd = car.getAttribute("alt");
	car_Y = rowByTag(car);
	car_X = rrighter(columnByTag(car));
	newTd = "td" + car_Y + car_X;
	car.alt = newTd;

	oldTdCell = document.getElementById(oldTd);
	newTdCell = document.getElementById(newTd);

	oldTdCell.removeChild(car);
	newTdCell.appendChild(car);
	
	
	let carCnt = 10;

	for (carCnt = 10; carCnt < 13; carCnt++) {
		carId = "car" + carCnt;

		car = document.getElementById(carId);
		oldTd = car.getAttribute("alt");
		car_Y = rowByTag(car);
		car_X = llefter(columnByTag(car));
		newTd = "td" + car_Y + car_X;
		car.alt = newTd;

		oldTdCell = document.getElementById(oldTd);
		newTdCell = document.getElementById(newTd);

		oldTdCell.removeChild(car);
		newTdCell.appendChild(car);		
	}
}

function moveWalkers() {
	var walk = document.getElementById("person0");
	var oldTd = walk.getAttribute("alt");
	var walk_Y = rowByTag(walk);
	var walk_X = rrighter(columnByTag(walk));
	var newTd = "td" + walk_Y + walk_X;
	walk.alt = newTd;

	var oldTdCell = document.getElementById(oldTd);
	var newTdCell = document.getElementById(newTd);

	oldTdCell.removeChild(walk);
	newTdCell.appendChild(walk);	

	var walkId = "person1";
	let walkCnt = 1;

	for (walkCnt = 1; walkCnt < 4; walkCnt++) {

		walkId = "person" + walkCnt;
		walk = document.getElementById(walkId);
		oldTd = walk.getAttribute("alt");
		walk_Y = rowByTag(walk);
		walk_X = rrighter(columnByTag(walk));
		newTd = "td" + walk_Y + walk_X;
		walk.alt = newTd;

		oldTdCell = document.getElementById(oldTd);
		newTdCell = document.getElementById(newTd);

		oldTdCell.removeChild(walk);
		newTdCell.appendChild(walk);		
	}
}

function moveWoods() {
	// TODO: implement it
}

function frogMove(jumpDir) {

	currentFrog = getActiveFrog();
	currentFrogId = getCurrentFrogId(currentFrog);
	var frogNr = parseInt(currentFrogId.charAt(4));	// TODO		better implementation of frog number

	var additionalRemove;
	var imgDisApear = null;
	var imgReApear = null;

	frogDied = -1;
	var currentInWhole = 0;

	// var rowColTag = currentFrog.getAttribute("alt");

	var frX = columnByTag(currentFrog);
	var frY = parseInt(rowByTag(currentFrog));
	var oldTd = "td" + frY + frX;
	var oldTdCell = document.getElementById(oldTd);
	var oldFrog = oldTdCell.children[currentFrogId];

	var nrX = fX;
	var nrY = parseInt(fY);

	if (jumpDir == null || jumpDir.length < 2)
		return;

	if (jumpDir.charAt(0) == 'u') {
		nrY = upper(frY);										// up 					
	} else if (jumpDir.charAt(0) == 'd') {
		nrY = below(frY);										// down 		
	}
	if (jumpDir.charAt(0) == 'r' || jumpDir.charAt(1) == 'r')
		nrX = righter(frX);										// right
	else if (jumpDir.charAt(0) == 'l' || jumpDir.charAt(1) == 'l')
		nrX = lefter(frX);										// left	

	var newTd = "td" + nrY + nrX;
	var newCell = document.getElementById(newTd);
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
		newFrog.src = "img/walk2m.png";
	if (nrY == 5)
		newFrog.src = "img/meadow2t.png";

	let woodIt = 0;
	if (frY == 6 && (nrY == 5 || nrY == 7)) {
		if (imgSavedWoodB != null) {
			imgReApear = imgSavedWoodB;
		}
	}

	if (nrY == 6) {
		woodIt = 0;
		imgDisApear = null;
		while (imgDisApear == null && woodIt < 4) {

			imgDisApear = newCell.children["woodB" + woodIt];
			if (imgDisApear != null) {
				imgSavedWoodB = imgDisApear;
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
			frogDied = frogNr;
		}
	}

	if (frY == 7 && (nrY == 6 || nrY == 8)) {
		imgReApear = null;
		if (imgSavedWoodT != null) {
			imgReApear = imgSavedWoodT;
		}
	}

	if (nrY == 7) {
		woodIt = 0;
		imgDisApear = null;
		while (imgDisApear == null && woodIt < 4) {

			imgDisApear = newCell.children["woodT" + woodIt];
			if (imgDisApear != null) {
				imgSavedWoodT = imgDisApear;
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
			// TODO: add sound
			frogDied = frogNr;
		}
	}

	if (nrY == 8)
		newFrog.src = "img/meadow2t.png";

	if (nrY == 9) {
		woodIt = 0;
		imgDisApear = null;
		while (imgDisApear == null && woodIt < 3) {

			imgDisApear = newCell.children["whole" + woodIt];
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
			newFrog.id = "save" + frogNr;
			newFrog.title = "FrogInWhole";
		}
	}

	oldTdCell = document.getElementById(oldTd);
	if (oldTdCell != null) {
		// oldFrog = oldTdCell.getElementById(currentFrogId);
		oldFrog = oldTdCell.children[currentFrogId];
	}
	if (oldFrog == null)
		oldFrog = document.getElementById(currentFrogId);

	newCell = document.getElementById(newTd);
	newFrog.alt = newTd;

	if (imgDisApear != null) {
		newCell.removeChild(imgDisApear);
	}
		
	if (frogDied > -1) {
		newFrog.id = "died" + oldTdCell;
	}

	newCell.appendChild(newFrog);

	if (imgReApear != null) {
		oldTdCell.appendChild(imgReApear);
	}

}



function getActiveFrog() {

	let aFrogIt = 0;
	var aFrogId = "frog0";
	currentFrog = null;

	for (aFrogIt = 0; aFrogIt < 4; aFrogIt++) {

		aFrogId = "frog" + aFrogIt;							// TODO: define frog prefix "frog" as constant
		currentFrog = document.getElementById(aFrogId);

		if (currentFrog != null) {
			if (currentFrog.title != "ActiveFrog")
				currentFrog.title = "ActiveFrog";
			currentFrog.src = "img/frogactive.png";
			fY = rowByTag(currentFrog);
			fX = columnByTag(currentFrog)
			return currentFrog;
		}
	}
	
	return currentFrog;
}

function getCurrentFrogId(aFrog) {
	var aFrog = getActiveFrog();
	return aFrog.id;
}


function rowByTag(aVehicle) {
	var altTag = aVehicle.getAttribute("alt");
	if (altTag != null) //  && altTag.length >= 2) 
		return parseInt(altTag.charAt(2));
	// fY = 0;
	return -1;
}

function columnByTag(aVehicle) {
	var altTag = aVehicle.getAttribute("alt");
	if (altTag != null) // && altTag.length >= 2)
		return altTag.charAt(3);
	// fX 
	return 'd';
}

function upper(row) {
	let rowUp = parseInt(row);
	if (rowUp < 9)	// TODO: add constant here for different froga boards
		rowUp++;
	return rowUp;
}

function below(row) {
	let rowBelow = parseInt(row);
	if (rowBelow > 0)
		rowBelow--;
	return rowBelow;
}

function righter(col) { 
	// TODO: add constant here for different froga boards
	switch (col.charAt(0)) {
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
	return (col.charAt(0));
}

function rrighter(col) {
	var rightMov = righter(col);
	if (rightMov.charAt(0) == 'j')
		return 'a';
	return rightMov;	
}

function llefter(col) {
	var leftMov = lefter(col);
	if (leftMov.charAt(0) == 'a')
		return 'j';
	return leftMov;
}

function lefter(col) {
	// TODO: add constant here for different froga boa
	switch (col.charAt(0)) {
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
	return (col.charAt(0));
}
