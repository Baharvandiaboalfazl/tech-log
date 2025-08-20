export const errorHandler = (status, title, detail, extensions = {}) => {
  const error = new Error(detail);

  error.status = status;
  error.title = title;

  error.type = "about:blank";
  error.instance = null;
  Object.assign(error, extensions);

  return error;
};
