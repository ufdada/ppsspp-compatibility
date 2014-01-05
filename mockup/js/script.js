var starImage = 'star2.png';
var starGreyImage = 'star_grey.png';
var imagePath = 'img/';

//All rating categories
var ratingCats = ['graphics', 'sound', 'gameplay'];

//All Tabs
var tabs = ['bugs', 'configuration', 'screenshots'];

function showTab(id){
	for (var i=0; i < tabs.length; i++){
		if (id == tabs[i]){
			document.getElementById(id).style.display = "block";
			document.getElementById(id + "_tab").className = "active";
		} else {
			document.getElementById(tabs[i]).style.display = "none";
			document.getElementById(tabs[i] + "_tab").className = "";
		}
	}
	return true;
}

function saveRating(name, number){
	try {
		localStorage.setItem(name, number);
	} catch(e) {
		document.cookie = name + "=" + number;
	}
}

function readRating(name){
	try {
		number = localStorage.getItem(name);
	} catch(e) {
		var number = 0;
		if (document.cookie) {
			var cookies = document.cookie.split(";");
			for(var i = 0; i < cookies.length; i++){
				var items = cookies[i].split("=");
				var key = items[0].trim();
				var item = items[1].trim();
				if (key == name) {
					number = item;
				}
			}
		}
	}
	return number;
}

function setRatingImage(name, number){
	var imageSrc = name + "_star."
	if (number == null) { number = 0 }
	for (k = 5; k > number; k--){
		document.getElementById(imageSrc + k).src = imagePath + starGreyImage;
	}
	
	for (k = 1; k <= number; k++){
		document.getElementById(imageSrc + k).src = imagePath + starImage;
	}
}

window.onload = function(){
	
	for (var i = 0; i < ratingCats.length; i++){
		var category = ratingCats[i];
		var rating = readRating(category);

		if (rating != null){
			setRatingImage(category, rating);
		}
	
		for (var j = 1; j < 6; j++){
			rateElement = document.getElementById(category + "_star." + j);
			
			rateElement.onmouseover = function(e){
				var id = this.id.substr(-1);
				var name = this.id.split("_")[0];
				
				setRatingImage(name, id);
			}
			
			rateElement.onmouseout = function(e){
				var id = this.id.substr(-1);
				var name = this.id.split("_")[0];
				var rating = readRating(name);
				
				setRatingImage(name, rating);
			}
			
			rateElement.onclick = function(e){
				var id = this.id.substr(-1);
				var name = this.id.split("_")[0];

				saveRating(name, id);
			}
		}
	}
}