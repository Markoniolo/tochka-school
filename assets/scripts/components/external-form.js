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
