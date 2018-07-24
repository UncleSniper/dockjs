const crypto = require('crypto');
const MethodNotImplementedException = require('./MethodNotImplementedException.js');

var sessionCounter = 0;

class Storage {

	constructor() {}

	authenticateUser(username, password) {
		throw new MethodNotImplementedException(this, 'authenticateUser');
	}

	getSession(token) {
		throw new MethodNotImplementedException(this, 'getSession');
	}

	static hashPassword(password) {
		const hash = crypto.createHash('sha512');
		hash.update(password);
		return hash.digest('hex');
	}

	static newToken(recipient) {
		crypto.randomBytes(16, (err, bytes) => {
			if(err)
				recipient(err, null);
			else
				recipient(null, crypto.createHash('sha256').update(bytes)
						.update(String(++sessionCounter)).digest('hex'));
		});
	}

}

module.exports = Storage;
