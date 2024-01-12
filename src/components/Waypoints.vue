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
    <p v-if="saveMessage" style="margin-top: 10px">{{ saveMessage }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      saveMessage: null,
    };
  },
  computed: {
    ...mapGetters(["waypoints"]),
  },
  methods: {
    ...mapActions(["removeWaypoint", "clearWaypoints"]),
    async saveWaypoints() {
      try {
        // Fetch waypoints from the Vuex store
        const waypoints = this.waypoints;

        // Ensure there are waypoints to save
        if (waypoints.length === 0) {
          console.log("No waypoints to save.");
          return;
        }

        // Send individual requests for each waypoint
        for (const waypoint of waypoints) {
          const formattedWaypoint = {
            latitude: Number(waypoint.latitude).toFixed(6),
            longitude: Number(waypoint.longitude).toFixed(6),
          };

          // Send a POST request to save the waypoint to the backend
          const response = await axios.post(
            "http://127.0.0.1:8000/api/waypoints/",
            formattedWaypoint,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          this.saveMessage = "All waypoints have been saved successfully!";
          this.clearWaypoints();
        }
      } catch (error) {
        console.error("Error saving waypoints:", error);
      }
    },
  },
};
</script>
