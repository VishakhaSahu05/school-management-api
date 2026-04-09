const Joi = require("joi");

const coordinate = () => Joi.number().min(-90).max(90).required();

const addSchoolSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  address: Joi.string().trim().min(1).required(),
  latitude: coordinate(),
  longitude: coordinate(),
});

const listSchoolsSchema = Joi.object({
  latitude: coordinate(),
  longitude: coordinate(),
});

const validate = (schema, data) => schema.validate(data, { abortEarly: false });

module.exports = { addSchoolSchema, listSchoolsSchema, validate };
