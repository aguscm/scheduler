import axios from "axios";
import firebase from 'firebase/app';
import 'firebase/auth';

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

//Gets today's events
async function getTodayEvents() {
    const res = await axios.get(url + '/today/events');
    return await res.data;
}

//Gets the recurring events
async function getRecurringEvents() {
    const res = await axios.get(url + '/recurring-events');
    return await res.data;
}


//Edits an event that matches with the ID passed as a parameter
async function editEvent(eventId, event) {
    const res = await axios.put(url + `/events/${eventId}`, event);
    return res;
}

//Approves an event that matches with the ID passed as a parameter
async function approveEvent(eventId) {
    const res = await axios.put(url + `/approve/events/${eventId}`);
    return res;
}

//Rejects an event that matches with the ID passed as a parameter
async function rejectEvent(eventId) {
    const res = await axios.put(url + `/reject/events/${eventId}`);
    return res;
}

//Adds a new event
async function newEvent(event) {
    const res = await axios.post(url + '/events/', event)
    return res;
}

//Deletes an event
async function deleteEvent(eventId) {
    const res = await axios.delete(url + `/events/${eventId}`)
    return res;
}


//Sends a request to add a new event
async function newEventRequest(event) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + '/requests/events/', event, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

//Sends a request to edit an existing event
async function editEventRequest(eventId, event) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.put(url + `/requests/events/${eventId}`, event, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

//Deletes an event that belongs to the current user
async function deleteEventRequest(eventId) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.delete(url + `/requests/events/${eventId}`, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}



//Adds a new recurring event
async function newRecurringEvent(event) {
    const res = await axios.post(url + '/recurring-events/', event)
    return res;
}

//Edits a recurring event
async function editRecurringEvent(eventId, event) {
    const res = await axios.put(url + `/recurring-events/${eventId}`, event)
    return res;
}

//Deletes a recurring event
async function deleteRecurringEvent(eventId) {
    const res = await axios.delete(url + `/recurring-events/${eventId}`)
    return res;
}


//USERS

//Returns if the user has logged in
function isLoggedIn() {
    if (firebase.auth().currentUser != null) {
        return true;
    }
    return false;
}
//Returns Google token if the user has logged in
async function getTokenIfLoggedIn() {
    if (isLoggedIn()) {
        return await firebase.auth().currentUser.getIdToken();
    }
    return null;
}

//Gets a list of all users in Firebase
async function getUsers() {
    const token = await getTokenIfLoggedIn();
    const res = await axios.get(url + `/users`, {
        headers:
            { authorization: `Bearer ${token}` }
    });
    return res;
}

//EXPORTS
export default { getCalendars, editCalendar, newCalendar, getEvents, getTodayEvents, getRecurringEvents, editEvent, approveEvent, rejectEvent, newEvent, deleteEvent, newRecurringEvent, editRecurringEvent, deleteRecurringEvent, getUsers, newEventRequest, editEventRequest, deleteEventRequest };