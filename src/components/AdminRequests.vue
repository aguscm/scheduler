<template>
  <div class="container-fluid">
    <div class="buttons d-flex mb-3">
      <button
      v-if="eventsProp.filter((event) => event.status == 'pending').length > 0"
        type="button"
        class="btn p-2 btn-success"
        data-bs-toggle="modal"
        data-bs-target="#eventDetailsModal"
      >
        <font-awesome-icon :icon="['fa', 'calendar-plus']" /> Approve all
      </button>
      <button
        class="btn ms-auto p-2 white-background"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasFilters"
        aria-controls="offcanvasFilters"
      >
        <font-awesome-icon :icon="['fa', 'filter']" /> Filters
      </button>
    </div>
    <table class="table">
      <thead class="">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Calendar</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
          <th scope="col">Applicant</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in eventsProp" :key="event.id">
          <th scope="row">{{ event.title }}</th>
          <td>
            {{
              calendarsProp.filter(
                (calendar) => calendar.id == event.calendar
              )[0].name
            }}
          </td>
          <td>{{ event.start }}</td>
          <td>{{ event.end }}</td>
          <td>{{ event.applicant }}</td>
          <td>{{ event.status }}</td>
          <td>
            <button
              v-if="event.status != 'approved'"
              type="button"
              class="btn btn-success btn-sm me-1"
            >
              Approve
            </button>
            <button
              v-if="event.status != 'rejected'"
              type="button"
              class="btn btn-danger btn-sm me-1"
            >
              Reject
            </button>
            <button type="button" class="btn btn-secondary btn-sm">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AdminRequests",
  emits: ["loadEvents"],
  created() {},
  data() {
    return {};
  },
  props: ["eventsProp", "calendarsProp"],
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

thead {
  background-color: $dark-color;
  color: white;
}
</style>