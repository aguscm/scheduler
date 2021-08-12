<template>
  <div class="container-fluid mt-5 mb-5">
    <div v-for="event in events" :key="event.id" class="card" style="width: 18rem">
      <img class="card-img-top" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title"><strong>{{event.title}}</strong></h5>
        <p class="card-text">
          {{event.content}}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";

export default {
  name: "Home",
  created() {
    this.loadEvents();
  },
  data() {
    return {
      events: "",
      isError: false,
      errorMsg: false
    };
  },
  props: {},
  methods: {
    async loadEvents() {
      //Loads the main foundations database
      this.events = "";
      return (
        API.getEvents()
          .then(
            (response) => (
              (this.events = response)
            )
          )
          //If error
          .catch(
            (err) => (
              console.log(err),
              (this.isError = true),
              (this.errorMsg = err)
            )
          )
      );
    },
  },
};
</script>

<style lang="scss" scoped>
// #main-header {
//   display: none;
// }
</style>