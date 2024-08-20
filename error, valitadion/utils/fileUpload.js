const multer = require('multer')
const path = require('path')



const stroge = multer.diskStorage({ // fayl saqlash uchun function
	destination: './public/uploads', // qayerga saqlamoqchimiz
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
		// filimizni nomini shunday saqladik
	}
})



const fileUpload = multer({
	storage: stroge,
	limits: {fileSize: 1000000000},
	fileFilter: function(req, file, cb){
		checkFile(file, cb)
	}
})



const checkFile = (file, cb) => {
	const fileType = /jpeg|png|jpg|gif/
	const extname = fileType.test((path.extname(file.originalname).toLowerCase())) //fayl type haqiqattan ham rasmligini
	const mimitype = fileType.test(file.mimetype) // haqqattanham rasmmi yoqmi shuni tekshiramiz
	if (extname && mimitype){
		return cb(null, true)
	}else {
		cb('Faylni typeda xato ketti')
	}
	
}


module.exports = fileUpload