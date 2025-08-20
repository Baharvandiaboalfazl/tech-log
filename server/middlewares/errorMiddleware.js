//errors RFC 7807 format.
export const errorMiddleware = (err, req, res, next) => {
  const isCustomError = err.status && err.title;

  const status = isCustomError ? err.status : 500;
  const title = isCustomError ? err.title : "Internal Server Error";
  const detail = isCustomError
    ? err.message
    : "An unexpected error occurred on the server.";

  const instance = req.originalUrl;

  const problemDetails = {
    type: err.type || "about:blank",
    title: title,
    status: status,
    detail: detail,
    instance: instance,
  };

  Object.keys(err).forEach((key) => {
    if (
      !["status", "title", "message", "type", "instance", "stack"].includes(key)
    ) {
      problemDetails[key] = err[key];
    }
  });

  res
    .status(status)
    .contentType("application/problem+json")
    .json(problemDetails);
};
