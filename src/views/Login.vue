<template>
  <div class="row justify-content-center" style="margin-top:10px;">
    <div class="col-6 col-sm-4">
      <h3>Login</h3>
      <hr />
      <div class="row">
        <div
          ng-if="message!=null"
          v-bind:class="{'alert': message!=null, 'alert-success': message!=null}"
        >{{message}}</div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div v-if="form.errors.length" class="row error">
          <p v-for="error in form.errors" :key="error">{{error}}</p>
        </div>
        <div class="row">
          <div class="col-12 col-xs-10">
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

        <div class="row">
          <div class="col-12 col-xs-10">
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
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-xs-10">
            <button
              class="btn btn-primary"
              :disabled="$v.form.$error || $v.form.$invalid"
              type="submit"
            >Login</button>
          </div>
        </div>
      </form>
      <div class="row">
        <router-link to="/register" class="btn btn-link">create a new user?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
        submitted: false,
        errors: []
      }
    };
  },
  props: {
    message: {
      type: String
    }
  },
  userService: null,
  created() {
    this.userService = new UserService();
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault();

      this.$v.form.$touch();
      if (this.$v.form.$error) return;

      this.form.submitted = true;
      const { email, password } = this.form;
      if (email && password) {
        let user = await this.userService.login(email, password);
        if (user.id != null) {
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/home");
        } else {
          let error = "Email or password is invalid";
          if (!this.form.errors.includes(error)) this.form.errors.push(error);
        }
      }
    }
  }
};
</script>

<style>
</style>
