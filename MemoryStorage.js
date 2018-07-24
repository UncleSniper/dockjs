const Promise = require('promise');
const Storage = require('./Storage.js');

class MemoryStorage extends Storage {

	constructor(users) {
		super();
		this.users = users || Object.create(null);
		this.sessions = Object.create(null);
	}

	putUser(username, password, isHashed) {
		this.users[username] = isHashed ? password : Storage.hashPassword(password);
		return this;
	}

	authenticateUser(username, password) {
		if(this.users[username] !== Storage.hashPassword(password))
			return Promise.resolve(null);
		return new Promise((resolve, reject) => {
			Storage.newToken((err, token) => {
				if(err)
					reject(err);
				else {
					this.sessions[token] = username;
					resolve(token);
				}
			});
		});
	}

	getSession(token) {
		return Promise.resolve(this.sessions[token] || null);
	}

}

module.exports = MemoryStorage;
