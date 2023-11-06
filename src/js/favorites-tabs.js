const TABS = document.querySelectorAll('.favorites__tabs-input');
const bookItems = document.querySelectorAll('.favorites__book-list');
let pastItem = bookItems[0];
bookItems[0].style.opacity = 1;
bookItems[0].style.zIndex = 1;
let currentItem;

const fadeIn = (el, timeout, display) => {
  const element = el;
  element.style.opacity = 0;
  element.style.display = display || 'block';
  element.style.transition = `opacity ${timeout}ms`;
  element.style.zIndex = 1;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 10);
};

const fadeOut = (el, timeout, display) => {
  const element = el;
  element.style.opacity = 1;
  element.style.transition = `opacity ${timeout}ms`;
  element.style.opacity = 0;
  element.style.zIndex = 0;

  setTimeout(() => {
    element.style.display = display;
  }, timeout);
};

if (window.innerWidth < 1025) {
  TABS.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      bookItems.forEach((item, index1) => {
        if (item.classList.contains(`favorites__book-list--${tab.value}`)) {
          currentItem = bookItems[index1];
        }
      });
      if (currentItem !== pastItem) {
        fadeOut(pastItem, 500, 'flex');
        pastItem.addEventListener('transitionend', () => {
          if (currentItem !== pastItem) {
            fadeIn(currentItem, 500, 'flex');
            pastItem = bookItems[index];
          }
        });
      } else {
        fadeIn(currentItem, 500, 'flex');
      }
    });
  });
} else {
  TABS.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      bookItems.forEach((item, index1) => {
        if (item.classList.contains(`favorites__book-list--${tab.value}`)) {
          currentItem = bookItems[index1];
        }
      });
      if (currentItem !== pastItem) {
        fadeOut(pastItem, 500, 'grid');
        pastItem.addEventListener('transitionend', () => {
          if (currentItem !== pastItem) {
            fadeIn(currentItem, 500, 'grid');
            pastItem = bookItems[index];
          }
        });
      } else {
        fadeIn(currentItem, 500, 'grid');
      }
    });
  });
}
