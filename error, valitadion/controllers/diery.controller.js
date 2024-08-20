const { where } = require('sequelize')
const db = require('../models/index')

const {Op} = require('sequelize')

const Diery = db.diery

const Comment = db.comment

const getMyDiery = async (req, res) => {
	try {
		const diery = await Diery.findAll({
			where: { userId: req.session.user.id },
			raw: true,
			plain: false,
			nest: true,
			include: ['user'],
			
		})
		
		res.render('diery/my-diery', {
			title: 'My diery',
			isAuth: req.session.isAuth,
			diery,
			error: req.flash('error')
		})
	} catch (error) {
		console.log(error)
	}
}

const getAllDiery = async (req, res) => {
	try {
		const paganetion = +req.query.page
		const limits = 2
		const diery = await Diery.findAll({
			// where: {userId: {[Op.ne]: req.session.user.id}},
			raw: true,
			plain: false,
			nest: true,
			include: ['user'],
			limit: limits, // bitta sahifada nechta korsatsin
			offset: (paganetion - 1) * limits // va nechtasini otkazib yuborsin
		})
		const totalData = await Diery.count()
		const lastPage = Math.ceil(totalData / limits)
		res.render('diery/all-diery', {
			title: 'My diery',
			isAuth: req.session.isAuth,
			diery,
			totalData,
			nextPage : paganetion + 1,
			previPage : paganetion - 1,
			hasNextPage: paganetion * limits < totalData,
			hasPrevisePage : paganetion - 1,
			lastPage,
			currentPage: paganetion,
			currentNotOne: paganetion !== 1 && (paganetion - 1) !== 1 ,
			lastPageCheking: lastPage !== paganetion && (paganetion +1 ) !== lastPage
		})
	} catch (error) {
		console.log(error)
	}
}

const addComment = async (req, res) => {
	try {
		if (req.body.comment.length <= 2){
			req.flash('errorCom', 'Komment 2 belgidan kop bolishi kerak')
			res.redirect('/diery/' + req.params.id)
		} else {
			await Comment.create({
				name: req.session.user.username,
				comment: req.body.comment,
				dieryId: req.params.id,
				userId: req.session.user.id
			})
			res.redirect('/diery/' + req.params.id)
		}
	
	} catch (error) {
		console.log(error)
	}
}

const addNewDiery = async (req, res) => {
	try {
		let image
		if (req.file){
			image = '/uploads/' + req.file.filename
		}else {
			image = ''
		}
		console.log(req.file)
		if (req.body.text.length <= 3){
			req.flash('error', 'Diery uzunligi 3 ta belgidan ko bolish kere')
			res.redirect('/diery/my')
		}else {
			await Diery.create({
				text: req.body.text,
				imageUrl: image,
				userId: req.session.user.id
			})
			res.redirect('/diery/my')
		}
		
	} catch (error) {
		console.log(error)
	}
}

const getOneDiery = async (req, res) => {
	try {
		const data = await Diery.findByPk(req.params.id, {
			raw: false,
			include: ['comment', 'user'],
			plain: true,
			nest: true,
		})
		const diery = await data.toJSON()
		res.render('diery/one-diery', {
			title: 'One diery',
			comment: diery.comment.reverse(),
			isAuth: req.session.isAuth,
			diery,
			errorCom: req.flash('errorCom')
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
	getMyDiery,
	addNewDiery,
	addComment,
	getOneDiery,
	updateDiery,
	updatePage,
	deleteDiery,
}
