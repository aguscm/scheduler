<template>
  <div class="container">
    <div class="buttons d-flex">
      <button
        type="button"
        class="btn p-2 white-background"
        data-bs-toggle="modal"
        data-bs-target="#eventDetailsModal"
        @click="clearSelectedEvent(), (isNewEvent = true)"
      >
        <font-awesome-icon :icon="['fa', 'calendar-plus']" /> New event
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

    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasFilters"
      aria-labelledby="offcanvasFiltersLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasFiltersLabel">Filters</h5>
        <button
          type="button"
          class="btn-close btn-close-white text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <form @submit.prevent v-on:change="filterEvents()">
            <div>
              <p>Filter by calendar</p>
              <div
                class="form-check"
                v-for="calendar in calendars"
                :key="calendar.id"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="calendar.id"
                  :id="'filterCalendar' + calendar.id"
                  v-model="checkedCalendars"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  {{ calendar.name }}
                </label>
              </div>
            </div>
            <hr />
            <div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="switch-show-weekends"
                  @click="showWeekends = !showWeekends"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Show weekends</label
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <vue-cal
      class="vue-cal"
      :time-from="7 * 60"
      :time-to="22 * 60"
      :time-step="30"
      :disable-views="['years', 'year']"
      :snap-to-time="15"
      :hide-weekends="!showWeekends"
      locale="ca"
      :editable-events="{
        title: false,
        drag: true,
        resize: true,
        delete: false,
        create: true,
      }"
      :events="events"
      @event-drop="onEventDragCreate"
      @event-click="onEventClick"
      @ready="colorEventsWCalendars(), checkCalendars()"
    />
  </div>
  <!-- //@ready="loadEvents" -->
  <!-- :events="!loadingEvents ? eventsFiltered : undefined" -->
  <!-- Modal -->
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
          <p v-if="!isNewEvent">
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
                  class="form-control"
                  id="form-end-time"
                  type="time"
                  v-model="endTimeForm"
                  @change="formatDateInForm()"
                  placeholder="Start time"
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
            v-if="isNewEvent"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="newEvent(selectedEvent)"
          >
            Create event
          </button>
          <button
            v-if="!isNewEvent"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="editEvent(selectedEvent.id, selectedEvent)"
          >
            Edit event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";
import VueCal from "vue-cal";
import { Modal } from "bootstrap";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/i18n/ca.js";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  name: "AdminEvents",
  props: ["eventsProp", "calendarsProp"],
  emits: ["loadEvents", "loadCalendars"],
  data() {
    return {
      selectedEvent: {
        id: "",
        calendar: "",
        title: "",
        start: "",
        end: "",
        status: "",
        class: "",
        content: "",
        contentFull: "",
        icon: "",
        creationDate: "",
        applicant: "",
      },

      //Filters
      checkedCalendars: [],
      showWeekends: false,

      //Form
      startDateForm: "",
      startTimeForm: "",
      endTimeForm: "",
      isNewEvent: false,
      //Loading and error variables
      loadingEvents: true,
      loadingCalendars: true,
      error: false,
      errorMsg: "",
      /**/
      showDialog: true,
      events: this.eventsProp,
      eventsFiltered: "",
      calendars: this.calendarsProp,
    };
  },
  watch: {
    // events: {
    //   deep: true,
    //   handler() {
    //     this.filterEvents();
    //   },
    // },
    loadingEvents: {
      deep: false,
      handler() {
        if (!this.loadingEvents && !this.loadingCalendars) {
          //Color the events with the color of each calendar
          this.colorEventsWCalendars();
          //check all the boxes of the checkedCalendars variable (filter form)
          this.calendars.forEach((calendar) =>
            this.checkedCalendars.push(calendar.id)
          );
        }
      },
    },
  },
  methods: {
    checkCalendars() {
      this.calendarsProp.forEach((calendar) =>
        this.checkedCalendars.push(calendar.id)
      );
    },
    filterEvents() {
      //Return the events that are in the calendar checked by the user
      this.events = this.eventsProp.filter((event) =>
        this.checkedCalendars.includes(event.calendar)
      );
    },
    loadFormSelectedEvent(id) {
      this.clearSelectedEvent();
      for (var index in this.events) {
        if (this.events[index].id == id) {
          this.selectedEvent.id = this.events[index].id;
          this.selectedEvent.calendar = this.events[index].calendar;
          this.selectedEvent.title = this.events[index].title;
          this.selectedEvent.start = this.events[index].start;
          this.selectedEvent.end = this.events[index].end;
          this.selectedEvent.status = this.events[index].status;
          this.selectedEvent.content = this.events[index].content;
          this.selectedEvent.contentFull = this.events[index].contentFull;
          this.selectedEvent.icon = this.events[index].icon;
          this.selectedEvent.creationDate = this.events[index].creationDate;
          this.selectedEvent.applicant = this.events[index].applicant;

          this.startDateForm = this.selectedEvent.start.split(" ")[0];
          this.startTimeForm = this.selectedEvent.start.split(" ")[1];
          this.endTimeForm = this.selectedEvent.end.split(" ")[1];
          break;
        }
      }
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
    //Send a request to the server to create a new event
    newEvent(event) {
      return API.newEvent(event)
        .then(() => this.$emit("loadCalendars"))
        .catch((err) => console.log(err));
    },
    //Send a request to the server to edit an existing event
    editEvent(eventId, event) {
      return API.editEvent(eventId, event)
        .then(() => this.$emit("loadCalendars"))
        .catch((err) => console.log(err));
    },
    formatDateInForm() {
      this.selectedEvent.start = this.startDateForm + " " + this.startTimeForm;
      this.selectedEvent.end = this.startDateForm + " " + this.endTimeForm;
    },
    async onEventClick(event) {
      this.loadFormSelectedEvent(event.id);
      this.showModal();
      this.isNewEvent = false; //Changes button of the form in an Edit format

      // Prevent navigating to narrower view (default vue-cal behavior).
      //e.stopPropagation();
    },
    async onEventDragCreate(event) {
      // let id = await this.api.createEvent(
      //   event.start,
      //   event.end
      // ); /* this returns the assigned id from the database */
      // event.data = { id: id };
      // return event;
      console.log(event.event);
    },
    async showModal() {
      var eventDetailsModal = new Modal(
        document.getElementById("eventDetailsModal")
      );
      eventDetailsModal.toggle();
    },
    clearSelectedEvent() {
      this.selectedEvent.id = "";
      this.selectedEvent.calendar = "";
      this.selectedEvent.title = "";
      this.selectedEvent.start = "";
      this.selectedEvent.end = "";
      this.selectedEvent.status = "";
      this.selectedEvent.content = "";
      this.selectedEvent.contentFull = "";
      this.selectedEvent.icon = "";
      this.selectedEvent.creationDate = "";
      this.selectedEvent.applicant = "";

      this.startDateForm = "";
      this.startTimeForm = "";
      this.endTimeForm = "";
    },
    async colorEventsWCalendars() {
      //Creates a CSS Stylesheet
      var sheet = (function () {
        // Create the <style> tag
        var style = document.createElement("style");

        // WebKit hack
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
      })();

      //For each calendar, it insert a rule with its background color
      this.calendars.forEach((calendar) => {
        var styles = ".calendar" + calendar.id + " {";
        styles += "background-color:" + calendar.color;
        styles += "!important;";
        styles += "}";
        sheet.insertRule(styles, 0);

        var stylePending = ".pending-event { border: 5px solid "+calendar.color+" }";
        sheet.insertRule(stylePending, 0);

        //For each event, it adds the class
        this.events.forEach((event) => {
          //Adds a new class to the "class" key of the event data
          
          if (event.status == "pending") {
            event.class = event.class.concat(" pending-event");
          }else {
            event.class = event.class.concat(" calendar" + event.calendar);
          }
          //if (calendar.id == event.calendar) {

          //}
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
@import "@/styles/global.scss";

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.offcanvas-header {
  color: white;
  background-color: $dark-color;
  button {
    background-color: transparent;
  }
}
</style>
