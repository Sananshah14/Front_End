import { createApp } from "vue";
import App from "./App.vue";
import Data_Visualization from "./components/Data_Visualization.vue";
import Drone_data from "./components/Drone_data.vue";
import HomePage from "./components/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import "bootstrap/dist/css/bootstrap.css";

const routes = [
  {
    path: "/",
    name: "HomePage", // Add a name to the component
    component: HomePage,
  },
  {
    path: "/Data_Visualization",
    name: "DataVisualization", // Add a name to the component
    component: Data_Visualization,
  },
  {
    path: "/drone_data",
    name: "DroneData", // Add a name to the component
    component: Drone_data,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
