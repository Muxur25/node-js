const socket = io()
const button = document.querySelector('#chat-form')
const chatMessage = document.querySelector('.chat-messages')

const roomName = document.querySelector('#room-name')

const usersList = document.querySelector('#users')

const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true, // faqat qiymatini olamiz yani tengdan keyingi
})

socket.emit('join room', { username, room })

socket.on('roomUsers', ({ room, users }) => {
	displayRoomName(room)
	displayUsersRoom(users)
})

button.addEventListener('submit', event => {
	event.preventDefault()

	const message = event.target.elements.msg.value

	socket.emit('chat message', message)

	event.target.elements.msg.value = ''
	event.target.elements.msg.focus()
})

socket.on('message', message => {
	console.log(message)
	render(message)
	chatMessage.scrollTop = chatMessage.scrollHeight
})

function render(msg) {
	const div = document.createElement('div')
	const chatMessage = document.querySelector('.chat-messages')

	div.classList.add('message')
	div.innerHTML = `
	<p class="meta">${msg.username} <span>${msg.time}</span></p>
		<p class="text">
			${msg.text}
		</p>

	`
	chatMessage.append(div)
}

function displayRoomName(room) {
	roomName.textContent = room
}

function displayUsersRoom(users) {
	usersList.innerHTML = `
	${users.map(user => `<li>${user.username}</li>`)}
	`
}
