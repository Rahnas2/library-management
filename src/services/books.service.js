const bookRepo = require('../repositories/book.repository');
const logger = require('../utils/logger');

exports.createBook = async (data) => {
  const book = await bookRepo.createBook(data);
  logger.info(`Book created: ${book.title}`);
  return book;
};

exports.getBooks = async (filters) => {
  return await bookRepo.findBooks(filters);
};

exports.checkoutBook = async (bookId) => {
  const book = await bookRepo.findById(bookId);
  if (!book) throw { status: 404, message: 'Book not found' };
  if (book.stock <= 0) throw { status: 400, message: 'No stock available' };

  book.stock -= 1;
  await book.save();
  logger.info(`Book checked out: ${book.title}`);
  return book;
};
