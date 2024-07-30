const Emiitter = require('events')

const event = new Emiitter()

event.on('connect', () => {
	// hodisani registratsiya qilish
	console.log('Server is connect')
})

event.emit('connect') // eshitish hodisani

event.on('salom', ism => {
	console.log(`Hello world ${ism}`)
})

event.emit('salom', 'Muxriddin')

class NewEmitter extends Emiitter {
	log(method, route) {
		this.emit('massage', { method, route })
	}
}

const logger = new NewEmitter()

logger.on('massage', data => {
	console.log('Logger', data)
})

logger.log('POST', 'user/salom/parse.json')

const server = require('http')


const salom = require('http')

c

