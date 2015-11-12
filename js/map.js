var init = function(){
	this.mapProp = {
		center: new google.maps.LatLng(0,0),
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	this.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

google.maps.event.addDomListener(window,'load',init);

init.refreshMap = function(lat,lng) {
	map.panTo(new google.maps.LatLng(lat,lng));
}

