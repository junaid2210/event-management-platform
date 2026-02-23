const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    next(); 
  } catch (err) {
      const errorSource = err.issues || err.errors;

      const errorMessage = errorSource?.map((item) => item.message).join(", ") || 'validation failed';
      return next(new AppError(errorMessage, 400));
  }
};

module.exports = validate;