const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		)
	},
})

const upload = multer({
	storage,
	limits: { fileSize: 40000000 },
	fileFilter: fileFilt,
})

function fileFilt(req, file, cb) {
	const fileTypes = /jpeg|jpg|png/
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
	const mimeTypes = fileTypes.test(file.mimetype)

	if (mimeTypes && extname) {
		return cb(null, true)
	} else {
		cb('file yuklashda xatolik')
	}
}

module.exports = upload

// const multer = require('multer')
// const path = require('path')
// const ErrorResponse = require('./errorResponse')

// const storage = multer.diskStorage({
// 	destination: './public/uploads',
// 	filename: function (req, file, cb) {
// 		cb(
// 			null,
// 			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
// 		)
// 	},
// })

// function fileFilter(req, file, cb) {
// 	const fileTypes = /jpeg|jpg|png/ // Note: Removed spaces around '|'
// 	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
// 	const mimetype = fileTypes.test(file.mimetype)

// 	if (mimetype && extname) {
// 		return cb(null, true)
// 	} else {
// 		cb(new ErrorResponse('File yuklashda xatolik', 400), false)
// 	}
// }

// const upload = multer({
// 	storage,
// 	limits: { fileSize: 40000000 },
// 	fileFilter: fileFilter,
// })

// module.exports = upload
