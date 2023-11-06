/* eslint-disable no-plusplus */
import { navigation, burgerButton } from './burger-menu';

const profileButton = document.querySelector('.header__button');
const dropMenu = document.querySelector('.drop-menu');
const modalLinks = document.querySelectorAll('.modal-link');
const MODAL = document.querySelector('.modal');
const modalCloseButtons = document.querySelectorAll('.modal__close');
const registerInputs = document.querySelectorAll('.register__input');
const registerForm = document.querySelector('.register__form');
const loginForm = document.querySelector('.login__form');
const loginInputs = document.querySelectorAll('.login__input');
// eslint-disable-next-line import/no-mutable-exports
let dataUsers = JSON.parse(window.localStorage.getItem('users'));
const logOutButton = document.querySelector('.drop-menu__button--log-out');
const dropMenuTitle = document.querySelector('.drop-menu__name');
const copyButton = document.querySelector('.profile__card-number-button');
const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileCardNumber = document.querySelector('.profile__card-number-value');
const countVisits = document.querySelector('.profile__count-value--visits');
const countBooks = document.querySelector('.profile__count-value--books');
const favoritesBookLinks = document.querySelectorAll('.favorites__book-button');
const buyCardForm = document.querySelector('.buy-card__form');
const buyCardFormButton = document.querySelector('.buy-card__form-button');
const buyCardFormInputs = document.querySelectorAll('.buy-card__input');
const booksCollection = document.querySelectorAll('.favorites__book-item');
const rentedBooks = document.querySelector('.profile__rented-list');
const visitsCount = document.querySelector('.visits__count');
const booksCount = document.querySelector('.books__count');

if (dataUsers === null) {
  document.body.classList.remove('login');
} else {
  for (let i = 0; i < dataUsers.length; i++) {
    if (dataUsers[i].login || dataUsers[i] === null) {
      favoritesBookLinks.forEach((link) => {
        link.setAttribute('id', '#buy-card');
      });
      const logoUser = dataUsers[i].firstName[0].toUpperCase()
        + dataUsers[i].lastName[0].toUpperCase();
      profileButton.textContent = logoUser;
      profileAvatar.textContent = logoUser;
      profileName.textContent = `${dataUsers[i].firstName} ${dataUsers[i].lastName}`;
      profileButton.setAttribute('title', `${dataUsers[i].firstName} ${dataUsers[i].lastName}`);
      dropMenuTitle.style.fontSize = '12px';
      dropMenuTitle.textContent = dataUsers[i].cardNumber;
      profileCardNumber.textContent = dataUsers[i].cardNumber;
      document.body.classList.add('login');
      countVisits.textContent = dataUsers[i].visits;
      countBooks.textContent = dataUsers[i].booksCount;
      dataUsers[i].booksNames.forEach((el) => {
        const nameBook = el.split(',')[0];
        const rentedBook = document.createElement('li');
        rentedBook.classList.add('profile__rented-item');
        rentedBook.textContent = el;
        rentedBooks.insertBefore(rentedBook, rentedBooks.firstChild);
        booksCollection.forEach((book) => {
          const bookElement = book;
          const button = bookElement.querySelector('.favorites__book-button');
          if (bookElement.querySelector('.favorites__book-name').textContent === nameBook) {
            button.classList.add('favorites__book-button--owned');
            button.textContent = 'Own';
            button.disabled = true;
          }
        });
      });
      if (rentedBooks.children.length > 1) {
        rentedBooks.querySelector('.profile__rented-item--example').remove();
      }
      if (dataUsers[i].card === true) {
        favoritesBookLinks.forEach((link) => {
          link.setAttribute('id', '#');
        });
      }
      break;
    } else {
      document.body.classList.remove('login');
    }
  }
}

profileButton.addEventListener('click', () => {
  dropMenu.classList.toggle('drop-menu--active');
  navigation.classList.remove('header__navigation--active');
  burgerButton.classList.remove('header__burger-button--active');
});

window.addEventListener('click', (evt) => {
  if (!profileButton.contains(evt.target) && !dropMenu.contains(evt.target)) {
    dropMenu.classList.remove('drop-menu--active');
  }
});

function modalClose(modalActive) {
  modalActive.classList.remove('modal__content--open');
  document.querySelector('.modal').classList.remove('modal--open');
}

function modalOpen(currentModal) {
  if (currentModal) {
    const modalActive = document.querySelector('.modal__content--open');
    if (modalActive) {
      modalClose(modalActive);
    }
    currentModal.classList.add('modal__content--open');
    document.querySelector('.modal').classList.add('modal--open');
    MODAL.addEventListener('click', (evt) => {
      if (!evt.target.closest('.modal__content')) {
        modalClose(currentModal);
      }
    });
  }
}
modalLinks.forEach((modalLink) => {
  modalLink.addEventListener('click', (evt) => {
    const modalName = modalLink.getAttribute('id').replace('#', '');
    const currentPopup = document.getElementById(modalName);
    modalOpen(currentPopup);
    evt.preventDefault();
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    modalClose(evt.target.closest('.modal__content'));
    evt.preventDefault();
  });
});

const getRandomNumber = () => {
  const Number = Math.floor(Math.random() * (Math.floor(999999999)
    - Math.ceil(200000000))) + Math.ceil(300000000);
  return `F${Number.toString(16).toUpperCase()}`;
};

registerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const user = {
    firstName: registerInputs[0].value,
    lastName: registerInputs[1].value,
    email: registerInputs[2].value,
    password: registerInputs[3].value,
    cardNumber: getRandomNumber(),
    login: true,
    visits: 1,
    booksCount: 0,
    card: false,
    booksNames: [],
  };
  const userLogin = `${registerInputs[0].value[0].toUpperCase()}${registerInputs[1].value[0].toUpperCase()}`;
  profileButton.textContent = userLogin;
  const arr = JSON.parse(window.localStorage.getItem('users')) || [];
  arr.push(user);
  window.localStorage.setItem('users', JSON.stringify(arr));
  window.location.reload();
});

loginForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const loginValue = loginInputs[0].value;
  const passwordValue = loginInputs[1].value;
  if (dataUsers !== null) {
    dataUsers.forEach((user) => {
      const userLement = user;
      if ((loginValue === userLement.email || loginValue === userLement.cardNumber)
        && passwordValue === userLement.password) {
        userLement.login = true;
        userLement.visits++;
        evt.preventDefault();
        window.localStorage.setItem('users', JSON.stringify(dataUsers));
        window.location.reload();
      }
    });
  }
});

logOutButton.addEventListener('click', () => {
  dataUsers.forEach((user) => {
    const userLement = user;
    if (userLement.login) {
      userLement.login = false;
    }
  });
  window.localStorage.setItem('users', JSON.stringify(dataUsers));
  window.location.reload();
});

copyButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(dropMenuTitle.textContent);
});

const checkInputs = () => {
  let count = 0;
  buyCardFormInputs.forEach((input) => {
    if (input.value.length > 0) {
      count += 1;
    }
  });
  if (count === 7) {
    return true;
  }
  return false;
};

buyCardFormButton.disabled = true;
buyCardFormInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value.length < 1) {
      buyCardFormButton.disabled = true;
    } else if (checkInputs()) {
      buyCardFormButton.disabled = false;
    }
  });
});

buyCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  dataUsers.forEach((user) => {
    const userElement = user;
    if (profileCardNumber.textContent === userElement.cardNumber) {
      userElement.card = true;
      evt.preventDefault();
      window.localStorage.setItem('users', JSON.stringify(dataUsers));
      window.location.reload();
    }
  });
});

favoritesBookLinks.forEach((button) => {
  const buttonElement = button;
  if (dataUsers !== null) {
    buttonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      dataUsers.forEach((user) => {
        const userElement = user;
        if (profileCardNumber.textContent === userElement.cardNumber && userElement.card === true) {
          buttonElement.classList.add('favorites__book-button--owned');
          buttonElement.textContent = 'Own';
          buttonElement.disabled = true;
          const nameBook = buttonElement.closest('.favorites__book-wrapper').querySelector('.favorites__book-name').textContent;
          const authorBook = buttonElement.closest('.favorites__book-wrapper').querySelector('.favorites__book-author').textContent.replace('By ', '');
          userElement.booksNames.push(`${nameBook}, ${authorBook}`);
          userElement.booksCount += 1;
          if (rentedBooks.firstElementChild.textContent === 'No books yet') {
            rentedBooks.firstElementChild.remove();
          }
          const rentedBook = document.createElement('li');
          rentedBook.classList.add('profile__rented-item');
          rentedBook.textContent = `${nameBook}, ${authorBook}`;
          rentedBooks.insertBefore(rentedBook, rentedBooks.firstChild);
          window.localStorage.setItem('users', JSON.stringify(dataUsers));
          dataUsers = JSON.parse(window.localStorage.getItem('users'));
          countBooks.textContent = userElement.booksCount;
          booksCount.textContent = userElement.booksCount;
        }
      });
    });
  }
});

export { dataUsers, visitsCount, booksCount };
