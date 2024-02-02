<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Welcome to the Home Page</h1>
    <p class="text-center">
      Click on the links below to access the data pages:
    </p>
    <div class="d-flex justify-content-center mt-4">
      <router-link
        :to="{ name: 'DataVisualization' }"
        class="btn btn-primary me-3"
      >
        Data Visualization
      </router-link>
      <router-link :to="{ name: 'DroneData' }" class="btn btn-primary me-3">
        Drone Data
      </router-link>
      <router-link :to="{ name: 'FieldDataList' }" class="btn btn-primary">
        Field Data List
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
