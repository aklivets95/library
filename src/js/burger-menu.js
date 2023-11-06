const burgerButton = document.querySelector('.header__burger-button');
const navigation = document.querySelector('.header__navigation');
const headerList = document.querySelector('.header__list');

burgerButton.addEventListener('click', () => {
  navigation.classList.toggle('header__navigation--active');
  burgerButton.classList.toggle('header__burger-button--active');
});

window.addEventListener('click', (evt) => {
  if (evt.target.nodeName !== 'svg' && evt.target.nodeName !== 'BUTTON' && evt.target.nodeName !== 'line' && evt.target !== headerList) {
    navigation.classList.remove('header__navigation--active');
    burgerButton.classList.remove('header__burger-button--active');
  }
});

export { navigation, burgerButton };
