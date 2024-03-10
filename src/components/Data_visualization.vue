<template>
  <div class="container">
    <h4 style="margin: 20px">Data Visualization Page</h4>
    <div class="row">
      <!-- Map component column -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <Map
              ref="mapInstance"
              :latitude="selectedFieldLocation.latitude"
              :longitude="selectedFieldLocation.longitude"
            ></Map>
          </div>
        </div>
      </div>
      <!-- Form inputs column -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Form Inputs</h5>
            <!-- Field Name dropdown -->
            <div class="form-group">
              <label for="fieldName">Field Name:</label>
              <select
                v-model="selectedFieldName"
                id="fieldName"
                class="form-control"
                @change="fetchFieldLocation"
              >
                <option value="">Select a Fieldname</option>
                <option v-for="fieldName in fieldNames" :key="fieldName">
                  {{ fieldName }}
                </option>
              </select>
            </div>
            <!-- Map Type dropdown -->
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
                  :key="mapType"
                  :value="mapType"
                >
                  {{ mapType.type }}
                </option>
              </select>
            </div>
            <!-- Get Image button -->
            <button
              @click="getImage"
              class="btn btn-primary"
              style="margin-top: 10px"
            >
              Get Image
            </button>
            <!-- Image display div -->
            <div
              v-if="imageUrl"
              style="
                margin-top: 10px;
                height: 200px;
                width: 200px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                border: 1px solid #ccc;
              "
              :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
            ></div>
            <!-- Download Image button -->
            <div v-if="imageUrl" style="margin-top: 10px">
              <h5>Download Image</h5>
              <button @click="downloadImage" class="btn btn-primary">
                Download Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Map from "@/components/Map.vue";

export default {
  data() {
    return {
      fieldNames: [], // Array to store field names
      mapTypes: [],
      selectedFieldName: null,
      selectedMapType: null,
      imageUrl: null,
      selectedFieldLocation: { latitude: 0, longitude: 0 }, // Default location
    };
  },
  components: {
    Map,
  },
  props: {
    mapInstance: Object, // Prop to receive Map component instance
  },
  watch: {
    selectedFieldName(newVal, oldVal) {
      if (newVal) {
        this.fetchMapTypes();
        this.fetchFieldLocation();
      }
    },
  },
  methods: {
    fetchMapTypes() {
      axios
        .get(`http://127.0.0.1:8000/api/map-types/${this.selectedFieldName}/`)
        .then((response) => {
          this.mapTypes = response.data;
        })
        .catch((error) => {
          console.error("Error fetching Map Types:", error);
        });
    },
    getImage() {
      if (this.selectedFieldName && this.selectedMapType) {
        axios
          .get("http://127.0.0.1:8000/api/get-image/", {
            params: {
              fieldName: this.selectedFieldName,
              mapType: this.selectedMapType.type,
            },
          })
          .then((response) => {
            this.imageUrl = `http://127.0.0.1:8000${response.data.image_url}`;
            console.log("Image URL: " + this.imageUrl);
          })
          .catch((error) => {
            console.error("Error getting image:", error);
          });
      } else {
        console.error("Field name and map type must be selected.");
      }
    },
    fetchFieldLocation() {
      if (this.selectedFieldName) {
        axios
          .get(
            `http://127.0.0.1:8000/api/field-location/${this.selectedFieldName}/`
          )
          .then((response) => {
            this.selectedFieldLocation = response.data;
            console.log("Field Location Updated:", this.selectedFieldLocation);
            // Call updateWaypoints in Map component (if applicable)
            this.$refs.mapInstance.updateWaypoints(
              this.selectedFieldLocation.latitude,
              this.selectedFieldLocation.longitude
            );
          })
          .catch((error) => {
            console.error("Error fetching Field Location:", error);
          });
      }
    },
    getFilenameFromUrl(url) {
      const parts = url.split("/");
      return parts[parts.length - 1];
    },
    downloadImage() {
      axios
        .get(this.imageUrl, { responseType: "blob" }) // Fetch the image as a blob
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data])); // Create a URL for the blob
          const link = document.createElement("a");
          link.href = url;
          link.download = this.getFilenameFromUrl(this.imageUrl); // Set the download attribute
          link.click();
          window.URL.revokeObjectURL(url); // Revoke the URL to release resources
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
        });
    },
  },
  created() {
    axios
      .get("http://127.0.0.1:8000/api/field-names/")
      .then((response) => {
        this.fieldNames = response.data;
        console.log(this.fieldNames);
      })
      .catch((error) => {
        console.error("Error fetching Field Names:", error);
      });
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  width: 80%;
}
</style>
