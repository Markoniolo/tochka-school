const teacherProgramList = document.querySelector('.teacher-program__list')

if (teacherProgramList) teacherProgramListInit()

function teacherProgramListInit () {
  let lastScrollTop = 0
  const teacherProgramSwiper = new Swiper(teacherProgramList, {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 15,
    slidesPerGroup: 2,
    allowTouchMove: false,
    mousewheel: {
      releaseOnEdges: true,
    },
    breakpoints: {
      1200: {
        allowTouchMove: true
      },
    },
  })
}
