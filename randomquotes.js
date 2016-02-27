//changes quote, author and twitter share link based on JSON data from api
var useJSON = function(data) {
	//console.log(data); used to test

	//create variable for author so that we can set it to unknown if necessary
	var author = data.quoteAuthor;
	if(author == "") {
		author = "unknown";
	}

	//animations for each element, simple fade out then fade in with new data
	$("#text").fadeOut(500, function() {
		$("#text").text(data.quoteText);
		$("#text").fadeIn(500);
	});

	$("#author").fadeOut(500, function() {
		$("#author").text(author);
		$("#author").fadeIn(500);
	});

	$(".fa-quote-left").fadeOut(500, function() {
		$(".fa-quote-left").fadeIn(500);
	});

	$(".fa-quote-right").fadeOut(500, function() {
		$(".fa-quote-right").fadeIn(500);
	});

	$("#dash").fadeOut(500, function() {
		$("#dash").fadeIn(500);
	});

	//reset twitter link, then add new content
	twitterLink = "https://twitter.com/intent/tweet?text=";
	twitterLink += data.quoteText + " - " + author;
	document.getElementById("twitter-link").href = twitterLink;
}; // cloase useJSON

//function that requests quote from forismatic api
//for self reference - getJSON first takes url of the api, then function on what to do with data (useJSON), then what format we are receiving the data in. removing 'jsonp' does not seem to affect the site though.
function getQuote() {
	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",useJSON,'jsonp');
} //close getQuote()

$(document).ready(function() {
	//first getQuote populates quote box on page load
	getQuote();
	$("#get-new-quote").click(function() {
		getQuote();
	}); // close .click()
}); //close .ready()