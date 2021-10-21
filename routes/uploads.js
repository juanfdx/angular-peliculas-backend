const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { fileUpload, getFile } = require('../controllers/upload.controller')


const router = Router();

//midleware para tener acceso req.files
router.use(expressfileUpload());

//UPDATE /api/uploads/type/id
router.put('/:type/:id', fileUpload ); 

//DOWNLOAD /api/uploads/type/imagePath
router.get('/:type/:image', getFile ); 






module.exports = router;
