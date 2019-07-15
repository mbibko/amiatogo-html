import iconMarkerMap from '../../media/marker-map.svg'
import iconCircleMap from '../../media/circle.png'

;
import modalStore from "../modalStore/modalStore";

(function () {

const mapContainer = document.querySelector('.storesMap');

if(!mapContainer || typeof window.store_location !== 'object') return;

const locations = window.store_location || [];

let city_map = [];
locations.forEach(item => {
    city_map[item.city_id] = item.city;
});

let mcOptions = {
    styles: []
};

let styles = [{
    width: 48,
    height: 48,
    textColor: 'white',
    textSize: '16',
    url: iconCircleMap
}];

for(let i=0; i < locations.length; i++) {
    mcOptions.styles.push(...styles);
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
});

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
};

if (window.city_store) {
    filterMarkers(city_map[window.city_store]);

    document.querySelector('.js-map-city-filter').addEventListener('change', e => {
        filterMarkers(city_map[e.target.value]);

        let data = new FormData();
        data.append('city_store', e.target.value);

        fetch('/local/ajax/set_city.php', {
            method: 'POST',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            body: data
        });

    });
}
}());