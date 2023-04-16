import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let delay = 0;
let step = 0;
let amount = 0;

form.addEventListener('submit', onFormSabmit);
form.addEventListener('input', onFormInput);

function onFormInput(e) {
  switch (e.target.name) {
    case 'delay':
      delay = Number(e.target.value);
      break;

    case 'step':
      step = Number(e.target.value);
      break;

    case 'amount':
      amount = Number(e.target.value);
      break;
  }
}

function onFormSabmit(e) {
  e.preventDefault();
  const rememberDelay = delay;
  delay -= step;

  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay);
  }
  delay = rememberDelay;
}

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
