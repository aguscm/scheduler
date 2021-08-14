<template>
  <div class="container-fluid">
    <div class="buttons d-flex mb-3 mt-1 justify-content-between">
      <div class="d-flex align-items-center">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="approved"
            v-model="checkedStatusFilter"
          />
          <label class="form-check-label" for="inlineCheckbox1">Approved</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="pending"
            v-model="checkedStatusFilter"
            checked
          />
          <label class="form-check-label" for="inlineCheckbox2">Pending</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="rejected"
            v-model="checkedStatusFilter"
          />
          <label class="form-check-label" for="inlineCheckbox3">Rejected</label>
        </div>
      </div>

      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="Search"
          v-model="searchFilter"
        />
      </div>
    </div>

    <div>
      <table class="table table-hover">
        <thead class="">
          <tr class="header-table">
            <th scope="col" @click="sort('applicant')">Applicant</th>
            <th scope="col" @click="sort('title')">Name</th>
            <th scope="col" @click="sort('calendarName')">Calendar</th>
            <th scope="col" @click="sort('start')">Start</th>
            <th scope="col" @click="sort('end')">End</th>
            <th scope="col" @click="sort('status')">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in PaginatedfilteredEvents" :key="event.id">
            <td>{{ event.applicant }}</td>
            <th scope="row">{{ event.title }}</th>
            <td>
              {{ event.calendarName }}
            </td>
            <td>{{ event.start }}</td>
            <td>{{ event.end }}</td>

            <td>{{ event.status }}</td>
            <td>
              <button
                v-if="event.status != 'approved'"
                type="button"
                class="btn btn-success btn-sm me-1"
                @click="approveEvent(event.id)"
              >
                Approve
              </button>
              <button
                v-if="event.status != 'rejected'"
                type="button"
                class="btn btn-danger btn-sm me-1"
                @click="rejectEvent(event.id)"
              >
                Reject
              </button>
              <button type="button" class="btn btn-secondary btn-sm">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-footer d-flex justify-content-end">
        <button
          v-if="
            eventsProp.filter((event) => event.status == 'pending').length > 0
          "
          type="button"
          class="btn btn-success me-5"
          data-bs-toggle="modal"
          data-bs-target="#eventDetailsModal"
        >
          <font-awesome-icon :icon="['fa', 'calendar-plus']" /> Approve all
        </button>
        <div class="table-control-pages">
          <button
            type="button"
            class="btn"
            v-bind:class="{ disabled: tableCurrentPage <= 1 }"
            @click="prevPage"
            aria-label="Previous page"
          >
            &lt;
          </button>
          <button
            type="button"
            class="btn"
            v-bind:class="{ disabled: tableCurrentPage == page }"
            @click="tableCurrentPage = page"
            v-for="page in Math.ceil(
              filterAndOrderedEvents.length / tablePageSize
            )"
            :key="page"
          >
            {{ page }}
          </button>
          <button
            type="button"
            class="btn"
            v-bind:class="{
              disabled:
                tableCurrentPage * tablePageSize >=
                filterAndOrderedEvents.length,
            }"
            @click="nextPage"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/api.js";

export default {
  name: "AdminRequests",
  components: {
  },
  emits: ["loadEvents"],
  created() {},
  data() {
    return {
      //Table
      currentSort: "title",
      currentSortDir: "asc",
      tablePageSize: 50,
      tableCurrentPage: 1,
      searchFilter: "",
      checkedStatusFilter: ["pending"],
      /* */
      events: this.eventsProp,
    };
  },
  props: ["eventsProp", "calendarsProp"],
  methods: {
    //Approves an event
    async approveEvent(eventId) {
      return API.approveEvent(eventId)
        .then(() => this.$emit("loadEvents"))
        .catch((err) => console.log(err));
    },
    //Rejects an event
    async rejectEvent(eventId) {
      return API.rejectEvent(eventId)
        .then(() => this.$emit("loadEvents"))
        .catch((err) => console.log(err));
    },
    //Edits an event
    async editEvent(eventId, event) {
      return API.editEvent(eventId, event)
        .then(() => this.$emit("loadEvents"))
        .catch((err) => console.log(err));
    },
    //TABLE FUNCTIONS
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage: function () {
      if (
        this.tableCurrentPage * this.tablePageSize <=
        this.filterAndOrderedEvents.length
      )
        this.tableCurrentPage++;
    },
    prevPage: function () {
      if (this.tableCurrentPage > 1) this.tableCurrentPage--;
    },
    /**** */
  },
  computed: {
    //Events filtered and ordered by the user
    filterAndOrderedEvents() {
      let eventsTemp = this.eventsProp;
      return (
        eventsTemp
          //Sort by columns
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === "desc") modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          })
          //Filter by title
          .filter((row) => {
            let titleFilter = row.title.toString().toLowerCase();
            return titleFilter.includes(this.searchFilter);
          })
          //Filter by status
          .filter((event) => {
            return this.checkedStatusFilter.includes(event.status);
          })
      );
    },
    PaginatedfilteredEvents() {
      //Filter by page
      return this.filterAndOrderedEvents.filter((row, index) => {
        let start = (this.tableCurrentPage - 1) * this.tablePageSize;
        let end = this.tableCurrentPage * this.tablePageSize;
        if (index >= start && index < end) return true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
table {
  background-color: rgba(255, 255, 255, 0.9);
}
thead {
  background-color: $dark-color;
  color: white;
}

.header-table:not(:last-child) th {
  cursor: pointer;
}

.table-control-pages button {
  background-color: $dark-color;
  color: white;
  margin: auto 0.25em auto 0.25em;
}
.table-control-pages button:hover {
  background-color: $base-color;
}

.input-group {
  width: 25%;
}
</style>