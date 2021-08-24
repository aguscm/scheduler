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
              v-if="isNewEventProp"
              class="form-check form-switch mb-3 row ms-1"
              @click="isRecurringEvent = !isRecurringEvent"
            >
              <label class="form-check-label" for="switch-calendar-private"
                >Recurring event</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="switch-recurring-event"
                v-model="isRecurringEvent"
                :value="isRecurringEvent"
              />
            </div>
            <div
              v-if="isRecurringEvent"
              class="recurring-event border rounded p-3"
            >
              <p class="mb-1">Recurrence pattern</p>
              <hr class="mt-0" />
              <div class="row">
                <!-- <div class="col-3 border-end">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="radio-repeating-pattern"
                      id="radio-repeating-pattern-weekly"
                    />
                    <label
                      class="form-check-label"
                      for="radio-repeating-pattern-weekly"
                    >
                      Weekly
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="radio-repeating-pattern"
                      id="radio-repeating-pattern-monthly"
                    />
                    <label
                      class="form-check-label"
                      for="radio-repeating-pattern-monthly"
                    >
                      Monthly
                    </label>
                  </div>
                </div> -->
                <div class="col-12">
                  <p>
                    Repeat every
                    <input
                      type="number"
                      class="form-control d-inline w-25"
                      aria-describedby="numberWeeks"
                      v-model="recurringEvent.repeatEvery"
                    />
                    weeks on:
                  </p>
                  <div class="repeating-week-days">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        id="checkbox-repeating-weekdays-monday"
                        value="monday"
                        v-model="recurringEvent.daysRepeating"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-monday"
                      >
                        Monday
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        value="tuesday"
                        v-model="recurringEvent.daysRepeating"
                        id="checkbox-repeating-weekdays-tuesday"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-tuesday"
                      >
                        Tuesday
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        value="wednesday"
                        v-model="recurringEvent.daysRepeating"
                        id="checkbox-repeating-weekdays-wednesday"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-wednesday"
                      >
                        Wednesday
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        value="thursday"
                        v-model="recurringEvent.daysRepeating"
                        id="checkbox-repeating-weekdays-thursday"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-thursday"
                      >
                        Thursday
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        value="friday"
                        v-model="recurringEvent.daysRepeating"
                        id="checkbox-repeating-weekdays-friday"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-friday"
                      >
                        Friday
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        value="saturday"
                        v-model="recurringEvent.daysRepeating"
                        id="checkbox-repeating-weekdays-saturday"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-saturday"
                      >
                        Saturday
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox-repeating-weekdays"
                        id="checkbox-repeating-weekdays-sunday"
                        value="sunday"
                        v-model="recurringEvent.daysRepeating"
                      />
                      <label
                        class="form-check-label"
                        for="checkbox-repeating-weekdays-sunday"
                      >
                        Sunday
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="mt-3" />
              <div class="row">
                <div class="col-auto">
                  <label
                    for="form-recurring-event-end-date"
                    class="col-form-label"
                    >End date</label
                  >
                </div>
                <div class="col-auto">
                  <input
                    class="form-control"
                    type="date"
                    id="form-recurring-event-end-date"
                    :min="startDateForm"
                    :disabled="!startDateForm"
                    v-model="endDateRecurringEvent"
                  />
                </div>
              </div>
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
            v-if="isNewEventProp && !isRecurringEvent"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="this.$emit('newEvent', selectedEvent)"
          >
            Create event
          </button>
          <button
            v-if="isNewEventProp && isRecurringEvent"
            type="button"
            class="btn btn-primary"
            @click="
              formatRecurringEventWeekly(),
                this.$emit('newRecurringEvent', recurringEvent)
            "
          >
            Create recurring event
          </button>
          <button
            v-if="!isNewEventProp && !isRecurringEvent"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="this.$emit('editEvent', selectedEvent.id, selectedEvent)"
          >
            Edit event
          </button>
          <button
            v-if="!isNewEventProp && isRecurringEvent"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="this.$emit('editRecurringEvent', selectedEvent.id, selectedEvent)"
          >
            Edit recurring events
          </button>
          <button
            v-if="!isNewEventProp && isRecurringEvent"
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="this.$emit('deleteRecurringEvent', selectedEvent.id)"
          >
            Delete recurring events
          </button>
          <button
            v-if="!isNewEventProp && !isRecurringEvent"
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="this.$emit('deleteEvent', selectedEvent.id)"
          >
            Delete event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventDetailsModal",
  props: [
    "selectedEventProp",
    "calendarsProp",
    "isNewEventProp",
    "isRecurringEventProp",
  ],
  emits: ["newEvent", "editEvent", "newRecurringEvent"],
  data() {
    return {
      startDateForm: "",
      startTimeForm: "",
      endTimeForm: "",
      selectedEvent: "",
      hoursEndRemaining: 0, //the time left in the form once the user has selected the start time
      //Recurring events
      isRecurringEvent: false,
      endDateRecurringEvent: "",
      recurringEvent: {
        id: "",
        title: "",
        calendar: "",
        start: "",
        end: "",
        repeatEvery: 0,
        daysRepeating: [],
      },
    };
  },
  created() {
    this.selectedEvent = this.selectedEventProp;
    this.isRecurringEvent = this.isRecurringEventProp;
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
    isRecurringEventProp: {
      deep: false,
      handler() {
        this.isRecurringEvent = this.isRecurringEventProp;
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
    formatRecurringEventWeekly() {
      this.recurringEvent.id = this.selectedEvent.id;
      this.recurringEvent.title = this.selectedEvent.title;
      this.recurringEvent.calendar = this.selectedEvent.calendar;
      this.recurringEvent.start = this.startDateForm + " " + this.startTimeForm;
      this.recurringEvent.end =
        this.endDateRecurringEvent + " " + this.endTimeForm;
      this.recurringEvent.repeatEvery = parseInt(
        this.recurringEvent.repeatEvery
      );
      this.recurringEvent.status = this.selectedEvent.status;
    },
  },
};
</script>

<style lang="scss" scoped></style>