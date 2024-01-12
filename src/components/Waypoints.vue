<!-- waypoints.vue -->
<template>
  <div>
    <ul v-if="waypoints">
      <li
        v-for="(waypoint, index) in waypoints"
        :key="waypoint.id"
        style="margin-bottom: 5px"
      >
        {{ waypoint.latitude }}, {{ waypoint.longitude }}
        <button
          type="button"
          @click="removeWaypoint(index)"
          class="btn btn-danger"
        >
          Remove
        </button>
      </li>
    </ul>
    <button type="button" @click="saveWaypoints" class="btn btn-primary">
      Save Waypoints
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapGetters(["waypoints"]),
  },
  methods: {
    ...mapActions(["removeWaypoint"]),
    async saveWaypoints() {
      // Format waypoints as objects with keys "latitude" and "longitude"
      const formattedWaypoints = this.waypoints.map((waypoint) => ({
        latitude: Number(waypoint.latitude).toFixed(6),
        longitude: Number(waypoint.longitude).toFixed(6),
      }));

      console.log(formattedWaypoints);
      try {
        // Send a POST request to save waypoints to the backend
        const response = await axios.post(
          "http://127.0.0.1:8000/api/waypoints/",
          formattedWaypoints
        );
        console.log("Waypoints saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving waypoints:", error);
      }
    },
  },
};
</script>
