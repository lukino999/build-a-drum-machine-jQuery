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
	console.log("Doc ready");

	buildPads();

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
			padsHTML += `<div class="drum-pad" id="${samples[index]}" >`;

			// with an inner text that corresponds to one of the following keys on the keyboard: qweasdzxc
			padsHTML += `${padLetters[index]}`;


			// inside drum-pad open an audio tag which:
			// has a src attribute pointing to an audio clip
			// a class name of clip
			// and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).
			padsHTML += `<audio src="./samples/${samples[index]}.wav" preload="auto" class="clip" id=${padLetters[index]}></audio>`



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

	// set #pads innerHTML
	$("#pads").html(padsHTML);

	for (let i=0; i<9; i++) {
		setTrigger(i);
	}

	$(document).keydown(function(event) {
		event.preventDefault();
		const key = event.key.toUpperCase();
		console.log(`keypress: ${key}`);

		const index = padLetters.indexOf(key);
		if(index >= 0) {
			console.log(`triggering pad ${key} click`);
			$(`#${samples[index]}`).trigger(`click`);
		}
	});
}

function setTrigger(i) {

	const sample = samples[i];
	const padLetter = padLetters[i];
	console.log(`Setting pad ${padLetter}, sample: ${sample}`);

	$(`#${sample}`).click(function() {
		console.log(`pad ${padLetter} click `);

		// change display
		$(`#display`).text(sample);
		// reference to audio tag
		const audio = $(`#${padLetter}`);
		// play if currentTime == 0 otherwise set currentTime to 0 to retrigger
		audio.trigger("play");
		return;

		
		if(audio.prop(currentTime) == 0) {
			audio.trigger("play");
		} else {
			audio.prop(currentTime, 0);
		}
		
	});
}