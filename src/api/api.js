import axios from "axios";

//DEV
var url = "http://localhost:5000"

//DATA
//Gets the events
async function getEvents() {
    const res = await axios.get(url + '/');
    return await res.data;
}

//EXPORTS
export default { getEvents };