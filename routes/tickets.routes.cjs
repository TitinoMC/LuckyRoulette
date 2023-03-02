const {Router} = require('express');
const { getTicket, createTicket, updateTicket, deleteTicket, add_json } = require('../controllers/tickets.cjs');

const router = Router();

router.get('/:id', getTicket);
router.post('/new-ticket', createTicket);
router.put('/update-ticket', updateTicket);
router.delete('/delete-ticket/:id', deleteTicket);
router.post('/json/animals', add_json)

module.exports = router;