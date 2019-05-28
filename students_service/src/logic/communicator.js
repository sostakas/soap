const req = require("request-promise");
const Promise = require("bluebird");

class Communicator {
	getCourses() {
		console.log("getCourses()");
		return Promise.try(() => {
			return req({
				uri: "http://courses:3001/shop",
				json: true
			});
		})
			.then(body => {
				console.log("received resp");
				console.dir(body);
				if (body.error) throw new Error(body.message);
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}

	getCourse(id) {
		console.log("getCourse()");
		return Promise.try(() => {
			return req({
				uri: `http://courses:3001/shop/${id}`,
				json: true
			});
		})
			.then(body => {
				console.log("received resp");
				console.dir(body);
				if (body.error) throw new Error(body.message);
				return body;
			})
			.catch(function(resp) {
				throw resp.error;
			});
	}

	buyCourse(id) {
		console.log("buyCourse()");
		return Promise.try(() => {
			return req({
				uri: `http://courses:3001/shop/${id}`,
				json: true
			});
		})
			.then(async body => {
				console.log("received resp");
				console.dir(body);
				if (body.error) throw new Error(body.message);
				await req({
					method: "DELETE",
					uri: `http://courses:3001/shop/${id}`,
					json: true
                });
                console.log('body return')
				return body;
			})
			.catch(function(resp) {
				throw new Error(resp.error.message);
			});
	}
}

module.exports = new Communicator();
