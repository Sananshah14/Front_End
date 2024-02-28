<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center mb-4">Upload Map Type</h2>
        <form>
          <div class="mb-3">
            <label for="fieldSelect" class="form-label">Select Field:</label>
            <select
              v-model="selectedField"
              @change="onFieldChange"
              id="fieldSelect"
              class="form-select"
            >
              <option value="">-- Select Field --</option>
              <option
                v-for="field in fieldDataList"
                :key="field.id"
                :value="field.id"
              >
                {{ field.fieldname }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="mapTypeFile" class="form-label"
              >Upload Map Type Image:</label
            >
            <div class="input-group">
              <input
                type="file"
                @change="onFileChange"
                class="form-control"
                id="mapTypeFile"
                accept="image/*"
              />
              <label class="input-group-text" for="mapTypeFile"
                >Choose file</label
              >
            </div>
          </div>
          <button
            @click.prevent="uploadMapType"
            :disabled="!selectedField || !mapTypeFile"
            class="btn btn-primary mx-auto"
            style="margin-bottom: 10px"
          >
            Upload Map Type
          </button>
        </form>
        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        <router-link :to="{ name: 'HomePage' }" class="btn btn-primary me-3">
          Go to Home Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fieldDataList: [],
      selectedField: "",
      mapTypeFile: null,
      errorMessage: "",
    };
  },
  methods: {
    async fetchFieldData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/fielddata/"
        );
        this.fieldDataList = response.data;
      } catch (error) {
        console.error("Error fetching Field Data:", error);
      }
    },
    onFieldChange() {
      // Perform any additional actions when field selection changes
    },
    onFileChange(event) {
      this.mapTypeFile = event.target.files[0];
      // Update label text with selected file name
      const input = event.target;
      const label = input.nextElementSibling;
      const fileName = input.files[0].name;
      label.innerText = fileName;
    },
    uploadMapType() {
      const formData = new FormData();
      formData.append("field_data_id", this.selectedField);
      formData.append("image", this.mapTypeFile);

      axios
        .post("http://127.0.0.1:8000/api/upload_images/", formData)
        .then((response) => {
          console.log("Map Type uploaded successfully:", response.data);
          this.errorMessage = "Map Type uploaded successfully";
          // Clear selected field and file after successful upload
          this.selectedField = "";
          this.mapTypeFile = null;
          // Reset file input label
          document.getElementById("mapTypeFile").value = "";
          // Reset error message
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.errorMessage =
              "Map Type with this type already exists for the given FieldData";
          } else {
            console.error("Error uploading Map Type:", error);
            this.errorMessage = "Error uploading Map Type";
          }
        });
    },
  },
  created() {
    this.fetchFieldData();
  },
};
</script>
