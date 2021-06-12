
    function initMap() {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      let coordinates_array = [{
        lat: 33.627258,
        lng: 73.050179
      },
      {
        lat: 33.622667,
        lng: 73.050185
      },
      {
        lat: 33.602776,
        lng: 73.039545
      },
      {
        lat: 33.585043,
        lng: 73.018597
      },
      {
        lat: 33.585161,
        lng: 73.018821
      }]
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: coordinates_array[0],
      });
      directionsRenderer.setMap(map);

      calculateAndDisplayRoute(directionsService, directionsRenderer, coordinates_array);
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer, coordinates_array) {

      var points_locations = [];

      
      for (i = 0; i < coordinates_array.length; i++) {
         var first = new google.maps.LatLng(coordinates_array[i].lat, coordinates_array[i].lng);

         points_locations.push({
              location: first,
              stopover: false
          });

      }
      
      directionsService.route(
        {
          origin: `${coordinates_array[0].lat},${coordinates_array[0].lng}`,
          destination: `${coordinates_array[coordinates_array.length - 1].lat},${coordinates_array[coordinates_array.length - 1].lng}`,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: points_locations,
          optimizeWaypoints: true,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
            
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
