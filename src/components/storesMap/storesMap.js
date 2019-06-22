import iconMarkerMap from '../../media/marker-map.svg'
import iconCircleMap from '../../media/circle.png'

;(function () {

const mapContainer = document.querySelector('.storesMap')

if(!mapContainer) return

const locations = [
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Москва',
    location: {lat: 55.765390, lng: 37.605019},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Москва',
    location: {lat: 55.766023, lng: 37.636604},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Москва',
    location: {lat: 55.742555, lng: 37.629917},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Москва',
    location: {lat: 55.737241, lng: 37.618254},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Санкт-Петербург',
    location: {lat: 59.942795, lng: 30.275798},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Санкт-Петербург',
    location: {lat: 59.930071, lng: 30.355464},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Санкт-Петербург',
    location: {lat: 59.937509, lng: 30.354803},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Самара',
    location: {lat: 53.212092, lng: 50.211095},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Ижевск',
    location: {lat: 56.866228, lng: 53.178319},
  },
  {
    title: 'Магазин Amaiatogo',
    address: 'ул. Юрюкалова 15',
    city: 'Ижевск',
    location: {lat: 56.838631, lng: 53.210555},
  },
];

const mcOptions = {
  styles: [{
      width: 48,
      height: 48,
      textColor: 'white',
      textSize: '16',
      url: iconCircleMap
    },
    {
      width: 48,
      height: 48,
      textColor: 'white',
      textSize: '16',
      url: iconCircleMap
    },
    {
      width: 48,
      height: 48,
      textColor: 'white',
      textSize: '16',
      url: iconCircleMap
    },
    {
      width: 48,
      height: 48,
      textColor: 'white',
      textSize: '16',
      url: iconCircleMap
    },
    {
      width: 48,
      height: 48,
      textColor: 'white',
      textSize: '16',
      url: iconCircleMap
    }
  ]
}

const map = new google.maps.Map(mapContainer, {
  center: {lat: 57.0016006, lng: 42.8498626},
  zoom: 6,
  disableDefaultUI: true
});

const bounds = new google.maps.LatLngBounds();
const markers = locations.map(function(obj, i) {
  return new google.maps.Marker({
    position: obj.location,
    icon: iconMarkerMap,
    city: obj.city,
    title: obj.title,
    address: obj.address,
    map: map
  });
});

map.fitBounds(bounds);

// Add a marker clusterer to manage the markers.
const markerCluster = new MarkerClusterer(map, markers, mcOptions);


markers.forEach((marker, i) => {
  const infowindow = new google.maps.InfoWindow({
    content: `
      <div class="marker-popover">
      <div class="marker-popover__title">${marker.title}</div>
      <div class="marker-popover__address">${marker.address}</div>
      </div>
    `
  });
  bounds.extend(marker.position);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
})

const filterMarkers = city => {
    var bounds = new google.maps.LatLngBounds();
    markers.forEach((marker, i) => {
        // If is same city or city not picked
        if(marker.city == city || city.length == 0) {
            // marker.setVisible(true);
            bounds.extend(marker.getPosition());
        }
        map.fitBounds(bounds);
    });
}


document.querySelector('.js-map-city-filter').addEventListener('change', e => {
  console.log(e.target.value);
  filterMarkers(e.target.value)
});


}());