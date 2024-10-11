const orderFormArray = document.querySelectorAll("[data-element='order-form']")

for (let i = 0; i < orderFormArray.length; i++) {
  const form = orderFormArray[i]
  const input = form.querySelector("[data-element='input-phone-intl']")

  const iti = window.intlTelInput(input, {
    utilsScript: "../libs/intlTelInputWithUtils.min",
    initialCountry: 'ru',
    separateDialCode: true
  })

  function resetError () {
    input.classList.remove("error")
  }

  input.addEventListener('input', resetError)

  form.addEventListener('submit', (e) => {
    resetError()
    e.preventDefault()
    if (!input.value.trim()) {
      input.classList.add("error")
    } else if (iti.isValidNumber()) {
      $.request('MainFunctions::onSendMessageTb', {
        data: {
          'name': form.querySelector("[name='name']").value,
          'utm': form.querySelector("[name='utm']").value,
          'phone': iti.selectedCountryData.dialCode + input.value,
          'email': form.querySelector("[name='email']").value,
        }
      });
      //clearForm()
    } else {
      input.classList.add("error")
    }
  })

  function clearForm () {
    const inputs = form.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
    if (form.classList.contains('modal-external')) {
      form.querySelector('.fancybox-close-small').click()
    }
  }
}

