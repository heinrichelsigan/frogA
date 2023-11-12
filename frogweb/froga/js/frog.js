/*
	2023-11-05 frog.js by Heinrich Elsigan


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

function frogInit() { // frogInit will be called on 1st time loading

	windowCursorKeysHandler();
	frogLoad();
}


function frogReStart(fullRestart) {
	if (fullRestart)
		window.location.href = "https://darkstar.work/froga/";
	else 
		window.location.href = "https://area23.at/froga/";
	// TODO: fix this
	// reCreateFrogs();
	frogReStart(); frogInit();
}

function frogInRiverOrSwampOrWhole(aFrog, idPrefix, deathImg, deathTitle) {
	var frogNr = parseInt(aFrog.id.charAt(4));
	aFrog.src = deathImg;
	aFrog.title = deathTitle;
	aFrog.id = idPrefix + frogNr;
	// TODO: add sound
	return frogNr;
}


function rowByTag(aVehicle) {
	var cellidTag = aVehicle.getAttribute("cellid");
	if (cellidTag != null && cellidTag.length >= 2) 
		return parseInt(cellidTag.charAt(2));

	return -1;
}

function columnByTag(aVehicle) {
	var cellidtag = aVehicle.getAttribute("cellid");
	if (cellidtag != null && cellidtag.length >= 2)
		return cellidtag.charAt(3);

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



function fetchDownload() {
	if (!("BackgroundFetchManager" in self)) {
		// Provide fallback downloading.
	}

	navigator.serviceWorker.ready.then(async (swReg) => {
		const bgFetch = await swReg.backgroundFetch.fetch(
			"my-fetch",
			["/ep-5.mp3", "ep-5-artwork.jpg"],
			{
				title: "Episode 5: Interesting things.",
				icons: [
					{
						sizes: "300x300",
						src: "/ep-5-icon.png",
						type: "image/png",
					},
				],
				downloadTotal: 60 * 1024 * 1024,
			},
		);
	});
}

*/