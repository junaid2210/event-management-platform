const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    if (parsedData.body) req.body = parsedData.body;
    if (parsedData.params) req.params = parsedData.params;
    if (parsedData.query) {
        Object.defineProperty(req, 'query', {
            value: parsedData.query,
            writable: true,
            configurable: true
        });
    }

    next(); 
  } catch (err) {
      const errorSource = err.issues || err.errors;
      console.log(err);

      const errorMessage = errorSource?.map((item) => item.message).join(", ") || 'validation failed';
      return next(new AppError(errorMessage, 400));
  }
};

module.exports = validate;