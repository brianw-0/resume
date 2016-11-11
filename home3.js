

$(document).ready(function(){
	
	setTimeout(expand_landing_title, 1000);
	
	function expand_landing_title() {
		$(".landing-name-box").addClass("expand");
		$(".landing-name-box-remaining").addClass("expand");
		setTimeout(reveal_landing_intro, 1000);
	}
	function reveal_landing_intro() {
		$(".landing-introduction").addClass("appear");
		$(".landing-end-greeting").addClass("appear");
		setTimeout(function() {
			$(".landing-arrow-wrapper").addClass("active");
		}, 1000);
	}
	
	
	
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
	
var greeting_phrases = ["hope you enjoy your visit.","make websites for fun.", "help build drones.", "speak 3 languages.",
 "listen to all sorts of music."];
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
//END BLINKING GREETING Functions


//Change language statements
var language_text = ["I can speak, write, and read at an expert level, at least in my opinion."
, "正常说话没有问题", "je pense que j'ai besoin mes notes."];
$(".language-option").hover(function() {  //on hover
	var language_option = $(this).index();
	switch(language_option) {
		case 0:
			$(".languages-sentence").removeClass("active");
			$(".languages-sentence").text(language_text[0]);
			$(".languages-sentence").addClass("active");
			break;
		case 1:
			$(".languages-sentence").removeClass("active");
			$(".languages-sentence").text(language_text[1]);
			$(".languages-sentence").addClass("active");
			break;
		default:
			$(".languages-sentence").removeClass("active");
			$(".languages-sentence").text(language_text[2]);
			$(".languages-sentence").addClass("active");
	}
}, function() { //off hover
	$(".languages-sentence").removeClass("active");
});

//Activate Contact Links via icon
$(".contact-info").hover(function() { //On hover
	var link_number = $(this).index();
	if(link_number == 0) {
		$(".contact-email").removeClass("active");
		$(".contact-linkedin").addClass("active");
	}
	else if(link_number == 1) {
		$(".contact-linkedin").removeClass("active");
		$(".contact-email").addClass("active");
	}
});

//Project cards; activate description and deactivates
$(".fa-bars").click(function() { //activate description
	
	$(this).removeClass("active");
	$(this).next().addClass("active");						//changes icon, fa bars
	$(this).parents().eq(0).prev().addClass("active");		//add text, affects project description
	$(this).parents().eq(1).addClass("active");    			//slides down wrapper, affects projects description wrapper
	
});
$(".project-image").click(function() {
	$(this).next().addClass("active");  //slide down wrapper
	$(this).next().children().eq(0).addClass("active");  //add text
	$(this).next().children().eq(1).children().eq(0).removeClass("active");  //remove fa bars
	$(this).next().children().eq(1).children().eq(1).addClass("active");  //add fa times
});

$(".fa-times").click(function() { //deactivate description
	
	$(this).removeClass("active");							
	$(this).prev().addClass("active");						//changes icon
	$(this).parents().eq(0).prev().removeClass("active");  //removes text
	$(this).parents().eq(1).removeClass("active");			//slides up wrapper
	
});



//Scroll Functions
var window_height = $(window).height();
$(window).scroll(function() {
	if($(window).scrollTop() >= ($(".landing-cover").height() + $(".profile-wrapper").height()
		+ $(".pro-experience-wrapper").height() + $(".skills-wrapper").height() + $(".projects-wrapper").height() +
		$(".contact-wrapper").height() - window_height - 50)) { //sidebar marker for contact me
		$(".sidebar-tabs-wrapper > .sidebar-marker").removeClass("active");
		$(".sidebar-tabs-wrapper:nth-child(4) > .sidebar-marker").addClass("active");
	}
	else if($(window).scrollTop() >= ($(".landing-cover").height() + $(".profile-wrapper").height()
		+ $(".pro-experience-wrapper").height() + $(".skills-wrapper").height() - 200)) { //sidebar marker for projects
		$(".sidebar-tabs-wrapper > .sidebar-marker").removeClass("active");
		$(".sidebar-tabs-wrapper:nth-child(3) > .sidebar-marker").addClass("active");
	}
	else if($(window).scrollTop() >= $(".landing-cover").height() - 200) { //sidebar marker for profile
		$(".sidebar-tabs-wrapper > .sidebar-marker").removeClass("active");
		$(".sidebar-tabs-wrapper:nth-child(2) > .sidebar-marker").addClass("active");
	}
	else if($(window).scrollTop() < $(".landing-cover").height() - 200) { //sidebar marker for home
		$(".sidebar-tabs-wrapper > .sidebar-marker").removeClass("active");
		$(".sidebar-tabs-wrapper:nth-child(1) > .sidebar-marker").addClass("active");
	}
	
	
	if($(window).scrollTop() >= $(".landing-cover").height() - 200) {  //activates profile text
		$(".profile-text").addClass("show");
	}
	
	if($(window).scrollTop() >= $(".landing-cover").height() + $(".profile-wrapper").height()
		+ $(".pro-experience-wrapper").height() + $(".skills-wrapper").height() - 200) {
			$(".projects-wrapper .section-title-cover").addClass("active");
	}
	else if($(window).scrollTop() >= $(".landing-cover").height() + $(".profile-wrapper").height()
		+ $(".pro-experience-wrapper").height() - 200) {
		$(".skills-wrapper .section-title-cover").addClass("active");
	}
	else if($(window).scrollTop() >= $(".landing-cover").height() + $(".profile-wrapper").height() - 200) {
		$(".pro-experience-wrapper .section-title-cover").addClass("active");
	}
});

//Sidebar and scrollto functions
$(".landing-arrow-wrapper").click(function() {
	$("html,body").animate({
			scrollTop: $(".landing-cover").height()
		}, 800);
	
});
$(".sidebar-tabs-wrapper").click(function() {
	var tab_index = $(this).index();
	switch(tab_index) {
		case 0: //Scroll to the top
			$("html,body").animate({
				scrollTop: 0
			}, 800);
			break;
		case 1: //Scroll to the beginning of profiles
			$("html,body").animate({
				scrollTop: $(".landing-cover").height()
			}, 800);
			break;
		case 2: //Scroll to the projects
			$("html,body").animate({
				scrollTop: $(".landing-cover").height() + $(".profile-wrapper").height()
		+ $(".pro-experience-wrapper").height() + $(".skills-wrapper").height()
			}, 1000);
			break;
		case 3: //Scroll to the contacts
			$("html,body").animate({
				scrollTop: $(".landing-cover").height() + $(".profile-wrapper").height()
				+ $(".pro-experience-wrapper").height() + $(".skills-wrapper").height() + 
				$(".projects-wrapper").height() + $(".contact-wrapper").height() - window_height
			}, 1000);
			break;
		default:
			$(".languages-sentence").removeClass("active");
			$(".languages-sentence").text(language_text[2]);
			$(".languages-sentence").addClass("active");
	}
});




});


