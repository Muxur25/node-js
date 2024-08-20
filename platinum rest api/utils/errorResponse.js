module.exports = class ErrorResponse extends Error {
	status
	error
	constructor(status, message, error) {
		super(message)
		this.status = status
		this.error = error
	}

	static Unautorizent() {
		return new ErrorResponse(401, 'Unautorizes')
	}

	static Xato(message, error = []) {
		return new ErrorResponse(400, message, error)
	}
}
