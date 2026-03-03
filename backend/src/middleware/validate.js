const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    req.body = parsedData.body;
    req.query = parsedData.query;
    req.params = parsedData.params;

    next(); 
  } catch (err) {
      const errorSource = err.issues || err.errors;
      console.log(err);

      const errorMessage = errorSource?.map((item) => item.message).join(", ") || 'validation failed';
      return next(new AppError(errorMessage, 400));
  }
};

module.exports = validate;