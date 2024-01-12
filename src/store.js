// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    waypoints: [],
  },
  mutations: {
    addWaypoint(state, waypoint) {
      state.waypoints.push(waypoint);
    },
    REMOVE_WAYPOINT(state, index) {
      state.waypoints.splice(index, 1);
    },
    setWaypoints(state, waypoints) {
      state.waypoints = waypoints;
    },
  },
  actions: {
    addWaypoint({ commit }, waypoint) {
      commit("addWaypoint", waypoint);
    },
    removeWaypoint({ commit }, index) {
      commit("REMOVE_WAYPOINT", index);
    },
    clearWaypoints({ commit }) {
      commit("setWaypoints", []);
    },
  },
  getters: {
    waypoints: (state) => state.waypoints,
  },
});
