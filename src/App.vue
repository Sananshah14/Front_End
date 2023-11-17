<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
.nav {
  background-color: #333;
  padding: 10px;
  text-align: center;
}
.nav a {
  color: #fff;
  margin: 0 10px;
}
</style>
