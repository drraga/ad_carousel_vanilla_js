document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  setTimeout(() => {
    logo.classList.add('logo__active');
  }, 1000);
  drawImage(0, 'animateSlideInFromLeft');
});

const productList = [
  {
    name: 'Dolce Milk',
    price: 359,
    discount: 30,
    description: ['Молочко для тела'],
    image: 'picture_1.png',
  },
  {
    name: 'Perlier',
    price: 559,
    discount: 50,
    description: ['Гель для душа Fresia'],
    image: 'picture_2.png',
  },
  {
    name: 'Kundal',
    price: 1499,
    discount: 35,
    description: ['Гель для душа', 'Английская роза'],
    image: 'picture_3.png',
  },
];

const previousItemButton = document.querySelector('.slide-prev');
const nextButton = document.querySelector('.slide-next');
const productPricesHTML = document.querySelector('.product-price');
const productDescriptionHTML = document.querySelector('.product-description');

let currentSlideIndex = 0;
let isRightAnimation = true;

function drawImage(index, animationSide) {
  const sliderLine = document.querySelector('.slider-line');
  const img = document.createElement('img');
  img.src = productList[index].image;
  img.classList.add(animationSide, 'slide-single');

  while (sliderLine.firstChild) {
    sliderLine.removeChild(sliderLine.firstChild);
  }

  sliderLine.appendChild(img);

  const { price, discount, name, description } = productList[index];

  const discountedPrice = Math.floor(price - (price * discount / 100));
  const initialPriceHTML = document.querySelector('.product-price__initial p');
  const priceCurrentHTML = document.querySelector('.product-price__current p');
  const productDiscountPercentHTML = document.querySelector('.product-description__percent p');
  const productNameHTML = document.querySelector('.product-description__title p');
  const productDescriptionTextHTML = document.querySelector('.product-description__text');
  productDescriptionTextHTML.innerHTML = '';

  initialPriceHTML.innerHTML = `${price} руб.`;
  priceCurrentHTML.innerHTML = `${discountedPrice} руб.`;
  productDiscountPercentHTML.innerHTML = `-${discount}%`;
  productNameHTML.innerHTML = name.toUpperCase();
  description.forEach((desc) => {
    const p = document.createElement('p');
    p.innerHTML = desc;
    productDescriptionTextHTML.appendChild(p);
  });

  productPricesHTML.classList.remove('animateSlideInFromTop');
  void productPricesHTML.offsetWidth;
  productPricesHTML.classList.add('animateSlideInFromTop');

  productDescriptionHTML.classList.remove('animateSlideInFromBottom');
  void productDescriptionHTML.offsetWidth;
  productDescriptionHTML.classList.add('animateSlideInFromBottom');
}

function showItem(isNext) {
  if (isNext) {
    currentSlideIndex = (currentSlideIndex + 1) % productList.length;
  } else {
    currentSlideIndex = (currentSlideIndex - 1 + productList.length) % productList.length;
  }

  const animationSide = isRightAnimation ? 'animateSlideInFromRight' : 'animateSlideInFromLeft';
  drawImage(currentSlideIndex, animationSide);
  isRightAnimation = !isRightAnimation;
}

previousItemButton.addEventListener('click', () => showItem(false));
nextButton.addEventListener('click', () => showItem(true));

function startAutoSlide() {
  const slideInterval = 4000;
  let autoSlideInterval = setInterval(() => showItem(true), slideInterval);

  previousItemButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
  });

  nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
  });
}

startAutoSlide();