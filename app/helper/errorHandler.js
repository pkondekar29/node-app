/**
 * 
 * Class for handling Server error
 * 
 */
class ServerError extends Error{
    constructor(message, status = 500) {
      this.message = message;
      this.status = status;
    }
}

module.exports = {
    ServerError
};
  