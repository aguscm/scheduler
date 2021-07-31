<template>
  <p @click="showModal">Selected event {{ selectedEvent }}</p>
  {{ events }}
  {{ selectedEvent }}
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
      :events="!loading? events : undefined"
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
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form action="">
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
                >Start date <span class="text-danger">*</span></label
              >
              <div class="col-sm-10">
                <input
                  class="form-control"
                  type="text"
                  v-model="selectedEvent.start"
                  placeholder="Write here Foundation's name"
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
            @click="updateEvent(selectedEvent)"
          >
            Save changes
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

  },
  data() {
    return {
      selectedEvent: "",
      //Loading and error variables
      loading: true,
      error: false,
      errorMsg: "",
      /**/
      showDialog: true,
      events: ""
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
            (response) => (
              (this.events = response), (this.loading = false)
            )
          )
          //If error
          .catch(
            (err) => (
              console.log(err), (this.isError = true), (this.errorMsg = err)
            )
          )
      );
    },
    async onEventClick(event) {
      this.selectedEvent = this.events[this.findEventInEvents(event)];
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
    findEventInEvents(event) {
      console.log(event.id);
      var index = this.events.findIndex(
        (foundEvent) => foundEvent.id == event.event.id
      );
      return index;
    },
    updateEvent(event) {
      var index = this.events.findIndex(
        (foundEvent) => foundEvent.id == event.id
      );
      this.events[index] = event.event;
    },
    async showModal() {
      var eventDetailsModal = new Modal(
        document.getElementById("eventDetailsModal")
      );
      eventDetailsModal.toggle();
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
