const express = require('express')
const postController = require('../controllers/post.controller')

const router = express.Router()

router.get('/all', postController.getAllPost)

router.post('/add', postController.addNewPost)

router.get('/:id', postController.getPostById)

router.put('/:id', postController.update)

router.delete('/:id', postController.delete)

module.exports = router
