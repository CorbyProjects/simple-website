function showCard (event) {

	// hide any showing infoCards
	var card1 = document.getElementById("infoCard1");
	var card2 = document.getElementById("infoCard2");
	var card3 = document.getElementById("infoCard3");
	
	// show this info card	
	if (event.target.id == "info1") {
		if (card1.style.display === "block"){
			card1.style.display = "none";
		}
		else {
			card1.style.display = "block";
			card2.style.display = "none";
			card3.style.display = "none";
		}
	}
	else if (event.target.id == "info2") {
		if (card2.style.display === "block"){
			card2.style.display = "none";
		}
		else {
			card2.style.display = "block";
			card1.style.display = "none";
			card3.style.display = "none";
		}
	}
	else {
		if (card3.style.display === "block"){
			card3.style.display = "none";
		}
		else {
			card3.style.display = "block";
			card1.style.display = "none";
			card2.style.display = "none";
		}
	}
}
// add function to info buttons
document.getElementById("info1").addEventListener("click", showCard, false);
document.getElementById("info2").addEventListener("click", showCard, false);
document.getElementById("info3").addEventListener("click", showCard, false);