starImage = 'star2.png';
starGreyImage = 'star_grey.png';

function showTab(id){
	var ids = ['bugs', 'configuration', 'screenshots'];
	for (var i=0; i < ids.length; i++){
		if (id == ids[i]){
			document.getElementById(id).style.display = "block";
			document.getElementById(id + "_tab").className = "active";
		} else {
			document.getElementById(ids[i]).style.display = "none";
			document.getElementById(ids[i] + "_tab").className = "";
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
		var number = null;
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

function setRatingImage(name, number, image){
	if (typeof number == undefined) { number = 0 }
	for (k = 5; k > number; k--){
		document.getElementById(name + "_star." + k).src = 'img/' + starGreyImage;
	}
	
	for (k = 1; k <= number; k++){
		document.getElementById(name + "_star." + k).src = 'img/' + starImage;
	}
}

window.onload = function(){
	var cats = ['graphics', 'sound', 'gameplay'];
	for (var i = 0; i < cats.length; i++){
		var rating = readRating(cats[i]);

		if (rating != null){
			setRatingImage(cats[i], rating);
		}
	
		for (var j = 1; j < 6; j++){
			document.getElementById(cats[i] + "_star." + j).onmouseover = function(e){
				var id = this.id.substr(-1);
				var name = this.id.split("_")[0];
				
				setRatingImage(name, id);
			}
			
			document.getElementById(cats[i] + "_star." + j).onmouseout = function(e){
				var id = this.id.substr(-1);
				var name = this.id.split("_")[0];
				var rating = readRating(name);
				
				if (rating != null){
					id = rating;
				}
				setRatingImage(name, id);
			}
			
			document.getElementById(cats[i] + "_star." + j).onclick = function(e){
				var id = this.id.substr(-1);
				var name = this.id.split("_")[0];

				saveRating(name, id);
				readRating(name);
			}
		}
	}
}