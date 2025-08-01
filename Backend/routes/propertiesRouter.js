import {Router} from 'express'
import PropertyController from '../controllers/propertiesController.js'


let router = Router();

router.get('/', PropertyController.getProperties)
router.get('/:id', PropertyController.getPropertiesById)
router.post('/create', PropertyController.postProperties)
router.put('/:id', PropertyController.putProperties)
router.delete('/', PropertyController.deleteproperties)

export default router;