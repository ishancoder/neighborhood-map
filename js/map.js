var init = function(){
	var mapProp = {
		center: new google.maps.LatLng(0,0),
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

google.maps.event.addDomListener(window,'load',init);