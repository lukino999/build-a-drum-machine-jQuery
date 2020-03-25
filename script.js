const currentTime = "currentTime";

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
	const container = $("#pads");
	for (r = 0; r<3; r++) {
		container.append("<div class=\"pad-row\"><div>");
		// remove the inner div (can't figure out why it adds it)
		$(".pad-row:last div").remove();
		


		// continue;
		for (c=0; c<3; c++) {
			$(".pad-row:last").append("<div class=\"single-pad__container\"><div>");
			$(".pad-row:last .single-pad__container:last div").remove();
		}
	}
}
