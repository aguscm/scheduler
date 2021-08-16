<template>
  <div class="container-fluid m-3">
    <h1 class="mb-5">Upcoming events</h1>
    <div class="cards horizontal-scrolling">
      <div
        v-for="event in events"
        :key="event.id"
        class="card shadow-md me-3"
        style="width: 18rem"
      >
        <div class="card-img-top">
          <span class="h1 text-center text-light">{{
            event.start.split(" ").pop()
          }}</span>
          <br />
          <span class="h1 text-center text-light">{{
            event.calendarName
          }}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{ event.title }}</strong>
          </h5>
          <p class="card-text">Starts: {{ event.start.split(" ").pop() }}</p>
          <p class="card-text">Ends: {{ event.end.split(" ").pop() }}</p>
        </div>
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
      errorMsg: false,
    };
  },
  props: {},
  methods: {
    async loadEvents() {
      //Loads the main foundations database
      this.events = "";
      return (
        API.getTodayEvents()
          .then((response) => (this.events = response))
          //If error
          .catch(
            (err) => (
              console.log(err), (this.isError = true), (this.errorMsg = err)
            )
          )
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 25em;
}
.card-img-top {
  height: 8em;
  background: rgb(random(20) + 90, random(10) + 180, random(10) + 190);
  padding: 1em;
}

.horizontal-scrolling {
  width: auto !important;
  white-space: nowrap !important;
  > div {
    display: inline-block !important;
  }
}
</style>