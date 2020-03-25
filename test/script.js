const currentTime = "currentTime";

$(document).ready(function() {
	console.log("Doc ready");

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