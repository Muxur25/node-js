const fs = require('fs')
const path = require('path')

// fs.mkdir(path.join(__dirname, 'papka'), {}, err => {
// 	if (err) throw err
// 	console.log('Papka yaratildi')
// })

fs.writeFile(
	path.join(__dirname, 'papka', 'salom.txt'),
	'Mening ismim Muxriddin',
	err => {
		if (err) throw err
		console.log('Fayl yaratildi va ichiga yozildi')
	}
)
// agar write fayl yordamida malumot qoshmoqchi bo'lsak ustiga qoshib yuboradi

fs.appendFile(
	path.join(__dirname, 'papka', 'salom.txt'),
	'\nMening ismim yoq',
	err => {
		if (err) throw err
		console.log('Malumot qoshildi')
	}
) // huddi osha faylga malumot qoshdik

fs.readFile(path.join(__dirname, 'papka', 'salom.txt'), 'utf8', (err, res) => {
	if (err) throw err
	console.log(res)
}) // utf8 formatida malumot qaytardi

fs.rename(
	path.join(__dirname, 'papka', 'salom.txt'),
	path.join(__dirname, 'papka', 'qali.txt'),
	err => {
		if (err) throw err
	} // fayl nomi qali.txt ga otdi
)
