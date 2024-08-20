const ErrorResponse = require('../utils/errorResponse')

module.exports = function (err, req, res, next) {
	if (err instanceof ErrorResponse) {
		return res.status(err.status).json({
			message: err.message,
			error: err.error,
		})
	}

	return res.status(501).json({ message: 'Internet server error' })
}
