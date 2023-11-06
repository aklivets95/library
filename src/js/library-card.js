import { dataUsers, visitsCount, booksCount } from './modal-menu';

const libraryForm = document.querySelector('.library-card__form');
const inputName = libraryForm.querySelector('#name');
const inputCard = libraryForm.querySelector('#number');
const formWrapper = document.querySelector('.form__wrapper');

setTimeout(() => {
  if (document.body.classList.contains('login')) {
    dataUsers.forEach((user) => {
      if (user.login === true) {
        inputName.setAttribute('value', user.firstName);
        inputName.setAttribute('readonly', 'true');
        inputCard.setAttribute('value', user.cardNumber);
        inputCard.setAttribute('readonly', 'true');
        visitsCount.textContent = user.visits;
        booksCount.textContent = user.booksCount;
      }
    });
  }
}, 100);

libraryForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  dataUsers.forEach((obj) => {
    if (obj.firstName === inputName.value && obj.cardNumber === inputCard.value) {
      formWrapper.classList.add('form__wrapper--active');
      visitsCount.textContent = obj.visits;
      booksCount.textContent = obj.booksCount;
    }
  });
  setTimeout(() => {
    formWrapper.classList.remove('form__wrapper--active');
    evt.target.reset();
  }, 10000);
});

export { visitsCount, booksCount };
