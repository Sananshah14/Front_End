<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-2">
        <img
          src="./../../public/images.png"
          alt="Left Logo"
          class="img-fluid"
          style="margin-top: -60px"
        />
      </div>
      <div class="col-md-8">
        <h1 class="text-center mb-4">Welcome to the Home Page</h1>
        <p class="text-center">
          Your website description goes here. You can provide a brief overview
          of your website or any other relevant information.
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
          <router-link
            :to="{ name: 'FieldDataList' }"
            class="btn btn-primary me-3"
          >
            Field Data List
          </router-link>
          <router-link
            :to="{ name: 'UploadMapType' }"
            class="btn btn-primary me-3"
          >
            Upload Map Type
          </router-link>
        </div>
      </div>
      <div class="col-md-2">
        <!-- Right Logo -->
        <img
          src="./../../public/RPTU_Logo.svg.png"
          alt="Right Logo"
          class="img-fluid"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
