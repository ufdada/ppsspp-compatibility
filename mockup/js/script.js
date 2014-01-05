function show(id){
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