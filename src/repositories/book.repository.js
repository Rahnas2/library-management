const book = require('../models/book');

exports.createBook = (data) => book.create(data);

exports.findBooks = async ({ genre, author, minYear, available, limit = 10, offset = 0 }) => {
  const filter = {};
  if (genre) filter.genre = genre;
  if (author) filter.author = author;
  if (minYear) filter.publishedYear = { $gte: Number(minYear) };
  if (available === 'true') filter.stock = { $gt: 0 };

  const total = await book.countDocuments(filter);
  const books = await book.find(filter)
    .skip(Number(offset))
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return { total, limit: Number(limit), offset: Number(offset), data: books };
};

exports.findById = (id) => book.findById(id);
