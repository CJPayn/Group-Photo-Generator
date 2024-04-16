// JavaScript Document
const photoFrame = document.getElementById("photo-frame")
const oneCrestType = document.getElementById("crest-one")
const twoCrestType = document.getElementById("crest-two")
const oneCrestSelection = document.getElementById("crest-one-selection")
const twoCrestSelection = document.getElementById("crest-two-selection")
const crestOnePlace = document.getElementById("crest-one-place")
const crestTwoPlace = document.getElementById("crest-two-place")
const titleFontSlider = document.getElementById("names-h1-slider")
const dateFontSlider = document.getElementById("names-h2-slider")
const namesFontSlider = document.getElementById("names-p-slider")
const today = new Date()
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
document.getElementById("names-h2").innerHTML = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`
let crestTy = ""
let crestSel = ""
let crest = ""
let focus = false
//let selImage = document.getElementById("selected-image")
let tgtImage = document.getElementById("group-photo")
let rotationSlider = document.getElementById("rotate")
let rotationSliderState = rotationSlider.value
let zoomSlider = document.getElementById("zoom")
let zoomSliderState = zoomSlider.value
let imagePosition = [0,0]
let divEdit = ""
let curClass = ""
tgtImage.style.transform = `scale(1) rotate(0deg)`
oneCrestSelection.style.display = "none"
twoCrestSelection.style.display = "none"

titleFontSlider.addEventListener("input", (event) => {
	document.getElementById(`names-h1`).style.fontSize = titleFontSlider.value  + "px"
});

dateFontSlider.addEventListener("input", (event) => {
	document.getElementById(`names-h2`).style.fontSize = dateFontSlider.value  + "px"
});

namesFontSlider.addEventListener("input", (event) => {
	curClass = document.getElementsByClassName("names")
	for (let i = 0; i < curClass.length; i++) {
		document.getElementById(`names-p${[i+1]}`).style.fontSize = namesFontSlider.value  + "px"
	}
});

function imgUpload() {
	let files = document.getElementById("selected-image").files[0]
	let src = URL.createObjectURL(files);
	photoFrame.innerHTML = `<img id="group-photo" width="800" src="${src}">`
	resetImage()
      
}

function resetImage() {
	zoomSlider.value = 0
	zoomSliderState = 0
	rotationSlider.value = 0
	rotationSliderState = 0
	tgtImage.style.transform = `scale(1) rotate(0deg)`
	imagePosition = [0,0]
	moveImage(0,0)
	titleFontSlider.value = 35
	document.getElementById(`names-h1`).style.fontSize = "35px"
	dateFontSlider.value = 30
	document.getElementById(`names-h2`).style.fontSize = "30px"
	namesFontSlider.value = 17
	curClass = document.getElementsByClassName("names")
	for (let i = 0; i < curClass.length; i++) {
		document.getElementById(`names-p${[i+1]}`).style.fontSize = "17px"
	}
}

function namesEdit(section) {
	divEdit = `div-${section}`
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

function crestType(input) {
	if (input === "one") {
		crestTy = oneCrestType
		crestSel = oneCrestSelection
	} else if (input === "two"){
		crestTy = twoCrestType
		crestSel = twoCrestSelection
	}
	
	if (crestTy.value === "") {
		crestSel.style.display = "none"
	} else if (crestTy.value === "stn") {
		crestSel.style.display = "inline"
		crestSel.innerHTML = `
					<option value="">Select Crest</option>
					<option value="aki">Akrotiri</option>
					<option value="ald">Aldergrove</option>
					<option value="ath">St Athan</option>
					<option value="ben">Benson</option>
					<option value="bzn">Brize Norton</option>
					<option value="coni">Coningsby</option>
					<option value="cos">Cosford</option>
					<option value="crn">Cranwell</option>
					<option value="gib">Gibraltar</option>
					<option value="hal">Halton</option>
					<option value="hon">Honington</option>
					<option value="lee">Leeming</option>
					<option value="los">Lossiemouth</option>
					<option value="mar">Marham</option>
					<option value="maw">St Mawgan</option>
					<option value="mpa">Mount Pleasant</option>
					<option value="nor">Northolt</option>
					<option value="odi">Odiham</option>
					<option value="sca">Scampton</option>
					<option value="sha">Shawbury</option>
					<option value="val">Valley</option>
					<option value="wad">Waddington</option>
					<option value="wit">Wittering</option>
					<option value="wyt">Wyton</option>`
	} else if (crestTy.value === "sqn") {
		crestSel.style.display = "inline"
		crestSel.innerHTML = `
					<option value="">Select Crest</option>
					<option value="1sqn">1 Sqn</option>
					<option value="2sqn">2 Sqn</option>`
	}
}

function crestSelection(input) {
	if (input === "one") {
		crest = oneCrestSelection.value
		crestOnePlace.src = `img/${crest}.png`
	} else if (input === "two") {
		crest = twoCrestSelection.value
		crestTwoPlace.src = `img/${crest}.png`
	}
}