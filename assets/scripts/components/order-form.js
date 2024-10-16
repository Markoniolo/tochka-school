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
