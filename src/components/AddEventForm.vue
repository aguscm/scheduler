<template>
  <form action="">
    <div class="mb-3 row">
      <label for="calendar" class="col-sm-2 col-form-label"
        >Calendar<span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <select
          aria-label="calendar"
          name="calendar"
          class="form-select mb-3"
          v-model="selectedEvent.calendar"
        >
          <option
            v-for="calendar in calendars"
            :key="calendar.id"
            :value="calendar.id"
          >
            {{ calendar.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="form-name" class="col-sm-2 col-form-label"
        >Name <span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <input
          class="form-control"
          type="text"
          id="form-name"
          v-model="selectedEvent.title"
          placeholder="Write here the event's name"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="form-date" class="col-sm-2 col-form-label"
        >Date<span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <input
          class="form-control"
          type="date"
          id="form-date"
          v-model="startDateForm"
          @change="formatDateInForm()"
          placeholder="Write here Foundation's name"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="form-start-time" class="col-sm-2 col-form-label"
        >Start time<span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <input
          class="form-control"
          id="form-start-time"
          type="time"
          v-model="startTimeForm"
          @change="formatDateInForm()"
          placeholder="Start time"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="form-end-time" class="col-sm-2 col-form-label"
        >End time<span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <input
          class="form-control disabled"
          id="form-end-time"
          type="time"
          v-model="endTimeForm"
          @change="formatDateInForm()"
          placeholder="End time"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="form-status" class="col-sm-2 col-form-label"
        >Status<span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <select class="form-control" id="form-status">
          <option selected value="approved">
            <span class="text-danger">Approved</span>
          </option>
          <option value="pending">Pending approval</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddEventForm",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>