// establish that browser has speech recognition
window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

//create a new instance of SpeechRecognition
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";
var inputForm = document.querySelector("form");

const synthesis = window.speechSynthesis;
var form_name = "";
var form_email = "";

startSpeechRecognition = (event) => {
	event.preventDefault();
	console.log("start speech");
	//define sppech recognition settings
	recognition.continuous = true;
	recognition.addEventListener("result", (event) => {
		const transcript = Array.from(event.results)
			.map((result) => result[0])
			.map((result) => result.transcript)
			.join("");

		//update message to be the user's voice input. 
		let message = document.getElementById("comments");
		message.innerHTML = transcript;
		//console.log(transcript);

		//regex will return first word after pattern "name is". 
		//Then Name will be updated with our match if there is one.
		const name_regex = /(?<=name is\s)(\w+)/g;
		let m = transcript.match(name_regex);
		let name = document.getElementById("name");
		name.innerHTML = m[0].toString();
		form_name = m[0].toString();
		//console.log(m);
		//console.log(m[0].toString());
		//console.log(form_name);
		
		const email_regex = /(?<=email is\s)(\w+)/g;
		let e = transcript.match(email_regex);
		let email = document.getElementById("email");
		email.innerHTML = m[0].toString();
		form_email = m[0].toString();
	});
	recognition.start();
};
// function to stop speech recognition.
stopSpeechRecognition = (event) => {
	event.preventDefault();
	console.log("stop speech");
	recognition.stop();
};

//function to start speech recognition.

clearSpeech = (event) => {
	event.preventDefault();
	console.log("clear");
	let name = document.getElementById("name");
	if (name != "") {
		name.innerHTML = "";
	}

	let email = document.getElementById("email");
	if (email != "") {
		email.innerHTML = "";
	}

	let message = document.getElementById("comments");
	if (message != "") {
		message.innerHTML = "";
	}
};

inputForm.onsubmit = function (event) {
	event.preventDefault();
	console.log("playing information");
	let name = document.getElementById("name").innerHTML;
	name = form_name;
	
	let email = document.getElementById("email").innerHTML;
	email = form_email;
	//Display text in Name on the form.
	//var name = new window.SpeechSynthesisUtterance();
	//name.text = document.getElementById("name").innerHTML;
	//name.text = "your name is, " + form_name;
	//name.lang = "en-US";
	//name.volume = 1;
	//name.rate = 1.2;
	//name.pitch = 2;
	//Needed to do this to fix issue of speak not working.
	//window.speechSynthesis.cancel();
	//Replay Name.
	//window.speechSynthesis.speak(name);
	//console.log(name);

	//Display text in email on the form.
	//var email = new window.SpeechSynthesisUtterance();
	//email.text = document.getElementById("email").innerHTML;
	//email.text = "your email is," + "bobanderson@gmail.com";
	//email.lang = "en-US";
	//email.volume = 1;
	//email.rate = 1.2;
	//email.pitch = 2;
	//Needed to do this to fix issue of speak not working.
	//window.speechSynthesis.cancel();
	//Replay Name.
	//window.speechSynthesis.speak(email);
	//console.log(email);

	//Read out loud the information given from the user. 
	var message = new window.SpeechSynthesisUtterance();
	message.text ="Your name is, " + form_name + "Your email is, " + form_email + "The message reads, " + document.getElementById("comments").innerHTML;
	message.lang = "en-US";
	message.volume = 1;
	message.rate = 1.2;
	message.pitch = 2;
	//Needed to do this to fix issue of speak not working.
	window.speechSynthesis.cancel();
	//Replay Message.
	window.speechSynthesis.speak(message);
	//synthesis.speak(message);
	console.log(message);
};
