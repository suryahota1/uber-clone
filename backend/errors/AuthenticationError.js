class AuthenticationError extends Error {

    status;
    name;

    constructor ( message ) {
        super(message);
        this.status = 401;
        this.name = "AuthenticationError";
    }
}

module.exports = AuthenticationError;