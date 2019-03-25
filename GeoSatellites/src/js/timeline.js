import * as noUiSlider from 'nouislider'

const timeline = {
  el: document.querySelector('.timeline-bar'),
  btnControls: document.querySelector('.timeline-btn'),
  controlBtn: document.querySelector('.control-btn'),
  currentDateEl: document.querySelector('.timeline-current-date'),
  playing: false,
  timer: null,
  transitionDuration: 0,
  endDate: 0,
  startDate: 0,
  updateCurrentDate(date) {
    date = new Date(date)
    date = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
    this.currentDateEl.innerHTML = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`
  },
  getCurrentDate() {
    return this.el.noUiSlider.get()
  },
  setupTimeline({ startDate, endDate, onUpdate }) {
    this.endDate = endDate
    this.startDate = startDate

    noUiSlider.create(this.el, {
      start: [startDate],
      connect: true,
      behaviour: 'tap-drag',
      step: 24 * 60 * 60 * 1000,
      range: {
        min: startDate,
        max: endDate
      },
      format: {
        from: v => parseInt(v),
        to: v => parseInt(v)
      }
      // pips: {
      //   mode: 'range',
      //   density: 10
      // }
    })

    this.el.noUiSlider.set(startDate)

    this.setupBtnControls()

    this.el.noUiSlider.on('update', onUpdate)
  },
  setupBtnControls() {
    this.btnControls.addEventListener('click', function() {
      let currentDate = timeline.getCurrentDate()
      if (currentDate == timeline.endDate) {
        timeline.el.noUiSlider.set(timeline.startDate)
      }

      if (timeline.playing == true) {
        timeline.stopTimeline()
        return
      }

      timeline.startTimeline()
    })
  },
  startTimeline() {
    timeline.timer = setInterval(function() {
      let currentDate = timeline.getCurrentDate()
      timeline.el.noUiSlider.set(currentDate + 24 * 60 * 60 * 1000)
    }, timeline.transitionDuration)

    timeline.controlBtn.classList.remove('play-btn')
    timeline.controlBtn.classList.add('pause-btn')

    timeline.playing = true
  },
  stopTimeline() {
    clearInterval(timeline.timer)
    timeline.playing = false
    timeline.btnControls.classList.remove('pause-btn')
    timeline.btnControls.classList.add('play-btn')
  }
}

export default timeline
