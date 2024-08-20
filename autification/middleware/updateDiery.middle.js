const db = require('../models/index');
const Diery = db.diery;
const User = db.user;

const updateMiddle = async (req, res, next) => {

	
	try {
		const exDiery = await Diery.findAll({ where: { userId: req.session.user.id } });
		const dieryExists = exDiery.some(diery => diery.id === parseInt(req.params.id));
		
		if (dieryExists) {
			next();
		} else {
			res.redirect('/diery/my');
		}
	} catch (error) {
		console.error('Error while fetching diaries:', error);
	
	}
};

module.exports = { updateMiddle };
