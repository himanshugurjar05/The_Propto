import {Router} from 'express'
import locationController from '../controllers/locationController.js'


let router = Router();

router.get('/', locationController.getLocation)
router.get('/:id', locationController.getLocationById)
router.post('/create', locationController.postLocation)
router.put('/update/:id', locationController.updateLocation)
router.delete('/delete/:id', locationController.deleteLocation)

export default router;