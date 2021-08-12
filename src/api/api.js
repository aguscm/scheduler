import axios from "axios";

//DEV
var url = "http://localhost:5000"

//DATA
//Gets the calendars
async function getCalendars() {
    const res = await axios.get(url + '/calendars');
    return await res.data;
}

//Edits a calendar that matches with the ID passed as a parameter
async function editCalendar(calendarId, calendar) {
    const res = await axios.put(url + `/calendars/${calendarId}`, calendar);
    return res;
}

//Adds a new calendar
async function newCalendar(calendar) {
    const res = await axios.post(url + '/calendars/', calendar)
    return res;
}

//Gets the events
async function getEvents() {
    const res = await axios.get(url + '/events');
    return await res.data;
}

//Edits an event that matches with the ID passed as a parameter
async function editEvent(eventId, event) {
    const res = await axios.put(url + `/events/${eventId}`, event);
    return res;
}

//Approves an event that matches with the ID passed as a parameter
async function approveEvent(eventId) {
    const res = await axios.put(url + `/events/${eventId}`);
    return res;
}

//Rejects an event that matches with the ID passed as a parameter
async function rejectEvent(eventId) {
    const res = await axios.put(url + `/events/${eventId}`);
    return res;
}

//Adds a new event
async function newEvent(event) {
    const res = await axios.post(url + '/events/', event)
    return res;
}
//EXPORTS
export default { getCalendars, editCalendar, newCalendar, getEvents, editEvent, approveEvent, rejectEvent, newEvent };