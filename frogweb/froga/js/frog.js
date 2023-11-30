﻿/*
	2023-11-05 froga.js © by Heinrich Elsigan
	https://darkstar.work/froga/
	https://area23.at/froga/froga.html
*/

var loopDelay = 1500,
	loopTicks = 0;
var level = 0,
	frogsDied = 0,
	frogsInWhole = 0,
	frogWholeMax = 3,
	gameOver = 0;
var fX, fY;
var currentFrog, currentFrogId;
var imgSavedWoodB, imgSavedWoodT;


function windowCursorKeysHandler() {
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
}

function frogSound(soundName) {
	let sound = new Audio(soundName);
	sound.autoplay = true;
	sound.loop = false;
	// sound.oncanplay = function () {
	let leftNotes = document.getElementById("leftNotes");
	let rightNotes = document.getElementById("rightNotes");
	leftNotes.innerHTML = "";
	rightNotes.innerHTML = "";
	setTimeout(function () {
		sound.play();
		leftNotes.innerHTML = "♪ ";
		rightNotes.innerHTML = " ♫";
	}, 100);
	setTimeout(function () {
		leftNotes.innerHTML = " ♪";
		rightNotes.innerHTML = "♫ ";
	}, 500);
	setTimeout(function () {
		leftNotes.innerHTML = "  ";
		rightNotes.innerHTML = "  ";
		sound.loop = false;
		sound.pause();
		sound.autoplay = false;
		sound.currentTime = 0;
		try {
			sound.src = "";
			sound = null;
		} catch (exSnd) {

		}
	}, 900);
	// };
}


function frogInit() { // frogInit will be called on 1st time loading

	windowCursorKeysHandler();
	frogLoad();
}

function frogReStart(repeatLevel) {
	if (repeatLevel) {
		gameOver = 0;
		window.location.reload();
	} else { // TODO: fix this
		reCreateFrogs();
		frogLoad();
	}
}

function frogLoad() {
	loopTicks = 0;
	frogsDied = 0;
	frogsInWhole = 0;
	gameOver = 0;

	switch (level) {
		case 0: loopDelay = 1500; break;
		case 1: loopDelay = 1375; break;
		case 2: loopDelay = 1250; break;
		case 3: loopDelay = 1125; break;
		case 4: loopDelay = 1000; break;
		case 5: loopDelay = 875; break;
		default: loopDelay = 750; break;
	}
	setLevel(level);
	setFrogsInWhole(frogsInWhole);
	setFrogsDied(frogsDied);

	fX = 'd';
	fY = 0;
	imgSavedWoodB = null;
	imgSavedWoodT = null;

	document.getElementById("headerImg").src = "img/header.png";

	setTimeout(function () { frogaLooper(loopTicks, loopDelay) }, loopDelay); // will call function after loopDelay milli seconds.
}


function frogaLooper(ticks, delay) {

	let leftNotes = document.getElementById("leftNotes");
	let rightNotes = document.getElementById("rightNotes");
	if (leftNotes.innerHTML.length > 1)
		leftNotes.innerHTML = "";
	if (rightNotes.innerHTML.length > 1)
		rightNotes.innerHTML = "";

	currentFrog = getActiveFrog();
	if (frogsInWhole >= frogWholeMax) {
		headerImg.src = "img/message_levelcompleted.png"
		headerImg.height = 36;
		level++;

		setTimeout(function () { frogReStart(false); }, 8000); // will call the function after 8 secs.
		return;
	}
	if (currentFrog == null) {
		headerImg.src = "img/message_gameover.png";
		headerImg.height = 36;
		gameOver = 1;

		setTimeout(function () { frogReStart(true); }, 10000); // will call the function after 8 secs.
		return;
	}
	currentFrogId = getCurrentFrogId(currentFrog);

	try {
		moveCars();
		moveWalkers();
		moveWoods();
	} catch (exMove) {
		alert(exMove)
	}

	loopTicks = ticks + 1;

	setTimeout(function () { frogaLooper(loopTicks, delay) }, delay); // will call the function after 16 secs.
}


function moveCars() {
	var carId = "car00";
	var car = document.getElementById(carId);
	var oldTd = car.getAttribute("cellid");
	var newTd = getNewTdPositionByMoving(car, 'rr');

	var frX = columnByTag(currentFrog);
	var frY = parseInt(rowByTag(currentFrog));
	var frogNr = parseInt(currentFrogId.charAt(4));
	var frogTd = "td" + frY + frX;

	car.setAttribute("cellid", newTd);
	car.src = "img/car0.png";

	if (newTd == frogTd) {
		currentFrog.id = "died" + frogNr;
		document.getElementById(newTd).removeChild(currentFrog);
		car.src = "img/car0crashed.png"
		changeImagePlaySound(car, "img/car0crashed.png", "audio/frog_crash.ogg");
		currentFrog = getActiveFrog();
		currentFrogId = getCurrentFrogId(currentFrog);
	}

	document.getElementById(oldTd).removeChild(car);
	document.getElementById(newTd).appendChild(car);

	carId = "car01";
	car = document.getElementById(carId);
	oldTd = car.getAttribute("cellid");
	newTd = getNewTdPositionByMoving(car, 'rr');

	// car.alt = newTd;
	car.setAttribute("cellid", newTd);
	car.src = "img/car0.png";

	if (newTd == frogTd) {
		currentFrog.id = "died" + frogNr;
		document.getElementById(newTd).removeChild(currentFrog);
		car.src = "img/car0crashed.png"
		changeImagePlaySound(car, "img/car0crashed.png", "audio/frog_crash.ogg");
		currentFrog = getActiveFrog();
		currentFrogId = getCurrentFrogId(currentFrog);
	}

	document.getElementById(oldTd).removeChild(car);
	document.getElementById(newTd).appendChild(car);

	let carCnt = 10;
	for (carCnt = 10; carCnt < 13; carCnt++) {
		carId = "car" + carCnt;

		car = document.getElementById(carId);
		oldTd = car.getAttribute("cellid");
		newTd = getNewTdPositionByMoving(car, 'll');

		// car.alt = newTd;
		car.setAttribute("cellid", newTd);
		car.src = "img/car1.png";

		if (newTd == frogTd) {
			currentFrog.id = "died" + frogNr;
			document.getElementById(newTd).removeChild(currentFrog);
			car.src = "img/car1crashed.png"
			changeImagePlaySound(car, "img/car1crashed.png", "audio/frog_crash.ogg");
			currentFrog = getActiveFrog();
			currentFrogId = getCurrentFrogId(currentFrog);
		}

		document.getElementById(oldTd).removeChild(car);
		document.getElementById(newTd).appendChild(car);
	}
}

function moveWalkers() {
	var walk;
	var oldTd;
	var walk_Y;
	var walk_X;
	var newTd;
	var walkId;
	let walkCnt = 0;

	var frX = columnByTag(currentFrog);
	var frY = parseInt(rowByTag(currentFrog));
	var frogNr = parseInt(currentFrogId.charAt(4));
	var frogTd = "td" + frY + frX;

	for (walkCnt = 0; walkCnt < 4; walkCnt++) {

		walkId = "person" + walkCnt;
		walk = document.getElementById(walkId);
		oldTd = walk.getAttribute("cellid");
		newTd = getNewTdPositionByMoving(walk, 'rr');

		// walk.alt = newTd;
		walk.setAttribute("cellid", newTd);
		switch (walkId) {
			case "person0": walk.src = "img/walk4m.png"; break;
			case "person1": walk.src = "img/walk5m.png"; break;
			case "person2": walk.src = "img/walk6m.png"; break;
			case "person3": walk.src = "img/walk3m.png"; break;
			default: break;
		}

		if (newTd == frogTd) {
			currentFrog.id = "died" + frogNr;
			document.getElementById(newTd).removeChild(currentFrog);
			walk.src = "img/walk7m.png"
			changeImagePlaySound(walk, "img/walk7m.png", "audio/frog_jump.ogg");
			currentFrog = getActiveFrog();
			currentFrogId = getCurrentFrogId(currentFrog);
		}

		document.getElementById(oldTd).removeChild(walk);
		document.getElementById(newTd).appendChild(walk);
	}
}

function moveWoods() {
	var woodId;
	var wood;
	var oldTd;
	var oldTdCell;
	var wood_Y;
	var wood_X;
	var newTd;
	var newWood;
	let woodCnt = 0;

	var newFrog = document.getElementById(currentFrogId);
	var frX = columnByTag(newFrog);
	var frY = parseInt(rowByTag(newFrog));
	let checkFrog = (frY == 6 || frY == 7);

	let frogCnt = 0;
	for (frogCnt = 0; frogCnt < 3; frogCnt++) {
		var deadFrogId = "died" + frogCnt;
		var deadFrog = document.getElementById(deadFrogId);
		if (deadFrog != null) {
			var parentElem = deadFrog.parentElement;
			var parentNode = deadFrog.parentNode;
			if (parentElem != null)
				parentElem.removeChild(deadFrog);
		}
	}

	for (woodCnt = 3; woodCnt >= 0; woodCnt--) {
		woodId = "woodB" + woodCnt;
		wood = document.getElementById(woodId);
		if (wood == null && checkFrog && newFrog.getAttribute("idwood") == woodId) {
			wood = newFrog;
		}
		if (wood != null) {
			oldTd = wood.getAttribute("cellid");
			newTd = getNewTdPositionByMoving(wood, 'rr');
			// wood_Y = rowByTag(wood);
			// wood_X = rrighter(columnByTag(wood));
			// newTd = "td" + wood_Y + wood_X;

			newWood = copyImg(wood);
			newWood.setAttribute("cellid", newTd);

			if (imgSavedWoodB != null && imgSavedWoodB.id != null && imgSavedWoodB.id == woodId)
				imgSavedWoodB.setAttribute("cellid", newTd);

			document.getElementById(newTd).appendChild(newWood);
			document.getElementById(oldTd).removeChild(wood);
		}
	}

	woodCnt = 0;
	for (woodCnt = 0; woodCnt < 4; woodCnt++) {
		woodId = "woodT" + woodCnt;
		wood = document.getElementById(woodId);
		if (wood == null && checkFrog && newFrog.getAttribute("idwood") == woodId) {
			wood = newFrog;
		}
		if (wood != null) {
			oldTd = wood.getAttribute("cellid");
			newTd = getNewTdPositionByMoving(wood, 'll');

			newWood = copyImg(wood);
			newWood.setAttribute("cellid", newTd);

			if (imgSavedWoodT != null && imgSavedWoodT.id != null && imgSavedWoodT.id == woodId)
				imgSavedWoodT.setAttribute("cellid", newTd);

			try {
				var parentWood = wood.parentElement;
				if (parentWood != null && parentWood.childElementCount > 0)
					parentWood.removeChild(wood);
			} catch (ex3) {
				// alert("wood.parentElement.id=" + wood.parentElemen.id + "wood.id=" + wood.id + "\r\nException: " + x3);
			}

			newWood.setAttribute("cellid", newTd);
			document.getElementById(newTd).appendChild(newWood);
		}
	}

}

function frogMove(jumpDir) {

	currentFrog = getActiveFrog();
	currentFrogId = getCurrentFrogId(currentFrog);
	var frogNr = parseInt(currentFrogId.charAt(4));	// TODO		better implementation of frog number

	var imgDisApear = null;
	var imgReApear = null;

	var frogDied = -1;
	var frogCrashed = -1;

	// var rowColTag = currentFrog.getAttribute("cellid");

	var frX = columnByTag(currentFrog);
	var frY = parseInt(rowByTag(currentFrog));
	var oldTd = "td" + frY + frX;

	var nrX = fX;
	var nrY = parseInt(fY);

	if (jumpDir == null || jumpDir.length < 2)
		return;

	if (jumpDir.charAt(0) == 'u') {
		nrY = upper(frY);												// up 	
		document.getElementById("aUp").src = "img/a_up.gif";
	}
	else if (jumpDir.charAt(0) == 'd') { 								// TODO should we let frog drive back to start meadow
		nrY = below(frY);												// down 				
		document.getElementById("aDown").src = "img/a_down.gif";
	}

	if (jumpDir.charAt(0) == 'r' || jumpDir.charAt(1) == 'r') {
		nrX = righter(frX);												// right
		document.getElementById("aRight").src = "img/a_right.gif";
	} else if (jumpDir.charAt(0) == 'l' || jumpDir.charAt(1) == 'l') {
		nrX = lefter(frX);												// left
		document.getElementById("aLeft").src = "img/a_left.gif";
	}

	// TODO: better use newTd = getNewTdPositionByMoving(car, 'rr');
	var newTd = "td" + nrY + nrX;
	var newFrog = document.getElementById(currentFrogId);

	newFrog.id = currentFrogId;
	newFrog.title = "ActiveFrog";
	newFrog.border = "0";
	newFrog.src = "img/frogactive.png";
	newFrog.setAttribute("idwood", "");

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

	// saved bottom wood image will be restored
	let woodIt = 0;
	if (frY == 6 && (nrY == 5 || nrY == 6 || nrY == 7)) {
		if (imgSavedWoodB != null) {
			imgReApear = imgSavedWoodB;
		}
	}

	// saved top wood image will be restored
	if (frY == 7 && (nrY == 6 || nrY == 7 || nrY == 8)) {
		if (imgSavedWoodT != null) {
			imgReApear = imgSavedWoodT;
		}
	}

	// set frog on bottom wood
	if (nrY == 6 && (frY == 5 || frY == 6 || frY == 7)) {
		woodIt = 0;
		imgDisApear = null;
		while (imgDisApear == null && woodIt < 4) {
			var woodId = "woodB" + woodIt;
			imgDisApear = document.getElementById(newTd).children[woodId];
			if (imgDisApear != null) {
				if (frY == 6)
					imgReApear = imgSavedWoodB;
				imgSavedWoodB = copyImg(imgDisApear);
				newFrog.src = "img/wood1b.png#" + woodIt;
				newFrog.setAttribute("idwood", woodId);
				woodIt = 4;
				break;
			}
			else
				imgDisApear = null;

			woodIt++;
		}
		// frog dies in river
		if (imgDisApear == null) {
			frogDied = frogInRiverOrSwampOrWhole(newFrog, "img/wood4b.gif", "audio/frog_underwater.ogg", "died", "Frog died!");			
		}
	}

	// set frog on top wood
	if (nrY == 7 && (frY == 6 || frY == 7 || frY == 8)) {
		woodIt = 0;
		imgDisApear = null;
		while (imgDisApear == null && woodIt < 4) {
			var woodId = "woodT" + woodIt;
			imgDisApear = document.getElementById(newTd).children[woodId];
			if (imgDisApear != null) {
				if (frY == 7)
					imgReApear = imgSavedWoodT;
				imgSavedWoodT = copyImg(imgDisApear);
				newFrog.src = "img/wood1t.png#" + woodIt;
				newFrog.setAttribute("idwood", woodId);
				woodIt = 4;
				break;
			}
			else
				imgDisApear = null;

			woodIt++;
		}
		// frog dies in river
		if (imgDisApear == null) {
			frogDied = frogInRiverOrSwampOrWhole(newFrog, "img/wood4t.gif", "audio/frog_underwater.ogg", "died", "Frog died!");
		}
	}

	// if (nrY == 8)
	// 	newFrog.src = "img/meadow2t.png";

	// if (nrY == 9) {
	if (nrY == 8) {
		woodIt = 0;
		imgDisApear = null;
		while (imgDisApear == null && woodIt < frogWholeMax) {

			imgDisApear = document.getElementById(newTd).children["whole" + woodIt];
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
			if (nrX.charAt(0) == 'e')
				imgDisApear = document.getElementById("whole1");
			if (nrX.charAt(0) == 'g')
				imgDisApear = document.getElementById("whole2");
			if (nrX.charAt(0) == 'i')
				imgDisApear = document.getElementById("whole3");
		}

		if (imgDisApear != null) {
			frogsInWhole++;
			setFrogsInWhole(frogsInWhole);
			frogInRiverOrSwampOrWhole(newFrog, "img/frogend1.png", "audio/frog_inwhole.ogg", "save", "frog" + frogNr + "@home");
		}
		if (imgDisApear == null) {
			frogDied = frogInRiverOrSwampOrWhole(newFrog, "img/swamp2t.gif", "audio/frog_inswamp.ogg", "died", "Frog died!");
		}
	}

	newFrog.setAttribute("cellid", newTd);

	if (imgDisApear != null) {
		document.getElementById(newTd).removeChild(imgDisApear);
	}

	if (frogsInWhole >= 3 || ((frogCrashed = crashFrog(newTd)) < 0)) {
		document.getElementById(newTd).appendChild(newFrog);
	} else {
		currentFrog = getActiveFrog();
		currentFrogId = getCurrentFrogId()
		frogDied = frogCrashed;
	}

	if (frogDied > -1)
		setFrogsDied(++frogsDied);

	if (imgReApear != null) {
		document.getElementById(oldTd).appendChild(imgReApear);
	}


	if (frY == 7 && (nrY <= 5 || nrY >= 8))
		imgSavedWoodB = null;
	if (frY == 8 && (nrY <= 6 || nrY >= 8))
		imgSavedWoodT = null;
}


function changeImagePlaySound(imageToChange, newImageUrl, soundToPlay) {
	if (imageToChange != null)
		imageToChange.src = newImageUrl;

	if (soundToPlay != null && soundToPlay.length > 1)
		setTimeout(function () { frogSound(soundToPlay) }, 100);
}


function frogInRiverOrSwampOrWhole(aFrog, deathImg, deathSound, idPrefix, deathTitle) {
	var frogNr = parseInt(aFrog.id.charAt(4));
	aFrog.src = deathImg;
	aFrog.title = (deathTitle == null) ? "" : deathTitle;
	aFrog.id = idPrefix + frogNr;
	if (deathSound != null && deathSound.length > 1) {
		setTimeout(function () { frogSound(deathSound) }, 100);
	}
	return frogNr;
}


function crashFrog(tdFrogCell) {

	var moveId, frogNr;
	var move;
	var moveTd, tdFrog;
	var move_Y, move_X;

	currentFrog = getActiveFrog();
	currentFrogId = getCurrentFrogId(currentFrog);
	tdFrog = currentFrog.getAttribute("cellid");
	frogNr = parseInt(currentFrogId.charAt(4));

	let crashCnt = 0;
	let moveCnt = 0;
	let _move_Id = "";
	var movers = ["car00", "car01", "car10", "car11", "car12", "car13", "person0", "person1", "person2", "person3"];

	movers.forEach(function (_move_Id) {

		moveId = _move_Id;
		move = document.getElementById(moveId);
		if (move != null) {
			moveTd = move.getAttribute("cellid");
			move_Y = rowByTag(move);
			move_X = rrighter(columnByTag(move));
			if (moveTd == tdFrogCell) {
				try {
					var parentCell = document.getElementById(currentFrogId).parentElement;
					if (parentCell != null) {
						currentFrog.id = "died" + frogNr;
						parentCell.removeChild(currentFrog);
					}
					// document.getElementById(tdFrogCell).removeChild(currentFrog);
				} catch (exFrogCrash1) {
					// alert(exFrogCrash1);
				}

				if (_move_Id.length >= 4) {
					switch (_move_Id.substr(0, 4)) {
						case "car0": ++crashCnt;
							changeImagePlaySound(move, "img/car0crashed.png", "audio/frog_crash.ogg");
							move.src = "img/car0crashed.png";
							break;
						case "car1": ++crashCnt;
							changeImagePlaySound(move, "img/car1crashed.png", "audio/frog_crash.ogg");
							move.src = "img/car1crashed.png";
							break;
						case "pers": ++crashCnt;
							changeImagePlaySound(move, "img/walk7m.png", "audio/frog_jump.ogg");
							move.src = "img/walk7m.png";
							break;
						default: break;
					}
				}
			}
		}
	});

	return (crashCnt > 0) ? frogNr : -1;
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
			// currentFrog.src = "img/frogactive.png";
			fY = rowByTag(currentFrog);
			fX = columnByTag(currentFrog)
			return currentFrog;
		}
	}

	return currentFrog;
}

function getCurrentFrogId(aFrog) {
	var aFrog = getActiveFrog();
	let frogsLeftNr = 4 - parseInt(aFrog.id.charAt(4));
	setFrogsLeft(frogsLeftNr);
	return aFrog.id;
}

function getNewTdPositionByMoving(elemImage, direction) {
	var elem_Y = rowByTag(elemImage);
	var elem_X = columnByTag(elemImage);

	if (direction != null && direction.charAt(0) != '\0') {
		switch (direction.charAt(0)) {
			case 'r': elem_X = rrighter(elem_X); break;
			case 'l': elem_X = llefter(elem_X); break;
			case 'u': elem_Y = upper(elem_Y); break;
			case 'd': elem_Y = below(elem_Y); break;
			default: break;
		}
	}
	return "td" + elem_Y + elem_X;
}

function rowByTag(aVehicle) {
	var cellidTag = aVehicle.getAttribute("cellid");
	if (cellidTag != null) //  && cellidTag.length >= 2) 
		return parseInt(cellidTag.charAt(2));
	// fY = 0;
	return -1;
}

function columnByTag(aVehicle) {
	var cellidtag = aVehicle.getAttribute("cellid");
	if (cellidtag != null) // && cellidtag.length >= 2)
		return cellidtag.charAt(3);
	// fX 
	return 'd';
}

function cloneObj(obj) {
	var copy;
	if (obj instanceof Object) {
		copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
		}
		return copy;
	}
}


function reCreateFrogs() {

	// first clear all bottom and top table cells, so that there rest neither frogs nor wholes there
	var tdsToClear = [
		"td0a", "td0b", "td0c", "td0d", "td0e", "td0f", "td0g", "td0h", "td0i",
		"td8a", "td8b", "td8c", "td8d", "td8e", "td8f", "td8g", "td8h", "td8i"
		// "td9a", "td9b", "td9c", "td9d", "td9e", "td9f", "td9g", "td9h", "td9i"
	];
	tdsToClear.forEach(function (tdId) {
		tableCell = document.getElementById(tdId);
		if (tableCell != null && tableCell.children != null && tableCell.children.length > 0) {
			for (tdCellIt = 0; tdCellIt < tableCell.children.length; tdCellIt++) {
				childFromTableCell = tableCell.children[tdCellIt];
				if (childFromTableCell != null)
					tableCell.removeChild(childFromTableCell);
			}
		}
	});

	// recreate frog images dynamically
	var imgF0 = new Image(36, 27);
	imgF0.id = "frog0";
	imgF0.src = "img/frogactive.png";
	imgF0.alt = "FROG 0";
	imgF0.setAttribute("border", 0);
	imgF0.setAttribute("title", "ActiveFrog");
	imgF0.setAttribute("class", "frogaImage");
	imgF0.setAttribute("className", "frogaImage");
	imgF0.setAttribute("cellid", "td0d");
	imgF0.setAttribute("idwood", "");
	document.getElementById("td0d").appendChild(imgF0);

	var imgF1 = new Image(36, 27);
	imgF1.id = "frog1";
	imgF1.src = "img/frogpassive.png";
	imgF1.alt = "FROG 1";
	imgF1.setAttribute("border", 0);
	imgF1.setAttribute("title", "ActiveFrog");
	imgF1.setAttribute("class", "frogaImage");
	imgF1.setAttribute("className", "frogaImage");
	imgF1.setAttribute("cellid", "td0e");
	imgF1.setAttribute("idwood", "");
	document.getElementById("td0e").appendChild(imgF1);

	var imgF2 = new Image(36, 27);
	imgF2.id = "frog2";
	imgF2.src = "img/frogpassive.png";
	imgF2.alt = "FROG 2";
	imgF2.setAttribute("border", 0);
	imgF2.setAttribute("title", "");
	imgF2.setAttribute("class", "frogaImage");
	imgF2.setAttribute("className", "frogaImage");
	imgF2.setAttribute("cellid", "td0f");
	imgF2.setAttribute("idwood", "");
	document.getElementById("td0f").appendChild(imgF2);

	var imgF3 = new Image(36, 27);
	imgF3.id = "frog3";
	imgF3.src = "img/frogpassive.png";
	imgF3.alt = "FROG 3";
	imgF3.setAttribute("border", 0);
	imgF3.setAttribute("title", "");
	imgF3.setAttribute("class", "frogaImage");
	imgF3.setAttribute("className", "frogaImage");
	imgF3.setAttribute("cellid", "td0g");
	imgF3.setAttribute("idwood", "");
	document.getElementById("td0g").appendChild(imgF3);

	// recreate wholes images for frog goal dynamically
	var imgW0 = new Image(36, 27);
	imgW0.id = "whole0";
	imgW0.src = "img/frogend0t.png";
	imgW0.alt = "WHOLE 0";
	imgW0.setAttribute("border", 0);
	imgW0.setAttribute("title", "");
	imgW0.setAttribute("class", "frogaImageWhole");
	imgW0.setAttribute("className", "frogaImageWhole");
	imgW0.setAttribute("cellid", "td8c");
	document.getElementById("td8c").appendChild(imgW0);

	var imgW1 = new Image(36, 27);
	imgW1.id = "whole1";
	imgW1.src = "img/frogend0t.png";
	imgW1.alt = "WHOLE 1";
	imgW1.setAttribute("border", 0);
	imgW1.setAttribute("title", "");
	imgW1.setAttribute("class", "frogaImageWhole");
	imgW1.setAttribute("className", "frogaImageWhole");
	imgW1.setAttribute("cellid", "td8e");
	document.getElementById("td8e").appendChild(imgW1);

	var imgW2 = new Image(36, 27);
	imgW2.id = "whole2";
	imgW2.src = "img/frogend0t.png";
	imgW2.alt = "WHOLE 2";
	imgW2.setAttribute("border", 0);
	imgW2.setAttribute("title", "");
	imgW2.setAttribute("class", "frogaImageWhole");
	imgW2.setAttribute("className", "frogaImageWhole");
	imgW2.setAttribute("cellid", "td8g");
	document.getElementById("td8g").appendChild(imgW2);

	if (level > 0) {
		var imgW3 = new Image(36, 27);
		imgW3.id = "whole3";
		imgW3.src = "img/frogend0t.png";
		imgW3.alt = "WHOLE 3";
		imgW3.setAttribute("border", 0);
		imgW3.setAttribute("title", "");
		imgW3.setAttribute("class", "frogaImageWhole");
		imgW3.setAttribute("className", "frogaImageWhole");
		imgW3.setAttribute("cellid", "td8i");
		document.getElementById("td8i").appendChild(imgW3);
		document.getElementById("td8i").setAttribute("background", "img/frogend0t.png");
		frogWholeMax = 4;
	} else {
		document.getElementById("td8i").setAttribute("background", "img/swamp0t.png");
		frogWholeMax = 3;
	}
}

function copyImg(imgC) {
	var imgD = new Image();
	if (imgC != null && imgC.id != null) {
		imgD.id = imgC.id;
		imgD.src = imgC.src;
		imgD.width = imgC.width;
		imgD.height = imgC.height;
		imgD.alt = imgC.alt;
		// imgD.title = imgC.title;
		// imgD.className = imgC.className;
		// imgD.setAttribute("alt", imgC.getAttribute("alt"));
		if (imgC.getAttribute("title") != null)
			imgD.setAttribute("title", imgC.getAttribute("title"));
		if (imgC.getAttribute("className") != null)
			imgD.setAttribute("className", imgC.getAttribute("className"));
		imgD.setAttribute("class", imgC.getAttribute("class"));
		if (imgC.getAttribute("cellid") != null)
			imgD.setAttribute("cellid", imgC.getAttribute("cellid"));
		if (imgC.getAttribute("idwood") != null)
			imgD.setAttribute("idwood", imgC.getAttribute("idwood"));
		imgD.setAttribute("border", 0);

	}
	return imgD;
}

function upper(row) {
	let rowUp = parseInt(row);
	if (rowUp < 8)	// TODO: add constant here for different froga boards
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
	if (col.charAt(0) == 'j')
		return 'a';
	var rightMov = righter(col);
	return rightMov;
}

function llefter(col) {
	if (col.charAt(0) == 'a')
		return 'j';
	var leftMov = lefter(col);
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

function setFrogsInWhole(inWhole) {
	document.getElementById("frogsInWhole").innerHTML = inWhole;
}

function setFrogsLeft(frogsLeft) {
	document.getElementById("frogsLeft").innerHTML = frogsLeft;
}

function setFrogsDied(frogsDied) {
	document.getElementById("frogsDied").innerHTML = frogsDied;
}

function setLevel(frogLevel) {
	document.getElementById("frogaLevel").innerHTML = frogLevel;
}