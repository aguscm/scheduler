<template>
  <button
    type="button"
    class="btn ms-auto p-2 mb-3 white-background"
    data-bs-toggle="modal"
    data-bs-target="#eventDetailsModal"
    @click="clearSelectedEvent(), (isNewEvent = true)"
  >
    <font-awesome-icon :icon="['fa', 'calendar-plus']" /> New calendar
  </button>
  <div class="row">
    <div v-for="calendar in calendarsProp" :key="calendar.id" class="card col-12 col-sm-6 col-md-4 col-lg-3" style="">
      <div class="card-img-top" :style="'background-color:'+calendar.color+';'"/>
      <div class="card-body">
        <h5 class="card-title">{{calendar.name}}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <p>{{calendar.color}}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCalendars",
  created() {},
  data() {
    return {};
  },
  props: ["calendarsProp"],
  methods: {},
};
</script>

<style lang="scss" scoped>
.row {
  --bs-gutter-x: 0;
  --bs-gutter-y: 0;
}
.card-img-top {
  height: 3em;
  
}
</style>