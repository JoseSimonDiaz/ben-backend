export function catchAsync(asyncRouteHandler) {
  return (request, response, next) => {
    Promise.resolve(asyncRouteHandler(request, response, next)).catch(next);
  };
}
