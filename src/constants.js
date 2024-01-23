export const API_URL =
  "https://59ffc807-33ff-41bb-9640-f7b1b8dcba2f-00-36w5xbivntje3.janeway.replit.dev";

const timeStamp = new Date();

let yearAndMonth = timeStamp.toJSON().slice(0, 8);
export let date = yearAndMonth + timeStamp.getDate();

let hours = timeStamp.getHours();
const formattedHours = hours < 10 ? `0${hours}` : hours;
let minutes = timeStamp.getMinutes();
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
export let time = `${formattedHours}:${formattedMinutes}`;
