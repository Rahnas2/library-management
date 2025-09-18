const logger = require('../utils/logger');

exports.notFound = (req, res, next) => {
res.status(404).json({ message: 'Route not found' });
};


exports.errorHandler = (err, req, res, next) => {
logger.error(err.stack || err.message);
const status = err.status || 500;
res.status(status).json({ message: err.message || 'Server Error' });
};