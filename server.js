require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const booksRoutes = require('./src/routes/books.routes');
const { errorHandler, notFound } = require('./src/middlewares/error.middleware');
const logger = require('./src/utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

// 404
app.use(notFound);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
logger.info(`Server started on port ${PORT}`);
});