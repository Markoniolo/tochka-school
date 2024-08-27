const schedule = document.querySelector('[data-element="schedule"]')

if (schedule) scheduleInit()

function scheduleInit () {
  let offsetHeader = window.innerWidth > 574 ? 68 : 60

  const toggleTop = schedule.querySelector('[data-element="schedule__toggle-top"]')
  const toggleBottom = schedule.querySelector('[data-element="schedule__toggle-bottom"]')
  const table = schedule.querySelector('[data-element="schedule__box"]')
  const row = schedule.querySelector('[data-element="schedule__row"]')
  const cells = schedule.querySelectorAll('[data-element="schedule__cell"]')
  const cellTime = schedule.querySelector('[data-element="schedule__time"]')

  function tableFixedCalculate() {
    offsetHeader = window.innerWidth > 574 ? 68 : 60
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
      row.style.transform = 'none'
      cellTime.style.transform = 'none'
    } else {
      const topCoord = table.getBoundingClientRect().top
      const bottomCoord = table.getBoundingClientRect().bottom
      if (topCoord < offsetHeader && bottomCoord > 100) {
        row.style.transform = row.style.transform.slice(0, row.style.transform.length - 2) - 400 + 'px'
        cellTime.style.transform = cellTime.style.transform.slice(0, cellTime.style.transform.length - 2) - 400 + 'px'
        window.requestAnimationFrame(updateRowFixedTop)
      }
    }
  }

  function updateRowFixedTop () {
    row.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
    cellTime.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
  }

  toggleTop.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', scrollToTable)

  toggleTop.click()

  function toggleTable () {
    if (table.classList.contains('hide')) {
      showTable()
    } else {
      hideTable()
    }
  }

  function scrollToTable () {
    const y = schedule.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({top: y, behavior: 'smooth'})
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
    row.style.transform = 'none'
    cellTime.style.transform = 'none'
  }
}
