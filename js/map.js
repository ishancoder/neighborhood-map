var mapContainer = document.getElementById("googleMap");

//This function creates an map with default LatLng 0,0 and zoom: 2
var Map = function(){
	var mapProp = {
		center: new google.maps.LatLng(0,0),
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	this.map = new google.maps.Map(mapContainer,mapProp);
}