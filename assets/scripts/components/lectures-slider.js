const lecturesSlider = document.querySelector('.lectures__slider')

if (lecturesSlider) lecturesSliderInit()

function lecturesSliderInit () {
  let lecturesInnerHeight = 420
  let lecturesSliderSwiper

  if (lecturesSlider) {
    lecturesSliderSwiper = new Swiper(lecturesSlider, {
      autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".lectures__nav_next",
        prevEl: ".lectures__nav_prev",
      },
      pagination: {
        el: ".lectures__pagination",
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (++index) + '</span>';
        },
      },
      thumbs: {
        swiper: swiper,
      },
      breakpoints: {
        1200: {
          spaceBetween: 120
        }
      }
    })

    sliderItemsToggleInit()
  }

  const lecturesSingle = document.querySelector('.lectures_single')
  if (lecturesSingle) {
    const inner = lecturesSingle.querySelector('.lectures__inner')
    itemsToggleInit(inner)
  }

  function sliderItemsToggleInit () {
    const lecturesInnerArray = lecturesSlider.querySelectorAll('.lectures__inner')
    for (let i = 0; i < lecturesInnerArray.length; i++) {
      itemsToggleInit(lecturesInnerArray[i])
    }
  }

  function itemsToggleInit (lecturesInner) {
    const box = lecturesInner.querySelector('[data-element="lectures__box"]')
    const button = box.querySelector('[data-element="lectures__more"]')

    if (box.clientHeight > lecturesInnerHeight) {
      button.addEventListener('click', toggleItems)
      box.style.height = `${lecturesInnerHeight}px`
      lecturesInner.classList.add('lectures__inner_hide')
    } else {
      button.style.display = 'none'
    }

    function toggleItems () {
      if (lecturesInner.classList.contains('lectures__inner_open')) {
        button.innerHTML = 'Показать ещё'
        box.style.height = `${lecturesInnerHeight}px`
        lecturesInner.classList.remove('lectures__inner_open')
      } else {
        button.innerHTML = 'Скрыть'
        box.style.height = 'auto'
        lecturesInner.classList.add('lectures__inner_open')
      }
      if (lecturesSlider) lecturesSliderSwiper.update()
    }
  }
}
