exports.validateBody = (schema) => (req, res, next) => {
const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
if (error) {
const details = error.details.map(d => d.message);
return res.status(400).json({ message: 'Validation error', details });
}
req.body = value;
next();
};