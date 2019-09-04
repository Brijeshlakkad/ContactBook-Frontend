<template>
  <div>
    <NavBar></NavBar>
    <Contact></Contact>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Contact from "@/components/Contact.vue";
export default {
  data() {
    return {
      user: null
    };
  },
  components: {
    NavBar,
    Contact
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>