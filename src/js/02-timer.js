import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timeInFuture = 0;

startButton.addEventListener('click', onStartButtonClick);

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startButton.disabled = true;
      Report.failure('Failure', 'Please choose a date in the future', 'Close', {
        backOverlay: false,
        titleFontSize: '22px',
        messageFontSize: '16px',
        backgroundColor: '#FCF0F9',
      });
    } else {
      timeInFuture = selectedDates[0].getTime();
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartButtonClick() {
  const timerId = setInterval(() => {
    const date = new Date();
    const currentTime = date.getTime();
    const diferentInTime = timeInFuture - currentTime;

    if (diferentInTime < 1000) {
      clearInterval(timerId);
    }

    daysEl.textContent = addLeadingZero(convertMs(diferentInTime).days);
    hoursEl.textContent = addLeadingZero(convertMs(diferentInTime).hours);
    minutesEl.textContent = addLeadingZero(convertMs(diferentInTime).minutes);
    secondsEl.textContent = addLeadingZero(convertMs(diferentInTime).seconds);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
