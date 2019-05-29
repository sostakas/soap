const req = require("request-promise");
const Promise = require("bluebird");

class Communicator {
	getCourses() {
		return Promise.try(() => {
			return req({
				uri: "http://courses:3001/shop",
				json: true
			});
		})
			.then(body => {
				console.dir(body);
				if (body.error) throw new Error(body.message);
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}

	getCourse(id) {
		return Promise.try(() => {
			return req({
				uri: `http://courses:3001/shop/${id}`,
				json: true
			});
		})
			.then(body => {
				console.dir(body);
				if (body.error) throw new Error(body.message);
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}

	addCourse(id) {
		return Promise.try(() => {
			return req({
				uri: `http://courses:3001/shop/${id}`,
				json: true
			});
		})
			.then(async body => {
				console.dir(body);
				if (body.error) throw new Error(body.message);
				await req({
					method: "DELETE",
					uri: `http://courses:3001/shop/${id}`,
					json: true
                });
				return body;
			})
			.catch(function(resp) {
				throw new Error(resp.error.message);
			});
	}
}

module.exports = new Communicator();