import axios from "axios";

//DEV
var url = "http://localhost:5000"

//DATA
//Gets the calendars
async function getCalendars() {
    const res = await axios.get(url + '/calendars');
    return await res.data;
}

//Gets the events
async function getEvents() {
    const res = await axios.get(url + '/events');
    return await res.data;
}

//Edits an event data that matches with the ID passed as a parameter
async function editEvent(eventId, event) {
    const res = await axios.put(url + `/events/${eventId}`, event);
    return res;
}

//Adds a new foundation
async function newEvent(event) {
    console.log(event);
    const res = await axios.post(url + '/events/', event)
    return res;
}
//EXPORTS
export default { getCalendars, getEvents, editEvent, newEvent };