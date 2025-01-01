class ResourceNotFoundError extends Error {

    status;
    name;

    constructor ( message ) {
        super(message);
        this.status = 404;
        this.name = "ResourceNotFoundError";
    }
}

module.exports = ResourceNotFoundError;