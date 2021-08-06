<template>
  <header id="main-header" class="navbar navbar-expand-lg">
    <nav class="container-fluid row">
      <div class="navbar-brand col-2">
        <router-link to="/">
          <font-awesome-icon class="icon-logo" :icon="['fa', 'calendar-alt']" />
          <span class="font-weight-bold">Scheduler</span>
        </router-link>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse col-10" id="navbarScroll">
        <ul
          id="main-navbar"
          class="main-navbar navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/my-events" class="nav-link">My events</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add" class="nav-link">Add Event</router-link>
          </li>
          <li class="nav-item auth-button">
            <auth />
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <router-view v-slot="{Component}">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import Auth from "@/components/Auth.vue";

export default {
  name: "App",
  components: {
    Auth,
  },
};
</script>
<style lang="scss">
@import "@/styles/global.scss";

body {
  background: rgb(226, 233, 245);
  background: linear-gradient(
    90deg,
    rgba(226, 233, 245, 1) 0%,
    rgba(215, 221, 232, 1) 100%
  );
}

#app {
  font-family: Atkinson Hyperlegible, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#main-header {
  -webkit-box-shadow: 5px 10px 15px -4px rgb(0 0 0 / 42%);
  box-shadow: 5px 10px 15px -4px rgb(0 0 0 / 42%);
  background-color: $dark-color;
  z-index: 1000;
  a {
    color: white;
  }
  a:hover {
    color: $base-color !important;
  }
}

.navbar-brand {
  text-align: center;
  color: white;
  text-align: left;

  svg {
    margin-right: 0.5em;
    font-size: 1em;
  }
  a {
    text-decoration: none;
  }
}

#main-navbar li:not(:last-child) {
  margin: auto 2em auto 0;
}

#navbarScroll {
  padding: 0 !important;
}

.icon-logo {
  font-size: 2em;
}

.main-navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.auth-button {
  margin-left: auto;
  a {
    padding: 0 !important;
    margin: 0;
  }
}

/* route transitions*/ 
.route.enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: ass 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

</style>
