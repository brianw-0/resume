$(document).ready(function(){
/*
//Function for Blinking greeting
Function overview:
There are 4 steps: adding letters, pausing the phrase, removing letters, and changing the phrase
These are named accordingly to their functions.  They also determine when the $(.blinking-box) is blinking
First, the letters are added using a setInterval (var add_phrase).  If the last letter is reached,
	remove the setInterval, and use a setTimeout as a delay for the next function, pause_phrase
After pausing for some time, pause_phrase runs and uses setInterval to call remove_letters continuously.
When all letters are removed, the next function, change_phrase, is called using another setTimeout.
This changes the phrase to the next one, or circles round and comes back to the first phrase.
Then add_letters is called again using a setInterval, and we have a loop.
*/
var greeting_phrases = ["hope you enjoy your visit!","make websites for fun!", "go to Michigan State University!", "speak 3 languages!",
 "listen to all sorts of music!"];
var phrase_index = 0;  //Current index in the phrase list
var current_phrase = greeting_phrases[phrase_index]; //Current phrase in the index
var letter_index = 0; //Current index of a letter in the current phrase
var new_greeting = "";
var remove_phrase;  //setInterval variable for removing letters
var add_phrase = setInterval(add_letters, 80);

function add_letters() {
	if(letter_index >= current_phrase.length) { //If the last letter is in place, end the setInterval
		clearInterval(add_phrase);
		$(".blinking-box").addClass("blinking"); //Makes the div "blink"
		setTimeout(pause_phrase, 5000);  //Pauses to allow people to read the phrase
	}
	else {
		$(".changing-greeting").text(new_greeting + current_phrase[letter_index]);
		new_greeting = new_greeting + current_phrase[letter_index];
		letter_index++;
	}
	
}
function pause_phrase() {  //Moves onto the next function, remove_phrase
	remove_phrase = setInterval(remove_letters, 50);
	$(".blinking-box").removeClass("blinking");
	
}
function remove_letters() { //This is called by the setInterval for remove_phrase to remove all letters.
	if(letter_index < 0) {  //Once all letters are removed, the current setInterval is removed, and there is a timeout for the phrase to change.
		clearInterval(remove_phrase);
		$(".blinking-box").addClass("blinking");
		setTimeout(change_phrase,1000);
	}
	else {
		new_greeting = new_greeting.substring(0,letter_index);
		$(".changing-greeting").text(new_greeting);
		letter_index--;
	}
}
function change_phrase() {  //Changes the current phrase and restarts the relevant variables of the current phrase. Loops the cycle again
	phrase_index++;  //Changes the phrase index in the list of phrases.
	if(phrase_index >= greeting_phrases.length) { //Circles round if the last phrase in the list was displayed
		phrase_index = 0;
	}
	current_phrase = greeting_phrases[phrase_index]; //resets current phrase
	letter_index = 0; //resets the index of the current letter
	new_greeting = ""; //resets the greeting
	add_phrase = setInterval(add_letters, 80);
	$(".blinking-box").removeClass("blinking");
}

/*Checks if the sidebar should be shown or not*/
$(".menu-button-wrapper").click(function() { /*user clicks on the menu button*/
	change_sidebar();
});
$(".fa.fa-times").click(function() { /*user clicks on the x mark on the active sidebar*/
	change_sidebar();
});
function change_sidebar() { //Changes the class of the sidebar, making it active or hiding it.
	if($(".sidebar-wrapper").hasClass("active")) {  //Sidebar is active
		$(".sidebar-wrapper").removeClass("active");
		$(".outer-wrapper").removeClass("shrink");
		$(".sidebar-list").addClass("hide");
	}
	else { //Sidebar is not active
		$(".sidebar-wrapper").addClass("active");
		$(".outer-wrapper").addClass("shrink");
		$(".sidebar-list").removeClass("hide");
	}
}
	
$(window).scroll(function() {
	//Note: Landing wrapper and footer wrapper are on the same layer
	//Show the footer wrapper when the user reaches the height of the footer wrapper
	//from the bottom of the entire page
	if($(window).scrollTop() + $(window).height() >= $(document).height() - 500) {
		$(".footer-wrapper").addClass("show");
	}
	//When the user scrolls back up to the introduction, hide the footer wrapper
	if($(window).scrollTop() <= $(".landing-container").height()) {
		$(".footer-wrapper").removeClass("show");
	}
	
	if($(window).scrollTop() < $(".landing-wrapper").height() - 100) {
		$(".fa-caret-right").removeClass("active");
		$(".sidebar-item:nth-child(1) > .fa-caret-right").addClass("active");
	}
	
	//If the user reaches the experiences section and not the Skills section
	else if(($(window).scrollTop() >= $(".landing-wrapper").height() - 100)
	&& ($(window).scrollTop() < $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height() - 100)) {
		$(".fa-caret-right").removeClass("active");
		$(".sidebar-item:nth-child(2) > .fa-caret-right").addClass("active");
	}
	
	//If the user reaches the Skills section
	else if(($(window).scrollTop() >= $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height() - 100)
	&&($(window).scrollTop() < $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
	+ $(".skills-wrapper").height() - 100))	{
		$(".fa-caret-right").removeClass("active");
		$(".sidebar-item:nth-child(3) > .fa-caret-right").addClass("active");
	}
	
	//If the user reaches the Projects section
	else if(($(window).scrollTop() >= $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
	+ $(".skills-wrapper").height() - 100) && ($(window).scrollTop() < $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
	+ $(".skills-wrapper").height() + ($(".projects-wrapper").height()/2))) {
		$(".fa-caret-right").removeClass("active");
		$(".sidebar-item:nth-child(4) > .fa-caret-right").addClass("active");
	}
	//If the user reaches the Contact section
	else if($(window).scrollTop() >= $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
	+ $(".skills-wrapper").height() + ($(".projects-wrapper").height()/2)) {
		$(".fa-caret-right").removeClass("active");
		$(".sidebar-item:nth-child(5) > .fa-caret-right").addClass("active");
	}
});
	
	
//Moves to the appropriate section by the link clicked by the sidebar
$(".sidebar-item").click(function() {
	var section_chosen = $(this).index();
	
	if(section_chosen == 0) {  //If the 'introduction' link is chosen
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	}
	else if(section_chosen == 1) { //If the 'experiences' link is chosen
		$("html,body").animate({
			scrollTop: $(".landing-container").height()
		}, 500);
	}
	else if(section_chosen == 2) { //If the 'Skills' link is chosen
		$("html,body").animate({
			scrollTop: $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
		}, 500);
	}
	else if (section_chosen == 3) { //If the 'Projects' link is chosen
		$("html,body").animate({
			scrollTop: $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
	+ $(".skills-wrapper").height()
		}, 500);
	}
	else if (section_chosen == 4) { //If the 'contact' link is chosen
		$("html,body").animate({
			scrollTop: $(".landing-wrapper").height() + 
	$(".job-experience-wrapper").height() + $(".education-wrapper").height()
	+ $(".skills-wrapper").height() + $(".projects-wrapper").height()
		}, 500);
	}
	
});

$(".sidebar-item").click(function() {
	if($(".sidebar-wrapper").width() == $("body").width()) {
		$(".sidebar-wrapper").removeClass("active");
	}
});


});