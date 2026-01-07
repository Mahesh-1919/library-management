import { ZodError } from "zod";

export const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }
    next(err);
  }
};

export const validateParams = (schema) => (req, res, next) => {
  try {
    req.params = schema.parse(req.params);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }
    next(err);
  }
};


export const validateQuery = (schema) => (req, res, next) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }
    next(err);
  }
};
