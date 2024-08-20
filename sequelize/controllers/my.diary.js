const db = require('../models/index')

const Diery = db.diary

const Comment = db.comment

const getMyDiary = async (req, res) => {
	try {
		const diery = await Diery.findAll({
			raw: true,
			// where: {id: 1} id orqali oladi malumotni
		})
		res.render('diery/my-diery', {
			title: 'My diery',
			diery: diery.reverse(),
		})
	} catch (error) {
		console.log(error)
	}
}

const addMyDiary = async (req, res) => {
	try {
		const { text, imageUrl } = req.body
		await Diery.create({
			text: text,
			imageUrl: imageUrl,
		})

		res.redirect('/diery/my')
	} catch (error) {
		console.log(error)
	}
}

const getMyDiaryOne = async (req, res) => {
	try {
		const data = await Diery.findByPk(req.params.id, {
			raw: false,
			include: ['comment'],
			plain: true,
			nest: true,
		})

		const diery = await data.toJSON()
		console.log(data)
		res.render('diery/one-diery', {
			title: 'One diery',
			comment: diery.comment.reverse(),
			diery,
		})
	} catch (error) {
		console.log(error)
	}
}

const updatePage = async (req, res) => {
	try {
		const diery = await Diery.findByPk(req.params.id, {
			raw: true,
		})
		res.render('diery/update-diery', {
			title: 'Update diery',
			diery,
		})
	} catch (error) {
		console.log(error)
	}
}

const updateDiery = async (req, res) => {
	try {
		await Diery.update(
			{ text: req.body.text },
			{
				where: { id: req.params.id },
			}
		)
		res.redirect('/diery/my')
	} catch (error) {
		console.log(error)
	}
}

const deleteDiery = async (req, res) => {
	try {
		await Diery.destroy({
			where: { id: req.params.id },
		})
		res.redirect('/diery/my')
	} catch (error) {
		console.log(error)
	}
}

const addComentToDiery = async (req, res) => {
	try {
		await Comment.create({
			name: 'Username',
			comment: req.body.comment,
			dieryId: req.params.id,
		})
		res.redirect('/diery/' + req.params.id)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getMyDiary,
	addMyDiary,
	getMyDiaryOne,
	updatePage,
	updateDiery,
	deleteDiery,
	addComentToDiery,
}
