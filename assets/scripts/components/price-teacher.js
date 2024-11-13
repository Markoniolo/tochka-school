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
