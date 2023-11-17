<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>Click on the links below to access the data pages:</p>
    <router-link :to="{ name: 'DataVisualization' }"
      >Data Visualization</router-link
    >
    <br />
    <router-link :to="{ name: 'DroneData' }">Drone Data</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
