const marathonOrderSelect = document.querySelector("[data-element='marathon-order__select']")

if (marathonOrderSelect) marathonOrderSelectInit()

function marathonOrderSelectInit () {
  const button = document.querySelector("[data-element='marathon-order__button']")
  const priceOld = document.querySelector("[data-element='marathon-order__price-old']")
  const priceNew = document.querySelector("[data-element='marathon-order__price-new']")
  marathonOrderSelect.addEventListener('change', updateButton)

  function updateButton () {
    const link = this.options[this.selectedIndex].getAttribute('data-product-link')
    const priceOldValue = this.options[this.selectedIndex].getAttribute('data-product-old-price')
    const priceNewValue = this.options[this.selectedIndex].getAttribute('data-product-new-price')

    button.href = link
    if (priceOldValue) {
      priceOld.style.display = 'block'
      priceOld.innerHTML =`${priceOldValue} рублей`
    } else {
      priceOld.style.display = 'none'
    }
    priceNew.innerHTML =`${priceNewValue} руб`
  }
}