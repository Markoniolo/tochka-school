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
