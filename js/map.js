var mapContainer = document.getElementById("googleMap");

var Map = function(){
	var mapProp = {
		center: new google.maps.LatLng(0,0),
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	this.map = new google.maps.Map(mapContainer,mapProp);
}