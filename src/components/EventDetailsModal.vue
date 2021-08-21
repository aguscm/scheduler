<template>
  <div
    class="modal fade"
    id="eventDetailsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Event details</h5>
          <p v-if="!isNewEventProp">
            Created on {{ formatDate(selectedEvent.creationDate) }}
          </p>
        </div>
        <div class="modal-body">
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
                    v-for="calendar in calendarsProp"
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
                <select
                  class="form-select"
                  aria-label="Select the hours"
                  v-model="startTimeForm"
                  @change="formatDateInForm(), gethoursEndRemainingInForm()"
                  :disabled="!startDateForm"
                >
                  <option selected></option>
                  <option
                    v-for="hours in 96"
                    :key="hours"
                    :value="minutesToHours((hours - 1) * 15)"
                  >
                    {{ minutesToHours((hours - 1) * 15) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="form-end-time" class="col-sm-2 col-form-label"
                >End time<span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <select
                  class="form-select"
                  aria-label="Select the hours"
                  v-model="endTimeForm"
                  @change="formatDateInForm()"
                  :disabled="!startTimeForm"
                >
                  <option selected></option>
                  <option
                    v-for="hours in 96 - hoursEndRemaining - 1"
                    :key="hours"
                    :value="minutesToHours((hours + hoursEndRemaining) * 15)"
                  >
                    {{ minutesToHours((hours + hoursEndRemaining) * 15) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="form-status" class="col-sm-2 col-form-label"
                >Status<span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <select
                  class="form-control"
                  id="form-status"
                  v-model="selectedEvent.status"
                >
                  <option value="approved">
                    <span class="text-danger">Approved</span>
                  </option>
                  <option value="pending">Pending approval</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div
              class="form-check form-switch mb-3 row ms-1"
              @click="
                selectedEvent.recurringEvent.isRecurringEvent =
                  !selectedEvent.recurringEvent.isRecurringEvent
              "
            >
              <label class="form-check-label" for="switch-calendar-private"
                >Recurring event</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="switch-recurring-event"
                v-model="selectedEvent.recurringEvent.isRecurringEvent"
                :value="selectedEvent.recurringEvent.isRecurringEvent"
              />
            </div>
            <div
              v-if="selectedEvent.recurringEvent.isRecurringEvent"
              class="recurring-event"
            >
              fgsdg
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
          <button
            v-if="isNewEventProp"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="this.$emit('newEvent', selectedEvent)"
          >
            Create event
          </button>
          <button
            v-if="!isNewEventProp"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="this.$emit('editEvent', selectedEvent.id, selectedEvent)"
          >
            Edit event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventDetailsModal",
  props: ["selectedEventProp", "calendarsProp", "isNewEventProp"],
  emits: ["newEvent", "editEvent"],
  data() {
    return {
      startDateForm: "",
      startTimeForm: "",
      endTimeForm: "",
      selectedEvent: "",
      hoursEndRemaining: 0, //the time left in the form once the user has selected the start time
    };
  },
  created() {
    this.selectedEvent = this.selectedEventProp;
  },
  watch: {
    selectedEventProp: {
      deep: true,
      handler() {
        this.selectedEvent = this.selectedEventProp;
        if (this.selectedEvent.start)
          this.startDateForm = this.selectedEvent.start.split(" ")[0];
        if (this.selectedEvent.start)
          this.startTimeForm = this.selectedEvent.start.split(" ")[1];
        if (this.selectedEvent.end)
          this.endTimeForm = this.selectedEvent.end.split(" ")[1];
      },
    },
    isNewEventProp: {
      deep: false,
      handler() {
        if (this.isNewEventProp) {
          this.startDateForm = "";
          this.startTimeForm = "";
          this.endTimeForm = "";
        }
      },
    },
  },
  methods: {
    minutesToHours(min) {
      var hours = min / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      if (rhours < 10) rhours = "0" + rhours;
      if (rminutes < 10) rminutes = "0" + rminutes;
      return rhours + ":" + rminutes;
    },
    formatDateInForm() {
      this.selectedEvent.start = this.startDateForm + " " + this.startTimeForm;
      this.selectedEvent.end = this.startDateForm + " " + this.endTimeForm;
    },
    formatDate(time) {
      var date_ob = new Date(time);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      let hour = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return date + "/" + month + "/" + year + "-" + hour + ":" + minutes;
    },
    gethoursEndRemainingInForm() {
      if (this.startDateForm) {
        var hourStart = parseInt(this.startTimeForm.split(":")[0]);
        var minuteStart = parseInt(this.startTimeForm.split(":")[1]);
        this.hoursEndRemaining = hourStart * 4 + minuteStart / 15;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>