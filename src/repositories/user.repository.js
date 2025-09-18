const user = require('../models/user');

exports.findByEmail = (email) => user.findOne({ email });
exports.createUser = (data) => user.create(data);
exports.findById = (id) => user.findById(id);