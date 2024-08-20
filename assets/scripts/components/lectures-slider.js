const lecturesSlider = document.querySelector('.lectures__slider')

if (lecturesSlider) lecturesSliderInit()

function lecturesSliderInit () {
  const lecturesSliderSwiper = new Swiper(lecturesSlider, {
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

  function sliderItemsToggleInit () {
    const boxes = lecturesSlider.querySelectorAll('[data-element="lectures__box"]')
    for (let i = 0; i < boxes.length; i++) {
      itemsToggleInit(boxes[i])
    }
  }

  function itemsToggleInit (box) {
    const list = box.querySelector('[data-element="lectures__list"]')
    const items = list.querySelectorAll('li')
    const button = box.querySelector('[data-element="lectures__more"]')

    const maxItems = window.innerWidth < 992 ? 3 : 4

    if (items.length > maxItems) {
      button.addEventListener('click', toggleItems)
      list.classList.add('lectures__list_hide')
    } else {
      button.style.display = 'none'
    }

    function toggleItems () {
      if (list.classList.contains('lectures__list_open')) {
        button.innerHTML = 'Показать ещё'
        list.classList.remove('lectures__list_open')
      } else {
        button.innerHTML = 'Скрыть'
        list.classList.add('lectures__list_open')
      }
      lecturesSliderSwiper.update()
    }
  }
}
