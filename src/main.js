import { createApp } from "vue";
import App from "./App.vue";
import Data_Visualization from "./components/Data_Visualization.vue";
import Drone_data from "./components/Drone_data.vue";
import HomePage from "./components/HomePage.vue";
import FieldDataList from "./components/FieldDataList.vue";
import { createRouter, createWebHistory } from "vue-router";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";

const routes = [
  {
    path: "/",
    name: "HomePage", // Add a name to the component
    component: HomePage,
  },
  {
    path: "/fielddatalist",
    name: "FieldDataList",
    component: FieldDataList,
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
app.use(store);
app.mount("#app");
