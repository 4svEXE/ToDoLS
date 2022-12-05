const qs = (el) => document.querySelector(el)
const qsa = (el) => document.querySelectorAll(el)
const wipe = (el) => qs(el).innerHTML = ''
const random = (min, max) => {return Math.floor(min + Math.random() * (max + 1 - min))}

qs('body').insertAdjacentHTML('beforeend', `<div class="scripts"></div>`)
const include = src =>{
	const sript = document.createElement('script')
	sript.src = src
	qs('.scripts').appendChild(sript)
}
include('js/main.js')