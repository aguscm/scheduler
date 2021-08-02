<template>
  <p @click="showModal">Selected event {{ selectedEvent }}</p>
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#eventDetailsModal"
  >
    New event
  </button>
  <div class="container">
    <vue-cal
      :time-from="7 * 60"
      :time-to="22 * 60"
      :time-step="30"
      :disable-views="['years', 'year']"
      :snap-to-time="15"
      hide-weekends
      locale="ca"
      :editable-events="{
        title: true,
        drag: true,
        resize: true,
        delete: false,
        create: true,
      }"
      :events="!loading ? events : undefined"
      @event-drop="onEventDragCreate"
      @event-click="onEventClick"
      @ready="loadEvents"
    />
  </div>

  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#eventDetailsModal"
  >
    Launch demo modal
  </button>

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
          <p>Created on {{formatDate(selectedEvent.creationDate)}}</p>
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
              <label for="name" class="col-sm-2 col-form-label"
                >Name <span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <input
                  class="form-control"
                  type="text"
                  v-model="selectedEvent.title"
                  placeholder="Write here the event's name"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label"
                >Date<span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <input
                  class="form-control"
                  type="date"
                  v-model="startDateForm"
                  @change="formatDateInForm()"
                  placeholder="Write here Foundation's name"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label"
                >Start time<span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <input
                  class="form-control"
                  type="time"
                  v-model="startTimeForm"
                  @change="formatDateInForm()"
                  placeholder="Start time"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label"
                >End time<span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <input
                  class="form-control"
                  type="time"
                  v-model="endTimeForm"
                  @change="formatDateInForm()"
                  placeholder="Start time"
                />
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
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="newEvent(selectedEvent)"
          >
            Create event
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
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    this.loadCalendars();
  },
  data() {
    return {
      selectedEvent: {
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

      //Form
      startDateForm: "",
      startTimeForm: "",
      endTimeForm: "",
      //Loading and error variables
      loading: true,
      error: false,
      errorMsg: "",
      /**/
      showDialog: true,
      events: "",
      calendars: "",
    };
  },
  methods: {
    loadEvents() {
      //Loads the main foundations database
      this.foundations = "";
      this.loading = true;
      return (
        API.getEvents()
          .then(
            (response) => ((this.events = response), (this.loading = false))
          )
          //If error
          .catch(
            (err) => (
              console.log(err), (this.isError = true), (this.errorMsg = err)
            )
          )
      );
    },
    loadCalendars() {
      //Loads the main foundations database
      this.foundations = "";
      this.loading = true;
      return (
        API.getCalendars()
          .then((response) => (this.calendars = response))
          //If error
          .catch(
            (err) => (
              console.log(err), (this.isError = true), (this.errorMsg = err)
            )
          )
      );
    },
    loadFormSelectedEvent(id) {
      this.clearSelectedEvent();
      for (var index in this.events) {
        if (this.events[index].id == id) {
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
    //Send a request to the server to create a new foundation
    newEvent(event) {
      return API.newEvent(event)
        .then(() => this.loadEvents())
        .catch((err) => console.log(err));
    },
    formatDateInForm() {
      this.selectedEvent.start = this.startDateForm + " " + this.startTimeForm;
      this.selectedEvent.end = this.startDateForm + " " + this.endTimeForm;
    },
    async onEventClick(event) {
      console.log(event.id);
      this.loadFormSelectedEvent(event.id);
      this.showModal();

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
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
