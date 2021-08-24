<template>
  <div class="container-fluid">
    <loading v-if="loading"></loading>
    <div class="buttons d-flex">
      <button
        type="button"
        class="btn p-2 white-background"
        @click="
          clearSelectedEvent(),
            $emit('openEventDetailsModal', selectedEvent, true, false)
        "
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
      :time-to="21 * 60"
      :time-step="30"
      :disable-views="['years', 'year']"
      :snap-to-time="15"
      :hide-weekends="!showWeekends"
      locale="ca"
      :selected-date="selectedDayOnCalendarProp"
      :editable-events="{
        title: false,
        drag: true,
        resize: true,
        delete: false,
        create: true,
      }"
      :drag-to-create-event="false"
      :events="events"
      @event-duration-change="onEventDurationChange"
      @event-drop="onEventDrag"
      @event-click="onEventClick"
      @ready="colorEventsWCalendars(), checkCalendars()"
    />

    <div
      class="modal fade"
      id="modalConfirmRecurringEvent"
      tabindex="-1"
      aria-labelledby="modalConfirmRecurringEvent"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit recurring event</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Do you want to edit only this event, or only the recurring events
            from now?
          </div>
          <div class="modal-footer">
            <button
              @click="
                toggleRecurringEventModal(),
                  $emit('openEventDetailsModal', selectedEvent, false, false)
              "
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary mb-1"
            >
              Only this event
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="
                toggleRecurringEventModal(),
                  $emit('openEventDetailsModal', selectedEvent, false, true)
              "
            >
              Only the events from this event
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import Loading from "@/components/Loading.vue";
import { selectedEvent } from "@/mixins/SelectedEvent.js";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/i18n/ca.js";
import "vue-cal/dist/vuecal.css";
import * as bootstrap from "bootstrap";

export default {
  components: { VueCal, Loading },
  mixins: [selectedEvent],
  name: "AdminEvents",
  props: ["eventsProp", "calendarsProp", "selectedDayOnCalendarProp"],
  emits: ["loadEvents", "loadCalendars", "openEventDetailsModal", "editEvent"],
  data() {
    return {
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
      errorMsg: {
        title: "",
        body: "",
      },
      /**/
      showDialog: true,
      events: this.eventsProp,
      eventsFiltered: "",
      calendars: this.calendarsProp,
      loading: false,

      /**/
      recurringEventModal: "",
    };
  },
  watch: {
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
  mounted() {
    this.recurringEventModal = new bootstrap.Modal(
      document.getElementById("modalConfirmRecurringEvent")
    );
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
    async onEventClick(event) {
      //Opens modal if the event is recurring
      this.loadFormSelectedEvent(event.id, this.events);

      if (this.selectedEvent.recurringEventId) {
        this.toggleRecurringEventModal();
      } else {
        //Shows modal with the selected event and isNewEvent = false
        this.$emit("openEventDetailsModal", this.selectedEvent, false, false);
      }

      // Prevent navigating to narrower view (default vue-cal behavior).
      //e.stopPropagation();
    },
    onEventDrag(event) {
      this.loadFormSelectedEvent(event.event.id, this.events);
      this.selectedEvent.start =
        event.event.start.format() + " " + event.event.start.formatTime();
      this.selectedEvent.end =
        event.event.end.format() + " " + event.event.end.formatTime();
      this.$emit("editEvent", this.selectedEvent.id, this.selectedEvent);
    },
    onEventDurationChange(event) {
      this.loadFormSelectedEvent(event.event.id, this.events);
      this.selectedEvent.start =
        event.event.start.format() + " " + event.event.start.formatTime();
      this.selectedEvent.end =
        event.event.end.format() + " " + event.event.end.formatTime();
      this.$emit("editEvent", this.selectedEvent.id, this.selectedEvent);
    },

    toggleRecurringEventModal() {
      this.recurringEventModal.toggle();
    },
    async colorEventsWCalendars() {
      //1. Creates a CSS Stylesheet
      var sheet = (function () {
        // Create the <style> tag
        var style = document.createElement("style");

        // WebKit hack
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
      })();

      //2. For each calendar, it insert a rule with its background color or border color
      this.calendars.forEach((calendar) => {
        var styles = ".calendar" + calendar.id + " {";
        styles += "background-color:" + calendar.color;
        styles += "!important;";
        styles += "}";
        sheet.insertRule(styles, 0);

        var stylePending =
          ".pending-event" +
          calendar.id +
          " { border: 5px solid " +
          calendar.color +
          " }";
        sheet.insertRule(stylePending, 0);
      });

      //3. For each event, it adds the class
      this.events.forEach((event) => {
        //Adds a new class to the "class" key of the event data

        if (event.status == "pending") {
          event.class = event.class.concat(" pending-event" + event.calendar);
        } else {
          event.class = event.class.concat(" calendar" + event.calendar);
        }
        //if (calendar.id == event.calendar) {

        //}
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
