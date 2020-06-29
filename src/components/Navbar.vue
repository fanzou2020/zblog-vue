<template>
  <nav class="navbar navbar-expand-sm navbar-dark navbar-custom">
    <router-link tag="a" to="/" class="navbar-brand">ZBLOG</router-link>
    <!-- for small screen, collapse toggle -->
    <button
      class="navbar-toggler d-lg-none"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavId"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!--  -->
    <div
      class="collapse navbar-collapse justify-content-end"
      id="collapsibleNavId"
    >
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link tag="a" to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style scoped>
.navbar-custom {
  background: rgb(56, 58, 56);
  border: none;
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
}
.nav-link,
.navbar-brand {
  color: white;
  font-size: 1.5rem;
}

@media (max-width: 575px) {
  /* .navbar-collapse {
    background-color:grey;
    display: block;
    width: 40px;
  } */
}
</style>
