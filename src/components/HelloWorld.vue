<template>
  <p @click="showModal">Selected event {{ selectedEvent }}</p>
  {{ events[0] }}
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
      :events="events"
      @event-drop="onEventDragCreate"
      @event-click="onEventClick"
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
                  type="date"
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
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import $ from "jquery";
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
  created() {},
  data() {
    return {
      selectedEvent: "",
      showDialog: true,
      events: [
        {
          start: "2021-07-26 14:00",
          end: "2021-07-26 18:00",
          title: "Need to go shopping",
          icon: "shopping_cart", // Custom attribute.
          content: "Click to see my shopping list",
          contentFull:
            "My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>", // Custom attribute.
          class: "leisure",
          id: "ff",
        },
        {
          start: "2021-07-27 9:00",
          end: "2021-07-27 15:00",
          title: "Golf with John",
          icon: "golf_course", // Custom attribute.
          content: "Do I need to tell how many holes?",
          contentFull: "Okay.<br>It will be a 18 hole golf course.", // Custom attribute.
          class: "sport",
          id: "fg",
        },
      ],
    };
  },
  methods: {
    async onEventClick(event) {
      this.selectedEvent = event;
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
      var index = this.events.findIndex(
        (foundEvent) => foundEvent.id == event.event.id
      );
      this.events[index] = event.event;
      console.log(index);
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
