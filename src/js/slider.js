const sliderList = document.querySelector('.slider__list');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');
const dotsDesktop = document.querySelectorAll('.slider__pagination-item--desktop');
const dotsTablet = document.querySelectorAll('.slider__pagination-item');
const sliderLine = document.querySelector('.slider__container');
const sliderImages = document.querySelectorAll('.slider__item');
let position = 0;
let dotIndex = 0;

if (window.innerWidth < 1025) {
  sliderImages.forEach((el) => {
    const image = el;
    image.style.width = `${sliderLine.offsetWidth}px`;
  });
  const blockButton = () => {
    if (dotIndex === 0) {
      prevButton.disabled = true;
      nextButton.disabled = false;
    } else if (dotIndex === dotsTablet.length - 1) {
      nextButton.disabled = true;
      prevButton.disabled = false;
    } else {
      prevButton.disabled = false;
      nextButton.disabled = false;
    }
  };

  const showSlide = (index) => {
    dotsTablet.forEach((dot) => {
      dot.classList.remove('slider__pagination-item--active');
    });
    dotsTablet[index].classList.add('slider__pagination-item--active');
  };

  const nextSlide = () => {
    if (position < (dotsTablet.length - 1) * (sliderLine.offsetWidth + 66)) {
      position += (sliderLine.offsetWidth + 66);
      dotIndex += 1;
    }
    sliderList.style.left = `${-position}px`;
    showSlide(dotIndex);
    blockButton();
  };

  const prevSlide = () => {
    if (position > 0) {
      position -= (sliderLine.offsetWidth + 66);
      dotIndex -= 1;
    }
    sliderList.style.left = `${-position}px`;
    showSlide(dotIndex);
    blockButton();
  };

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  dotsTablet.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      position = (sliderLine.offsetWidth + 66) * index;
      sliderList.style.left = `${-position}px`;
      dotIndex = index;
      showSlide(dotIndex);
      blockButton();
    });
  });
} else {
  sliderImages.forEach((el) => {
    const image = el;
    image.style.width = `${(sliderLine.offsetWidth - 50) / 3}px`;
  });
  const showSlide = (index) => {
    dotsDesktop.forEach((dot) => {
      dot.classList.remove('slider__pagination-item--active');
    });
    dotsDesktop[index].classList.add('slider__pagination-item--active');
  };

  dotsDesktop.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      position = (sliderImages[0].offsetWidth + 25) * index;
      sliderList.style.left = `${-position}px`;
      dotIndex = index;
      showSlide(dotIndex);
    });
  });
}

// window.addEventListener('resize', (e) => {
//   const width = document.body.clientWidth;
//   if (width < 1025) {
//     console.log('hello');
//   } else {

//   }
// });
