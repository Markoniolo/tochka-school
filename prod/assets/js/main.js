const btnFixed = document.querySelector('[data-element="btn-fixed"]')

if (btnFixed) btnFixedInit()

function btnFixedInit () {
  const start = btnFixed.getAttribute('data-btn-fixed-start')
  const end = btnFixed.getAttribute('data-btn-fixed-end')
  const body = document.getElementsByTagName('body')[0]
  window.addEventListener('scroll', checkBtnFixed, { passive: true })

  function checkBtnFixed () {
    if (window.pageYOffset > start && body.scrollHeight - window.pageYOffset > end && !checkBtnFixedHide()) {
      btnFixed.classList.add('btn-fixed_active')
    } else {
      btnFixed.classList.remove('btn-fixed_active')
    }
  }

  const sectionsWhenBtnHide = document.querySelectorAll('[data-btn-fixed-hide="true"]')

  function checkBtnFixedHide () {
    let isHide = false
    for (let i = 0; i < sectionsWhenBtnHide.length; i++) {
      if (elementInViewport(sectionsWhenBtnHide[i])) isHide = true
    }
    return isHide
  }

  function elementInViewport(el) {
    let top = el.offsetTop
    let left = el.offsetLeft
    let width = el.offsetWidth
    let height = el.offsetHeight

    while(el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    )
  }
}

const selectArray = document.querySelectorAll('[data-role="custom-select"]')

for (let i = 0; i < selectArray.length; i++) {
  customSelect(selectArray[i])
}

const discountPromoActivateBtn = document.querySelector('[data-element="discount-promo-activate"]')

if (discountPromoActivateBtn) discountPromoActivateBtnInit()

function discountPromoActivateBtnInit () {
  discountPromoActivateBtn.addEventListener('click', activatePromo)

  function activatePromo () {
    const promo = discountPromoActivateBtn.getAttribute('data-promo')
    const url = new URL(window.location.href)
    url.searchParams.set('promo', promo);
    window.location.assign(url.toString())
  }
}

const discount = document.querySelector('[data-element="discount"]')

if (discount) discountInit()

function discountInit () {
  const close = document.querySelector('[data-element="discount__close"]')
  close.addEventListener('click', removeDiscount)

  function removeDiscount (e) {
    e.preventDefault()
    discount.remove()
  }
}

// const externalFormArray = document.querySelectorAll("[data-element='external-form']")
//
// for (let i = 0; i < externalFormArray.length; i++) {
//   const form = externalFormArray[i]
//   const input = form.querySelector("[data-element='input-phone-intl']")
//
//   const iti = window.intlTelInput(input, {
//     utilsScript: "../libs/intlTelInputWithUtils.min",
//     initialCountry: 'ru',
//     separateDialCode: true
//   })
//
//   function resetError () {
//     input.classList.remove("error")
//   }
//
//   input.addEventListener('input', resetError)
//
//   form.addEventListener('submit', (e) => {
//     resetError()
//     e.preventDefault()
//     if (!input.value.trim()) {
//       input.classList.add("error")
//     } else if (iti.isValidNumber()) {
//       $.request('MainFunctions::onSendMessageTb', {
//         data: {
//           'name': form.querySelector("[name='name']").value,
//           'utm': form.querySelector("[name='utm']").value,
//           'phone': iti.selectedCountryData.dialCode + input.value,
//           'email': form.querySelector("[name='email']").value,
//         }
//       });
//       //clearForm()
//       window.open('https://tochka-school.ru/storage/app/media/Dokumenti/Eksternat_Tocka_Znanii.pdf', '_blank')
//     } else {
//       input.classList.add("error")
//     }
//   })
//
//   function clearForm () {
//     const inputs = form.querySelectorAll('input')
//     for (let i = 0; i < inputs.length; i++) {
//       inputs[i].value = ''
//     }
//     if (form.classList.contains('modal-external')) {
//       form.querySelector('.fancybox-close-small').click()
//     }
//   }
// }
//

// const familyOrderForm = document.querySelector("[data-element='family-order-form']")
//
// if (familyOrderForm) familyOrderFormInit()
//
// function familyOrderFormInit () {
//   const input = familyOrderForm.querySelector("[data-element='input-phone-intl']")
//   const inputHidden = familyOrderForm.querySelector("[data-element='input-phone-hidden']")
//
//   const iti = window.intlTelInput(input, {
//     utilsScript: "../libs/intlTelInputWithUtils.min",
//     initialCountry: 'ru',
//     separateDialCode: true
//   })
//
//   input.addEventListener('input', updateHiddenInput)
//
//   function updateHiddenInput () {
//     inputHidden.value = iti.selectedCountryData.dialCode + input.value
//   }
//
//   familyOrderForm.addEventListener('submit', (e) => {
//     resetError()
//     e.preventDefault()
//     if (!input.value.trim()) {
//       input.classList.add("error")
//     } else if (iti.isValidNumber()) {
//       console.log(familyOrderForm.querySelector("[name='name']").value)
//       console.log(inputHidden.value)
//       //clearForm()
//     } else {
//       input.classList.add("error")
//     }
//   })
//
//   function clearForm () {
//     familyOrderForm.querySelector("[name='name']").value = ''
//     familyOrderForm.querySelector("[name='tel']").value = ''
//   }
//
//   function resetError () {
//     input.classList.remove("error")
//   }
//
//   input.addEventListener('input', resetError)
// }

const footerTitleArray = document.querySelectorAll('[data-element="footer__title"]')

if (footerTitleArray.length) footerTitleArrayInit()

function footerTitleArrayInit () {
  for (let i = 0; i < footerTitleArray.length; i++) {
    footerTitleArray[i].addEventListener('click', toggleFooterTitle)
  }

  function toggleFooterTitle () {
    this.classList.toggle('active')
  }
}

const externalFormArray = document.querySelectorAll("[data-element='external-form']")

for (let i = 0; i < externalFormArray.length; i++) {
  globalFormInit(externalFormArray[i], 'onSendMessageTb', 'externalFormData');
}

const familyOrderForm = document.querySelector("[data-element='family-order-form']")
if (familyOrderForm) globalFormInit(familyOrderForm, 'onSendConsultMessage', 'consultFormData')

const orderForm = document.querySelector("[data-element='order-form']")
if (orderForm) globalFormInit(orderForm, 'onSendOrderMessage', 'orderFormData')

const orderFormTeacher = document.querySelector("[data-element='order-form-teacher']")
if (orderFormTeacher) globalFormInit(orderFormTeacher, 'onSendTeacherOrderMessage', 'orderFormTeacherData')


function orderFormTeacherData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
  };
}
function orderFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'class_name': globalForm.querySelector("[name='class_name']").options[globalForm.querySelector("[name='class_name']").selectedIndex].value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
  };
}
function externalFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
  };
}
function consultFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'messenger': globalForm.querySelector("[name='messenger']:checked").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
  };
}

function globalFormInit (form, func_name, type) {
  const globalForm = form
  const btnSubmit = globalForm.querySelector('.btn-warning')
  const input = globalForm.querySelector("[data-element='input-phone-intl']")

  const inputHidden = globalForm.querySelector("[data-element='input-phone-hidden']")
  const linkTo = globalForm.getAttribute("data-docex")

  const news = form.querySelector('[name="news"]')
  const policy = form.querySelector('[name="policy"]')
  const classSelect = globalForm.querySelector('.modal-order__select')

  if (news) news.addEventListener('change', () => news.closest('label').classList.remove('error-text'))
  if (policy) policy.addEventListener('change',() => policy.closest('label').classList.remove('error-text'))
  if (classSelect) classSelect.addEventListener('change',() => classSelect.closest('.custom-select-container').querySelector('.custom-select-opener').classList.remove('error'))

  const iti = window.intlTelInput(input, {
    utilsScript: "../libs/intlTelInputWithUtils.min",
    initialCountry: 'ru',
    separateDialCode: true
  })

  input.addEventListener('input', function () {
    this.value = this.value.replace(/\D+/g, '')
    inputHidden.value = input.value
    if (iti.selectedCountryData.dialCode === "7" && input.value.length > 10) {
      inputHidden.value = input.value.substring(input.value.length - 10)
    }
    inputHidden.value = iti.selectedCountryData.dialCode + inputHidden.value
  })

  function resetError () {
    input.classList.remove("error")
  }

  globalForm.addEventListener('submit', async (e) => {
    resetError()
    e.preventDefault()
    if (!input.value.trim()) {
      input.classList.add("error")
    } else if (iti.isValidNumber()) {

      if (type == 'externalFormData') {
        var form_data = externalFormData(globalForm);
      } else if (type == 'orderFormData') {
        var form_data = orderFormData(globalForm);
      } else if (type == 'consultFormData') {
        var form_data = consultFormData(globalForm);
      } else if (type == 'orderFormTeacherData') {
        var form_data = orderFormTeacherData(globalForm);
      }

      const email = globalForm.querySelector('[name="email"]')

      let isValid = true

      if (email) {
        isValid = validateEmail(email)
        if (!isValid) email.addEventListener('input', () => validateEmail(email))
      }
      if (news) {
        if (!news.checked) {
          news.closest('label').classList.add('error-text')
          news.classList.add('error')
          isValid = false
        }
      }
      if (policy) {
        if (!policy.checked) {
          policy.closest('label').classList.add('error-text')
          isValid = false
        }
      }
      if (classSelect) {
        if (!classSelect.value) {
          const opener = classSelect.closest('.custom-select-container').querySelector('.custom-select-opener')
          opener.classList.add('error')
          isValid = false
        }
      }

      if (isValid) {
        globalForm.submit()
        btnSubmit.disabled = true
        setTimeout(() => {
          clearForm()
          location.assign(linkTo)
        }, 100)
      }

    } else {
      input.classList.add("error")
    }

  })

  function clearForm () {
    const inputs = globalForm.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }
  input.addEventListener('input', resetError)

  function validateEmail (email) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      email.classList.remove('error')
      return true
    } else {
      email.classList.add('error')
      return false
    }
  }
}

try {
  lecturesSliderInit()
} catch(e) {}


function lecturesSliderInit () {
  const lecturesSlider = document.querySelector('.lectures__slider')
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
    const button = box.querySelector('.lectures__more')

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
    if (window.pageYOffset > 20) {
      $('header').addClass('fixed');
    }
    else if (window.pageYOffset < 10) {
      $('header').removeClass('fixed');
    }

    if (window.pageYOffset > 200) {
      $('header').addClass('fixed-height');
    }
    else if (window.pageYOffset < 100) {
      $('header').removeClass('fixed-height');
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

const marathonChildThemes = document.querySelector('[data-element="marathon-child__themes"]')

if (marathonChildThemes) marathonChildThemesInit()

function marathonChildThemesInit () {
  const navItems = document.querySelectorAll('[data-element="marathon-child__nav-item"]')
  const boxes = document.querySelectorAll('[data-element="marathon-child__box"]')

  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', toggleBox)
  }

  function toggleBox () {
    const oldNav = marathonChildThemes.querySelector('.marathon-child__nav-item_active')
    oldNav.classList.remove('marathon-child__nav-item_active')
    this.classList.add('marathon-child__nav-item_active')
    const oldBox = marathonChildThemes.querySelector('.marathon-child__box_active')
    oldBox.classList.remove('marathon-child__box_active')
    const index = this.getAttribute('data-index')
    boxes[index].classList.add('marathon-child__box_active')
  }

  const marathonChildClose = document.querySelector('[data-element="marathon-child__close"]')

  marathonChildThemes.addEventListener('click', openModal)
  marathonChildClose.addEventListener('click', closeModal)
  window.addEventListener('click', windowCloseModal)

  function openModal () {
    marathonChildThemes.classList.add('marathon-child__themes_active')
  }

  function closeModal (e) {
    e.stopPropagation()
    marathonChildThemes.classList.remove('marathon-child__themes_active')
  }

  function windowCloseModal (e) {
    if (!e.target.classList.contains('marathon-child__themes') && !e.target.closest('.marathon-child__themes')) {
      marathonChildThemes.classList.remove('marathon-child__themes_active')
    }
  }
}

const marathonInformer = document.querySelector('[data-element="marathon-informer"]')

if (marathonInformer) marathonInformerInit()

function marathonInformerInit () {
  const close = document.querySelector('[data-element="marathon-informer__close"]')
  close.addEventListener('click', removeMarathon)

  function removeMarathon (e) {
    e.preventDefault()
    localStorage.setItem('isMarathonInformerShown', 'true')
    marathonInformer.remove()
  }

  const isShown = localStorage.getItem('isMarathonInformerShown')

  if (!isShown || marathonInformer.getAttribute('show-always')) {
    marathonInformer.style.display = 'block'
  }
}

const marathonOrderSelect = document.querySelector("[data-element='marathon-order__select']")

if (marathonOrderSelect) marathonOrderSelectInit()

function marathonOrderSelectInit () {
  const button = document.querySelector("[data-element='marathon-order__button']")
  const priceOld = document.querySelector("[data-element='marathon-order__price-old']")
  const priceNew = document.querySelector("[data-element='marathon-order__price-new']")
  const opener = marathonOrderSelect.closest('.custom-select-container').querySelector('.custom-select-opener')

  marathonOrderSelect.addEventListener('change', updateButton)
  button.addEventListener('click', validateButton)

  function validateButton (e) {
    if (!marathonOrderSelect.value) {
      e.preventDefault()
      opener.classList.add('error')
    } else {
      window.open(button.href)
    }
  }

  function updateButton () {
    opener.classList.remove('error')

    const link = this.options[this.selectedIndex].getAttribute('data-product-link')
    const priceOldValue = this.options[this.selectedIndex].getAttribute('data-product-old-price')
    const priceNewValue = this.options[this.selectedIndex].getAttribute('data-product-new-price')

    button.href = link
    if (priceOldValue) {
      priceOld.style.display = 'block'
      priceOld.innerHTML =`${priceOldValue}`
    } else {
      priceOld.style.display = 'none'
    }
    priceNew.innerHTML =`${priceNewValue}`
  }
}

// const orderForm = document.querySelector("[data-element='order-form']")
//
// if (orderForm) orderFormInit()
//
// function orderFormInit () {
//   const input = orderForm.querySelector("[data-element='input-phone-intl']")
//   const inputHidden = orderForm.querySelector("[data-element='input-phone-hidden']")
//
//   const iti = window.intlTelInput(input, {
//     utilsScript: "../libs/intlTelInputWithUtils.min",
//     initialCountry: 'ru',
//     separateDialCode: true
//   })
//
//   input.addEventListener('input', updateHiddenInput)
//
//   function updateHiddenInput () {
//     inputHidden.value = iti.selectedCountryData.dialCode + input.value
//   }
//
//   orderForm.addEventListener('submit', (e) => {
//     resetError()
//     e.preventDefault()
//     if (!input.value.trim()) {
//       input.classList.add("error")
//     } else if (iti.isValidNumber()) {
//       console.log(orderForm.querySelector("[name='name']").value)
//       console.log(inputHidden.value)
//       //clearForm()
//     } else {
//       input.classList.add("error")
//     }
//   })
//
//   function clearForm () {
//     orderForm.querySelector("[name='name']").value = ''
//     orderForm.querySelector("[name='tel']").value = ''
//   }
//
//   function resetError () {
//     input.classList.remove("error")
//   }
//
//   input.addEventListener('input', resetError)
// }

const priceTeacherArray = document.querySelectorAll('[data-element="price-teacher"]')

if (priceTeacherArray) priceTeacherArrayInit()

function priceTeacherArrayInit () {
  for (let i = 0; i < priceTeacherArray.length; i++) {
    priceTeacherInit(priceTeacherArray[i])
  }
}

function priceTeacherInit(box) {
  const btn = box.querySelector('[data-element="price-teacher-btn"]')
  const checkbox = box.querySelector('[data-element="price-teacher-checkbox"]')
  const price = box.querySelector('[data-element="price-teacher-price"]')

  checkbox.addEventListener('change', checkboxChangeHandler)

  function checkboxChangeHandler () {
    const newPrice = checkbox.getAttribute('new-price')
    const oldPrice = btn.getAttribute('old-price')

    const newHref = checkbox.getAttribute('new-href')
    const oldHref = btn.getAttribute('old-href')

    if (checkbox.checked) {
      price.textContent = newPrice
      btn.href = newHref
    } else {
      price.textContent = oldPrice
      btn.href = oldHref
    }
  }
}

const schedule = document.querySelector('[data-element="schedule"]')

if (schedule) scheduleInit()

function scheduleInit () {
  let offsetHeader = window.innerWidth > 574 ? 68 : 60

  const toggleTop = schedule.querySelector('[data-element="schedule__toggle-top"]')
  const toggleBottom = schedule.querySelector('[data-element="schedule__toggle-bottom"]')
  const table = schedule.querySelector('[data-element="schedule__box"]')
  const row = schedule.querySelector('[data-element="schedule__row"]')
  const cells = schedule.querySelectorAll('[data-element="schedule__cell"]')
  const cellTime = schedule.querySelector('[data-element="schedule__time"]')

  function tableFixedCalculate() {
    offsetHeader = window.innerWidth > 574 ? 68 : 60
    if (window.innerWidth < 1440) {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = cells[i].parentNode.offsetHeight + 'px'
      }
    } else {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = 'auto'
      }
    }
  }

  window.addEventListener('scroll', rowFixedCalculate)
  window.addEventListener('resize', tableFixedCalculate)

  rowFixedCalculate()

  function rowFixedCalculate () {
    if (window.innerWidth >= 1440) {
      row.style.transform = 'none'
      cellTime.style.transform = 'none'
    } else {
      const topCoord = table.getBoundingClientRect().top
      const bottomCoord = table.getBoundingClientRect().bottom
      if (topCoord < offsetHeader && bottomCoord > 100) {
        row.style.transform = row.style.transform.slice(0, row.style.transform.length - 2) - 400 + 'px'
        cellTime.style.transform = cellTime.style.transform.slice(0, cellTime.style.transform.length - 2) - 400 + 'px'
        window.requestAnimationFrame(updateRowFixedTop)
      }
    }
  }

  function updateRowFixedTop () {
    row.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
    cellTime.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
  }

  toggleTop.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', scrollToTable)

  toggleTop.click()

  function toggleTable () {
    if (table.classList.contains('hide')) {
      showTable()
    } else {
      hideTable()
    }
  }

  function scrollToTable () {
    const y = schedule.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({top: y, behavior: 'smooth'})
  }

  function hideTable () {
    table.classList.add('hide')
    toggleBottom.style.display = "none"
    toggleTop.innerHTML = 'Показать расписание'
  }

  function showTable () {
    table.classList.remove('hide')
    toggleBottom.style.display = "block"
    toggleTop.innerHTML = 'Скрыть расписание'
    row.style.transform = 'none'
    cellTime.style.transform = 'none'
    setTimeout(() => tableFixedCalculate(), 100)
  }
}

// $('.offer').snowfall({image :"/assets/img/snowfall/snow1.png", minSize: 10, maxSize:20})

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
