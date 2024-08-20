const { where } = require('sequelize')
const db = require('../models/index')

const Diery = db.diery

const Comment = db.comment

const getAllDiery = async (req, res) => {
	try {
		const diery = await Diery.findAll({
			raw: true,
		})
		res.render('diery/my-diery', {
			title: 'My diery',
			isAuth: req.session.isAuth,
			diery,
		})
	} catch (error) {
		console.log(error)
	}
}

const addComment = async (req, res) => {
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

const addNewDiery = async (req, res) => {
	try {
		await Diery.create({
			text: req.body.text,
			imageUrl: req.body.imageUrl,
		})
		res.redirect('/diery/my')
	} catch (error) {
		console.log(error)
	}
}

const getOneDiery = async (req, res) => {
	try {
		const data = await Diery.findByPk(req.params.id, {
			raw: false,
			include: ['comment'],
			plain: true,
			nest: true,
		})
		const diery = await data.toJSON()
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
		const diery = await Diery.findByPk(req.params.id, { raw: true })
		res.render('diery/update-diery', {
			title: 'Update page',
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
			{ where: { id: req.params.id } }
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

module.exports = {
	getAllDiery,
	addNewDiery,
	addComment,
	getOneDiery,
	updateDiery,
	updatePage,
	deleteDiery,
}
