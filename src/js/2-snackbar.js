import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form-promise");

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const delay = e.target.elements.delay.value.trim();
  const state = e.target.elements.state.value;
 
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: 'green',
        position: 'topRight',
      })
    })
    .catch((delay) => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });
    });

  e.target.reset();
}




// const isSuccess = true;

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isSuccess) {
//       resolve("Success! Value passed to resolve function");
//     } else {
//       reject("Error! Error passed to reject function");
//     }
//   }, 5000);
// });

// console.log(promise);