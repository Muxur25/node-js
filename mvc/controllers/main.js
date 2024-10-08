const User = require('../models/users')

//Route     /
//Method    GET
//Descr     Get main page
const getMainPage = (req, res) => {
  const users = User.findAll()
  res.render('main', {
    title: 'User list',
    users
  })
}

//Route     /:uid
//Method    GET
//Descr     Get user page by uid
const getUserPageByUid = (req, res) => {
  const user = User.findByUid(req.params.uid)
  res.render('user-page', {
    title: user.username,
    user
  })
}

module.exports = {
  getMainPage,
  getUserPageByUid
}