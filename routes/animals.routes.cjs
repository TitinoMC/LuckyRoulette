const {Router} = require('express');
const {getAnimals} = require('../controllers/animals.cjs');

const router = Router();

router.get('/animals/list', getAnimals);

module.exports = router;