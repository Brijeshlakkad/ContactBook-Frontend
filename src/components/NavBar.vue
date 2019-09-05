<template>
  <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <!-- Brand -->
    <a class="navbar-brand" href="#">Contact Book</a>

    <!-- Toggler/collapsibe Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar links -->
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item" v-bind:class="{ active: getIsActive('/home') }">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
      </ul>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <a href="#" class="nav-link" @click="logout()">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import UserService from "../services/user.service";

export default {
  userService: null,
  created() {
    this.userService = new UserService();
  },
  methods: {
    getIsActive: function(path) {
      return this.$route.path == path;
    },
    logout: async function() {
      await this.userService.logout();
      this.$router.push("/");
    }
  }
};
</script>