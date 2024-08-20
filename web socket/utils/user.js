const users = []

function user(id, username, room) {
	const data = { id, username, room }
	users.push(data)
	return data
}

function getCurrent(id) {
	return users.find(data => data.id === id)
}

function leftUser(id) {
	const index = users.findIndex(user => user.id === id)
	if (index !== -1) {
		return users.splice(index, 1)[0]
	}
}

function userRoom(room) {
	return users.filter(user => user.room === room)
}

module.exports = { user, getCurrent, leftUser, userRoom }
