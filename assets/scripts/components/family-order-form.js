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
