// JavaScript Document

function testFunction() {
	console.log("Test Worked")
}

const photoFrame = document.getElementById("photo-frame")
let focus = false
let selImage = document.getElementById("selected-image")
let tgtImage = document.getElementById("group-photo")
let rotationSlider = document.getElementById("rotate")
let rotationSliderState = rotationSlider.value
let zoomSlider = document.getElementById("zoom")
let zoomSliderState = zoomSlider.value
let imagePosition = [0,0]
tgtImage.style.transform = `scale(1) rotate(0deg)`

function imgUpload() {
	let files = document.getElementById("selected-image").files[0]
	let src = URL.createObjectURL(files);
	photoFrame.innerHTML = `<img id="group-photo" width="800" src="${src}">`
      
}

function resetImage() {
	zoomSlider.value = 0
	zoomSliderState = 0
	rotationSlider.value = 0
	rotationSliderState = 0
	tgtImage.style.transform = `scale(1) rotate(0deg)`
	imagePosition = [0,0]
	moveImage(0,0)
}

function namesEdit(section) {
	let divEdit = `div-${section}`
	if (focus === false) {
		document.getElementById(divEdit).innerHTML = `<input type="text" id="names-${section}-edit" value="${document.getElementById('names-'+section).innerHTML}"><br><button onclick="namesDone('${section}')">Confirm</button>`
		focus = true
	}
}

function namesDone(section) {
	let divEdit = `div-${section}`
	let	 namesEditCont = document.getElementById(`names-${section}-edit`)
	if (section.slice(0, 1) === "p") {
		document.getElementById(divEdit).innerHTML = `<p id="names-${section}" onClick="namesEdit('${section}')">${namesEditCont.value}</h3>`
	} else {
		document.getElementById(divEdit).innerHTML = `<${section} id="names-${section}" onClick="namesEdit('${section}')">${namesEditCont.value}</h3>`
	}
	focus = false
}

function moveImage(x, y) {
	tgtImage = document.getElementById("group-photo")
	imagePosition[0] += x
	imagePosition[1] += y
	tgtImage.style.margin = `${imagePosition[1]}px 0px 0px ${imagePosition[0]}px`
}

zoomSlider.addEventListener("input", (event) => {
	zoomSliderState = zoomSlider.value
	if (zoomSliderState < 10) {
		zoomSliderState = `0${zoomSliderState}`
	}
  tgtImage.style.transform = `scale(1.${zoomSliderState}) rotate(${rotationSliderState}deg)`
});

rotationSlider.addEventListener("input", (event) => {
	rotationSliderState = rotationSlider.value
  tgtImage.style.transform = `scale(1.${zoomSliderState})  rotate(${rotationSliderState}deg)`
});

//rotationSlider.addEventListener("input", (event) => {
//	rotationSliderState = rotationSlider.value
//	if (zoomSliderState < (Math.abs(rotationSlider.value) * 3)) {
//		zoomSlider.value = Math.abs(rotationSliderState) * 3
//	}
//	
//	if (zoomSliderState < 10) {
//		zoomSlider.value = `0${zoomSlider.value}`
//	}
//		zoomSlider.value = zoomSlider.value
//  tgtImage.style.transform = `scale(1.${zoomSlider.value})  rotate(${rotationSliderState}deg)`
//});


//document.getElementById('fileInput').addEventListener('change', function(event) {
  