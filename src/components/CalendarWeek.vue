<template>
  <div class="wrap">
    <table class="offset">
      <thead>
        <tr>
          <th colspan=8>{{week[0].getDate() + " " + week[0].toLocaleString('default', { month: 'long' }) + " - " + week[6].getDate() + " " + week[6].toLocaleString('default', { month: 'long' })}}</th>
        </tr>
        <tr>
          <th class="headcol"></th>
          <th>{{ week[0].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[0].getDate() }}</th>
          <th>{{week[1].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[1].getDate() }}</th>
          <th class="today">{{ week[2].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[2].getDate() }}</th>
          <th>{{ week[3].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[3].getDate() }}</th>
          <th>{{ week[4].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[4].getDate() }}</th>
          <th class="secondary">{{ week[5].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[5].getDate() }}</th>
          <th class="secondary">{{ week[6].toLocaleDateString('ca-ES', { weekday: 'long' }) + " " + week[6].getDate() }}</th>
        </tr>
      </thead>
      <tbody v-for="index in 24" :key="index">
        <calendar-week-hour :index="index"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import CalendarWeekHour from '@/components/CalendarWeekHour.vue';

export default {
  components: {CalendarWeekHour},
  name: "CalendarWeek",
  created() {
    this.getWeek();
    this.getToday();
  },
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
body {
  flex-direction: column;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-family: "DINPro", "Helvetica Neue", sans-serif;
  padding: 3rem;
  margin: 0;
  background: #fafafa;
  box-sizing: border-box;
  height: 100vh;
}

.offset {
}

.outer {
  position: relative;
}

.calendar {
  margin: 0 auto;
  max-width: 1280px;
  min-width: 500px;

  box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.2), 0px 3px 7px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.wrap {
  overflow-x: hidden;
  overflow-y: scroll;
  max-width: 1280px;
  height: 500px;
  border-radius: 8px;
}

thead {
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

thead th {
  text-align: center;
  width: 100%;
}

header {
  background: #fff;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0px 0px;
}

header h1 {
  font-size: 1.25rem;
  text-align: center;
  font-weight: normal;
}
/* tbody {
  position: relative;
  top: 100px;
} */
table {
  background: #fff;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.headcol {
  width: 60px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0;
  text-align: center;
  border: 0;
  position: relative;
  /* top: -12px; */
  border-bottom: 1px solid transparent;
}

thead th {
  font-size: 1rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.9);
  padding: 1rem;
}

thead {
  z-index: 2;
  background: white;
  border-bottom: 2px solid #ddd;
}


.secondary {
  color: rgba(0, 0, 0, 0.4);
}

.checkbox {
  display: none;
}

.checkbox + label {
  border: 0;
  outline: 0;
  width: 100px;
  height: 100px;
  background: white;
  color: transparent;
  display: block;
  display: none;
}

.checkbox:checked + label {
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%;
  background: red;
  color: transparent;
  display: inline-block;
}

.event {
  color: white;
  height:440%;
  border-radius: 2px;
  text-align: left;
  font-size: 0.875rem;
  z-index: 2;
  padding: 0.5rem;
  overflow-x: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.event:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  background: #00b4fc;
}

.event.double {
  height: 200%;
}

/**
thead {
    tr {
      display: block;
      position: relative;
    }
  }
tbody {
    display: block;
    overflow: auto;
    width: 800px;
    height: 100%;
  }
*/

td:hover:after {
  content: "+";
  vertical-align: middle;
  font-size: 1.875rem;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
}

button.secondary {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-weight: 500;
}

button.secondary:hover {
  background: #fafafa;
}
button.secondary:active {
  box-shadow: none;
}
button.secondary:focus {
  outline: 0;
}

.past {
  background: #fafafa;
}

.today {
  color: red;
}

.now {
  box-shadow: 0px -1px 0px 0px red;
}

.icon {
  font-size: 1.5rem;
  margin: 0 1rem;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  position: relative;
  top: -2px;
}

.icon:hover {
  color: red;
}
</style>
