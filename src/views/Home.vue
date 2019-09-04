<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  data() {
    return {
      user: null
    };
  },
  components: {
    NavBar
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>