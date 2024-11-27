// воспроизведение видео video-wrapper по кнопке play
document.addEventListener('DOMContentLoaded', (event) => {
  const videoWrapperArray = document.querySelectorAll('.video-wrapper');

  for (let i = 0; i < videoWrapperArray.length; i++) {
    videoWrapperInit(videoWrapperArray[i])
  }

  function videoWrapperInit (videoWrapper) {
    const playerButtonBox = videoWrapper.querySelector('.player-button-box');
    const videoPlayer = videoWrapper.querySelector('.video-player');
    if (!playerButtonBox || !videoPlayer) return

    playerButtonBox.addEventListener('click', playVideo, { once: true })
    function playVideo () {
      videoPlayer.play()
      playerButtonBox.style.display = 'none'
      videoPlayer.setAttribute('controls', 'true')
    }
  }
})

// Вызов функции при загрузке страницы и изменении размера окна
document.addEventListener('DOMContentLoaded', (event) => {
  const poster = document.querySelector('.video-poster');
  const playerButton = document.querySelector('.player-button');
  const iframe = document.querySelector('.video-iframe');

  var courseWatch_count = 0;

  if (poster && playerButton && iframe) {
    const playVideo = () => {
      poster.style.display = 'none';
      playerButton.style.display = 'none';
      iframe.style.display = 'block';
      //   iframe.src += "&autoplay=1"; // Автозапуск видео
      iframe.src = iframe.getAttribute('data-src') + "&autoplay=1&muted=1&t=0"; // Автозапуск видео

      if(iframe.classList.contains("course_watch")){
        var handleCourseWatch = function( r_iframe ) {
          var handler = function(event) {
            var message = JSON.parse(event.data);

            // console.log(message.type); // some type

            if(courseWatch_count == 0){
              // console.log(message);
              switch (message.type) {
                case 'player:ready':
                  // console.log(message);
                  r_iframe.contentWindow.postMessage(JSON.stringify({type: 'player:play',data: {}}), '*');
                  r_iframe.contentWindow.postMessage(JSON.stringify({type: 'player:unMute',data: {time: 0}}), '*');
                  r_iframe.contentWindow.postMessage(JSON.stringify({type: 'player:setCurrentTime',data: {time: 0}}), '*');
                case 'player:rollState':
                  // console.log(message);
                  if(message.data.state == 'play'){
                    r_iframe.contentWindow.postMessage(JSON.stringify({type: 'player:pause',data: {}}), '*');
                  }
                  if(message.data.state == 'complete' ){
                    r_iframe.contentWindow.postMessage(JSON.stringify({type: 'player:setCurrentTime',data: {time: 0}}), '*');
                    r_iframe.contentWindow.postMessage(JSON.stringify({type: 'player:play',data: {}}), '*');
                    courseWatch_count++;
                    //window.removeEventListener("message", handleCourseWatch);
                    // console.log(message.data.state);
                  }
                // break;
              };
            }else{
              window.removeEventListener("message", handleCourseWatch);
            }
          };
          return handler;
        };

        var r_iframe = document.querySelector('.course_watch');
        // console.log(r_iframe);
        window.addEventListener('message', handleCourseWatch(r_iframe));


      }
    };

    poster.addEventListener('click', playVideo);
    playerButton.addEventListener('click', playVideo);
  }
});

//скрипт для шапки
$(function(){
  fixedHeader()
  window.addEventListener('scroll', fixedHeader, { passive: true });

  function fixedHeader () {
    if (window.pageYOffset > 200) {
      $('header').addClass('fixed');
    }
    else if (window.pageYOffset < 100) {
      $('header').removeClass('fixed');
    }
  }
});


$(document).ready(function(){

// скрипт для мобильного меню
  $('.mobile-nav').click(function () {
    $(".mobile-nav, header, nav, .close").toggleClass('active');
    $("body").toggleClass('lock');
  });

  $(document).on('mouseup', function(e){
    let s = $('.mobile-nav, nav');
    if(!s.is(e.target) && s.has(e.target).length === 0) {
      s.removeClass('active');
      $("body").removeClass('lock');
      $(".close").removeClass('active');
      $("header").removeClass('active');
    }
  });


//анимация цифр в блоке - Мы в цифрах
  var $numbers = $('.numbers');

  if ($numbers.length) {
    var animationStarted = false;

    $(window).scroll(function() {
      var numbersOffset = $numbers.offset().top;
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scrollTop + windowHeight > numbersOffset) {
        $numbers.addClass('active');
      } else {
        $numbers.removeClass('active');
      }

      if (!animationStarted && scrollTop + windowHeight > numbersOffset) {
        $('.count').each(function() {
          var $this = $(this),
            countTo = $this.text(),
            from = parseFloat($this.data('from')) || 0,
            to = parseFloat(countTo.replace(/\s/g, ''));

          $({ countNum: from }).animate({
              countNum: to
            },
            {
              duration: 2000,
              easing: 'linear',
              step: function() {
                $this.text(Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
              },
              complete: function() {
                $this.text(countTo);
              }
            });
          $this.data('from', to);
        });
        animationStarted = true;
      }
    });
  }

//скрипт для отзывов - развернуть/свернуть текст
  if ($('.review-content').length) {
    function collapseAll() {
      $('.review-content').css('max-height', '250px');
      $('.expand-button').text('показать ещё');
    }

    $('.review-content').each(function() {
      var reviewContent = $(this);
      var maxHeight = 250;

      if (reviewContent.height() > maxHeight) {
        reviewContent.css('overflow', 'hidden').css('max-height', maxHeight + 'px');
        var button = $('<button>').text('Показать полностью').addClass('expand-button');
        reviewContent.after(button);

        button.on('click', function() {
          var isExpanded = reviewContent.css('max-height') === 'none';
          reviewContent.css('max-height', isExpanded ? maxHeight + 'px' : 'none');
          $(this).text(isExpanded ? 'Показать полностью' : 'свернуть');
        });
      }
    });

    $(document).on('click', function(event) {
      var $target = $(event.target);
      if (!$target.closest('.review-content').length && !$target.hasClass('expand-button')) {
        collapseAll();
      }
    });
  }

// Скрипт для навигации в подвале
  if ($('.footer-nav h3').length) {
    $('.footer-nav h3').click(function(){
      $(this).siblings('ul').toggleClass('active');
      $(this).toggleClass('active');
    });
  }

// Скрипт для форматирования имени в отзывах
  var $reviewNameSpans = $('.review-name span');
  if ($reviewNameSpans.length) {
    $reviewNameSpans.each(function() {
      var fullName = $(this).text().trim();
      var names = fullName.split(' ');
      if (names.length > 1) {
        $(this).html(names[0] + '<br>' + names.slice(1).join(' '));
      }
    });
  }


// скрипт для якорной ссылки
  if ($('.anchor').length) {
    $(".anchor").on("click", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
        top = $(id).offset().top - 70;
      $('body,html').animate({scrollTop: top}, 10);
    });
  }


//скрипт для переноса блоков
  function rearrangeLinks() {
    var windowWidth = $(window).width(); // Получаем текущую ширину окна

    $('.classes-teacher').each(function(){
      var $teacherBlock = $(this);
      var $teacherImage = $teacherBlock.find('.classes-teacher-image');
      if(windowWidth < 1200) {
        $teacherBlock.find('.classes-teacher-header').prepend($teacherImage);
      } else {
        $teacherBlock.prepend($teacherImage);
      }
    });

    $('.platform-image, .platform-content').each(function(){
      var $target = (windowWidth < 1200 && windowWidth > 768) ? $('.platform-image') : $('.platform-content');
      $target.append($('.platform-more'));
    });

    $('.footer-contact, .fblk').each(function(){
      var $target = (windowWidth < 1200) ? $('.footer-contact') : $('.fblk');
      $target.append($('.footer-adress'));
    });

    $('.fblk, .footer-col').each(function(){
      var $target = (windowWidth < 1200) ? $('.fblk') : $('.footer-col');
      $target.append($('.footer-bottom'));
    });

    $('.consult-info, .licence-block').each(function(){
      var $target = (windowWidth < 768) ? $('.consult-info') : $('.licence-block');
      $target.prepend($('.consult-image'));
    });

    $('.offer-teacher .container, .offer-teacher-name-blk').each(function(){
      var $target = (windowWidth < 768) ? $('.offer-teacher .container') : $('.offer-teacher-name-blk');
      $target.prepend($('.btn-starts'));
    });

    $('.teacher-block-row, .teacher-block-info').each(function(){
      var $target = (windowWidth < 768) ? $('.teacher-block-row') : $('.teacher-block-info');
      $target.prepend($('.teach'));
    });

    $('.licence-number, .licence-info').each(function(){
      var $target = (windowWidth < 576) ? $('.licence-number') : $('.licence-info');
      $target.append($('.link'));
    });

    $('.fblk-contact, .fblk').each(function(){
      var $target = (windowWidth < 576) ? $('.fblk-contact') : $('.fblk');
      $target.prepend($('.footer-logo'));
    });

    $('.fblk, .footer-bottom').each(function(){
      var $target = (windowWidth < 576) ? $('.fblk') : $('.footer-bottom');
      $target.append($('.sk'));
    });

    $('.price-block').each(function(){
      var $priceBlock = $(this);
      var $prblk = $priceBlock.find('.new-price');
      var $sale = $priceBlock.find('.sale');

      $sale.detach();

      if(windowWidth < 576) {
        $prblk.append($sale);
      } else {
        $priceBlock.append($sale);
      }
    });

  }

// Вызываем функцию при загрузке страницы и изменении размеров окна
  $(window).on('load resize', rearrangeLinks);


// Навигация по разделу
  $('.classes-block .navigation-btn, .classes-block .nav-link').click(function () {
    var button = $('.navigation-btn');
    if (button.text() === 'Навигация по разделу') {
      button.text('Закрыть навигацию');
    } else {
      button.text('Навигация по разделу');
    }
    var nav_link = $(this);
    $(".navigation-btn, .school-info-nav").toggleClass('active');
    if (nav_link.attr('id')?.replace("pills-tab", "") > 0) {
      let gradeUrl = window.location.search.replace( /gr=\w*\d*/, "");
      gradeUrl = gradeUrl.replace("?&", "?");
      if (gradeUrl.includes('?')) {
        gradeUrl = gradeUrl.replace("?", "?gr="+nav_link.attr('id')?.replace("pills-tab", "")+"&");
      } else {
        gradeUrl = gradeUrl + "?gr="+nav_link.attr('id')?.replace("pills-tab", "");
      }
      history.replaceState(null, document.title, gradeUrl);
    }
  });

  $(document).on('mouseup', function(e){
    let s = $('.navigation-btn, .school-info-nav');
    if(!s.is(e.target) && s.has(e.target).length === 0) {
      s.removeClass('active');
      $('.navigation-btn').text('Навигация по разделу');
    }
  });

  $('.school-info-nav .nav-link').click(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

// $(document).ready(function() END
});

//скрипт для tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('.white-tooltip'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, {
    customClass: 'white-tooltip'
  })
})

// слайдер - teachers
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  direction: "vertical",
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 12,
  navigation: {
    nextEl: ".teacher-next",
    prevEl: ".teacher-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  thumbs: {
    swiper: swiper,
  },
});


// слайдер для отзывов
var swiper3 = new Swiper(".reviewsSwiper", {
  navigation: {
    nextEl: ".review-next",
    prevEl: ".review-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  slidesPerView: 4,
  watchSlidesProgress: true,
  spaceBetween: 26,
  freeMode: true,
  autoHeight: false,
  breakpoints: {
    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
      autoHeight: false,
    },
    375: {
      slidesPerView: "auto",
      spaceBetween: 10,
      autoHeight: false,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: true,
    }
  }
});


//скрипт для - О платформе
function checkScreenWidth() {
  return window.innerWidth > 1200;
}

// Установка прозрачности для слайдов
function setSlideOpacity() {
  const slides = swipers.slides;

  // Установка прозрачности для активного слайда
  slides.forEach((slide, index) => {
    if (index === swipers.activeIndex) {
      slide.style.opacity = 1;
    } else if (index === swipers.activeIndex + 1) {
      // Установка прозрачности для следующего слайда
      slide.style.opacity = 0.3;
    } else if (index === slides.length - 1) {
      // Установка прозрачности для последнего слайда
      slide.style.opacity = 0.1;
    } else {
      slide.style.opacity = 0.3;
    }
  });
}

// Инициализация Swiper в зависимости от ширины экрана
const aboutSwiper = document.querySelector('.aboutSwiper')
if (aboutSwiper) initSwiper()
function initSwiper() {
  if (checkScreenWidth()) {
    swipers = new Swiper(".aboutSwiper", {
      effect: "cards",
      cardsEffect: {
        perSlideOffset: 10,
        perSlideRotate: 0,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      grabCursor: true,
    });

    // Установка прозрачности для слайдов при изменении слайда
    swipers.on("slideChange", () => {
      setSlideOpacity();
    });

    // Активация последнего слайда
    const lastSlideIndex = swipers.slides.length - 1;
    swipers.slideTo(lastSlideIndex);

    // Установка прозрачности для слайдов при инициализации
    setSlideOpacity();
  } else {
    swipers = new Swiper(".aboutSwiper", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      grabCursor: true,
    });
  }
}
