<template>
  <div class="row">
    {{user.name}}
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
    this.user = this.$parent.user;
  }
};
</script>