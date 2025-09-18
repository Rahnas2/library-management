const Joi = require('joi');

exports.bookCreateSchema = Joi.object({
title: Joi.string().required(),
author: Joi.string().required(),
publishedYear: Joi.number().integer().min(0).max(new Date().getFullYear()).optional(),
genre: Joi.string().optional(),
stock: Joi.number().integer().min(0).required(),
});