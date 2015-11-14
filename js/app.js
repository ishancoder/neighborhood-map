var ViewModel = function(){
	var self = this;
	var markers = [];
	this.imgAddress = ko.observable("");
	this.imgSrc = ko.computed(function(){
		return "https://maps.googleapis.com/maps/api/streetview?size=1024x768&location="+this.imgAddress()
	},this);
	
	this.googleMap = ko.observable(new Map());
	this.panTo = function() {
		var resp;
		var map = self.googleMap().map;
		var infowindow = new google.maps.InfoWindow();

		var createMarker = function(place) {
			var marker = new google.maps.Marker({
				map:map,
				position: place.geometry.location
			});

			markers.push(marker);

			google.maps.event.addListener(marker,'click',function(){
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			})
		}

		var clearAllMarker = function() {
			console.log(markers);
			for(var i = 0 ; i < markers.length ; i++) {
				markers[i].setMap(null);
			}
			markers = [];
			console.log(markers);
		}

		$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+self.imgAddress(), function(data){
			clearAllMarker();

			resp = data.results[0].geometry.location;
			map.panTo(resp);
			var request= {
					location: resp,
					radius: '500'
				};
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, function(results, status) {

				if(status == google.maps.places.PlacesServiceStatus.OK) {
					var bounds = new google.maps.LatLngBounds();
					for(var i = 0 ; i < results.length; i++) {
						var place = results[i];
						createMarker(results[i]);
						bounds.extend(results[i].geometry.location);
					}
					
					map.fitBounds(bounds);
				}
			});
		});
	}
}

ko.applyBindings(new ViewModel());

