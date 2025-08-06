/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
function generalHandleErrors(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = generalHandleErrors;