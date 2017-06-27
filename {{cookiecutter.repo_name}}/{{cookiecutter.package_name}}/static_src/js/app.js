import $ from 'jquery'
import 'foundation'
import 'foundation-mediaquery'

// initialize foundation
$(document).foundation()

// example
const dateDisplayEl = document.createElement('div')
dateDisplayEl.innerHTML = new Date()
document.body.appendChild(dateDisplayEl)
