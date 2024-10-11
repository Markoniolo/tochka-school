const btnFixed = document.querySelector('[data-element="btn-fixed"]')

if (btnFixed) btnFixedInit()

function btnFixedInit () {
  const start = btnFixed.getAttribute('data-btn-fixed-start')
  const end = btnFixed.getAttribute('data-btn-fixed-end')
  const body = document.getElementsByTagName('body')[0]
  window.addEventListener('scroll', checkBtnFixed)

  function checkBtnFixed () {
    console.log(body.scrollHeight - window.pageYOffset)
    if (window.pageYOffset > start && body.scrollHeight - window.pageYOffset > end) {
      btnFixed.classList.add('btn-fixed_active')
    } else {
      btnFixed.classList.remove('btn-fixed_active')
    }
  }
}
