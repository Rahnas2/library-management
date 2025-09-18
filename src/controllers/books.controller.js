const bookService = require('../services/books.service');

exports.createBook = async (req, res, next) => {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const result = await bookService.getBooks(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.checkoutBook = async (req, res, next) => {
  try {
    const result = await bookService.checkoutBook(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};