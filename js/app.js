var ViewModel = function(){
	var self = this;
	this.imgAddress = ko.observable("");
	this.imgSrc = ko.computed(function(){
		return "https://maps.googleapis.com/maps/api/streetview?size=1024x768&location="+this.imgAddress()
	},this);
	
	this.googleMap = ko.observable(new Map());
	this.panTo = function() {
		var resp;
		var map = self.googleMap().map;
		$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+self.imgAddress(), function(data){
			resp = data.results[0].geometry.location;
			map.panTo(resp);
			console.log(map);
			var bounds = new google.maps.LatLngBounds(resp);
			map.fitBounds(bounds);
		});
	}
}

ko.applyBindings(new ViewModel());

