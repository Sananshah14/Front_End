<template>
  <div class="container">
    <h4 style="margin-top: 20px">Drone Data Page</h4>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Google Maps</h5>
            <!-- Use the Map component and pass the updateWaypoints method -->
            <Map ref="map" :update-waypoints="updateWaypoints"></Map>
          </div>
        </div>
        <div class="card" style="margin-top: 10px">
          <div class="card-body">
            <h5 class="card-title">List of Waypoints</h5>
            <Waypoints
              :waypoints="waypoints"
              @remove-waypoint="removeWaypoint"
              @waypoints-updated="handleWaypointsUpdate"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Form Inputs</h5>
            <div class="form-group">
              <label for="fieldName">Field Name:</label>
              <input
                v-model="fieldName"
                id="fieldName"
                class="form-control"
                placeholder="Enter Fieldname"
              />
            </div>
            <div class="form-group">
              <label for="latitude">Latitude:</label>
              <input
                v-model="latitude"
                id="latitude"
                class="form-control"
                placeholder="Enter Latitude"
              />
            </div>
            <div class="form-group">
              <label for="longitude">Longitude:</label>
              <input
                v-model="longitude"
                id="longitude"
                class="form-control"
                placeholder="Enter Longitude"
              />
            </div>
            <button
              @click="visitWaypoints"
              class="btn btn-success"
              :disabled="!fieldName || !latitude || !longitude"
              style="margin: 5px"
            >
              Visit Waypoints
            </button>
            <button
              @click="saveData"
              class="btn btn-success"
              :disabled="
                !fieldName || !latitude || !longitude || !waypoints.length
              "
              style="margin: 5px"
            >
              Save Data
            </button>
          </div>
        </div>
        <div class="card" style="margin-top: 20px">
          <div class="card-body">
            <button
              @click="showAddWaypointsForm"
              class="btn btn-primary"
              style="margin-bottom: 10px"
            >
              Add Drone Parameters
            </button>

            <!-- Include the component with the form outside the v-if div -->
            <AddDroneParams v-if="showForm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddDroneParams from "@/components/DroneParams.vue";
import Map from "@/components/Map.vue";
import Waypoints from "@/components/Waypoints.vue";

export default {
  components: {
    AddDroneParams,
    Map,
    Waypoints,
  },
  data() {
    return {
      fieldName: "",
      latitude: "",
      longitude: "",
      showForm: false,
      waypoints: [],
    };
  },

  methods: {
    showAddWaypointsForm() {
      this.showForm = true;
    },
    visitWaypoints() {
      if (this.latitude && this.longitude) {
        this.$refs.map.updateWaypoints(
          parseFloat(this.latitude),
          parseFloat(this.longitude)
        );
      }
    },
    handleWaypointsUpdate(waypoints) {
      this.waypoints = waypoints;
    },
    saveData() {
      // Log fieldName, latitude, longitude, and waypoints before posting
      console.log("Field Name:", this.fieldName);
      console.log("Latitude:", this.latitude);
      console.log("Longitude:", this.longitude);
      console.log("Waypoints:", this.waypoints);

      // Make API call to post the data
      axios
        .post("http://127.0.0.1:8000/api/store-drone-data/", {
          fieldName: this.fieldName,
          location: { latitude: this.latitude, longitude: this.longitude },
          waypoints: this.waypoints,
        })
        .then((response) => {
          console.log("Data posted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  width: 80%;
}
</style>
