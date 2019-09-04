<template>
  <div>
    
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>