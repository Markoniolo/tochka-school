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
  const button = globalForm.querySelector(".btn-warning")
  const loader = globalForm.querySelector("[data-element='btn-loader']")
  const inputHidden = globalForm.querySelector("[data-element='input-phone-hidden']")
  const alertP = globalForm.querySelector(".alert")
  const linkTo = globalForm.getAttribute("data-docex")

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

  globalForm.addEventListener('submit', (e) => {
    alertP.style.display = "none";
    button.style.display = "none";
    //loader.style.display = "block";
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
      $.request('MainFunctions::'+func_name, {
        data: form_data,
        error: function(jqXHR, textStatus, errorThrown) {
          //console.log(Object.values(JSON.parse(errorThrown.response))[1]);
          button.style.display = "block";
          //loader.style.display = "none";
          alertP.textContent=Object.values(JSON.parse(errorThrown.response))[1];
          alertP.style.display = "block";
        },
        success: function() {
          console.log('success');
          alertP.style.display = "none";
          window.location.href = linkTo;
          console.log(linkTo);
          clearForm();
          //window.open('https://tochka-school.ru/storage/app/media/Dokumenti/Eksternat_Tocka_Znanii.pdf', '_blank');
        }
      });
      //clearForm()

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
}
