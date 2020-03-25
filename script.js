const currentTime = "currentTime";
const padID = [ "Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const samples = [
	"tom-l",
	"tom-h",
	"crash",
	"opn-hat",
	"snare",
	"rim",
	"closed-hat",
	"kick-h",
	"kick-s",
	]

$(document).ready(function() {
	console.log("Doc ready");


	buildPads();

	// set keypress listener
	$("html").keydown(function(event) {
		event.preventDefault();
		console.log("keypress: " + event.key.toUpperCase());
		if(event.key.toUpperCase() == "ENTER") {
			console.log("ENTER");
			$("#sample1 button").trigger("click");
		}
	});


	$("#sample1 button").click(function() {
		// reference to audio tag
		const audio = $("#sample1 audio");
		// play if currentTime == 0 otherwise set currentTime to 0 to retrigger
		if(audio.prop(currentTime) == 0) {
			audio.trigger("play");
		} else {
			audio.prop(currentTime, 0);
		}
		
	});

});


function buildPads() {

	let padsHTML = ``;
	let index = 0;
	
	for (let r = 0; r<3; r++) {
		// open a div with class pad-row
		padsHTML += `<div class="pad-row">`;
		for (let c=0; c<3; c++) {
			// open a div with class single-pad__container
			padsHTML += `<div class="single-pad__container">`;

			// add div class single-pad__top-margin
			padsHTML += `<div class="single-pad__top-margin"></div>`;

			// open div class="drum-pad"
			// with id that describes the audio clip
			padsHTML += `<div class="drum-pad" id="${index}" >`;

			// with an inner text that corresponds to one of the following keys on the keyboard: qweasdzxc
			padsHTML += `${padID[index]}`;


			// inside drum-pad open an audio tag which:
			// has a src attribute pointing to an audio clip
			// a class name of clip
			// and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).
			padsHTML += `<audio src="${samples[index]}.wav" preload="audio" class="clip" id=${padID[index]}></audio>`



			// close drum-pad div
			padsHTML += `</div>`;
			// close single-pad__container
			padsHTML += `</div>`;


			// incrment index
			index++;
		}

		// close the pad_row div
		padsHTML += `</div>`;
	}

	console.log(padsHTML);
	// set #pads innerHTML
	$("#pads").html(padsHTML); // do you need to do this?
}