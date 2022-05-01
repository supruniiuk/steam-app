/**
 * Error handler
*/
class ApiError extends Error {
  /**
   * @constructor
   * @param {number} status
   * @param {string} message
   */
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  /**
   * @param {string} message
   * @return {object}
   */
  static badRequest(message) {
    return new ApiError(400, message);
  }

  /**
   * @param {string} message
   * @return {object}
   */
  static internal(message) {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
