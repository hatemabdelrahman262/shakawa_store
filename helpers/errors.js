class WrongPasswordError extends Error {
    constructor(message = "Wrong password") {
        super(message);
        this.name = "WrongPasswordError";
        this.statusCode = 401;
    }
}

module.exports = {WrongPasswordError};