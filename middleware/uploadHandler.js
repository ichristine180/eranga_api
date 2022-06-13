export const handleUpload = (req, res, next) => {
  if (req.file) {
    req.body.doc_image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }
  next();
};
