<template>
  <div id="login">
    <Navbar />
    <div class="global-container">
      <div class="card login-form">
        <div class="card-body">
          <h3 class="card-title text-center">Log in to ZBLOG</h3>
          <div class="card-text">
            <form>
              <div class="form-group">
                <label for="exampleInputUsername">Username</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="exampleInputUsername"
                  v-model="username"
                />
                <span>{{ username }}</span>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <a href="#" style="float:right;font-size:12px;"
                  >Forgot password?</a
                >
                <input
                  type="password"
                  class="form-control form-control-sm"
                  id="exampleInputPassword1"
                  v-model="password"
                />
                <span>{{ password }}</span>
              </div>
              <button
                type="button"
                @click="formSubmit"
                class="btn btn-primary btn-block"
              >
                Sign in
              </button>

              <div class="sign-up">
                Don't have an account? <a href="#">Create One</a>
              </div>
              <div v-if="hasError">Login Failed</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      hasError: false
    };
  },
  components: {
    Navbar
  },
  methods: {
    formSubmit(event) {
      this.hasError = true;
      const loginUrl = this.HOST + "/login";
      this.$axios
        .post(loginUrl, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          // if login successfully, change login state and login username in store.
          if (res.status === 200) {
            this.$store.dispatch('updateLogin', true);
            this.$store.dispatch('updateUsername', this.username)
            this.$router.push("/");
          }
          else {
            this.hasError = true;
          }
          console.log(this.$store.state)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#login {
  height: 100%;
}
.global-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

form {
  padding-top: 10px;
  font-size: 14px;
  margin-top: 30px;
}

.card-title {
  font-weight: 300;
}

.btn {
  font-size: 14px;
  margin-top: 20px;
}

.login-form {
  width: 330px;
  margin: 20px;
}

.sign-up {
  text-align: center;
  padding: 20px 0 0;
}

.alert {
  margin-bottom: -30px;
  font-size: 13px;
  margin-top: 20px;
}
</style>
