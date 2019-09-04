<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Contact Book</a>
      </div>
      <ul class="nav navbar-nav">
        <li v-bind:class="{ active: getIsActive('/home') }">
          <router-link to="/home">Home</router-link>
        </li>
        <li>
          <a href="#" @click="logout()">Logout</a>
        </li>
      </ul>
      <form class="navbar-form navbar-left" action="/action_page.php">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" name="search" />
          <div class="input-group-btn">
            <button class="btn btn-default" type="submit">
              <i class="glyphicon glyphicon-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import UserService from "../services/user.service";
import NavBar from "@/components/NavBar.vue";

export default {
  userService: null,
  created() {
    this.userService = new UserService();
  },
  components: {
    NavBar
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