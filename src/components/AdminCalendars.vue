<template>
  <div class="container-fluid">
    <button
      type="button"
      class="btn ms-auto p-2 mb-3 white-background"
      data-bs-toggle="modal"
      data-bs-target="#newCalendarModal"
      @click="clearNewCalendarForm()"
    >
      <font-awesome-icon :icon="['fa', 'calendar-plus']" /> New calendar
    </button>
    <div class="row">
      <div
        v-for="calendar in calendarsProp"
        :key="calendar.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2"
        @click="tempCalendar = calendar"

      >
        <div class="me-2 card">
          <div
            class="card-img-top"
            :style="'background-color:' + calendar.color + ';'"
          />
          <div class="card-body">
            <form class="card-text" action="" >
              <div class="mb-1 row">
                <label for="name" class="col-sm-12 col-form-label"
                  >Name <span class="text-danger">*</span></label
                >
                <div class="col-sm-12">
                  <input
                    class="form-control"
                    type="text"
                    v-model="calendar.name"
                    placeholder="Write here the calendar's name"
                  />
                </div>
              </div>
              <div class="mb-1 row">
                <label for="name" class="col-sm-12 col-form-label"
                  >Capacity <span class="text-danger">*</span></label
                >
                <div class="col-sm-12">
                  <input
                    class="form-control"
                    type="number"
                    v-model="calendar.capacity"
                    placeholder="e.g. 20"
                  />
                </div>
              </div>
              <div class="mb-1 row">
                <label for="name" class="col-sm-12 col-form-label"
                  >Description</label
                >
                <div class="col-sm-12">
                  <textarea
                    v-model="calendar.description"
                    placeholder="Write here the calendar's description"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="mb-1 mt-3 row">
                <label for="name" class="col-sm-4 col-form-label"
                  >Color<span class="text-danger">*</span></label
                >
                <div class="col-sm-8">
                  <input
                    class="form-control form-control-color"
                    type="color"
                    v-model="calendar.color"
                    placeholder="e.g. #ffffff"
                  />
                </div>
              </div>
              <div
                class="form-check form-switch mb-1 mt-3 row"
                title="If enabled, the calendar is not shown to the public"
              >
                <label class="form-check-label" for="switch-calendar-private"
                  >Private</label
                >
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="switch-calendar-private"
                  v-model="calendar.private"
                />
              </div>
            </form>
            <div class="mt-3 d-flex">
              <button
                type="button"
                class="btn white-background me-auto"
                :class="{disabled : tempCalendar.id != calendar.id || (tempCalendar.id == calendar.id && tempCalendar.name != calendar.name)}"
                @click="editCalendar(calendar.id, calendar)"
              >
                Save changes
              </button>
              <button type="button" class="btn btn-danger ms-auto">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="newCalendarModal"
    tabindex="-1"
    aria-labelledby="newCalendarModallLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newCalendarModallLabel">New Calendar</h5>
        </div>
        <div class="modal-body">
          <form class="" action="">
            <div class="mb-1 row">
              <label for="name" class="col-sm-12 col-form-label"
                >Name <span class="text-danger">*</span></label
              >
              <div class="col-sm-12">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Write here the calendar's name"
                  v-model="newCalendarForm.name"
                />
              </div>
            </div>
            <div class="mb-1 row">
              <label for="name" class="col-sm-12 col-form-label"
                >Capacity <span class="text-danger">*</span></label
              >
              <div class="col-sm-12">
                <input
                  class="form-control"
                  type="number"
                  placeholder="e.g. 20"
                  v-model="newCalendarForm.capacity"
                />
              </div>
            </div>
            <div class="mb-1 row">
              <label for="name" class="col-sm-12 col-form-label"
                >Description</label
              >
              <div class="col-sm-12">
                <textarea
                  placeholder="Write here the calendar's description"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="newCalendarForm.description"
                ></textarea>
              </div>
            </div>
            <div class="mb-1 mt-3 row">
              <label for="name" class="col-sm-4 col-form-label"
                >Color<span class="text-danger">*</span></label
              >
              <div class="col-sm-8">
                <input
                  class="form-control form-control-color"
                  type="color"
                  placeholder="e.g. #ffffff"
                  v-model="newCalendarForm.color"
                />
              </div>
            </div>
            <div
              class="form-check form-switch mb-1 mt-3 row"
              title="If enabled, the calendar is not shown to the public"
            >
              <label class="form-check-label" for="switch-calendar-private"
                >Private</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="switch-calendar-private"
                v-model="newCalendarForm.private"
                value=false
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="newCalendar(newCalendarForm)">
            Create calendar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";

export default {
  name: "AdminCalendars",
  emits: ["loadCalendars"],
  created() {},
  data() {
    return {
      tempCalendar: "",
      newCalendarForm: {
        name: "",
        capacity: "",
        description: "",
        color: "",
        private: false,
      },
    };
  },
  props: ["calendarsProp"],
  methods: {
    //Send a request to the server to create a new calendar
    newCalendar(calendar) {
      return API.newCalendar(calendar)
        .then(() => this.$emit("loadCalendars"))
        .catch((err) => console.log(err));
    },
    //Send a request to the server to edit an existing calendar
    editCalendar(calendarId, calendar) {
      return API.editCalendar(calendarId, calendar)
        .then(() => this.$emit("loadCalendars"))
        .catch((err) => console.log(err));
    },
    clearNewCalendarForm() {
      this.newCalendarForm = {
        name: "",
        capacity: "",
        description: "",
        color: "",
        private: false,
      };
    },
  },
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
input[type="color"] {
  width: 100%;
}
</style>