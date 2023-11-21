<template>
  <div class="container">
    <h4 style="margin-top: 20px">Drone Data Page</h4>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Google Maps</h5>
            <Map></Map>
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
            <div class="form-group">
              <label for="mapType">Map Type:</label>
              <select
                v-model="selectedMapType"
                id="mapType"
                class="form-control"
              >
                <option value="">Select a Map Type</option>
                <option
                  v-for="mapType in mapTypes"
                  :key="mapType.id"
                  :value="mapType.id"
                  placeholder="Select a Map Type"
                >
                  {{ mapType.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="card" style="margin-top: 20px">
          <div class="card-body">
            <button
              @click="showAddWaypointsForm"
              class="btn btn-primary"
              style="margin-bottom: 10px"
            >
              Add Waypoints
            </button>

            <!-- Include the component with the form outside the v-if div -->
            <AddWaypointsForm v-if="showForm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddWaypointsForm from "@/components/Waypoints.vue";
import Map from "@/components/Map.vue";
export default {
  components: {
    AddWaypointsForm,
    Map,
  },
  data() {
    return {
      fieldNames: [], // Array to store field names
      mapTypes: [],
      selectedFieldName: null,
      selectedMapType: null,
      map: null,
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
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  width: 80%;
}
</style>
