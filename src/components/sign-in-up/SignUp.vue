<template>
  <div class="container">
    <form class="form-style">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter your username"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword2">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Password"
        >
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" @click.prevent="onSubmit()" class="btn btn-primary">Sign Up</button>
      </div>
      <router-link
        class="nav-link text-center"
        :to="{ name: 'SignIn' }"
        activeClass="active"
        tag="p"
      >
        <a>Login</a>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      username: ""
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("signup", {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        userId: "",
        username: this.username
      });
    }
  }
};
</script>

<style>
.center-col {
  float: none;
  margin: 0;
}
.form-style {
  width: 400px;
  margin: auto;
  border: 1px solid gray;
  padding: 40px;
  margin-top: 20px;
  border-radius: 5px;
}
</style>

