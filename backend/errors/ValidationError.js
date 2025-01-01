class ValidationError extends Error {

    status;
    name;

    constructor ( message ) {
    super(message);
    this.status = 400;
    this.name = "ValidationError";
    }
}

module.exports = ValidationError;