export const API_URL = "https://connectify-backend-64h0.onrender.com";

const timeStamp = new Date();

let yearAndMonth = timeStamp.toJSON().slice(0, 8);
export let date = yearAndMonth + timeStamp.getDate();

let hours = timeStamp.getHours();
const formattedHours = hours < 10 ? `0${hours}` : hours;
let minutes = timeStamp.getMinutes();
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
export let time = `${formattedHours}:${formattedMinutes}`;

export const followBtnStyle =
  " flex-grow text-white lg:text-purple-600 p-1 text-center bg-purple-600 lg:bg-white rounded-sm lg:rounded-none ";
