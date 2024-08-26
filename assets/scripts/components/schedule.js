const schedule = document.querySelector('[data-element="schedule"]')

if (schedule) scheduleInit()

function scheduleInit () {
  const toggleTop = schedule.querySelector('[data-element="schedule__toggle-top"]')
  const toggleBottom = schedule.querySelector('[data-element="schedule__toggle-bottom"]')
  const table = schedule.querySelector('[data-element="schedule__table"]')
  const row = schedule.querySelector('[data-element="schedule__row"]')
  const cells = schedule.querySelectorAll('[data-element="schedule__cell"]')

  function tableFixedCalculate() {
    if (window.innerWidth < 1440) {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = cells[i].parentNode.offsetHeight + 'px'
      }
    } else {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = 'auto'
      }
    }
  }

  window.addEventListener('scroll', rowFixedCalculate)
  window.addEventListener('resize', tableFixedCalculate)

  tableFixedCalculate()
  rowFixedCalculate()

  function rowFixedCalculate () {
    if (window.innerWidth >= 1440) {
      row.style.top = '66px'
    } else {
      const topCoord = table.getBoundingClientRect().top
      if (topCoord < 68) {
        row.style.top = 68 - table.getBoundingClientRect().top + 'px'
      } else {
        row.style.top = 0
      }
    }
  }

  toggleTop.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', toggleTable)

  function toggleTable () {
    if (table.classList.contains('hide')) {
      showTable()
    } else {
      hideTable()
    }
  }

  function hideTable () {
    table.classList.add('hide')
    toggleBottom.style.display = "none"
    toggleTop.innerHTML = 'Показать расписание'
  }

  function showTable () {
    table.classList.remove('hide')
    toggleBottom.style.display = "block"
    toggleTop.innerHTML = 'Скрыть расписание'
  }
}
