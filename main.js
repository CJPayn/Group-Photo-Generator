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
const rotationSlider = document.getElementById("rotate")
const zoomSlider = document.getElementById("zoom")
const today = new Date()
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
let crestTy = ""
let crestSel = ""
let crest = ""
let focus = false
let tgtImage = document.getElementById("group-photo")
let rotationSliderState = rotationSlider.value
let zoomSliderState = zoomSlider.value
let imagePosition = [0,0]
let divEdit = ""
let curClass = ""

//Sets date to todays date in the correct format for the user
document.getElementById("names-h2").innerHTML = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`

//Checks to see if window is smaller than the template and if so scales it down and centers it into view
if (innerHeight < 815) {
 document.getElementById("app").style.scale = (innerHeight / 800)-0.02
 document.getElementById("app").scrollIntoView(true)
}

//Initialisation values
tgtImage.style.transform = `scale(1) rotate(0deg)`
oneCrestSelection.style.display = "none"
twoCrestSelection.style.display = "none"

//Listens to see if window is resized smaller than the template and if so scales it down and centers it into view
window.onresize = function(event) {
    if (innerHeight < 815) {
 document.getElementById("app").style.scale = (innerHeight / 800)-0.02
 document.getElementById("app").scrollIntoView(true)
}
}

//Listens for change of title font slider and adjusts font size accordingly
titleFontSlider.addEventListener("input", (event) => {
	document.getElementById(`names-h1`).style.fontSize = titleFontSlider.value  + "px"
});

//Listens for change of date font slider and adjusts font size accordingly
dateFontSlider.addEventListener("input", (event) => {
	document.getElementById(`names-h2`).style.fontSize = dateFontSlider.value  + "px"
});

//Listens for change of names font slider and adjusts font size accordingly
namesFontSlider.addEventListener("input", (event) => {
	curClass = document.getElementsByClassName("names")
	for (let i = 0; i < curClass.length; i++) {
		document.getElementById(`names-p${[i+1]}`).style.fontSize = namesFontSlider.value  + "px"
	}
});

//Lets user change image locally so that nothing clasified could be uploaded inadvertently
function imgUpload() {
	let files = document.getElementById("selected-image").files[0]
	let src = URL.createObjectURL(files);
	photoFrame.innerHTML = `<img id="group-photo" width="800" src="${src}">`
	resetImage()
      
}

//Resests rotation / position / zoom or image and zoom of text
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

//Changes the HTML to allow the user to edit the title / names
function namesEdit(section) {
	divEdit = `div-${section}`
	if (focus === false) {
		document.getElementById(divEdit).innerHTML = `<input type="text" id="names-${section}-edit" value="${document.getElementById('names-'+section).innerHTML}"><br><button onclick="namesDone('${section}')">Confirm</button>`
		focus = true
	}
}

//Comitts users changes to the page
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

//Allows the user to move the position of thier image within the frame
function moveImage(x, y) {
	tgtImage = document.getElementById("group-photo")
	imagePosition[0] += x
	imagePosition[1] += y
	tgtImage.style.margin = `${imagePosition[1]}px 0px 0px ${imagePosition[0]}px`
}

//Allows the user to zoom (crop) their image.
zoomSlider.addEventListener("input", (event) => {
	zoomSliderState = zoomSlider.value
	if (zoomSliderState < 10) {
		zoomSliderState = `0${zoomSliderState}`
	}
  tgtImage.style.transform = `scale(1.${zoomSliderState}) rotate(${rotationSliderState}deg)`
});

//Allows the user to rotate (straighten) their image.
rotationSlider.addEventListener("input", (event) => {
	rotationSliderState = rotationSlider.value
  tgtImage.style.transform = `scale(1.${zoomSliderState})  rotate(${rotationSliderState}deg)`
});

//Allows the user to select the type of crest they want and displays the options in list format
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
		crestSel.innerHTML = 
					
					//Station crest list
					`<option value="">Select Crest</option>
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
		crestSel.innerHTML = 
					
					//Sqn crest list
					`<option value="">Select Crest</option>
					<option value="1aeromed">1 Aeromed</option>
					<option value="1eng">1 Eng Spt</option>
					<option value="1expedLog">1 Logs</option>
					<option value="1fldComm">1 Fld Comms</option>
					<option value="1pol">1 TPSS</option>
					<option value="1reg">1 Regiment Sqn</option>
					<option value="1sqn">1 Sqn</option>
					<option value="2ac">2 A.C.Sqn</option>
					<option value="2fltComm">2 Fld Comms</option>
					<option value="2mt">2 MT Sqn</option>
					<option value="2reg">2 Regiment Sqn</option>
					<option value="3cat">3 Catering</option>
					<option value="3fldComm">3 Fld Comms</option>
					<option value="3reg">3 Regiment Sqn</option>
					<option value="3sqn">3 Sqn</option>
					<option value="4fldComm">4 Fld Comms</option>
					<option value="4pol">4 Police Sqn</option>
					<option value="4sqn">4 Sqn</option>
					<option value="5info">5 Info Serv</option>
					<option value="5pol">5 Police Sqn</option>
					<option value="5sqn">5 Sqn</option>
					<option value="6pol">6 Police Sqn</option>
					<option value="6sqn">6 Sqn</option>
					<option value="10sqn">10 Sqn</option>
					<option value="11sqn">11 Sqn</option>
					<option value="12sqn">12 Sqn</option>
					<option value="13sqn">13 Sqn</option>
					<option value="14sqn">14 Sqn</option>
					<option value="15reg">15 Regiment Sqn</option>
					<option value="15sqn">15 Sqn</option>
					<option value="16sqn">16 Sqn</option>
					<option value="17sqn">17 Sqn</option>
					<option value="18sqn">18 Sqn</option>
					<option value="19sqn">19 Sqn</option>
					<option value="20reg">20 Regiment Sqn</option>
					<option value="20sqn">20 Sqn</option>
					<option value="22sqn">22 Sqn</option>
					<option value="23sqn">23 Sqn</option>
					<option value="24sqn">24 Sqn</option>
					<option value="25sqn">25 Sqn</option>
					<option value="26reg">26 Regiment Sqn</option>
					<option value="27reg">27 Regiment Sqn</option>
					<option value="27sqn">27 Sqn</option>
					<option value="28sqn">28 Sqn</option>
					<option value="29sqn">29 Sqn</option>
					<option value="30sqn">30 Sqn</option>
					<option value="31sqn">31 Sqn</option>
					<option value="32sqn">32 Sqn</option>
					<option value="33sqn">33 Sqn</option>
					<option value="34reg">34 Regiment Sqn</option>
					<option value="37reg">37 Regiment Sqn</option>
					<option value="39">39 Sqn</option>
					<option value="41sqn">41 Sqn</option>
					<option value="42sqn">42 Sqn</option>
					<option value="43sqn">43 Sqn</option>
					<option value="45sqn">45 Sqn</option>
					<option value="47sqn">47 Sqn</option>
					<option value="51reg">51 Regiment Sqn</option>
					<option value="51sqn">51 Sqn</option>
					<option value="54sqn">54 Sqn</option>
					<option value="56sqn">56 Sqn</option>
					<option value="57sqn">57 Sqn</option>
					<option value="58reg">58 Regiment Sqn</option>
					<option value="60sqn">60 Sqn</option>
					<option value="100sqn">100 Sqn</option>
					<option value="101sqn">101 Sqn</option>
					<option value="111sqn">111 Sqn</option>
					<option value="115sqn">115 Sqn</option>
					<option value="120sqn">120 Sqn</option>
					<option value="201sqn">201 Sqn</option>
					<option value="202sqn">202 Sqn</option>
					<option value="203sqn">203 Sqn</option>
					<option value="206sqn">206 Sqn</option>
					<option value="207sqn">207 Sqn</option>
					<option value="208sqn">208 Sqn</option>
					<option value="216sqn">216 Sqn</option>
					<option value="230sqn">230 Sqn</option>
					<option value="360sqn">360 Sqn</option>
					<option value="501sqn">501 Sqn</option>
					<option value="502sqn">502 Sqn</option>
					<option value="504sqn">504 Sqn</option>
					<option value="600sqn">600 Sqn</option>
					<option value="601sqn">601 Sqn</option>
					<option value="602sqn">602 Sqn</option>
					<option value="603sqn">603 Sqn</option>
					<option value="605sqn">605 Sqn</option>
					<option value="606sqn">606 Sqn</option>
					<option value="607sqn">607 Sqn</option>
					<option value="609sqn">609 Sqn</option>
					<option value="610sqn">610 Sqn</option>
					<option value="2503sqn">2503 Sqn</option>
					<option value="2620sqn">2620 Sqn</option>
					<option value="2622sqn">2622 Sqn</option>
					<option value="2623sqn">2623 Sqn</option>
					<option value="2624sqn">2624 Sqn</option>
					<option value="4624sqn">4624 Sqn</option>
					<option value="4626sqn">4626 Sqn</option>
					<option value="5001sqn">5001 Sqn</option>
					<option value="5131sqn">5131 Sqn</option>`
	}
}

//Commits the users crest selection to the template
function crestSelection(input) {
	if (input === "one") {
		crest = oneCrestSelection.value
		crestOnePlace.src = `img/${crest}.png`
	} else if (input === "two") {
		crest = twoCrestSelection.value
		crestTwoPlace.src = `img/${crest}.png`
	}
}