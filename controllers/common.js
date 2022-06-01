export const response = (req, res, { message, result, error, status }) => {
  return res.status(status).json({
    error: error,
    message: message,
    result: result,
  });
};
