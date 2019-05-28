const req = require("request-promise");
const Promise = require("bluebird");

function attachCoursesToStudent(student) {
	const courseIds = student.courses.map(course => course.id);

	return Promise.try(() => {
		return req({
			uri: `http://courses:3001/shop/multiple`,
			body: {
				courses: courseIds
			},
			json: true
		});
	})
		.then(body => {
			console.log("received resp");
			console.dir(body);
			if (body.error) {
				console.log("body error detected");
				throw new Error(body.message);
			}
			console.log("received courses resp: ");
			console.dir(body);
			student.courses = body;
			return student;
		})
		.catch(function(resp) {
			if (resp.message.includes("ECONNREFUSED") || resp.message.includes("ENOTFOUND")) {
				return student;
			} else {
				throw resp.error;
			}
		});
}

module.exports = {
	attachCoursesToStudent
};
