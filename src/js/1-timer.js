import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

let userSelectedDate;

btnStart.disabled = true;

const options = {
  enableTime: true, // time
  time_24hr: true, // 24 години
  defaultDate: new Date(), // показує сьогоднішній день в інпуті
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 

    if (userSelectedDate < new Date) {
      iziToast.show({
        message: 'Please, choose a date in the future!',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });

      btnStart.disabled = true;
      
    } else {
      btnStart.disabled = false;
      btnStart.classList.add('btn-disabled-false');
    }  
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', onBtnClick);

function onBtnClick() {
  btnStart.disabled = true;
  btnStart.classList.remove('btn-disabled-false');

  input.disabled = true;
  input.style.color = "#808080";
  input.style.background = "#fafafa";
  
  let differenceTime = userSelectedDate - Date.now();

  const intervalId = setInterval(() => { 
    differenceTime -= 1000;
    const timeObj = convertMs(differenceTime);
    tick(timeObj);

    if (differenceTime <= 1000) {
      clearInterval(intervalId);
      
      input.disabled = false;
      input.style.color = "#2e2f42";
      input.style.background = "#fff"; 
    }
  }, 1000);
  
}

function tick({days, hours, minutes, seconds}) {
  day.textContent = `${addLeadingZero(days)}`
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}








