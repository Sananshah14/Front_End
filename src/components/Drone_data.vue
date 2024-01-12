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
              <select
                v-model="selectedFieldName"
                id="fieldName"
                class="form-control"
              >
                <option value="">Select a Fieldname</option>
                <option v-for="fieldName in fieldNames" :key="fieldName">
                  {{ fieldName }}
                </option>
              </select>
            </div>
            <button
              @click="visitWaypoints"
              class="btn btn-success"
              :disabled="!selectedFieldName"
              style="margin-top: 5px"
            >
              Visit
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
      fieldNames: [], // Array to store field names
      selectedFieldName: null,
      showForm: false,
    };
  },
  created() {
    // Fetch Field Names from the Django backend using Axios
    axios
      .get("http://127.0.0.1:8000/api/field-names/") // Make a GET request to the field names API endpoint
      .then((response) => {
        this.fieldNames = response.data;
      })
      .catch((error) => {
        console.error("Error fetching Field Names:", error);
      });
  },
  methods: {
    showAddWaypointsForm() {
      this.showForm = true;
    },
    visitWaypoints() {
      if (this.selectedFieldName) {
        // Fetch waypoints for the selected field name
        axios
          .get(
            `http://127.0.0.1:8000/api/fielddata/${this.selectedFieldName}/waypoints/`
          )
          .then((response) => {
            const waypoints = response.data;

            this.$refs.map.updateWaypoints(waypoints);
          })
          .catch((error) => {
            console.error("Error fetching Waypoints:", error);
          });
      }
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
