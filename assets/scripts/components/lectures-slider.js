const lecturesSlider = document.querySelector('.lectures__slider')

if (lecturesSlider) lecturesSliderInit()

function lecturesSliderInit () {
  const lecturesSliderSwiper = new Swiper(lecturesSlider, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".lectures__nav_next",
      prevEl: ".lectures__nav_prev",
    },
    pagination: {
      el: ".lectures__pagination",
      type: "bullets",
    },
    thumbs: {
      swiper: swiper,
    },
  });
}
