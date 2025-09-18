const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, checkoutBook } = require('../controllers/books.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { bookCreateSchema } = require('../validators/books.validators');


router.post('/', protect, validateBody(bookCreateSchema), createBook);
router.get('/', getAllBooks);
router.post('/:id/checkout', protect, checkoutBook);


module.exports = router;