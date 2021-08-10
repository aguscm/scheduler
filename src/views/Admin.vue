<template>
  <loading v-if="!events || !calendars"></loading>
  <div class="row">
    <nav id="sidebar" class="col-2">
      <div class="d-flex align-items-start admin-list position-fixed">
        <div
          class="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <div class="admin-panel-title mb-5 h5 d-none d-lg-inline">
            Admin panel
          </div>
          <button
            class="nav-link active"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            <font-awesome-icon
              class="icon-logo align-middle"
              :icon="['fa', 'calendar-alt']"
            />
            <span class="ms-3 font-weight-bold align-middle d-none d-lg-inline"
              >Events</span
            >
          </button>
          <hr />
          <button
            class="nav-link"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            <span class="position-relative">
              <font-awesome-icon
                class="icon-logo align-middle"
                :icon="['fa', 'clipboard-list']"
              />

              <span
                class="
                  font-weight-bold
                  align-middle
                  d-none d-lg-inline
                  position-relative
                  ms-3
                "
                >Requests
              </span> </span
            ><span v-if="events" class="badge bg-danger">{{
              events.filter((event) => event.status == "pending").length
            }}</span>
          </button>
          <hr />
          <button
            class="nav-link"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            <font-awesome-icon
              class="icon-logo align-middle"
              :icon="['fa', 'calendar-check']"
            />
            <span class="ms-3 font-weight-bold align-middle d-none d-lg-inline"
              >Calendars</span
            >
          </button>
        </div>
      </div>
    </nav>
    <div class="tab-content admin-list col-10" id="v-pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="v-pills-home"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        <admin-events
          v-if="events && calendars"
          :eventsProp="events"
          :calendarsProp="calendars"
          @loadEvents="loadEvents()"
          @loadCalendars="loadCalendars()"
        />
      </div>
      <div
        class="tab-pane fade"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <admin-requests
          v-if="events && calendars"
          :eventsProp="events"
          :calendarsProp="calendars"
          @loadEvents="loadEvents()"
        />
      </div>
      <div
        class="tab-pane fade"
        id="v-pills-messages"
        role="tabpanel"
        aria-labelledby="v-pills-messages-tab"
      >
        <admin-calendars
          v-if="calendars"
          :calendarsProp="calendars"
          @loadCalendars="loadCalendars()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";
import AdminEvents from "@/components/AdminEvents.vue";
import AdminCalendars from "@/components/AdminCalendars.vue";
import AdminRequests from "@/components/AdminRequests.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "Admin",
  components: {
    AdminEvents,
    AdminCalendars,
    AdminRequests,
    Loading
  },
  data() {
    return {
      //Main data
      events: "",
      calendars: "",

      //Loading and errors
      loadingEvents: true,
      loadingCalendars: true,
      error: false,
      errorMsg: "",
    };
  },
  async created() {
    this.loadCalendars();
    this.loadEvents();
  },
  methods: {
    async loadCalendars() {
      this.calendars = "";
      this.loadingCalendars = true;
      return (
        API.getCalendars()
          .then(
            (response) => (this.calendars = response),
            (this.loadingCalendars = false)
          )
          //If error
          .catch(
            (err) => (
              console.log(err), (this.isError = true), (this.errorMsg = err)
            )
          )
      );
    },
    async loadEvents() {
      //Loads the main foundations database
      this.events = "";
      this.loadingEvents = true;
      return (
        API.getEvents()
          .then(
            (response) => (
              (this.events = response), (this.loadingEvents = false)
            )
          )
          //If error
          .catch(
            (err) => (
              console.log(err),
              (this.isError = true),
              (this.loadingEvents = false),
              (this.errorMsg = err)
            )
          )
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  color: $dark-color;
  background-color: white;
  padding: 1em 1em 1em 2em !important;
  // margin-right: 1em;
  -webkit-box-shadow: 5px 10px 15px -4px rgba(0, 0, 0, 0.42);
  box-shadow: 5px 10px 15px -4px rgba(0, 0, 0, 0.42);
  min-height: 100vh;
  overflow: hidden;
  hr {
    color: transparent !important;
    margin: 1em;
  }
}
.admin-list {
  margin: 1em auto auto auto;
  overflow: hidden;
  li {
    // margin-bottom: 3em;
    :hover {
      color: $base-color;
    }
  }
  a {
    text-decoration: none;
    color: $text-color;
  }
  svg {
    font-size: 1.5em;
  }
}

.nav-link {
  background-color: transparent !important;
  color: $dark-color !important;
  padding: 0 !important;
  text-align: left;
}
.nav-pills .active {
  color: $base-color !important;
}
.nav-link:hover {
  color: $base-color !important;
}

.admin-panel-title {
  width: 100%;
}
</style>
