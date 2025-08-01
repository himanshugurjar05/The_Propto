import {Router} from 'express'
import userController from '../controllers/userController.js'

let router = Router()

router.get('/',userController.getAllUser)
router.get('/:id',userController.getUserById)
router.post('/login',userController.loginUser)
router.post('/signup',userController.createUser)
// router.get('/',userController.getAllUser)

export default router;