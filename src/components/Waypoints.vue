<template>
  <div>
    <ul v-if="waypoints && waypoints.length">
      <li
        v-for="(waypoint, index) in waypoints"
        :key="index"
        style="margin-bottom: 5px"
      >
        Latitude: {{ waypoint.latitude }}, Longitude: {{ waypoint.longitude }}
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
    ...mapActions(["removeWaypoint", "clearWaypoints", "addWaypoint"]),
    async saveWaypoints() {
      try {
        // Fetch waypoints from the Vuex store
        const waypoints = this.waypoints;

        // Emit event to send waypoints to parent component (Drone_data.vue)
        this.$emit("waypoints-updated", waypoints);

        // Clear waypoints from Vuex store
        this.clearWaypoints();

        // Update save message
        this.saveMessage = "Waypoints sent to Drone Data component!";
      } catch (error) {
        console.error("Error saving waypoints:", error);
      }
    },
  },
};
</script>
