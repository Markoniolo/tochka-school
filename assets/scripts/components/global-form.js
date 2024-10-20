const externalFormArray = document.querySelectorAll("[data-element='external-form']")

for (let i = 0; i < externalFormArray.length; i++) {
  globalFormInit(externalFormArray[i], 'onSendMessageTb', 'externalFormData');
}

const familyOrderForm = document.querySelector("[data-element='family-order-form']")

if (familyOrderForm) globalFormInit(familyOrderForm, 'onSendConsultMessage', 'consultFormData')

const orderForm = document.querySelector("[data-element='order-form']")

if (orderForm) globalFormInit(orderForm, 'onSendOrderMessage', 'orderFormData')

function orderFormData (globalForm) {
  console.log('orderFormData');
  var value = globalForm.querySelector("[name='class_name']").options[globalForm.querySelector("[name='class_name']").selectedIndex].value;
  console.log(value);
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
  console.log('externalFormData');
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
  console.log('consultFormData');
  console.log( globalForm.querySelector("[name='messenger']:checked").value);
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
  const input = globalForm.querySelector("[data-element='input-phone-intl']")
  input.addEventListener('input', function () {
    this.value = this.value.replace(/\D+/g, '')
  })
  const inputHidden = globalForm.querySelector("[data-element='input-phone-hidden']")
  const linkTo = globalForm.getAttribute("data-docex")

  const news = form.querySelector('[name="news"]')
  const policy = form.querySelector('[name="policy"]')

  if (news) news.addEventListener('change', () => news.closest('label').classList.remove('error-text'))
  if (policy) policy.addEventListener('change',() => policy.closest('label').classList.remove('error-text'))

  const iti = window.intlTelInput(input, {
    utilsScript: "../libs/intlTelInputWithUtils.min",
    initialCountry: 'ru',
    separateDialCode: true
  })

  input.addEventListener('input', updateHiddenInput)

  function updateHiddenInput () {
    inputHidden.value = iti.selectedCountryData.dialCode + input.value
  }

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
      }else if (type == 'orderFormData') {
        var form_data = orderFormData(globalForm);
      }else if (type == 'consultFormData') {
        var form_data = consultFormData(globalForm);
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

      if (isValid) {
        globalForm.submit();
        window.location.href = linkTo;
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
    if (globalForm.classList.contains('modal-external') || globalForm.classList.contains('modal-order')) {
      globalForm.querySelector('.fancybox-close-small').click()
    }
  }
  input.addEventListener('input', resetError)

  function validateEmail (email) {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)) {
      email.classList.remove('error')
      return true
    } else {
      email.classList.add('error')
      return false
    }
  }
}
