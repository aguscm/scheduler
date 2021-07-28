<template>
  {{ events[0] }}
  {{ selectedEvent }}
  <div class="container">
    <vue-cal
      :time-from="7 * 60"
      :time-to="22 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      locale="ca"
      :editable-events="{
        title: true,
        drag: true,
        resize: true,
        delete: false,
        create: false,
      }"
      :events="events"
      @event-drop="onEventDragCreate"

    />
  </div>

  <calendar-week></calendar-week>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
      </li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
      </li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import CalendarWeek from "./CalendarWeek.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/i18n/ca.js";
import "vue-cal/dist/vuecal.css";

export default {
  components: { CalendarWeek, VueCal },
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
          id: "ff"
        },
        {
          start: "2021-07-27 10:00",
          end: "2021-07-27 15:00",
          title: "Golf with John",
          icon: "golf_course", // Custom attribute.
          content: "Do I need to tell how many holes?",
          contentFull: "Okay.<br>It will be a 18 hole golf course.", // Custom attribute.
          class: "sport",
          id: "fg"
        },
      ],
    };
  },
  methods: {
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    async onEventDragCreate(event) {
      // let id = await this.api.createEvent(
      //   event.start,
      //   event.end
      // ); /* this returns the assigned id from the database */
      // event.data = { id: id };
      // return event;
      console.log(event.event);
      var index = this.events.findIndex(foundEvent => foundEvent.id == event.event.id);
      this.events[index] = event.event;
      console.log(index);

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
