{% if cookiecutter.use_foundation_sites == 'y' -%}
import $ from 'jquery'
import 'foundation'
import 'foundation-mediaquery'


// initialize foundation
$(document).foundation()

{%- endif %}
// example
const dateDisplayEl = document.createElement('div')
dateDisplayEl.innerHTML = new Date()
document.body.appendChild(dateDisplayEl)
