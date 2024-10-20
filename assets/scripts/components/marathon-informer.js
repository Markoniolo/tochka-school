const marathonInformer = document.querySelector('[data-element="marathon-informer"]')

if (marathonInformer) marathonInformerInit()

function marathonInformerInit () {
  const close = document.querySelector('[data-element="marathon-informer__close"]')
  close.addEventListener('click', removeMarathon)

  function removeMarathon () {
    marathonInformer.remove()
  }
}
