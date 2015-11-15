var ViewModel = function(){
	var self = this;
	var markers = []; // an Array of all markers applied to the map
	this.imgAddress = ko.observable("");
	this.imgSrc = ko.computed(function(){
		return "https://maps.googleapis.com/maps/api/streetview?size=1024x768&location="+this.imgAddress()
	},this);
	
	this.googleMap = ko.observable(new Map());

	//this function pan the Map to a specific location and sets the marker
	this.panTo = function() {
		var resp;
		var map = self.googleMap().map; //get the map
		var infowindow = new google.maps.InfoWindow(); //create a new Info Window.

		//Helper function to create a marker
		var createMarker = function(place) {
			var marker = new google.maps.Marker({
				map:map,
				position: place.geometry.location
			});

			//marker is pushed in the marker array for further use.
			markers.push(marker);

			//adds an event listener to the marker so that they can show info on click.
			google.maps.event.addListener(marker,'click',function(){
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			})
		}

		//helper function that clears out all the markers from the map.
		var clearAllMarker = function() {
			for(var i = 0 ; i < markers.length ; i++) {
				markers[i].setMap(null); //hide the marker
			}
			markers = [];//clear the marker Array.
		}

		//asynchronous request to google's geocoding api.
		$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+self.imgAddress(), function(data){
			clearAllMarker(); //Clear out all the markers.
			resp = data.results[0].geometry.location; //set the response variable to location's LatLng.
			map.panTo(resp);// pans the map to the location.
			var request= {
					location: resp,
					radius: '200'
				};
			var service = new google.maps.places.PlacesService(map); //Google map places service.

			//search for nearby places
			service.nearbySearch(request, function(results, status) {

				if(status == google.maps.places.PlacesServiceStatus.OK) {
					var bounds = new google.maps.LatLngBounds(); //create new bound
					for(var i = 0 ; i < results.length; i++) {
						createMarker(results[i]); //create marker on the location.
						bounds.extend(results[i].geometry.location); //extend the bounds to the location.
					}
					
					map.fitBounds(bounds); //Fits the map to the bound.
				}
			});
		});
	}
}

ko.applyBindings(new ViewModel());

