<template>
  <div class="container mt-4">
    <h4>Field Data List</h4>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <table class="table table-striped table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Field Name</th>
            <th scope="col">Latitude</th>
            <th scope="col"><th scope="col">Latitude</th></th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fieldData, index) in fieldDataList" :key="index">
            <td>{{ fieldData.fieldname }}</td>
            <td>
              <div>
                <span class="font-weight-bold">Latitude:</span>
                {{ fieldData.location.latitude }}
              </div>
            </td>
            <td>
              <div>
                <span class="font-weight-bold">Longitude:</span>
                {{ fieldData.location.longitude }}
              </div>
            </td>
            <td>
              <button
                @click="deleteFieldData(fieldData.id)"
                class="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link :to="{ name: 'DroneData' }" class="btn btn-primary" >Add Field Data</router-link>
      <router-link :to="{ name: 'HomePage' }" class="btn btn-primary" style="margin-left: 5px">Back to HomePage</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fieldDataList: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchFieldData();
  },
  methods: {
    async fetchFieldData() {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/fielddata/"
        );
        this.fieldDataList = response.data;
      } catch (error) {
        console.error("Error fetching Field Data:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteFieldData(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/fielddata/${id}/`);
        console.log("Field Data deleted:", id);
        this.fetchFieldData(); // Refresh the list of Field Data after deleting one
      } catch (error) {
        console.error("Error deleting Field Data:", error);
      }
    },
    addFieldData() {
        
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  width: 80%;
}

.spinner-border {
  margin-top: 20px;
}
</style>
