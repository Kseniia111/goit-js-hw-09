import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timerDate = document.querySelector('#datetime-picker');
const timerButton = document.querySelector('[data-start]');
const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const timerSpans = document.querySelectorAll('.value');

let timerId = null;
timerButton.disabled = true;

flatpickr(timerDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      timerButton.disabled = true;
    } else {
      timerButton.disabled = false;

      Notiflix.Notify.success('Lets go?');
    }
  },
});

timerButton.addEventListener('click', onTimerButtonStartClick);

function onTimerButtonStartClick() {
    timerSpans.forEach(item => item.classList.toggle('end'));
    timerButton.disabled = true;
    timerDate.disabled = true;
    timerId = setInterval(() => {
        const needDate = new Date(date.value);
        const timeToFinish = needDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeToFinish);

        if (timeToFinish < 1000) {
            timerSpans.forEach(item => item.classList.toggle('end'));
            clearInterval(timerId);
            date.disabled = false;
        }
    }, 1000);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}