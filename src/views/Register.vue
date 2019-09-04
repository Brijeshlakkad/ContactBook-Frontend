<template>
  <div class="row">
    <div class="col-sm-offset-4 col-sm-4 col-sm-offset-4">
      <h3>Registration</h3>
      <hr />
      <form @submit.prevent="handleSubmit">
        <div v-if="form.errors.length" class="row error">
          <p v-for="error in form.errors" :key="error">{{error}}</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-sm-offset-1 col-xs-8 col-sm-offset-1">
            <label for="name">Name</label>
            <input
              type="name"
              v-model="form.name"
              class="form-control"
              :class="{ 'is-invalid': form.submitted && !form.name }"
              @blur="$v.form.name.$touch()"
            />
            <div v-if="$v.form.name.$dirty && $v.form.name.$invalid" style="color:red;">
              <div v-if="!$v.form.name.required" class="invalid-feedback">Name is required</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-offset-1 col-xs-8 col-sm-offset-1">
            <label for="email">Email</label>
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              :class="{ 'is-invalid': form.submitted && !form.email }"
              @blur="$v.form.email.$touch()"
            />
            <div v-if="$v.form.email.$dirty && $v.form.email.$invalid" style="color:red;">
              <div v-if="!$v.form.email.required" class="invalid-feedback">Email is required</div>
              <div v-if="!$v.form.email.email" class="invalid-feedback">Email is invalid</div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-sm-offset-1 col-xs-8 col-sm-offset-1">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              :class="{ 'is-invalid': form.submitted && !form.password }"
              @blur="$v.form.password.$touch()"
            />
            <div v-if="$v.form.password.$dirty && $v.form.password.$invalid" style="color:red;">
              <div v-if="!$v.form.password.required" class="invalid-feedback">Password is required</div>
              <div
                v-if="$v.form.password.required && !$v.form.password.isPasswordValid"
                class="invalid-feedback"
              >Password is invalid</div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-sm-offset-1 col-xs-8 col-sm-offset-1">
            <button class="btn btn-primary" type="submit">Register</button>
            <router-link to="/login" class="btn btn-link">Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import UserService from "../services/user.service";
import { required, email } from "vuelidate/lib/validators";
function isPasswordValid(val) {
  let pattern = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  if (pattern.test(val)) {
    return true;
  }
  return false;
}
export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        submitted: false,
        errors: []
      }
    };
  },
  userService: null,
  created() {
    this.userService = new UserService();
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required, isPasswordValid }
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault();
      
      this.$v.form.$touch();
      if (this.$v.form.$error) return;

      this.submitted = true;
      let user = await this.userService.register(this.form);
      if (user != null) {
        this.$router.push({
          name: "login",
          params: {
            message: "Registered successfully"
          }
        });
      }
    }
  }
};
</script>

<style>
.row {
  margin-left: 28%;
  margin-bottom: 1.5%;
}
.border {
  min-height: 100px;
  width: 50%;
  margin-left: 25%;
  border-bottom: 2px solid black;
}
</style>
