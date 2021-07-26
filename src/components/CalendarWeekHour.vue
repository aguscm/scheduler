<template>
  <tr>
    <td class="headcol">{{ index - 1 }}:00</td>
    <td :class="{ past: week[0] < today }" class="row">
      <div class="col-6 event bg-danger">
        <span>Reunió de poker</span><br /><span>00:00 a 01:00</span>
      </div>
      <div class="col-6 event bg-danger">
        <span>Reunió de poker</span><br /><span>00:00 a 01:00</span>
      </div>
    </td>
    <td :class="{ past: week[1] < today }"></td>
    <td :class="{ past: week[2] < today }"></td>
    <td :class="{ past: week[3] < today }"></td>
    <td :class="{ past: week[4] < today }"></td>
    <td :class="{ past: week[5] < today }"></td>
    <td :class="{ past: week[6] < today }"></td>
  </tr>
  <tr>
    <td class="headcol"></td>
    <td :class="{ past: week[0] < today }"></td>
    <td :class="{ past: week[1] < today }"></td>
    <td :class="{ past: week[2] < today }"></td>
    <td :class="{ past: week[3] < today }"></td>
    <td :class="{ past: week[4] < today }"></td>
    <td :class="{ past: week[5] < today }"></td>
    <td :class="{ past: week[6] < today }"></td>
  </tr>
  <tr>
    <td class="headcol"></td>
    <td :class="{ past: week[0] < today }"></td>
    <td :class="{ past: week[1] < today }"></td>
    <td :class="{ past: week[2] < today }"></td>
    <td :class="{ past: week[3] < today }"></td>
    <td :class="{ past: week[4] < today }"></td>
    <td :class="{ past: week[5] < today }"></td>
    <td :class="{ past: week[6] < today }"></td>
  </tr>
  <tr>
    <td class="headcol"></td>
    <td :class="{ past: week[0] < today }"></td>
    <td :class="{ past: week[1] < today }"></td>
    <td :class="{ past: week[2] < today }"></td>
    <td :class="{ past: week[3] < today }"></td>
    <td :class="{ past: week[4] < today }"></td>
    <td :class="{ past: week[5] < today }"></td>
    <td :class="{ past: week[6] < today }"></td>
  </tr>
</template>

<script>
export default {
  name: "CalendarWeekHour",
  created() {
    this.getWeek();
    this.getToday();
  },
  props: ["index"],
  data() {
    return {
      firstDayWeek: "",
      lastDayWeek: "",
      week: [],
      today: "",
    };
  },
  methods: {
    getToday() {
      this.today = new Date();
    },

    getCurrentWeek() {
      var d = new Date();
      var dayOfWeek = d.getDay();
      var dayOfMonth = d.getDate();

      var diff = dayOfMonth - dayOfWeek + 1;
      this.firstDayWeek = new Date(d.setDate(diff));
    },

    getWeek() {
      var d = new Date();
      var dayOfWeek = d.getDay();
      var dayOfMonth = d.getDate();
      var monday = new Date(d.setDate(dayOfMonth - dayOfWeek + 1)),
        result = [new Date(monday)];
      while (monday.setDate(monday.getDate() + 1) && monday.getDay() !== 1) {
        result.push(new Date(monday));
      }
      this.week = result;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.event {
  color: white;
  height: 440%;
  border-radius: 5px;
  text-align: left;
  font-size: 0.875rem;
  z-index: 2;
  padding: 0.5rem;
  overflow-x: hidden;
  transition: all 0.2s;
  cursor: pointer;
  border: 2px solid white;
}

.event:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  background: #00b4fc;
}

.event.double {
  height: 200%;
}

tr,
tr td {
  height: 20px;
}
td {
  text-align: center;
}
tr:nth-child(4n) td:not(.headcol) {
  border-bottom: 1px solid;
}

tr:nth-child(-n + 3) td:not(.headcol) {
  border-bottom: 1px solid #eee;
}

tr td {
  border-right: 1px solid #eee;
  padding: 0;
  white-space: none;
  word-wrap: nowrap;
}

tbody tr td {
  position: relative;
  vertical-align: top;
  height: 40px;
  padding: 0.25rem 0.25rem 0 0.25rem;
  width: auto;
}
</style>
