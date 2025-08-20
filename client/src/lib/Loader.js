import { lazy } from "react";

const lazyWithMinTime = (importPromise, minDelay = 2000) => {
  return lazy(() =>
    Promise.all([
      importPromise,
      new Promise((resolve) => setTimeout(resolve, minDelay)),
    ]).then(([moduleExports]) => moduleExports)
  );
};

export default lazyWithMinTime;
