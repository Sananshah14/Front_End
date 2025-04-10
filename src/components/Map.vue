<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script>
import { Map, MapStyle, config, Marker } from "@maptiler/sdk";
import { mapActions } from "vuex";
export default {
  name: "Map",
  props: {
    latitude: String,
    longitude: String,
  },
  data() {
    return {
      mapContainer: null,
      map: null,
      markers: [],
    };
  },
  methods: {
    ...mapActions(["addWaypoint"]),
    initializeMap() {
      config.apiKey = "d7sjxphz2S288I4FXSth";

      const initialState = { lng: 7.901301, lat: 49.536907, zoom: 14 };
      this.map = new Map({
        container: this.$refs.mapContainer,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      // Add click event listener to the map
      this.map.on("click", this.handleMapClick);
    },
    handleMapClick(event) {
      const { lngLat } = event;
      console.log("Clicked at:", lngLat.lng, lngLat.lat);

      // Create a new point element
      const pointElement = document.createElement("div");
      pointElement.className = "point-marker";
      pointElement.textContent = this.markers.length + 1; // Display sequential number

      // Set the point size and style
      pointElement.style.width = "2px";
      pointElement.style.height = "2px";
      pointElement.style.borderRadius = "5%"; // Make it circular
      pointElement.style.background = "red"; // Customize the background color

      // Add a marker at the clicked spot
      const marker = new Marker(pointElement)
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(this.map);

      // Call the parent component's method to update waypoints
      this.addWaypoint({ latitude: lngLat.lat, longitude: lngLat.lng });
    },
    updateWaypoints(latitude, longitude, zoom = 14) {
      if (this.map) {
        this.map.flyTo({ center: [longitude, latitude], zoom });
      }
    },
  },
  mounted() {
    this.initializeMap();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.off("click", this.handleMapClick);
      this.map.remove();
    }
  },
};
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(70vh - 77px);
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.point-marker {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}
</style>
