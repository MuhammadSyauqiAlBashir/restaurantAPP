const express = require('express')
const Controller = require('../controllers/controller')
const {middleware, upload} = require('../middlewares/middleware')
const router = express.Router()

router.post('/login', Controller.login)
router.get('/pub/cuisine', Controller.getPubCuisine)
router.get('/pub/categor', Controller.getCategory)
router.get('/pub/cuisine/:id', Controller.onePubCuisine)

router.use(middleware.authentication)

router.post('/add-user', middleware.authorizationAddUser, Controller.addUser)
router.post('/cuisine', Controller.addCuisine)
router.get('/cuisine', Controller.getCuisine)
router.put('/cuisine/:id', middleware.authorizationAdminOnly, Controller.updateCuisine)
router.get('/cuisine/:id', Controller.oneCuisine)
router.delete('/cuisine/:id', middleware.authorizationAdminOnly, Controller.deleteCuisine)
router.patch('/cuisine/:id', middleware.authorizationAdminOnly, upload.single('photo'), Controller.updateImageUrl)

router.post('/category', Controller.addCategory)
router.get('/category', Controller.getCategory)
router.put('/category/:id', Controller.editCategory)
router.delete('/category/:id', Controller.deleteCategory)

router.use(middleware.errorHandler)

module.exports = router