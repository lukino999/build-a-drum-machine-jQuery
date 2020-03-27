//
const currentTime = "currentTime";
const padLetters = [ "Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const samples = [
	"tom-l",
	"tom-h",
	"crash",
	"open-hat",
	"snare",
	"rim",
	"closed-hat",
	"kick-h",
	"kick-s",
	]

$(document).ready(function() {
	buildPads();
});

//
function buildPads() {

	// initialize
	let padsHTML = ``;
	let i = 0;
	
	// nested loop 3rows 3columns
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
			padsHTML += `<div class="drum-pad" id="${samples[i]}" >`;

			// with an inner text that corresponds to one of the following keys on the keyboard: qweasdzxc
			padsHTML += `${padLetters[i]}`;


			// inside drum-pad open an audio tag which:
			// has a src attribute pointing to an audio clip
			// a class name of clip
			// and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).
			padsHTML += `<audio src="./samples/${samples[i]}.wav"
							preload class="clip" id=${padLetters[i]}>
							</audio>`



			// close drum-pad div
			padsHTML += `</div>`;
			// close single-pad__container
			padsHTML += `</div>`;


			// incrment index
			i++;
		}

		// close the pad_row div
		padsHTML += `</div>`;
	}

	// set #pads innerHTML
	$("#pads").html(padsHTML);

	// assign click handler to each pad
	for (let i=0; i<9; i++) {
		setTrigger(i);
	}

	// assign keydown handler to the whole page
	$(document).keydown(function(event) {
		event.preventDefault();
		const key = event.key.toUpperCase();
		const index = padLetters.indexOf(key);
		if(index >= 0) {
			$(`#${samples[index]}`).trigger(`click`);
		}
	});
}

// assign handler given index i
function setTrigger(i) {

	// retrieve 
	const sample = samples[i];
	const padLetter = padLetters[i];

	$(`#${sample}`).click(function() {

		// update display
		$(`#display`).text(sample);

		// get reference to the audio tag
		const audio = $(`#${padLetter}`);

		// play
		audio.trigger("play");
		
	});
}