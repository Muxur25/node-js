const express = require('express')
require('dotenv').config()
const socketio = require('socket.io') // Xato to'g'irlandi
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const formatMessage = require('./utils/messageFormat') // Xato to'g'irlandi
const { user, getCurrent, leftUser, userRoom } = require('./utils/user')

io.on('connection', socket => {
	const bot = 'chatBot'

	// Foydalanuvchi chatga qo'shilganda
	socket.on('join room', ({ username, room }) => {
		const userData = user(socket.id, username, room)
		socket.join(userData.room)

		// Foydalanuvchi ma'lumotlarini saqlash
		socket.userData = userData

		// Foydalanuvchini xush kelibsiz qilish
		socket.emit('message', formatMessage(bot, `Welcome to chat app ${room}`))

		// Boshqa userlarga foydalanuvchi qo'shilganini xabar berish
		socket.broadcast
			.to(userData.room)
			.emit('message', formatMessage(bot, `${userData.username} new user`))

		io.to(userData.room).emit('roomUsers', {
			room: userData.room,
			users: userRoom(userData.room),
		})
	})

	// Foydalanuvchi xabar yuborganda
	socket.on('chat message', message => {
		const user = getCurrent(socket.id)
		io.to(user.room).emit(
			'message',
			formatMessage(socket.userData.username, message)
		)
	})

	// Foydalanuvchi chatdan chiqib ketganda
	socket.on('disconnect', () => {
		const user = leftUser(socket.id)
		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage(bot, `${user.username} logout`)
			)
		}
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: userRoom(user.room),
		})
	})
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

server.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})
